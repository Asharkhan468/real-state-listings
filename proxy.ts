import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("PROXY TOKEN:", token);

  // Protected routes list
  const protectedRoutes = ["/addProperty", "/adminProperty"];

  // Agar request protected route ki ho
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // agar token nahi hai, login pe redirect karo
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Agar sab kuch theek hai → request aage allow karo
  return NextResponse.next();
}

export const config = {
  matcher: ["/addProperty", "/adminProperty"],
};
