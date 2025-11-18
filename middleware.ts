import { NextResponse } from "next/server";

export function middleware(request:any) {

  const token = request.cookies.get("token");

  // Agar token nahi hai to admin login par redirect
  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// jahan protection chahiye
export const config = {
  matcher: [
    "/addProperty/:path*",   // protected route
    "/adminProperty/:path*", // aur bhi routes add karo
  ],
};
