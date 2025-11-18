import { NextResponse } from "next/server";

export function middleware(request: any) {
  const response = NextResponse.next();

  // Force cookies to be forwarded to middleware
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/addProperty/:path*",
    "/adminProperty/:path*",
  ],
};
