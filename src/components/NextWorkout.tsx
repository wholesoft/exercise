import React from "react"
import AddWorkoutExercise from "./AddWorkoutExercise"
import AddSet from "./AddSet"
import EditSetNo from "./editfield/EditSetNo"
import EditReps from "./editfield/EditReps"
import EditWeight from "./editfield/EditWeight"
import EditScheduled from "./editfield/EditScheduled"

import { Exercise, User, WorkoutExercise, WorkoutSets } from "@prisma/client"
type Props = {
  user: User
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
                <>
                  {
                    exercises.filter((e: Exercise) => e.id == we.exercise_id)[0]
                      .name
                  }
                  <div className="row">
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
                  {we.workout_set.map((set: WorkoutSets) => {
                    return (
                      <>
                        <div className="row">
                          <div className="col">
                            <EditSetNo setId={set.id} setNo={set.setno} />
                          </div>

                          <div className="col">
                            <EditWeight setId={set.id} weight={set.weight} />
                            lbs
                          </div>
                          {/*                           <span className="col">{set.weight}lbs</span>
                           */}
                          <div className="col">
                            <EditReps setId={set.id} reps={set.reps} />
                          </div>
                        </div>
                      </>
                    )
                  })}

                  <br />
                </>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
