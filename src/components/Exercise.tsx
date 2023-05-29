import { Exercise } from "@prisma/client"
import React from "react"
import DeleteUserExercise from "./DeleteUserExercise"
import EditUserExercise from "./editfield/EditUserExercise"

type Props = {
  exercise: Exercise
}

export default function Exercise({ exercise }: Props) {
  return (
    <div>
      <EditUserExercise id={exercise.id} name={exercise.name} />
      <DeleteUserExercise id={exercise.id} />
    </div>
  )
}
