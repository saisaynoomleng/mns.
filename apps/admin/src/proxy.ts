import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './lib/env/server';
import type { BetterAuthSessionProps } from '@mns/api';

const publicRoutes = ['/sign-in', '/not-authorized'];

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(req);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const response = await fetch(`${env.API_URL}/api/auth/get-session`, {
    headers: {
      Cookie: req.headers.get('cookie') ?? '',
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const sessions: BetterAuthSessionProps = await response.json();

  if (!sessions?.user) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const roles = sessions.user.role?.split(',').map((r) => r.trim());

  const authenticated = roles?.some((r) =>
    ['admin', 'super_admin'].includes(r),
  );

  if (!authenticated) {
    return NextResponse.redirect(new URL('/not-authorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
