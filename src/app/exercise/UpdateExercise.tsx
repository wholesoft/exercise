"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  name: "",
  user_id: 1,
}

export default function UpdateExercise(props: any) {
  const { exercise } = props

  const [data, setData] = useState(exercise)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { name, user_id, id } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/exercise/", {
      method: "PUT",
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
    setData((prevData: any) => ({
      ...prevData,
      name: "",
    }))
    router.refresh()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name

    setData((prevData: any) => ({
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
      <p className="pb-3">
        <b>UPDATE Exercise</b>
      </p>

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
