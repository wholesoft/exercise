import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string
      email: string
      email_confirmed: boolean
      exp: number
      iat: number
      jti: string
      roles: any
      success: boolean
      user_id: number
      authUserId: string
    }
  }
}
