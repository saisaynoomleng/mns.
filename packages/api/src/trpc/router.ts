import { contactRouter } from '../routers/contacts.router.js';
import { router } from './trpc.js';

export const appRouter = router({
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
