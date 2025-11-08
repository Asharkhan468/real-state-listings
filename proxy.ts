import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/adminProperty", "/addProperty"];

  if (protectedRoutes.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (pathname === "/admin" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/adminProperty/:path*", "/addProperty/:path*"],
};
