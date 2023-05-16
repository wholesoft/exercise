import { NextRequest, NextResponse } from "next/server"
import { verifyAccessToken } from "./lib/auth"

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://strength.wholesoft.net"]
    : ["http://localhost:3000", "http://127.0.0.1:3000"]

export async function middleware(request: NextRequest) {
  // DO AN ORIGIN CHECK FOR EVERYTHING
  const origin = request.headers.get("origin")
  //console.log("ORIGIN IS:")
  //console.log(origin)

  // origin seems to be null if accessing locally
  // not sure if client can pass a null origin once deployed though
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }

  // PROTECTED ROUTES
  const pathname = request.nextUrl.pathname
  const protectedRoutes = ["/workout", "/account"]

  if (protectedRoutes.includes(pathname)) {
    console.log("START MIDDLEWARE")
    console.log(pathname)
    console.log(new Date().toLocaleTimeString())

    //const atoken = localStorage.getItem("atoken")
    const atoken = request.cookies.get("jwta")?.value
    const rtoken = request.cookies.get("jwtr")?.value
    //console.log(request.cookies)
    console.log(`VERIFYING ${atoken}`)
    let verified = false
    if (atoken !== null && atoken !== undefined) {
      const verify = await verifyAccessToken(atoken)
      console.log(verify)
      if (verify.success === true) {
        verified = true
      } else {
        console.log("INVALID ACCESS TOKEN")
      }
    } else {
      console.log("NO ACCESS TOKEN FOUND.")
    }

    if (!verified) {
      if (rtoken !== null && rtoken !== undefined) {
        const refreshURL = new URL("/auth/refresh", request.url)
        refreshURL.searchParams.set("from", request.nextUrl.pathname)

        return NextResponse.redirect(refreshURL)
      }

      if (!verified) {
        const loginURL = new URL("/login", request.url)
        loginURL.searchParams.set("from", request.nextUrl.pathname)
        return NextResponse.redirect(loginURL)
      }
    }
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
}

/* export const config = {
  matcher: "/workout/:path*",
}
 */
