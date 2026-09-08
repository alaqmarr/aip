import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
// For a real app, use bcrypt, but for simplicity we will use a basic check or implement a secure one if we add bcrypt.
// Let's implement a simple hash just for demonstration if we don't install bcrypt, or we can just require bcrypt.
// We didn't install bcrypt, so let's install it or use standard web crypto API.
// Web Crypto API is available in Node 20+.
// To keep it simple, we'll assume the password is plain text for this specific test app, OR we can add bcrypt.
// Actually, I should use bcryptjs. I will install it via run_command.
// For now, let's write the handler assuming bcryptjs is installed.

import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@alfaindustrialproducts.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user) return null
        
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        
        if (!isPasswordValid) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id as string
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
