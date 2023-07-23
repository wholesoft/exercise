"use client"

import React from "react"
import { useSession } from "next-auth/react"
import UpdatePassword from "../../../components/UpdatePassword"
import UpdateEmail from "../../../components/UpdateEmail"

type Props = {}

export default function Account({}: Props) {
  const { data: session } = useSession()

  /* const { email, roles, accessToken, authUserId } = session?.user */

  return session?.user ? (
    <div>
      <h4>Account Page</h4>
      <UpdatePassword accessToken={session.user.accessToken} />
      <UpdateEmail user={session.user} />

      {/*       <p>{email}</p>
      <p>{authUserId}</p>
      <p>{roles}</p>
      <p>{accessToken}</p> */}
    </div>
  ) : (
    <div>Loading...</div>
  )
}
