import React from "react"
import AddWorkoutExercise from "./AddWorkoutExercise"
import AddSet from "./AddSet"
import EditScheduled from "./editfield/EditScheduled"
import EditNotes from "./editfield/EditNotes"
import { Exercise, User, WorkoutExercise, WorkoutSets } from "@prisma/client"
import ExerciseMenu from "./ExerciseMenu"
import ListSets from "./ListSets2"
import DeleteWorkoutExercise from "./DeleteWorkoutExercise"
import ClearSets from "./ClearSets"
type Props = {
  user: any
  w: any
}

export default function DisplayWorkout({ user, w }: Props) {
  let result = <div>Loading...</div>

  if (user) {
    const exercises = user?.exercises
    let workoutDate = new Date(w.timestamp)
    workoutDate = new Date(workoutDate.getTime() + user.timezone * 60 * 1000)

    result = (
      <>
        <div>
          <p>
            <span>{workoutDate.toString().slice(0, 15)} </span>
            <span>
              <EditScheduled woId={w.id} scheduled={w.scheduled} />
            </span>
          </p>
          <b>Notes:</b>
          <br />
          <div>
            <EditNotes woId={w.id} notes={w.notes} />
          </div>
          <b>Exercises:</b>
          <AddWorkoutExercise workoutId={w.id} user={user} />

          {w.workout_exercise.map((we: any) => {
            return (
              <div key={we.id} className="py-2">
                <ExerciseMenu key={we.id} we={we} user={user} />

                <ListSets sets={we.workout_set} />
              </div>
            )
          })}
        </div>
      </>
    )
  }
  return result
}
