import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: string
      phone?: string
      organizationId?: string
      accessToken?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: string
    phone?: string
    organizationId?: string
    accessToken?: string
  }
}
