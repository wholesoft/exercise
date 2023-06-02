"use client"

import React, { useState } from "react"
import EasyEdit from "react-easy-edit"

type Props = {
  woId: number
  scheduled: boolean
  editMode: boolean
}

export default function EditScheduled({ woId, scheduled, editMode }: Props) {
  const save = async (value: string) => {
    // Send data to API route
    let parsedValue = value === "true"
    console.log(value)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/workout/${woId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scheduled: parsedValue }),
      }
    )
  }
  const cancel = () => {
    console.log("Cancelled")
  }

  return editMode ? (
    <select
      name="scheduled"
      id="scheduled"
      onChange={(e) => save(e.target.value)}
      value={scheduled?.toString()}
    >
      <option value="true">Scheduled</option>
      <option value="false">Completed</option>
    </select>
  ) : scheduled ? (
    <em>Scheduled</em>
  ) : (
    <em>Completed</em>
  )
}
