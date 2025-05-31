import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { newUsername } from '../utils/username';
import { drizzle } from 'drizzle-orm/d1';
import { expiring_files } from './db/schema.ts';

type Env = {
  filedrop: R2Bucket;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());
app.use('*', prettyJSON());

app.get('/api', (c) => c.json({ name: 'Filedrop API' }));

app.post('/api/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const key = await newUsername(c.env.DB);
    const result = await c.env.filedrop.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
        contentDisposition: `inline; filename="${file.name}"`,
      },
      customMetadata: {
        id: key,
      },
    });

    const db = drizzle(c.env.DB);
    const insertResult = await db.insert(expiring_files).values({
      id: key,
      r2_object_key: key,
      original_filename: file.name,
      content_type: file.type,
      size_bytes: file.size,
      uploaded_at: Date.now(),
      expires_at: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    });
    console.log(insertResult);

    return c.json({ message: 'File uploaded successfully', result });
  } catch (error) {
    return c.json({ message: 'File upload failed', error: error }, 500);
  }
});

export default app;
