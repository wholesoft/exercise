"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

type Props = {
  weId: number
  setNo: number
  setStep: any
}

export default function CreateWorkoutSet({ weId, setNo, setStep }: Props) {
  const [data, setData] = useState({ weId, setNo, weight: 0, reps: 0 })
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { weId, setNo, reps, weight } = data

    // Send data to API route
    const res = await fetch(`${process.env.APP_URL}/api/workout-sets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ we_id: weId, setno: setNo, reps, weight }),
    })
    console.log(res)

    setData((prevData) => ({
      ...prevData,
      setNo: prevData.setNo + 1,
    }))
    setStep(1)
    router.refresh()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name

    setData((prevData) => ({
      ...prevData,
      [name]: parseInt(e.target.value),
    }))
  }

  const canSave = [...Object.values(data)].every(Boolean)

  const content = (
    <form onSubmit={handleSubmit}>
      {/* <div className="container"> */}
      <div className="row">
        <div className="col">
          <label htmlFor="setNo" className="form-label">
            Set #
          </label>

          <input
            className="form-control"
            type="text"
            id="setNo"
            name="setNo"
            placeholder="Set"
            value={`${data.setNo}`}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="col">
          <label htmlFor="weight" className="form-label">
            Weight
          </label>

          <input
            className="form-control"
            type="text"
            id="weight"
            name="weight"
            placeholder="Weight"
            value={`${data.weight}`}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="col">
          <label htmlFor="reps" className="form-label">
            Reps
          </label>

          <input
            className="form-control"
            type="text"
            id="reps"
            name="reps"
            placeholder="Reps"
            value={data.reps}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="col d-flex align-items-end">
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
      {/* </div> */}
    </form>
  )

  return content
}
