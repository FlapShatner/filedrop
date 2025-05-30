import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';

type Env = {
  filedrop: R2Bucket;
};

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());
app.use('*', prettyJSON());

app.get('/api', (c) => c.json({ name: 'Cloudflare' }));

app.post('/api/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const key = file.name;
    await c.env.filedrop.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
        contentDisposition: `inline; filename="${file.name}"`,
      },
    });

    return c.json({ message: 'File uploaded successfully' });
  } catch (error) {
    return c.json({ message: 'File upload failed', error: error }, 500);
  }
});

export default app;
