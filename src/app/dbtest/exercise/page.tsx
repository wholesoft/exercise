import React from "react"
import Link from "next/link"
import CreateExercise from "./CreateExercise"
import DeleteExercise from "./DeleteExercise"

type Props = {}

async function getExercises() {
  const url = "http://localhost:3000/api/exercise"
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch all exercises")
  //console.log(data)
  return data
}

export default async function ExercisePage({}: Props) {
  const exercises = await getExercises()
  return (
    <>
      <h1>Exercises</h1>
      <div>
        {exercises?.map((exercise: any) => {
          return <Exercise key={exercise.id} exercise={exercise} />
        })}
      </div>
      <CreateExercise />
    </>
  )
}

function Exercise({ exercise }: any) {
  const { id, name, created } = exercise || {}
  return (
    <div className="flex">
      <Link href={`/exercise/${id}`}>
        <span>{name}</span>
      </Link>

      <DeleteExercise exercise={exercise} />
    </div>
  )
}
