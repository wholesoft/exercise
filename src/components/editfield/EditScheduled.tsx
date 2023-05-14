"use client"

import React, { useState } from "react"
import EasyEdit from "react-easy-edit"

type Props = {
  woId: number
  scheduled: boolean
}

export default function EditScheduled({ woId, scheduled }: Props) {
  const save = async (value: string) => {
    // Send data to API route
    let parsedValue = value === "true"
    console.log(value)
    const res = await fetch(`http://localhost:3000/api/workout/${woId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduled: parsedValue }),
    })
  }
  const cancel = () => {
    console.log("Cancelled")
  }

  return (
    <select
      name="scheduled"
      id="scheduled"
      onChange={(e) => save(e.target.value)}
    >
      <option value="true">Scheduled</option>
      <option value="false">Completed</option>
    </select>

    /*     <EasyEdit
      type="select"
      options={[
        { label: "Scheduled", value: true },
        { label: "Completed", value: false },
      ]}
      onSave={save}
      placeholder=""
      instructions=""
      value={scheduled}
    /> */
  )
}
