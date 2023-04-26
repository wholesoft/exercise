import { NextResponse } from "next/server"

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://strength.wholesoft.net"]
    : ["http://localhost:3000", "http://127.0.0.1:3000"]

export function middleware(request: Request) {
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

  /*   const regex = new RegExp("/api/*")

  if (request.url.includes("/api")) {
  }

  if (regex.test(request.url) {
  } */

  console.log("Middleware!")
  console.log(request.method)
  console.log(request.url)

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}
