import "./globals.css"
import Link from "next/link"
import { Inter } from "next/font/google"
import Navbar from "./Navbar"

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body id="root">
        <Navbar />
        {children}
        <footer className="footer py-3">
          <Link href="/">Wholesoft Strength</Link>
        </footer>
      </body>
    </html>
  )
}
