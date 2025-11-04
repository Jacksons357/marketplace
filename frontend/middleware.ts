import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/cart", "/orders", "/dashboard"];
const authPages = ["/auth/login", "/auth/user/register", "/auth/admin/register"];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;

  if (isLoggedIn && authPages.some((path) => url.pathname.startsWith(path))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!isLoggedIn && protectedPaths.some((path) => url.pathname.startsWith(path))) {
    url.pathname = "/auth/login";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && url.pathname.startsWith("/dashboard")) {
    if (token?.role !== "ADMIN") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/orders/:path*",
    "/dashboard/:path*",
    "/auth/login",
    "/auth/user/register",
    "/auth/admin/register",
  ],
};
