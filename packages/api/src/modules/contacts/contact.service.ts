import type { CreateContactType } from '../../lib/types.js';
import { contactRepository } from './contact.repository.js';

export const contactService = () => {
  const repository = contactRepository();

  return {
    createContact: async (input: CreateContactType) => {
      return await repository.insertContact(input);
    },
  };
};
