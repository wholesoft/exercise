"use client"

import React from "react"
import { useAuth } from "../../hooks/useAuth"

type Props = {}

export default function page({}: Props) {
  //const { setAuth, persist, setPersist } = useAuth()
  const { auth, setAuth } = useAuth()
  const handleClick = () => {
    setAuth({ ...auth, email: "test2@test.com" })
  }

  return (
    <div>
      <h1>Test Provider</h1>
      <p>{JSON.stringify(auth)}</p>
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  )
}
