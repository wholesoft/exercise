"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
/* import useAuth from "../../../hooks/useAuth" */
import { refreshToken } from "../../../lib/auth"
type Props = {}

export default async function Refresh({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const [fired, setFired] = useState(false)
  /*   const { setAuth } = useAuth() */

  //console.log(searchParams)
  const fromUrl = searchParams?.from
  console.log("wtf")
  /*  useEffect(() => {
    console.log("USE EFFECT")

    const tryRefreshingToken = async () => {
      const result = await refreshToken()
      if (result.success === true) {
        console.log("Success!")
        console.log(result)
        const { access_token, roles, email_confirmed, user_id, email } = result
        localStorage.setItem("atoken", access_token)
        setAuth({
          userId: user_id,
          email: email,
          roles: roles,
        })

        if (fromUrl !== null) {
          console.log("Redirecting to: " + fromUrl)
          router.push(fromUrl)
        } else {
          console.log("Redirecting to: /")
          router.push("/")
        }
      } else {
        if (fromUrl != null) {
          console.log("Redirecting to: /login ? " + fromUrl)
          router.push({
            pathname: "/login",
            query: { from: fromUrl },
          })
        } else {
          console.log("Redirecting to: /login")
          router.push("/login") // todo add fromUrl parameter
        }
      }
    }
    if (!fired) {
      console.log("tryRefreshingToken()")
      tryRefreshingToken()
      setFired(true)
    }
  }, []) */

  return <div>Refresh Token</div>
}
