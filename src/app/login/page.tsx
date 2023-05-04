"use client"

import { useState, FormEvent, ChangeEvent } from "react"

type Props = {}

const initState = {
  email: "",
  password: "",
}

export default function LoginPage({}: Props) {
  const [input, setInput] = useState(initState)
  const [response, setResponse] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(input))

    // Send data to API route
    // {email: "", password: ""}
    //  'Access-Control-Allow-Origin' header is present on the requested resource. I

    const res = await fetch("http://localhost:3456/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(input),
    })
    console.log(res)
    const result = await res.json()
    console.log(result)
    setResponse(JSON.stringify(result))

    // Navigate to thank you
    //router.push(`/thank-you/`)
    setInput(initState)
  }

  return (
    <>
      <p>{JSON.stringify(input)}</p>
      <p>{response}</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto max-w-3xl p-6"
      >
        <input
          className="input_style_001"
          name="email"
          type="email"
          placeholder="email"
          value={input.email}
          onChange={handleChange}
        />
        <input
          className="input_style_001"
          name="password"
          type="password"
          placeholder="password"
          value={input.password}
          onChange={handleChange}
        />
        <button className="btn btn-blue">Submit</button>
      </form>
    </>
  )
}
