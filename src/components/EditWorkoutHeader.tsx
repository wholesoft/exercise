"use client"

import { useState, FormEvent, ChangeEvent, useEffect } from "react"
import { useRouter } from "next/navigation"

type Props = {
  user: any
  w: any
  editMode: boolean
}

function parseBool(val: any) {
  return val === true || val === "true"
}

export default function EditWorkoutHeader({ user, w, editMode }: Props) {
  const { id, timestamp, scheduled, notes } = w
  const [data, setData] = useState({ id, timestamp, scheduled, notes })
  const router = useRouter()

  useEffect(() => {
    setData({ id, timestamp, scheduled, notes })
  }, [w])

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    const { timestamp, notes, scheduled, id } = data

    // Send data to API route
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/workout/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            notes,
            timestamp: new Date(timestamp),
            scheduled: parseBool(scheduled),
          }),
        }
      )
      //console.log(res)
    } catch (e) {
      console.log("Error.")
    }
    console.log("BACK")
    //console.log(res)

    /*     setData((prevData: any) => ({
      ...prevData,
      notes: "",
    })) */
    router.refresh()
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const name = e.target.name

    setData((prevData: any) => ({
      ...prevData,
      [name]: e.target.value,
    }))
  }

  let workoutDate = new Date(w.timestamp)
  var offset = workoutDate.getTimezoneOffset()
  workoutDate.setTime(workoutDate.getTime() + offset * 60 * 1000)

  return editMode ? (
    <div>
      <div className="row">
        <div className="col-auto">
          {/* <h3>Workout</h3> */}
          <input
            className="form-control"
            type="date"
            id="timestamp"
            name="timestamp"
            value={data.timestamp.toString().slice(0, 10)}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          {/* <h3>&nbsp;</h3> */}
          <select
            className="form-select"
            name="scheduled"
            id="scheduled"
            onChange={handleChange}
            value={data.scheduled?.toString()}
          >
            <option value="true">Scheduled</option>
            <option value="false">Completed</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4 style={{ marginTop: "6px" }}>Notes</h4>
          <textarea
            className="form-control h-75"
            rows={7}
            id="notes"
            name="notes"
            placeholder=""
            value={data.notes}
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            className="btn btn-primary mt-1 mb-2 pt-0 pb-0"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      {/* <h3>Workout</h3> */}
      <span>{workoutDate.toString().slice(0, 15)}</span>
      <span className="ms-2 me-2">&mdash;</span>
      {w.scheduled ? <em>Scheduled</em> : <em>Completed</em>}

      <h4 style={{ marginTop: "6px" }}>Notes</h4>
      <span>{w.notes}</span>
    </div>
  )
}
