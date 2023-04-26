"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

export default function CreateExercise() {
  const [name, setName] = useState("")
  const user_id = 1

  const router = useRouter()

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = { user_id, name }
    console.log(data)
    const res = await fetch("http://localhost:3000/api/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      },
    })
    //const result = await res.json()
    console.log(res)
    setName("")
  }

  return (
    <form onSubmit={create}>
      <h3>Create a new exercise</h3>
      <input
        className="p-3 mb-6 text-2xl rounded-2xl text-black"
        type="text"
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
        type="submit"
      >
        Save
      </button>
    </form>
  )
}
