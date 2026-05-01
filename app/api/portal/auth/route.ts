import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const secret = process.env.PORTAL_SECRET;

  if (!secret || password !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = createHmac('sha256', secret).update('portal').digest('hex').slice(0, 32);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('lx_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('lx_session');
  return res;
}
