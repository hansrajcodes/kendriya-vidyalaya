import { NextResponse } from 'next/server'

export const authConfig = {
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: { signIn: '/login' },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard')

      if (isOnDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin))
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
  providers: [],
}
