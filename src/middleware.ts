import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TOKEN_COOKIE = 'infinity_token';
const ROLE_COOKIE = 'infinity_role';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const role = request.cookies.get(ROLE_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/profile', '/links', '/admin'];
  const authRoutes = ['/login', '/register'];

  const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isAuthPage = authRoutes.includes(pathname);
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/links/:path*', '/admin/:path*', '/login', '/register'],
};
