import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('adm_session');
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (adminSession) {
        // If already logged in, redirect from login page to admin dashboard
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    } else {
      // For any other /admin route, check for session
      if (!adminSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }



  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};