import React from "react"
import Link from "next/link"

type Props = {
  params: {
    id: string
  }
}

async function getExercise(id: string) {
  const url = `http://localhost:3000/api/exercise/${id}`
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

export default async function ExercisePage({ params: { id } }: Props) {
  console.log(id)
  const data = await getExercise(id)
  return (
    <>
      <h1>Exercise</h1>
      <div>
        <h2>{data.name}</h2>
        <p>{data.user_id}</p>
        <p>{data.created}</p>
      </div>
    </>
  )
}
