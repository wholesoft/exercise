import { Exercise, User } from "@prisma/client"
import React from "react"
import DeleteUserExercise from "./DeleteUserExercise"
import DeactivateUserExercise from "./DeactivateUserExercise"
import EditUserExercise from "./editfield/EditUserExercise"

type Props = {
  exercise: Exercise | any
}

// Find All the Workout Exercises with the exercise id
//let url = `/api/workout-exercise?exerciseId=exercise.id`

async function countWorkoutsWithExercise(exerciseId: number) {
  const url = `${process.env.APP_URL}/api/workout-exercise?exerciseId=${exerciseId}`
  //console.log(url)
  const res = await fetch(url, {
    cache: "no-store",
  })

  const data = await res.json()
  //console.log("fetch results")
  //console.log(data.length)
  return data.length
}

// If it is 0 we can show the Delete icon
// Otherwise we can show the Decativate icon

export default async function ShowExercise({ exercise }: Props) {
  const nWorkouts = await countWorkoutsWithExercise(exercise.id)

  return (
    <div>
      <EditUserExercise id={exercise.id} name={exercise.name} />
      {nWorkouts === 0 ? (
        <DeleteUserExercise id={exercise.id} />
      ) : (
        <DeactivateUserExercise id={exercise.id} />
      )}
    </div>
  )
}
