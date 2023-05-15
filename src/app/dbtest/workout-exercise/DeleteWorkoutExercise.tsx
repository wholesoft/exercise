"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import TrashIcon from "../../../icons/Icons"

type Props = {
  id: number
}

export default function DeleteWorkoutExercise(props: any) {
  const { workoutExercise } = props

  const deleteWorkoutExercise = async () => {
    console.log(`Delete Workout Exercise: ${workout.id}`)
    console.log(workoutExercise)
    let data = JSON.stringify({ id: workoutExercise.id })
    console.log(data)

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-exercise/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: workoutExercise.id }),
    })
  }

  return (
    <span onClick={deleteWorkoutExercise} className="hover:cursor-pointer">
      <TrashIcon size="20" />
    </span>
  )
}
