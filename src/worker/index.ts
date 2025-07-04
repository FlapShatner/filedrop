import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { newUsername } from './username';
import { drizzle } from 'drizzle-orm/d1';
import { expiring_files } from './db/schema';
import { eq, lt } from 'drizzle-orm';

export type DBType = D1Database;
type Env = {
  filedrop: R2Bucket;
  DB: DBType;
};

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());
app.use('*', prettyJSON());

app.get('/api', (c) => c.json({ name: 'Filedrop API' }));

app.post('/api/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const expireIn = formData.get('expireIn') as string;
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
    console.log('r2 result:', result);

    const db = drizzle(c.env.DB);
    const insertResult = await db
      .insert(expiring_files)
      .values({
        id: key,
        r2_object_key: key,
        original_filename: file.name,
        content_type: file.type,
        size_bytes: file.size,
        uploaded_at: Date.now(),
        expires_at: Date.now() + 1000 * 60 * 60 * parseInt(expireIn),
      })
      .returning();
    const dbResult = { success: true, insertResult };
    console.log('db result:', dbResult);

    return c.json({
      message: 'File uploaded successfully',
      result: dbResult,
    });
  } catch (error) {
    return c.json({ message: 'File upload failed', error: error }, 500);
  }
});

app.get('/api/download/:url', async (c) => {
  const { url } = c.req.param();
  try {
    // const file = await c.env.filedrop.get(url);
    // console.log('file', file);
    // if (!file) {
    //   return c.json({ message: 'File not found' }, 404);
    // }
    const db = drizzle(c.env.DB);
    const fileMeta = await db
      .select()
      .from(expiring_files)
      .where(eq(expiring_files.id, url));
    if (!fileMeta) {
      return c.json({ message: 'File not found' }, 404);
    }
    return c.json({ fileMeta });
  } catch (error) {
    return c.json({ message: 'File download failed', error: error }, 500);
  }
});

app.get('/api/file/:url', async (c) => {
  const { url } = c.req.param();
  try {
    const file = await c.env.filedrop.get(url);
    if (!file) {
      return c.json({ message: 'File not found' }, 404);
    }

    const db = drizzle(c.env.DB);
    const fileMeta = await db
      .select()
      .from(expiring_files)
      .where(eq(expiring_files.id, url));

    if (!fileMeta || fileMeta.length === 0) {
      return c.json({ message: 'File not found' }, 404);
    }

    const metadata = fileMeta[0];

    // Check if file has expired
    if (metadata.expires_at && Date.now() > metadata.expires_at) {
      return c.json({ message: 'File has expired' }, 410);
    }

    // Set headers for file download
    c.header(
      'Content-Type',
      metadata.content_type || 'application/octet-stream'
    );
    c.header(
      'Content-Disposition',
      `attachment; filename="${metadata.original_filename}"`
    );
    c.header('Content-Length', metadata.size_bytes.toString());
    c.header('Cache-Control', 'no-cache');

    return new Response(file.body, {
      headers: c.res.headers,
    });
  } catch (error) {
    return c.json({ message: 'File download failed', error: error }, 500);
  }
});

export default {
  fetch: app.fetch,
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(handleScheduled(env));
  },
};

async function handleScheduled(env: Env) {
  console.log('Cron job started: searching for expired files...');
  const db = drizzle(env.DB);
  try {
    const expiredFiles = await db
      .select()
      .from(expiring_files)
      .where(lt(expiring_files.expires_at, Date.now()));

    if (expiredFiles.length === 0) {
      console.log('No expired files found.');
      return;
    }

    console.log(`Found ${expiredFiles.length} expired files. Deleting...`);

    for (const file of expiredFiles) {
      try {
        console.log(`Deleting file from R2: ${file.r2_object_key}`);
        await env.filedrop.delete(file.r2_object_key);
        console.log(`Successfully deleted from R2. Now deleting from DB.`);

        await db.delete(expiring_files).where(eq(expiring_files.id, file.id));
        console.log(`Successfully deleted from DB: ${file.id}`);
      } catch (err) {
        console.error(
          `Failed to delete file ${file.id} (R2 key: ${file.r2_object_key}):`,
          err
        );
      }
    }
    console.log('Cron job finished.');
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
}
