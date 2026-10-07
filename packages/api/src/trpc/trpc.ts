import { initTRPC, TRPCError } from '@trpc/server';
import { type Context } from './context.js';

const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
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

export const amdinProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user.roles.includes('admin')) {
    throw new TRPCError({
      code: 'FORBIDDEN',
    });
  }

  return next();
});
