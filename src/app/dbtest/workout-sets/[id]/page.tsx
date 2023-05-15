import React from "react"
import Link from "next/link"
import UpdateSet from "../UpdateWorkoutSet"

type Props = {
  params: {
    id: string
  }
}

async function getWorkoutSet(id: string) {
  const url = `http://localhost:3000/api/workout-sets/${id}`
  console.log(url)
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

export default async function WorkoutSetPage({ params: { id } }: Props) {
  console.log(id)
  const data = await getWorkoutSet(id)
  return (
    <>
      <h1>Sets</h1>
      <div>
        <p>ID: {data.id}</p>
        <p>Set No: {data.setno}</p>
        <p>Reps: {data.reps}</p>
        <p>Weight: {data.weight}</p>
        <p>Updated: {data.update}</p>
        <p>Created: {data.created}</p>
      </div>
      <UpdateSet set={data} />
    </>
  )
}
