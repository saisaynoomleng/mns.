import db, { ContactTable } from '@mns/db';
import type { CreateContactType } from '../../lib/types.js';

export const contactRepository = () => {
  return {
    insertContact: async (input: CreateContactType) => {
      try {
        return await db
          .insert(ContactTable)
          .values({
            name: input.name,
            email: input.email,
            maxBudget: input.maxBudget,
            minBudget: input.minBudget,
            status: 'new',
            message: input.message,
          })
          .returning();
      } catch (error) {
        console.error('insert contact to db error', error);
        throw error;
      }
    },
  };
};
