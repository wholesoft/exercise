"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import TrashIcon from "../../icons/Icons"

type Props = {
  id: number
}

export default function DeleteExercise(props: any) {
  const { exercise } = props

  const deleteExercise = async () => {
    console.log(`Delete Exercise: ${exercise.id}`)
    console.log(exercise)
    let data = JSON.stringify({ id: exercise.id })
    console.log(data)

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/exercise/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: exercise.id }),
    })
  }

  return (
    <span onClick={deleteExercise} className="hover:cursor-pointer">
      <TrashIcon size="20" />
    </span>
  )
}
