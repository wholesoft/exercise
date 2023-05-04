import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/auth"

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://strength.wholesoft.net"]
    : ["http://localhost:3000", "http://127.0.0.1:3000"]

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin")
  console.log("ORIGIN IS:")
  console.log(origin)

  // origin seems to be null if accessing locally
  //if (origin && !allowedOrigins.includes(origin) || !origin) {
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }
  console.log("Middleware!")
  console.log(request.method)
  console.log(request.url)

  /*   const token = request.cookies.get("user-token")?.value
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err)
    }))

  if (request.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return
  }
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (request.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } */

  return NextResponse.next()
}

export const config = {
  matcher: [],
}
