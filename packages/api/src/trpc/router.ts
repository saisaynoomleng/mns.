import { newsletterRouter } from '../modules/newsletters/newsletter.router.js';
import { router } from './trpc.js';

export const appRouter = router({
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
