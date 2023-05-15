"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  name: "",
  user_id: 1,
}

export default function UpdateWorkout(props: any) {
  const { workout } = props
  console.log(workout)
  const [data, setData] = useState(workout)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { timestamp, notes, user_id, id } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    //console.log(res)

    setData((prevData: any) => ({
      ...prevData,
      notes: "",
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
  //const canSave = true
  console.log(data)
  const content = (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <p className="pb-3">
        <b>UPDATE Workout</b>
      </p>

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
