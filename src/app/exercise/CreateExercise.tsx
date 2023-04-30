"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  name: "",
  user_id: 1,
}

export default function CreateExercise() {
  const [data, setData] = useState(initState)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { name, user_id } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/exercise/", {
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
      name: "",
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <h1 className="text-4xl mb-4">Add Exercise</h1>

      <label className="text-2xl mb-1" htmlFor="name">
        Name:
      </label>
      <input
        className="input_style_001"
        type="text"
        id="name"
        name="name"
        placeholder="name"
        value={data.name}
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
