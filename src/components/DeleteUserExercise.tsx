"use client"
import React from "react"
import { useRouter } from "next/navigation"

type Props = { id: number }

export default function DeleteUserExercise({ id }: Props) {
  const router = useRouter()

  async function deleteUserExercise(id: number) {
    console.log(`Delete: ${id}`)
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/delete-user-exercise`

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })

    const data = await res.json()
    console.log("fetch results")
    console.log(data)
    router.refresh()
  }

  return (
    <i
      className="bi-trash3 ps-1 clickable"
      onClick={() => deleteUserExercise(id)}
      style={{ fontSize: "12px" }}
    ></i>
  )
}
