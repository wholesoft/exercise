import React from "react"
import Link from "next/link"
import CreateWorkout from "./CreateWorkout"
import DeleteWorkout from "./DeleteWorkout"
import { timeStamp } from "console"

type Props = {}

async function getWorkouts() {
  const url = "http://localhost:3000/api/workout"
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch all exercises")
  //console.log(data)
  return data
}

export default async function WorkoutsPage({}: Props) {
  const workouts = await getWorkouts()
  return (
    <div>
      <h1>Workouts</h1>
      <div>
        {workouts?.map((workout: any) => {
          return <Workout key={workout.id} workout={workout} />
        })}
      </div>
      <CreateWorkout />
    </div>
  )
}

function Workout({ workout }: any) {
  const { id, user_id, timestamp, notes, created, updated } = workout || {}
  return (
    <div className="flex">
      <Link href={`/workout/${id}`}>
        <span>{timestamp}</span>
      </Link>

      {/* <DeleteWorkout workout={workout} /> */}
    </div>
  )
}
