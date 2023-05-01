"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import TrashIcon from "../../icons/Icons"

type Props = {
  id: number
}

export default function DeleteWorkoutSet(props: any) {
  const { set } = props

  const deleteWorkoutSet = async () => {
    console.log(`Delete Set: ${set.id}`)
    console.log(set)
    let data = JSON.stringify({ id: set.id })
    console.log(data)

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-set/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: set.id }),
    })
  }

  return (
    <span onClick={deleteWorkoutSet} className="hover:cursor-pointer">
      <TrashIcon size="20" />
    </span>
  )
}
