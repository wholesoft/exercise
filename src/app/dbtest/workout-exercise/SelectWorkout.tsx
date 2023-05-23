import { Workout } from "@prisma/client"
import React from "react"

type Props = {
  userId: number
  handleChange: any
}

async function getWorkouts(userId: number) {
  const url = `http://localhost:3000/api/user/${userId}`
  console.log(url)
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  console.log(data.workouts)
  return data.workouts
}

export default async function SelectWorkout({ userId, handleChange }: Props) {
  const workouts = await getWorkouts(userId)

  return workouts ? (
    <>
      <p>{JSON.stringify(workouts)}</p>
      <p>{workouts.length}</p>
      <select onChange={handleChange}>
        {workouts.map((workout: any) => {
          return <option key={workout.id}>{workout.timestamp}</option>
        })}
      </select>
    </>
  ) : (
    <p>Loading...</p>
  )
}
