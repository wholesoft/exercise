"use client"

import React, { useState } from "react"
import EasyEdit from "react-easy-edit"

type Props = {
  setId: number
  weight: number
}

export default function EditWeight({ setId, weight }: Props) {
  const save = async (value: string) => {
    // Send data to API route
    const res = await fetch(
      `${process.env.APP_URL}/api/workout-sets/${setId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight: parseInt(value) }),
      }
    )
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
      value={`${weight}`}
    />
  )
}
