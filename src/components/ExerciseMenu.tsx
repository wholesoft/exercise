"use client"

import { User, WorkoutExercise } from "@prisma/client"
import React from "react"
import { useState } from "react"
import AddSet from "./AddSet"
import ClearSets from "./ClearSets"
import DeleteWorkoutExercise from "./DeleteWorkoutExercise"
import CreateWorkoutSet from "./CreateWorkoutSet2"

type Props = {
  we: WorkoutExercise | any
  user: User | any
}

export default function ExerciseMenu({ we, user }: Props) {
  const [addingSet, setAddingSet] = useState(false)

  return (
    <>
      <div className="d-flex">
        {user.exercises.filter((e: any) => e.id == we.exercise_id)[0].name}
        <div className="we-menu">
          {addingSet === false ? (
            <div className="rounded-button-container" style={{ width: "70px" }}>
              <span
                className="rounded-button"
                onClick={() => setAddingSet(true)}
              >
                <i className="bi-plus bs-icon"></i>
                <span className="bs-icon-label">Add Set</span>
              </span>
            </div>
          ) : null}

          {we.workout_set.length > 0 ? (
            <ClearSets weId={we.id} />
          ) : (
            <DeleteWorkoutExercise weId={we.id} />
          )}
        </div>
      </div>
      {addingSet === true ? (
        <div>
          <CreateWorkoutSet
            weId={we.id}
            setNo={we.workout_set.length + 1}
            setAddingSet={setAddingSet}
          />
        </div>
      ) : null}
    </>
  )
}
