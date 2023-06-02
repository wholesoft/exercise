"use client"

import React, { useState } from "react"
import DisplayWorkout from "./DisplayWorkout"
type Props = {
  user: any
}

export default function ListWorkouts({ user }: Props) {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }

  const w = user.workouts
  w.sort((a: any, b: any) => {
    return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf() // descending
  })
  return (
    <div>
      <button className="btn btn-secondary" onClick={toggleEditMode}>
        Toggle Edit Mode
      </button>
      <br />
      <br />
      {w.map((w: any) => {
        return (
          <div key={w.id}>
            {/*  {w.id} - {w.timestamp.toString().slice(0, 10)} */}
            <DisplayWorkout w={w} user={user} editMode={editMode} />
            <hr />
            <br />
          </div>
        )
      })}
    </div>
  )
}
