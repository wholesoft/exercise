import React from "react"
import AddWorkoutExercise from "./AddWorkoutExercise"
import ExerciseMenu from "./ExerciseMenu"
import ListSets from "./ListSets2"
import EditWorkoutHeader from "./EditWorkoutHeader"

type Props = {
  user: any
  w: any
  editMode: boolean
}

export default function DisplayWorkout({ user, w, editMode }: Props) {
  const result = (
    <>
      <div className="workout row">
        <div className="col">
          <EditWorkoutHeader user={user} w={w} editMode={editMode} />
        </div>
        <div className="col">
          {editMode === true ? (
            <AddWorkoutExercise workoutId={w.id} user={user} />
          ) : null}

          {w.workout_exercise.map((we: any) => {
            return (
              <div key={we.id} className="py-2">
                <ExerciseMenu
                  key={we.id}
                  we={we}
                  user={user}
                  editMode={editMode}
                />

                <ListSets sets={we.workout_set} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )

  return result
}
