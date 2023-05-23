"use client"

import React from "react"
import { useSession } from "next-auth/react"

type Props = {}

export default function Account({}: Props) {
  const { data: session } = useSession()

  let result = <div>Loading...</div>

  if (session?.user != null) {
    const { email, roles, access_token, authUserId } = session.user
    result = (
      <div>
        <p>Account Page</p>
        <p>{email}</p>
        <p>{authUserId}</p>
        <p>{roles}</p>
        <p>{access_token}</p>
      </div>
    )
  }
  return result
}
