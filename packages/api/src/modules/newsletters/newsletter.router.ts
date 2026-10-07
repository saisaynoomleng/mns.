import { CreateNewsletterSchema } from '../../lib/types.js';
import { publicProcedure, router } from '../../trpc/trpc.js';
import { newsletterService } from './newsletter.service.js';

export const newsletterRouter = router({
  create: publicProcedure
    .input(CreateNewsletterSchema)
    .mutation(async ({ input }) => {
      await newsletterService().createNewletter(input);

      return {
        success: true,
        message: 'Thank you for your subscription!',
      };
    }),
});
