// middleware.ts (Next.js 13 app router)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Protected path list (jo routes protect karne hain)
  const protectedPaths = ["/adminProperty", "/addProperty"];

  const isProtected = protectedPaths.some((p) =>
    url.pathname.startsWith(p)
  );

  // sample: auth token cookie ka naam "token" assume kiya
  const token = req.cookies.get("token")?.value;

  if (isProtected && !token) {
    // agar protected route aur token missing ho to login pe bhejo
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// middleware should run for approp. routes
export const config = {
  matcher: ["/adminProperty/:path*", "/addProperty/:path*"],
};
