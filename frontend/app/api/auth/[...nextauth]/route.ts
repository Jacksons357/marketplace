import { axiosPublicAPI } from "@/lib/axios/axios-server";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials"

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set')
}

if (!process.env.API_URL) {
  throw new Error('API_URL is not set')
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials')
          return null
        }

        try {
          const response = await axios.post(`${process.env.API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          })
          const data = response.data

          if (!data.user || !data.access_token) {
            console.error('Invalid API response format:', data)
            return null
          }

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            phone: data.user.phone,
            organizationId: data.user.organizationId,
            accessToken: data.access_token
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          role: user.role,
          phone: user.phone,
          organizationId: user.organizationId,
          accessToken: user.accessToken,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          phone: token.phone,
          organizationId: token.organizationId,
          accessToken: token.accessToken,
        }
      }
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }