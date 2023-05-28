"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

type Props = {
  user: any
  workoutId: number
}

const initState = {
  exercise: "",
  newExercise: "",
}

export default function AddWorkoutExercise({ user, workoutId }: Props) {
  const [step, setStep] = useState(1)
  const [input, setInput] = useState(initState)
  const router = useRouter()
  const userId = user.id

  const saveExercise = async (justSelectedExercise: string) => {
    //e.preventDefault()

    console.log("LET'S GO")
    let { exercise, newExercise } = input
    let exerciseId = exercise

    if (justSelectedExercise != "") {
      exerciseId = justSelectedExercise
    }

    if (exercise === "other") {
      console.log("ADD OTHER")
      // create it and get the id
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/exercise`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newExercise, user_id: userId }),
        }
      )
      console.log("RESULT FROM ADDING EXERCISE")
      const result = await res.json()
      console.log(result)
      exerciseId = result.id
    }

    // Send data to API route
    console.log(input)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/workout-exercise`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exercise_id: +exerciseId,
          workout_id: workoutId,
        }),
      }
    )
    console.log(res)

    setInput((prevData) => ({
      ...prevData,
      exercise: "",
      newExercise: "",
    }))
    setStep(1)
    router.refresh()
  }

  const handleChange = (e: ChangeEvent<any>) => {
    const name = e.target.name

    setInput((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }))

    if (name === "exercise" && e.target.value !== "other") {
      saveExercise(e.target.value)
    }
  }

  const content = user ? (
    <>
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
      <div
        className="py-2"
        style={
          input.exercise !== "other"
            ? { display: "none" }
            : { display: "flex", alignItems: "center" }
        }
      >
        <b>Other:</b>
        <input
          className="ms-2 form-control"
          type="text"
          name="newExercise"
          id="newExercise"
          value={input.newExercise}
          onChange={handleChange}
          placeholder=""
        />
        <button
          className="btn btn-primary ms-1"
          onClick={() => saveExercise("")}
        >
          Save
        </button>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  )

  return step === 1 ? (
    <div
      className="rounded-button-container"
      style={{ display: "inline-block" }}
    >
      <span className="rounded-button" onClick={() => setStep(2)}>
        <i className="bi-plus bs-icon"></i>
        <span className="bs-icon-label">Add Exercise</span>
      </span>
    </div>
  ) : (
    content
  )
}
