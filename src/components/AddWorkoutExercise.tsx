import React from "react"
import CreateWorkoutExercise from "./CreateWorkoutExercise"
import { User } from "@prisma/client"

type Props = {
  user: User
  workoutId: number
}

export default function AddWorkoutExercise({ workoutId, user }: Props) {
  //const workout = user.workouts.filter((w) => w.id == workoutId)

  return (
    <div>
      <CreateWorkoutExercise user={user} workoutId={workoutId} />
    </div>
  )
}
