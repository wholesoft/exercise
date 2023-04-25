import React from "react"
import Link from "next/link"

type Props = {}

async function getExercises() {
  const url = "http://localhost:3000/api/exercise"
  const res = await fetch(url)
  const data = await res.json()
  console.log("fetch results")
  console.log(data)
  return data
}

export default async function ExercisePage({}: Props) {
  const exercises = await getExercises()
  return (
    <>
      <h1>Exercises</h1>
      <div>
        {exercises?.map((exercise) => {
          return <Exercise key={exercise.id} exercise={exercise} />
        })}
      </div>
    </>
  )
}

function Exercise({ exercise }: any) {
  const { id, name, created } = exercise || {}
  return (
    <Link href={`/exercise/${id}`}>
      <div>
        <h2>{name}</h2>
        <p>{created}</p>
      </div>
    </Link>
  )
}
