"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { refreshToken } from "../../../lib/auth"
type Props = {}

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const [fired, setFired] = useState(false)

  console.log(searchParams)
  const fromUrl = searchParams?.from

  useEffect(() => {
    console.log("USE EFFECT")

    const tryRefreshingToken = async () => {
      const result = await refreshToken()
      if (result.success === true) {
        console.log("Success!")
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
  }, [])

  return <div>Refresh Token</div>
}
