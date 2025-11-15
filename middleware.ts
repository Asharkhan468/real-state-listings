import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  console.log("TOKEN =>", token);

  // PROTECTED ROUTES
  const protectedRoutes = ["/addProperty", "/adminProperty"];

  // Agar user protected route pe jara hai aur token NAHI mila
  if (protectedRoutes.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const loginUrl = new URL("/admin", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
