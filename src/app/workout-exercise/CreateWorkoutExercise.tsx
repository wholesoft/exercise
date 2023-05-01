"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  workout_id: 0,
  exercise_id: 0,
}

export default function CreateWorkoutExercise() {
  const [data, setData] = useState(initState)
  const router = useRouter()
  const userId = 1
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])
  const [dataLodaded, setDataLodaded] = useState(false)

  const getData = async () => {
    const url = `http://localhost:3000/api/user/${userId}`
    console.log(url)
    const res = await fetch(url, {
      cache: "no-store",
    })
    const data = await res.json()
    console.log(data.workouts)
    setWorkouts(data.workouts)
    setExercises(data.exercises)
    setDataLodaded(true)
    return { success: true, data: data.workouts }
  }

  useEffect(() => {
    console.log("USE EFFECT")

    getData()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
    let { workout_id, exercise_id } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-exercise", {
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
    setData((prevData) => ({
      ...prevData,
      workout_id: 0,
      exercise_id: 0,
    }))
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

  const content = dataLodaded ? (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <h3 className="text-2xl mb-4">Add Workout Exercise</h3>

      <select
        className="select_style_001"
        name="workout_id"
        onChange={handleChange}
      >
        <option value="0">Choose Workout</option>
        {workouts.map((workout: any) => {
          return (
            <option key={workout.id} value={workout.id}>
              {new Date(workout.timestamp).toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </option>
          )
        })}
      </select>
      <select
        className="select_style_001 mt-3"
        name="exercise_id"
        onChange={handleChange}
      >
        <option value="0">Choose Exercise</option>
        {exercises.map((exercise: any) => {
          return (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          )
        })}
      </select>
      <button className="btn btn-blue mt-3" disabled={!canSave}>
        Submit
      </button>
    </form>
  ) : (
    <p>Loading...</p>
  )

  return content
}
