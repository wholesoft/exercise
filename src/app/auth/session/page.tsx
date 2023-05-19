"use client"

import React from "react"
import { useSession } from "next-auth/react"

type Props = {}

export default function Account({}: Props) {
  const { data: session } = useSession()

  const { email, roles, access_token, authUserId } = session?.user

  return (
    <div>
      <p>Account Page</p>
      <p>{email}</p>
      <p>{authUserId}</p>
      <p>{roles}</p>
      <p>{access_token}</p>
    </div>
  )
}
