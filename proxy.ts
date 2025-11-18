import { NextResponse } from "next/server";

export default function proxy(request: any) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && (pathname === "/addProperty" || pathname === "/adminProperty")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/addProperty", "/adminProperty"], 
};
