import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string
      email: string
      emailConfirmed: boolean
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
