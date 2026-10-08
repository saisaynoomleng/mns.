import db, { NewsletterTable } from '../../db/index.js';
import type { CreateNewsletterType } from '../../lib/types.js';

export const newsletterRepository = () => {
  return {
    insertNewsletter: async ({ email }: CreateNewsletterType) => {
      const [data] = await db
        .insert(NewsletterTable)
        .values({
          email,
        })
        .returning();

      return data;
    },
  };
};
