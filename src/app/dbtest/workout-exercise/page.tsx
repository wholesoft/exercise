import React from "react"
import Link from "next/link"
import CreateWorkoutExercise from "../../../components/CreateWorkoutExercise"
import DeleteWorkoutExercise from "./DeleteWorkoutExercise"
import { timeStamp } from "console"

type Props = {}

async function getWorkoutExercises() {
  const url = "http://localhost:3000/api/workout-exercise"
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch all exercises")
  //console.log(data)
  return data
}

export default async function WorkoutExercisePage({}: Props) {
  const workoutExercises = await getWorkoutExercises()
  return (
    <div>
      <h1>Workout Exercises</h1>
      <div>
        {workoutExercises?.map((workoutExercise: any) => {
          return (
            <WorkoutExercise
              key={workoutExercise.id}
              workoutExercise={workoutExercise}
            />
          )
        })}
      </div>
      {/*     <CreateWorkoutExercise /> */}
    </div>
  )
}

function WorkoutExercise({ workoutExercise }: any) {
  const { id, workout_id, exercise_id, created, updated } =
    workoutExercise || {}
  return (
    <div className="flex">
      <Link href={`/workout-exercise/${id}`}>
        <span>
          Workout ID: {workout_id}, Exercise ID: {exercise_id}
        </span>
      </Link>

      <DeleteWorkoutExercise workoutExercise={workoutExercise} />
    </div>
  )
}
