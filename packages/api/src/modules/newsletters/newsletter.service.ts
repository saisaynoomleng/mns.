import { TRPCError } from '@trpc/server';
import type { CreateNewsletterType } from '../../lib/types.js';
import { newsletterRepository } from './newsletter.repository.js';
import { isUniqueViolation } from '../../lib/helper.js';

export const newsletterService = () => {
  const repository = newsletterRepository();

  return {
    createNewletter: async (input: CreateNewsletterType) => {
      try {
        return await repository.insert(input);
      } catch (error) {
        if (isUniqueViolation(error)) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'You are already on the list',
          });
        }

        console.error('Insert Newsletter DB Error', error);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not subscribe. Please try again.',
        });
      }
    },
  };
};
