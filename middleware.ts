import { NextResponse } from "next/server";

const protectedRoutes = [
  "/addProperty",
  "/adminProperty"
];

export default function middleware(request: any) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedRoutes,
};
