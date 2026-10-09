import type { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import type { BetterAuthSessionUserProps } from '../lib/types.js';

export const adminRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated!' });
    }

    const user: BetterAuthSessionUserProps = session.user;

    const roles = user.role
      ?.split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    const authorized = roles?.some((r) => ['admin', 'super_admin'].includes(r));

    if (!authorized) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    return next();
  } catch (error) {
    console.error(`Admin Required API error`, error);
    return next(error);
  }
};
