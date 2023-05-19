"use client"

import React, { useState } from "react"
import EasyEdit from "react-easy-edit"

type Props = {
  setId: number
  reps: number
}

export default function EditReps({ setId, reps }: Props) {
  const save = async (value: string) => {
    // Send data to API route
    const res = await fetch(`http://localhost:3000/api/workout-sets/${setId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reps: parseInt(value) }),
    })
  }
  const cancel = () => {
    console.log("Cancelled")
  }

  return (
    <EasyEdit
      className="col"
      type="text"
      onSave={save}
      onCancel={cancel}
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      attributes={{ name: "textInput", id: 1 }}
      instructions=""
      value={`${reps}`}
    />
  )
}
