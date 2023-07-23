import { Exercise, User } from "@prisma/client"
import React from "react"
import DeleteUserExercise from "./DeleteUserExercise"
import DeactivateUserExercise from "./DeactivateUserExercise"
import EditUserExercise from "./editfield/EditUserExercise"

type Props = {
  exercise: Exercise | any
  session: any
}

// Find All the Workout Exercises with the exercise id
//let url = `/api/workout-exercise?exerciseId=exercise.id`

async function countWorkoutsWithExercise(exerciseId: number, atoken: string) {
  const url = `${process.env.APP_URL}/api/workout-exercise?exerciseId=${exerciseId}`
  //console.log(url)
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${atoken}` },
    cache: "no-store",
  })

  const data = await res.json()
  console.log(data)
  console.log("fetch results")
  console.log(data.length)
  return data.length
}

// If it is 0 we can show the Delete icon
// Otherwise we can show the Decativate icon

export default async function ShowExercise({ exercise, session }: Props) {
  let atoken = ""
  if (session != null) {
    if (session.user != null) {
      atoken = session.user.accessToken
    }
  }

  const nWorkouts = await countWorkoutsWithExercise(exercise.id, atoken)

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
