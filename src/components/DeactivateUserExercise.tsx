"use client"
import React from "react"
import { useRouter } from "next/navigation"

type Props = { id: number }

export default function DeactivateUserExercise({ id }: Props) {
  const router = useRouter()

  async function deactivateUserExercise(id: number) {
    console.log(`Deactivate: ${id}`)
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/exercise/${id}`

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inactive: true }),
    })

    const data = await res.json()
    console.log("fetch results")
    console.log(data)
    router.refresh()
  }

  return (
    <i
      className="bi-trash ps-1 clickable"
      onClick={() => deactivateUserExercise(id)}
      style={{ fontSize: "12px" }}
    ></i>
  )
}
