"use client"

import React, { useState } from "react"
import DisplayWorkout from "./DisplayWorkout"
type Props = {
  user: any
}

export default function ListWorkouts({ user }: Props) {
  const [editMode, setEditMode] = useState(false)
  const [displayIndex, setDisplayIndex] = useState(0)

  const toggleEditMode = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
    }
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
  w.sort((a: any, b: any) => {
    return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf() // descending
  })

  if (displayIndex === null && w.length > 0) {
    setDisplayIndex(0)
  }

  /*   const idArray = w.map((w: any) => {
    return w.id
  })
  let currentWorkoutId = idArray[0]
  if (displayId > 0) {
    currentWorkoutId = displayId
  } */
  //console.log(idArray)
  let currentWorkout = w[displayIndex]

  return (
    <div>
      {editMode ? (
        <i className="bi bi-pencil-fill" onClick={toggleEditMode}></i>
      ) : (
        <i className="bi bi-pencil" onClick={toggleEditMode}></i>
      )}

      <i className="bi bi-caret-left" onClick={prevWorkout}></i>
      <i className="bi bi-caret-right" onClick={nextWorkout}></i>

      <p>{displayIndex}</p>
      <br />
      <br />
      {/*       <p>{currentWorkoutId}</p>
      <div>{JSON.stringify(currentWorkout)}</div> */}
      <DisplayWorkout w={currentWorkout} user={user} editMode={editMode} />
      {/*       {w.map((w: any) => {
        return (
          <div key={w.id}>
            <DisplayWorkout w={w} user={user} editMode={editMode} />
            <hr />
            <br />
          </div>
        )
      })} */}
    </div>
  )
}
