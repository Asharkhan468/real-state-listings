import { NextResponse } from "next/server";

export async function proxy(request: any) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/adminProperty", "/addProperty"];
  const token = request.cookies.get("token")?.value;

  console.log("token ==>", token);

  // ✅ if route is protected
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // ✅ verify token with backend
    try {
      const res = await fetch(
        "https://real-state-listing-backend.vercel.app/api/v1/verifyToken",
        {
          headers: { Cookie: `token=${token}` },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok || !data.valid) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch (err) {
      console.error("Verification failed:", err);
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // ✅ if user is logged in, block going back to login
  if (pathname === "/admin" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/adminProperty/:path*", "/addProperty/:path*"],
};
