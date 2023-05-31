import React from "react"
import DisplayWorkout from "./DisplayWorkout"
type Props = {
  user: any
}

export default function ListWorkouts({ user }: Props) {
  return (
    <div>
      {user.workouts.map((w: any) => {
        return (
          <div>
            {w.id} - {w.timestamp.toString().slice(0, 10)}
            <br />
            <DisplayWorkout w={w} user={user} />
          </div>
        )
      })}
    </div>
  )
}
