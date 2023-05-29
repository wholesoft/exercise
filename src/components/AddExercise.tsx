"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

type Props = {
  user: User
}

export default function AddExercise({ user }: Props) {
  const [data, setData] = useState({ name: "", user_id: user.id })
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    /*     const { name, user_id } = data */

    // Send data to API route
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/exercise/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
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
      <label className="form-label" htmlFor="name">
        Add Exercise:
      </label>
      <input
        className="form-control"
        type="text"
        id="name"
        name="name"
        placeholder="name"
        value={data.name}
        onChange={handleChange}
        autoFocus
      />

      <button className="btn btn-primary my-2">Submit</button>
    </form>
  )

  return content
}
