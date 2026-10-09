import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';
import { env } from './lib/env/server';
import { BetterAuthSessionProps } from './lib/types';

const publicRoutes = ['/sign-in', '/not-authorized'];

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(req);

  if (!sessionCookie) {
    console.log('[proxy] REDIRECT: no session cookie');
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const response = await fetch(`${env.API_URL}/api/auth/get-session`, {
    headers: {
      Cookie: req.headers.get('cookie') ?? '',
    },
    cache: 'no-store',
  });

  console.log('[proxy] get-session status:', response.status);

  if (!response.ok) {
    console.log('[proxy] REDIRECT: get-session failed');
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const sessions: BetterAuthSessionProps = await response.json();

  if (!sessions?.user) {
    console.log('[proxy] REDIRECT: session has no user');
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
