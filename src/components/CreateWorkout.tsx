"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Form } from "react-bootstrap"
import { User } from "@prisma/client"

let initDate = new Date()
const offset = initDate.getTimezoneOffset()
let initLocalDate = new Date(initDate.getTime() - offset * 60 * 1000)

type Props = {
  user: User
}

export default function CreateWorkout({ user }: Props) {
  //console.log(user)
  //console.log(user.id)
  const initState = {
    notes: "",
    user_id: user.id,
    timestamp: initLocalDate,
    scheduled: false,
  }

  const [data, setData] = useState(initState)
  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { user_id, timestamp, notes, scheduled } = data

    // Send data to API route
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/workout`, {
      method: "POST",
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
    setData(initState)
    setStep(1)
    router.refresh()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }))
  }

  const scheduleWorkout = () => {
    setData((prevData) => ({
      ...prevData,
      scheduled: true,
    }))

    setStep(3)
  }

  const handleDateChange = (value: any) => {
    setData((prevData) => ({
      ...prevData,
      timestamp: new Date(value),
    }))

    setStep(3)
  }

  const canSave = [...Object.values(data)].every(Boolean)

  let content = <></>

  if (step === 1) {
    content = (
      <div>
        <i className="bi bi-plus-circle fs-3" onClick={() => setStep(2)}></i>
        {/*         <button className="btn btn-primary" onClick={() => setStep(2)}>
          Add New Workout
        </button> */}
      </div>
    )
  }

  if (step === 2) {
    content = (
      <div>
        <button className="btn btn-primary" onClick={() => setStep(3)}>
          Add Completed Workout
        </button>
        <button className="btn btn-primary ms-3" onClick={scheduleWorkout}>
          Schedule Workout
        </button>
      </div>
    )
  }

  if (step === 3) {
    content = (
      <div>
        <p style={{ display: "none" }}>{JSON.stringify(data)}</p>
        <form onSubmit={handleSubmit}>
          <h4>Create Workout</h4>
          <Form.Group controlId="wodate">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              style={{ width: "150px" }}
              type="date"
              name="timestamp"
              placeholder="Workout Date"
              value={data.timestamp.toISOString().slice(0, 10)}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </Form.Group>
          <div className="form-group mt-2">
            <Form.Label style={{ display: "block" }}>Notes</Form.Label>
            <textarea
              className="form_control"
              id="notes"
              name="notes"
              value={data.notes}
              onChange={handleChange}
              rows={3}
              cols={60}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }

  return content
}
