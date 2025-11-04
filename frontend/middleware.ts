import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/cart", "/orders"];

const authPages = ["/auth/login", "/auth/user/register", "/auth/admin/register"];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("next-auth.session-token")?.value || req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!token;

  if (isLoggedIn && authPages.some((path) => url.pathname.startsWith(path))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!isLoggedIn && protectedPaths.some((path) => url.pathname.startsWith(path))) {
    url.pathname = "/auth/user/login";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/orders/:path*", "/auth/login", "/auth/user/register", "/auth/admin/register"],
};
