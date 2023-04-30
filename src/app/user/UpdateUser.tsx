"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  id: 0,
  email: "",
  role: "BASIC",
}

type Props = {}

export default function UpdateUser(props: any) {
  const { user } = props

  const [data, setData] = useState({
    id: user.id,
    email: user.email,
    role: user.role,
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { id, email, role } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/user/", {
      method: "PUT",
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
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto max-w-3xl p-6"
      >
        <p className="pb-3">
          <b>UPDATE User</b>
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

        <input
          type="role"
          required
          name="role"
          className="input_style_001"
          placeholder="Role"
          value={data.role}
          onChange={handleChange}
        />
        <br />
        <button className="btn btn-blue mt-2">Save</button>
      </form>
    </div>
  )
}
