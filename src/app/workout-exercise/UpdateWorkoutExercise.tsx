"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  id: 0,
  exercise_id: 0,
  workout_id: 0,
}

export default function UpdateWorkoutExercise(props: any) {
  const { workoutExercise } = props
  console.log(workoutExercise)
  const [data, setData] = useState(workoutExercise)
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
    const { exercise_id, workout_id, id } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-exercise/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    //console.log(res)

    /*     setData((prevData: any) => ({
      ...prevData,
      workout_id: 0,
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
  //const canSave = true
  console.log(data)
  const content = (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <p className="pb-3">
        <b>UPDATE Workout Exercise</b>
      </p>

      <select name="workout_id" onChange={handleChange} value={data.workout_id}>
        <option value="0">Choose Workout:</option>
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
      <label className="text-2xl mb-1" htmlFor="workout">
        Exercise:
      </label>
      <select
        name="exercise_id"
        onChange={handleChange}
        value={data.exercise_id}
      >
        <option value="0">Choose Exercise:</option>
        {exercises.map((exercise: any) => {
          return (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          )
        })}
      </select>
      <button className="btn btn-blue mt-2" disabled={!canSave}>
        Submit
      </button>
    </form>
  )

  return content
}
