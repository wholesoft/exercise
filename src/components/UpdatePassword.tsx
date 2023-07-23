"use client"
import React, { useState, FormEvent, ChangeEvent } from "react"

type Props = {
  resetToken: string | null
  accessToken: string | null
}

export default function UpdatePassword({ resetToken, accessToken }: any) {
  const [input, setInput] = useState({ password: "", confirmPassword: "" })
  const [response, setResponse] = useState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let result: any = { success: false, message: "Error." }
    if (resetToken?.length > 0) {
      const { password, confirmPassword } = input
      const res = await fetch(
        `${process.env.AUTH_URL}/update_password_with_token`,
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
            passwordResetToken: resetToken,
            password,
            confirmPassword: confirmPassword,
          }),
        }
      )
      result = await res.json()
    } else {
      const { password, confirmPassword } = input
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/update_password`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            password,
            confirmPassword: confirmPassword,
          }),
        }
      )
      result = await res.json()
    }

    console.log(result)
    setResponse(result.message)
    console.log(result)
    //router.push(`/thank-you/`)
    setInput({ password: "", confirmPassword: "" })
  }

  return (
    <div>
      {/*       <p>{resetToken}</p> */}
      <p>{response}</p>
      <h3>Update Password</h3>

      <form onSubmit={handleSubmit} className="">
        <div className="mb-3">
          {/*           <label htmlFor="email" className="form-label">
            Email{" "}
          </label> */}
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={input.confirmPassword}
            onChange={handleChange}
          />
          <button className="btn btn-primary mt-2">Submit</button>
        </div>
      </form>
    </div>
  )
}
