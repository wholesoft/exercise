import React from "react"
import AddWorkoutExercise from "./AddWorkoutExercise"
import { Exercise, User, WorkoutExercise } from "@prisma/client"
type Props = {
  user: User
}

async function getWorkouts() {
  const url = "http://localhost:3000/api/workout?scheduled=Y"
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()

  return data
}

async function getExercises() {
  const url = "http://localhost:3000/api/workout?scheduled=Y"
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()

  return data
}

export default async function NextWorkout({ user }: Props) {
  //const data = await getWorkouts()
  const workouts = user.workouts.filter((w) => w.scheduled === true)
  const exercises = user.exercises

  return (
    <div>
      {workouts.map((row) => {
        let workoutDate = new Date(row.timestamp)
        workoutDate = new Date(
          workoutDate.getTime() + user.timezone * 60 * 1000
        )

        return (
          <div>
            <p>{workoutDate.toString().slice(0, 15)}</p>
            {row.workout_exercise.map((we: WorkoutExercise) => {
              return (
                <>
                  {
                    exercises.filter((e: Exercise) => e.id == we.exercise_id)[0]
                      .name
                  }
                  <br />
                </>
              )
            })}
            <AddWorkoutExercise workoutId={row.id} user={user} />

            <b>Notes:</b>
            <br />
            <p>{row.notes}</p>
          </div>
        )
      })}
    </div>
  )
}
