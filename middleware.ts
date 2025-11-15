import { NextResponse } from "next/server";

export function middleware(req:any) {
  const token = req.cookies.get("token")?.value;

  console.log("Middleware token =>", token);

  // No token → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/addProperty", "/adminProperty"],
};
