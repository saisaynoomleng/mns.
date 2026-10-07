import { initTRPC, TRPCError } from '@trpc/server';
import type { trpcContext } from './context.js';

const t = initTRPC.context<trpcContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user.role?.includes('admin')) {
    throw new TRPCError({
      code: 'FORBIDDEN',
    });
  }

  return next();
});
