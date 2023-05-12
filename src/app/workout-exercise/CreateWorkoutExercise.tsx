"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

type Props = {
  workoutId: number
}

const initState = {
  exercise_id: 0,
}

export default function CreateWorkoutExercise({ workoutId }: Props) {
  const [data, setData] = useState(initState)
  const router = useRouter()
  const userId = 1
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
    let { exercise_id } = data

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exercise_id, workout_id: workoutId }),
    })
    console.log(res)
    //const result = await res.json()
    //console.log(result)

    // Navigate to thank you
    //router.push(`/thank-you/`)
    setData((prevData) => ({
      ...prevData,
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

  const content = dataLodaded ? (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto max-w-3xl p-6"
    >
      <select
        className="select_style_001 mt-2"
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
      <button className="btn btn-primary ms-2 pt-0 pb-0">Add</button>
    </form>
  ) : (
    <p>Loading...</p>
  )

  return content
}
