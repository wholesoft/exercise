"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
/* import { useAuth } from "../../../hooks/useAuth" */
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

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
  /*   const { setAuth, persist, setPersist } = useAuth() */
  const [response, setResponse] = useState("")
  const router = useRouter()

  /*   console.log(searchParams)
  const fromUrl = searchParams?.from */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: true,
      callbackUrl: "/",
    })
    console.log(result)
  }

  return (
    <div>
      <p>{response}</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
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

        <button className="btn btn-primary">Submit</button>
      </form>
      <div className="mt-2">
        <Link href="/auth/forgot" prefetch={false}>
          Forgot Password?
        </Link>
        <Link className="ms-3" href="/auth/register" prefetch={false}>
          Register
        </Link>
      </div>
    </div>
  )
}
