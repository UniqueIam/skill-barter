import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public pages don't need auth
  const publicPaths = ["/auth/signin", "/auth/signup", "/"];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect if not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  const role = token.role as string;

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/user") && role !== "USER") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/browse"],
};
