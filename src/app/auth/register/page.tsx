"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
/* import { useAuth } from "../../../hooks/useAuth" */
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

type Props = {}

const initState = {
  email: "",
  password: "",
  confirmPassword: "",
  app: "strength.wholesoft.net",
}

export default function RegisterPage() {
  const [input, setInput] = useState(initState)
  /*   const { setAuth, persist, setPersist } = useAuth() */
  const [response, setResponse] = useState("")
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(input))
    const { email, password, confirmPassword, app } = input
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/register`, {
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
        password,
        confirm_password: confirmPassword,
        app,
      }),
    })

    const result = await res.json()
    console.log(result)
    if (result.success == false) {
      setResponse(result.message)
    } else {
      console.log("CREATING LOCAL USER!")

      const { email, authUserId } = result

      // Send data to API route
      const res = await fetch("http://localhost:3000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, authUserId }),
      })
      console.log(res)

      //router.push(`/thank-you/`)
      setInput(initState)
    }
  }

  return (
    <>
      <p>{JSON.stringify(input)}</p>
      <p>{response}</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto max-w-3xl p-6"
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email{" "}
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password{" "}
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password{" "}
          </label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm password"
            value={input.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}
