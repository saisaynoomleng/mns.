import db from '../../db/index.js';
import { NewsletterTable } from '../../db/schema/index.js';
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

    findAllNewsletters: async () => {
      const data = await db.query.NewsletterTable.findMany({
        columns: {
          email: true,
          createdAt: true,
          id: true,
        },
      });

      return data;
    },
  };
};
