"use client"

import React, { useState } from "react"
import EasyEdit from "react-easy-edit"
import { isNamedImportBindings } from "typescript"

type Props = {
  id: number
  name: string | null
}

export default function EditExercise({ id, name }: Props) {
  const save = async (value: string) => {
    // Send data to API route
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/exercise/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: value }),
      }
    )
  }
  const cancel = () => {
    console.log("Canceled")
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
      value={`${name}`}
    />
  )
}
