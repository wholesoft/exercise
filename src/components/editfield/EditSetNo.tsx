"use client"

import React, { useState } from "react"
import EasyEdit from "react-easy-edit"

type Props = {
  setId: number
  setNo: number
}

export default function EditSetNo({ setId, setNo }: Props) {
  const save = async (value: string) => {
    console.log(`UPDAET ${setId} from ${setNo} to ${value}`)

    // Send data to API route
    const res = await fetch(`http://localhost:3000/api/workout-sets/${setId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ setNo: parseInt(value) }),
    })
    console.log(res)
    //const result = await res.json()
    //console.log(result)

    // Navigate to thank you
    //router.push(`/thank-you/`)
    /*     setData((prevData: any) => ({
      ...prevData,
      name: "",
    })) */
    //router.refresh()
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
      value={setNo}
    />
  )
}
