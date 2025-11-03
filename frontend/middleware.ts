import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/auth/user/login",
  },
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/login (login page)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|auth/user/login|auth/user/register|auth/admin/register).*)",
  ],
}