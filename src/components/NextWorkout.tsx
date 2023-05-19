import React from "react"
import AddWorkoutExercise from "./AddWorkoutExercise"
import AddSet from "./AddSet"

import EditScheduled from "./editfield/EditScheduled"

import { Exercise, User, WorkoutExercise, WorkoutSets } from "@prisma/client"
import ListSets from "./ListSets"
type Props = {
  user: User
}

export default function NextWorkout({ user }: Props) {
  //const data = await getWorkouts()

  let result = <div>Loading...</div>

  if (user) {
    const workouts = user?.workouts?.filter((w) => w.scheduled === true)
    const exercises = user?.exercises

    result = (
      <>
        {workouts?.map((row) => {
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
              <p>{row.notes}</p>
              <b>Exercises:</b>
              <AddWorkoutExercise workoutId={row.id} user={user} />
              {row.workout_exercise.map((we: WorkoutExercise) => {
                return (
                  <div key={we.id}>
                    {
                      exercises.filter(
                        (e: Exercise) => e.id == we.exercise_id
                      )[0].name
                    }
                    <div className="row" key={we.id}>
                      <span className="col">
                        Set #
                        <AddSet
                          key={we.id}
                          weId={we.id}
                          setNo={we.workout_set.length + 1}
                        />
                      </span>
                      <span className="col">Weight</span>
                      <span className="col">Reps</span>
                    </div>
                    <ListSets sets={we.workout_set} />

                    <br />
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
