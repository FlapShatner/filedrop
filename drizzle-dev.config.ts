import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/worker/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/4041f0185fefe210b183ffffc3cbd9b11e654da872ca22dfc81a04ac3202d511.sqlite',
  },
});
