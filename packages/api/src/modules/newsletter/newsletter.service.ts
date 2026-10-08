import type { CreateNewsletterType } from '../../lib/types.js';
import { newsletterRepository } from './newsletter.repository.js';

export const newsletterService = () => {
  const repository = newsletterRepository();

  return {
    create: async ({ email }: CreateNewsletterType) => {
      const data = await repository.insertNewsletter({ email });

      return data;
    },
  };
};
