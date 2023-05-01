"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  setno: 0,
  weight: 0,
  reps: 0,
  we_id: 2,
}

export default function CreateWorkoutSet() {
  const [data, setData] = useState(initState)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { we_id, setno, reps, weight } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-sets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(res)

    setData((prevData) => ({
      ...prevData,
      reps: 0,
      weight: 0,
      setno: 0,
      we_id: 2,
    }))
    router.refresh()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name

    setData((prevData) => ({
      ...prevData,
      [name]: parseInt(e.target.value),
    }))
  }

  const canSave = [...Object.values(data)].every(Boolean)

  const content = (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <p>{JSON.stringify(data)}</p>
      <h3 className="text-2xl mb-4">Add Set</h3>

      <input
        className="input_style_001"
        type="text"
        id="setno"
        name="setno"
        placeholder="Set #"
        value={data.setno}
        onChange={handleChange}
        autoFocus
      />

      <input
        className="input_style_001 mt-4"
        type="text"
        id="weight"
        name="weight"
        placeholder="Weight"
        value={data.weight}
        onChange={handleChange}
        autoFocus
      />

      <input
        className="input_style_001 mt-4"
        type="text"
        id="reps"
        name="reps"
        placeholder="Reps"
        value={data.reps}
        onChange={handleChange}
        autoFocus
      />

      <button className="btn btn-blue mt-4" disabled={!canSave}>
        Submit
      </button>
    </form>
  )

  return content
}
