import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const expiring_files = sqliteTable('expiring_files', {
  id: text('id').primaryKey(),
  r2_object_key: text('r2_object_key').notNull(),
  original_filename: text('original_filename').notNull(),
  content_type: text('content_type').notNull(),
  size_bytes: integer('size_bytes').notNull(),
  uploaded_at: integer('uploaded_at').notNull(),
  expires_at: integer('expires_at').notNull(),
});
