import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import { User } from "next-auth"
import { authOptions } from "@/lib/next-authOptions"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
