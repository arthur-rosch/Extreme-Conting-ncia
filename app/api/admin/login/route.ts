import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin'; // Used for signing JWT or simple nonce

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // In a real application, you would generate a JWT here.
    // For this example, we'll use a simple nonce.
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

    const cookie = serialize('adm_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      sameSite: 'lax',
    });

    return new NextResponse(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
  } else {
    return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
    });
  }
}

export const dynamic = "force-dynamic";