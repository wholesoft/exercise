import React from "react"
import EditScheduled from "./editfield/EditScheduled"
import EditNotes from "./editfield/EditNotes"

type Props = {
  user: any
  w: any
  editMode: boolean
}

export default function WorkoutHeader({ user, w, editMode }: Props) {
  let workoutDate = new Date(w.timestamp)
  workoutDate = new Date(workoutDate.getTime() + user.timezone * 60 * 1000)
  return (
    <>
      <span>{workoutDate.toString().slice(0, 15)}</span>
      <br />
      <span>
        <EditScheduled
          woId={w.id}
          scheduled={w.scheduled}
          editMode={editMode}
        />
      </span>

      <br />
      <h4>Notes:</h4>
      <br />
      <div>
        <EditNotes woId={w.id} notes={w.notes} />
      </div>
    </>
  )
}
