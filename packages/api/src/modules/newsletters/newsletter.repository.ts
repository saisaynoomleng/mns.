import db, { NewsletterTable } from '../../db/index.js';
import type { CreateNewsletterType } from '../../lib/types.js';

export const newsletterRepository = () => {
  return {
    insert: async (input: CreateNewsletterType) => {
      return await db.insert(NewsletterTable).values({
        email: input.email,
      });
    },

    findAll: async () => {},
  };
};
