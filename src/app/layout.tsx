import "bootstrap/dist/css/bootstrap.css"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import { Inter } from "next/font/google"
import Navbar from "./Navbar"
/* import { AuthProvider } from "../context/AuthProvider" */
import Head from "next/head"
import NextAuthProvider from "../providers/NextAuthProvider"
export const metadata = {
  title: "Wholesoft Strength",
  description:
    "A simple app to log your weight lifting workouts and plan your next one.",
  icons: {
    icon: "/wholesoft.svg",
  },
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <html lang="en">
      <body id="root">
        <NextAuthProvider>
          <Navbar />
          <article className="content p-3">{children}</article>
          <footer className="footer py-3">
            <Link href="/">Wholesoft Strength</Link>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  )
}
