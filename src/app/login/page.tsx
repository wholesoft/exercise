"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useRouter } from "next/navigation"

type Props = {}

const initState = {
  email: "",
  password: "",
  app: "strength.wholesoft.net",
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [input, setInput] = useState(initState)
  const { setAuth, persist, setPersist } = useAuth()
  const [response, setResponse] = useState("")
  const router = useRouter()

  console.log(searchParams)
  const fromUrl = searchParams?.from

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const togglePersist = () => {
    setPersist((prev) => !prev)
  }

  useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(input))

    // Send data to API route
    // {email: "", password: ""}
    //  'Access-Control-Allow-Origin' header is present on the requested resource. I

    const res = await fetch("http://localhost:3456/login", {
      method: "POST",
      credentials: "include", //--> send/receive cookies
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(input),
    })
    console.log(res)
    const result = await res.json()
    if (result.success == true) {
      const { access_token, roles, email_confirmed, user_id, email } = result
      setResponse(`${email} (${user_id})`)
      //localStorage.setItem("atoken", access_token)
      if (fromUrl !== null) {
        router.push(fromUrl)
      }
    } else {
      setResponse(result.message)
    }

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
        <div>
          <input
            id="persist"
            type="checkbox"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">&nbsp;Trust this device</label>
        </div>
        <button className="btn btn-blue">Submit</button>
      </form>
    </>
  )
}
