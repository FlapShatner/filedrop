import { generateUsername } from 'unique-username-generator';
import { drizzle } from 'drizzle-orm/d1';
import { expiring_files } from '../worker/db/schema';
import { eq } from 'drizzle-orm';

export const newUsername = async (database: D1Database): Promise<string> => {
  const maxAttempts = 5;
  const db = drizzle(database);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const username = generateUsername();

    const existingFile = await db
      .select({ id: expiring_files.id })
      .from(expiring_files)
      .where(eq(expiring_files.id, username))
      .limit(1);

    if (existingFile.length === 0) {
      return username;
    }
  }

  return generateAlphanumericUUID();
};

const generateAlphanumericUUID = (): string => {
  return crypto.randomUUID().replace(/-/g, '');
};
