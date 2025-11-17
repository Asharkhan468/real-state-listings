import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/addProperty", "/adminProperty"];

  const currentPath = req.nextUrl.pathname;

  if (protectedRoutes.some(route => currentPath.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/addProperty/:path*", "/adminProperty/:path*"],
};
