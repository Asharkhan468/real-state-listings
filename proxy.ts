import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token');
  const protectedRoutes = ['/addProperty', '/adminProperty'];

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
  }

  return NextResponse.next();
}
