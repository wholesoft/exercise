"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

type Props = {
  user: User
  workoutId: number
}

const initState = {
  exercise: "",
  newExercise: "",
}

export default function CreateWorkoutExercise({ user, workoutId }: Props) {
  const [input, setInput] = useState(initState)
  const router = useRouter()
  const userId = user.id

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let { exercise, newExercise } = input
    let exercise_id = exercise
    if (exercise === "other") {
      // create it and get the id
      const res = await fetch("http://localhost:3000/api/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newExercise, user_id: userId }),
      })
      console.log("RESULT FROM ADDING EXERCISE")
      const result = await res.json()
      console.log(result)
      exercise_id = result.id
    }

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/workout-exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercise_id: +exercise_id,
        workout_id: workoutId,
      }),
    })
    console.log(res)
    //const result = await res.json()
    //console.log(result)

    // Navigate to thank you
    //router.push(`/thank-you/`)
    setInput((prevData) => ({
      ...prevData,
      exercise: "",
      newExercise: "",
    }))
    router.refresh()
  }

  const handleChange = (e: ChangeEvent<any>) => {
    const name = e.target.name

    setInput((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }))
  }

  const content = user ? (
    <form onSubmit={handleSubmit}>
      <select
        className="form-select"
        name="exercise"
        onChange={handleChange}
        value={input.exercise}
      >
        <option value="0">Choose Exercise</option>
        {user.exercises?.map((exercise: any) => {
          return (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          )
        })}
        <option value="other">Other</option>
      </select>
      <input
        style={input.exercise !== "other" ? { display: "none" } : {}}
        type="text"
        name="newExercise"
        id="newExercise"
        value={input.newExercise}
        onChange={handleChange}
        placeholder=""
      />
      <button className="btn btn-primary ms-2 pt-0 pb-0">Add</button>
    </form>
  ) : (
    <p>Loading...</p>
  )

  return content
}
