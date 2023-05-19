"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

const NavMenu = () => {
  const { data: session } = useSession()
  //console.log(session)

  // NOT LOGGED IN
  let items = [{ id: 3, link: "/auth/register", label: "Register" }]

  if (session?.user != null) {
    // LOGGED IN USER
    if (session.user.roles.includes(1001)) {
      items = [
        { id: 4, link: "/workout", label: "My Workouts" },
        { id: 5, link: "/auth/account", label: "My Account" },
      ]
    }
  }
  return (
    <>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <Link href={item.link} prefetch={false}>
                {item.label}
              </Link>
            </li>
          )
        })}

        {session?.user ? (
          <>
            <li>
              <Link href="/account" prefetch={false}>
                {session.user.email}
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => signOut()}>
                Sign Out
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="#" onClick={() => signIn()}>
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </>
  )
}

export { NavMenu }
