import { CreateContactSchema } from '../lib/types.js';
import { contactService } from '../modules/contacts/contact.service.js';
import { publicProcedure, router } from '../trpc/trpc.js';

export const contactRouter = router({
  create: publicProcedure
    .input(CreateContactSchema)
    .mutation(async ({ input }) => {
      await contactService().createContact(input);

      return {
        success: true,
        message: 'Contact Created',
      };
    }),
});
