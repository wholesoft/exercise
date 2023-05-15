import React from "react"
import Link from "next/link"
import UpdateWorkout from "../UpdateWorkout"

type Props = {
  params: {
    id: string
  }
}

async function getWorkout(id: string) {
  const url = `http://localhost:3000/api/workout/${id}`
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

export default async function WorkoutPage({ params: { id } }: Props) {
  console.log(id)
  const data = await getWorkout(id)
  return (
    <>
      <h1>Workout</h1>
      <div>
        <h2>{data.id}</h2>
        <p>{data.timestamp}</p>
        <p>{data.notes}</p>
        <p>{data.update}</p>
        <p>{data.created}</p>
      </div>
      <UpdateWorkout workout={data} />
    </>
  )
}
