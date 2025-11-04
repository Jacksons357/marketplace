import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/auth/user/login",
  },
})

export const config = {
  matcher: [
    "/cart/:path*",
    "/orders/:path*",
  ]
}