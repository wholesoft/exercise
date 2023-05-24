"use client"
import { User } from "@prisma/client"
import React, { useState, FormEvent, ChangeEvent } from "react"

type Props = {
  user: any
}

export default function UpdateEmail({ user }: Props) {
  const [input, setInput] = useState({ email: user.email })
  const [response, setResponse] = useState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email } = input
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/update_email_address`,
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          email,
        }),
      }
    )

    const result = await res.json()
    console.log(result)
    setResponse(result.message)
    console.log(result)

    // TODO: UPDATE next-auth session email
    //router.push(`/thank-you/`)
    //setInput({ password: "", confirmPassword: "" })
  }

  return (
    <div>
      {/*       <p>{user.access_token}</p> */}
      <p>{response}</p>
      <h3>Update Email Address</h3>

      <form onSubmit={handleSubmit} className="">
        <div className="mb-3">
          {/*           <label htmlFor="email" className="form-label">
            Email{" "}
          </label> */}
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            placeholder=""
            value={input.email}
            onChange={handleChange}
          />
          <button className="btn btn-primary mt-2">Submit</button>
        </div>
      </form>
    </div>
  )
}
