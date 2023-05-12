import React from "react"
import CreateWorkoutExercise from "../app/workout-exercise/CreateWorkoutExercise"
import { User } from "@prisma/client"

type Props = {
  user: User
  workoutId: number
}

export default function AddWorkoutExercise({ workoutId, user }: Props) {
  //const workout = user.workouts.filter((w) => w.id == workoutId)

  return (
    <div>
      <CreateWorkoutExercise workoutId={workoutId} />
    </div>
  )
}
