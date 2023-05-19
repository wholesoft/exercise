"use client"
import React, { useState, FormEvent, ChangeEvent } from "react"

type Props = {}

export default function ForgotPassword({}: Props) {
  const [input, setInput] = useState({ email: "" })
  const [response, setResponse] = useState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email } = input
    const res = await fetch(
      "http://localhost:3456/reset_password_email_request",
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          email,
        }),
      }
    )

    const result = await res.json()
    setResponse(result.message)
    console.log(result)
    //router.push(`/thank-you/`)
    setInput({ email: "" })
  }

  return (
    <div>
      <p>{response}</p>
      <h3>Reset Password</h3>
      <p>
        Enter the email used to create the account and we'll send you a link to
        reset your password.
      </p>
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
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
          />
          <button className="btn btn-primary mt-2">Submit</button>
        </div>
      </form>
    </div>
  )
}
