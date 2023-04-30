"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import TrashIcon from "../../icons/Icons"

type Props = {
  id: number
}

export default function DeleteUser(props: any) {
  const { user } = props

  const deleteUser = async () => {
    console.log(`Delete User: ${user.id}`)

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/user/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    })
  }

  return (
    <span onClick={deleteUser} className="hover:cursor-pointer">
      <TrashIcon size="20" />
    </span>
  )
}
