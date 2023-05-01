"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  notes: "",
  user_id: 1,
  timestamp: new Date(),
}

export default function CreateWorkout() {
  const [data, setData] = useState(initState)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { user_id, timestamp, notes } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(res)
    //const result = await res.json()
    //console.log(result)

    // Navigate to thank you
    //router.push(`/thank-you/`)
    setData((prevData) => ({
      ...prevData,
      notes: "",
      timestamp: new Date(),
    }))
    router.refresh()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }))
  }

  const canSave = [...Object.values(data)].every(Boolean)

  const content = (
    //  id, user_id, timestamp, notes, created, updated
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <h1 className="text-4xl mb-4">Add Workout</h1>

      <label className="text-2xl mb-1" htmlFor="name">
        Notes:
      </label>
      <textarea
        className="input_style_001"
        id="notes"
        name="notes"
        placeholder="notes"
        value={data.notes}
        onChange={handleChange}
        autoFocus
      />

      <button className="btn btn-blue mt-2" disabled={!canSave}>
        Submit
      </button>
    </form>
  )

  return content
}
