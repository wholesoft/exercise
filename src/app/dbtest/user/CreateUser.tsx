"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  email: "",
}

type Props = {}

export default function CreateUser({}: Props) {
  const [data, setData] = useState(initState)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { email } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto max-w-3xl p-6"
      >
        <p className="pb-3">
          <b>Add User</b>
        </p>

        <input
          type="email"
          required
          name="email"
          className="input_style_001"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <br />
        <button className="btn btn-blue mt-2">Save</button>
      </form>
    </>
  )
}
