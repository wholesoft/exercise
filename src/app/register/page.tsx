"use client"

import { useState, FormEvent, ChangeEvent } from "react"

type Props = {}

const initState = {
  email: "",
  password: "",
  confirm_password: "",
  app: "strength",
}

export default function LoginPage({}: Props) {
  const [input, setInput] = useState(initState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(input))

    /*
app.post("/register", async (req, res) => {
  const { email, password, confirm_password, app } = req.body
  const result = await create_user(req.body)
  res.send(result)
})
*/

    const res = await fetch("http://localhost:3456/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
    console.log(res)
    const result = await res.json()
    console.log(result)

    // Navigate to thank you
    //router.push(`/thank-you/`)
    setInput(initState)
  }

  return (
    <>
      <p>{JSON.stringify(input)}</p>
      <h3>Register</h3>
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
        <input
          className="input_style_001"
          name="confirm_password"
          type="password"
          placeholder="password"
          value={input.confirm_password}
          onChange={handleChange}
        />
        <button className="btn btn-blue">Submit</button>
      </form>
    </>
  )
}
