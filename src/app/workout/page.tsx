import Link from "next/link"
import CreateWorkout from "../dbtest/workout/CreateWorkout"
import NextWorkout from "../../components/NextWorkout"

async function getUser(id: number) {
  const url = `http://localhost:3000/api/user/${id}`
  console.log(url)
  const res = await fetch(url, {
    cache: "no-store",
  })

  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

export default async function Workout() {
  const user = await getUser(1)

  return (
    <div>
      {/*       <p>{JSON.stringify(user)}</p> */}

      <div style={{ width: "700px", margin: "auto" }}>
        <NextWorkout user={user} />
        {/*         <h4>Next Scheduled Workout</h4> */}
        <br />
        <CreateWorkout />
      </div>
    </div>
  )
}
