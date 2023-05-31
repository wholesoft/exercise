import { User, WorkoutExercise } from "@prisma/client"
import React from "react"
import AddSet from "./AddSet"
import ClearSets from "./ClearSets"
import DeleteWorkoutExercise from "./DeleteWorkoutExercise"

type Props = {
  we: WorkoutExercise | any
  user: User | any
}

export default function ExerciseMenu({ we, user }: Props) {
  return (
    <>
      <div className="d-flex">
        {user.exercises.filter((e: any) => e.id == we.exercise_id)[0].name}
        <div className="we-menu">
          {we.workout_set.length > 0 ? (
            <ClearSets weId={we.id} />
          ) : (
            <DeleteWorkoutExercise weId={we.id} />
          )}
        </div>
      </div>
      <AddSet key={we.id} weId={we.id} setNo={we.workout_set.length + 1} />
    </>
  )
}
