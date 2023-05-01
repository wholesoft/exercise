"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import TrashIcon from "../../icons/Icons"

type Props = {
  id: number
}

export default function DeleteWorkout(props: any) {
  const { workout } = props

  const deleteWorkout = async () => {
    console.log(`Delete Workout: ${workout.id}`)
    console.log(workout)
    let data = JSON.stringify({ id: workout.id })
    console.log(data)

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: workout.id }),
    })
  }

  return (
    <span onClick={deleteWorkout} className="hover:cursor-pointer">
      <TrashIcon size="20" />
    </span>
  )
}
