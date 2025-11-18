import { NextResponse } from "next/server";

export function middleware(request:any) {

  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/addProperty/:path*",  
    "/adminProperty/:path*", 
  ],
};
