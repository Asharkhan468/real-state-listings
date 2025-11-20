import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = localStorage.getItem("token");
  const path = request.nextUrl.pathname;

  // Public routes
  const publicPaths = ["/admin"];

  // If user is logged in and wants to visit login → redirect to dashboard
  if (token && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isPublic = publicPaths.includes(path);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Protected routes matching
export const config = {
  matcher: [
    "/addProperty", // example
    "/adminProperty"
  ],
};
