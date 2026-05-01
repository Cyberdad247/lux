import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function deriveToken(secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('portal'));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/portal/login')) return NextResponse.next();

  const secret = process.env.PORTAL_SECRET;
  if (!secret) {
    // Portal not configured — redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  const session = request.cookies.get('lx_session')?.value;
  const expected = await deriveToken(secret);

  if (session !== expected) {
    const url = new URL('/portal/login', request.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
