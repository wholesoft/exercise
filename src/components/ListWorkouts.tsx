"use client"

import React, { useState } from "react"
import DisplayWorkout from "./DisplayWorkout"
import CreateWorkout from "./CreateWorkout"
import { useRouter } from "next/navigation"

type Props = {
  user: any
}

export default function ListWorkouts({ user }: Props) {
  const [editMode, setEditMode] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)
  const router = useRouter()

  const toggleEditMode = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }

  async function deleteWorkout(workoutId: number) {
    console.log(`Delete: ${workoutId}`)
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/delete-workout`

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: workoutId }),
    })

    const data = await res.json()
    console.log("fetch results")
    console.log(data)
    router.refresh()
  }

  const nextWorkout = () => {
    if (displayIndex < w.length - 1) {
      setDisplayIndex(displayIndex + 1)
    } else {
      setDisplayIndex(0)
    }
  }

  const prevWorkout = () => {
    if (displayIndex > 0) {
      setDisplayIndex(displayIndex - 1)
    } else {
      setDisplayIndex(w.length - 1)
    }
  }

  const w = user.workouts
  let result = <CreateWorkout user={user} />

  if (w != undefined) {
    w.sort((a: any, b: any) => {
      return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf() // descending
    })

    if (displayIndex === null && w.length > 0) {
      setDisplayIndex(0)
    }

    let currentWorkout = w[displayIndex]

    let workoutDate = new Date(currentWorkout.timestamp)
    var offset = workoutDate.getTimezoneOffset()
    workoutDate.setTime(workoutDate.getTime() + offset * 60 * 1000)

    result = (
      <div>
        <div className="fs-3" style={{ textAlign: "center" }}>
          <i className="bi bi-caret-left" onClick={prevWorkout}></i>
          <span className="fs-6">{workoutDate.toString().slice(0, 15)}</span>

          <i className="bi bi-caret-right" onClick={nextWorkout}></i>
          <br />
          {editMode ? (
            <i className="bi bi-pencil-fill" onClick={toggleEditMode}></i>
          ) : (
            <i className="bi bi-pencil" onClick={toggleEditMode}></i>
          )}

          <i
            className="bi bi-trash3 ms-3"
            onClick={() => deleteWorkout(currentWorkout.id)}
          ></i>
        </div>
        <CreateWorkout user={user} />
        <br />
        <DisplayWorkout w={currentWorkout} user={user} editMode={editMode} />
      </div>
    )
  }
  return result
}
