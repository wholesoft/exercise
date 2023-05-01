"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  setno: 0,
  reps: 0,
  weight: 0,
  id: 0,
  we_id: 0,
}

export default function UpdateSet(props: any) {
  const { set } = props

  const [data, setData] = useState(set)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { setno, reps, weight, we_id, id } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-sets/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(res)
    //const result = await res.json()
    //console.log(result)

    // Navigate to thank you
    //router.push(`/thank-you/`)
    /*     setData((prevData: any) => ({
      ...prevData,
      name: "",
    })) */
    router.refresh()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name

    setData((prevData: any) => ({
      ...prevData,
      [name]: parseInt(e.target.value),
    }))
  }

  const canSave = [...Object.values(data)].every(Boolean)

  const content = (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <p className="pb-3">
        <b>UPDATE Set</b>
      </p>

      <div>
        <label htmlFor="setno">Set No</label>
        <input
          className="input_style_001"
          type="text"
          id="setno"
          name="setno"
          placeholder="Set #"
          value={data.setno}
          onChange={handleChange}
          autoFocus
        />
      </div>

      <div className="mt-2">
        <label htmlFor="weight">Weight</label>
        <input
          className="input_style_001"
          type="text"
          id="weight"
          name="weight"
          placeholder="Weight"
          value={data.weight}
          onChange={handleChange}
          autoFocus
        />
      </div>

      <div className="mt-2">
        <label htmlFor="weight">Reps</label>
        <input
          className="input_style_001"
          type="text"
          id="reps"
          name="reps"
          placeholder="Reps"
          value={data.reps}
          onChange={handleChange}
          autoFocus
        />
      </div>

      <button className="btn btn-blue mt-3" disabled={!canSave}>
        Submit
      </button>
    </form>
  )

  return content
}
