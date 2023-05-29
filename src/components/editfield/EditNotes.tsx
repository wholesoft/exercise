"use client"

import React, { useState } from "react"
import EasyEdit from "react-easy-edit"

type Props = {
  woId: number
  notes: string
}

export default function EditNotes({ woId, notes }: Props) {
  const save = async (value: string) => {
    // Send data to API route
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/workout/${woId}`
    console.log(url)

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: value }),
    })
    console.log(res)
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
      value={`${notes}`}
    />
  )
}
