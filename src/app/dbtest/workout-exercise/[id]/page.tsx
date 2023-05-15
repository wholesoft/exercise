import React from "react"
import Link from "next/link"
import UpdateWorkoutExercise from "../UpdateWorkoutExercise"

type Props = {
  params: {
    id: string
  }
}

async function getWorkoutExercise(id: string) {
  const url = `http://localhost:3000/api/workout-exercise/${id}`
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

export default async function WorkoutExercisePage({ params: { id } }: Props) {
  console.log(id)
  const data = await getWorkoutExercise(id)
  return (
    <>
      <h1>Workout Exercise</h1>
      <div>
        <h2>{data.id}</h2>
        <p>{data.workout_id}</p>
        <p>{data.exercise_id}</p>
        <p>{data.update}</p>
        <p>{data.created}</p>
      </div>
      <UpdateWorkoutExercise workoutExercise={data} />
    </>
  )
}
