import React from "react"
import Link from "next/link"
import CreateWorkoutSet from "./CreateWorkoutSet"
import DeleteWorkoutSet from "./DeleteWorkoutSet"

type Props = {}

async function getWorkoutSets() {
  const url = "http://localhost:3000/api/workout-sets"
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch all exercises")
  //console.log(data)
  return data
}

export default async function WorkoutsPage({}: Props) {
  const workoutSets = await getWorkoutSets()
  return (
    <div>
      <h1>Sets</h1>
      <div>
        {workoutSets?.map((set: any) => {
          return <Set key={set.id} set={set} />
        })}
      </div>
      <CreateWorkoutSet />
    </div>
  )
}

function Set({ set }: any) {
  const { id, we_id, setno, reps, weight, created, updated } = set || {}

  return (
    <div className="flex">
      <Link href={`/workout-sets/${id}`}>
        <span>
          {we_id} : {setno} : {reps} : {weight}
        </span>
      </Link>

      <DeleteWorkoutSet set={set} />
    </div>
  )
}
