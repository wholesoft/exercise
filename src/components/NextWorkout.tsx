import React from "react"
import AddWorkoutExercise from "./AddWorkoutExercise"
import AddSet from "./AddSet"
import EditScheduled from "./editfield/EditScheduled"
import EditNotes from "./editfield/EditNotes"
import { Exercise, User, WorkoutExercise, WorkoutSets } from "@prisma/client"

import ListSets from "./ListSets2"
import DeleteWorkoutExercise from "./DeleteWorkoutExercise"
import ClearSets from "./ClearSets"
type Props = {
  user: any
}

export default function NextWorkout({ user }: Props) {
  //const data = await getWorkouts()

  let result = <div>Loading...</div>

  if (user) {
    const workouts = user?.workouts?.filter((w: any) => w.scheduled === true)
    const exercises = user?.exercises

    result = (
      <>
        {workouts?.map((row: any) => {
          let workoutDate = new Date(row.timestamp)
          workoutDate = new Date(
            workoutDate.getTime() + user.timezone * 60 * 1000
          )

          return (
            <div key={row.id}>
              <p>
                <span>{workoutDate.toString().slice(0, 15)} </span>
                <span>
                  <EditScheduled woId={row.id} scheduled={row.scheduled} />
                </span>
              </p>
              <b>Notes:</b>
              <br />
              <div>
                <EditNotes woId={row.id} notes={row.notes} />
              </div>
              <b>Exercises:</b>
              <AddWorkoutExercise workoutId={row.id} user={user} />

              {row.workout_exercise.map((we: any) => {
                return (
                  <div key={we.id} className="py-2">
                    <div className="d-flex">
                      {
                        exercises.filter(
                          (e: Exercise) => e.id == we.exercise_id
                        )[0].name
                      }
                      <div className="we-menu">
                        <AddSet
                          key={we.id}
                          weId={we.id}
                          setNo={we.workout_set.length + 1}
                        />
                        {we.workout_set.length > 0 ? (
                          <ClearSets weId={we.id} />
                        ) : (
                          <DeleteWorkoutExercise weId={we.id} />
                        )}
                      </div>
                    </div>
                    <ListSets sets={we.workout_set} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </>
    )
  }
  return result
}
