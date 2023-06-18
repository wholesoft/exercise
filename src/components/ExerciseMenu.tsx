"use client"

import { User, WorkoutExercise } from "@prisma/client"
import React from "react"
import { useState } from "react"
import ClearSets from "./ClearSets"
import DeleteWorkoutExercise from "./DeleteWorkoutExercise"
import CreateWorkoutSet from "./CreateWorkoutSet"

type Props = {
  we: WorkoutExercise | any
  user: User | any
  editMode: boolean
}

export default function ExerciseMenu({ we, user, editMode }: Props) {
  const [addingSet, setAddingSet] = useState(false)

  return (
    <>
      <div>
        <h4>
          {user.exercises.filter((e: any) => e.id == we.exercise_id)[0].name}
        </h4>
        {editMode == true ? (
          <div className="we-menu">
            {addingSet === false ? (
              <div
                className="rounded-button-container"
                style={{ width: "70px" }}
              >
                <span
                  className="rounded-button"
                  style={{ width: "63px" }}
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
        ) : null}
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
