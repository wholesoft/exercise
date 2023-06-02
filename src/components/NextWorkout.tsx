"use client"
import React, { useState } from "react"
import DisplayWorkout from "./DisplayWorkout"

type Props = {
  user: any
}

export default function NextWorkout({ user }: Props) {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }

  const workouts = user?.workouts?.filter((w: any) => w.scheduled === true)
  const exercises = user?.exercises

  const result = (
    <>
      <button className="btn btn-secondary" onClick={toggleEditMode}>
        Toggle Edit Mode
      </button>
      <br />
      <br />
      {workouts?.map((w: any) => {
        return (
          <DisplayWorkout key={w.id} w={w} user={user} editMode={editMode} />
        )
      })}
    </>
  )

  return result
}
