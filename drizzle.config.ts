import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './src/worker/db/schema.ts',
  dialect: 'sqlite',
});
