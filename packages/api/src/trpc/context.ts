import type { Request } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';

export const createContext = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  return {
    req,
    user: session?.user
      ? {
          ...session.user,
          roles: session.user.role ? session.user.role.split(',') : [],
        }
      : null,
  };
};

export type TrpcContext = Awaited<ReturnType<typeof createContext>>;
