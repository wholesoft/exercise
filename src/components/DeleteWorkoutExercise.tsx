"use client"
import React from "react"
import { useRouter } from "next/navigation"

type Props = { weId: number }

export default function DeleteWorkoutExercise({ weId }: Props) {
  const router = useRouter()

  async function deleteWorkoutExercise(id: number) {
    console.log(`Delete: ${id}`)
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/delete-workout-exercise`

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
    <div className="rounded-button-container">
      <span
        className="rounded-button"
        onClick={() => deleteWorkoutExercise(weId)}
      >
        <i className="bi-x bs-icon"></i>
        {<span className="bs-icon-label">Remove</span>}
      </span>
    </div>
  )
}
