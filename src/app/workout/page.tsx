import Link from "next/link"
import CreateWorkout from "../dbtest/workout/CreateWorkout"
import NextWorkout from "../../components/NextWorkout"
import { getUserId } from "../../lib/auth"
import { headers } from "next/headers"
import { cookies } from "next/headers"

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
  const cookieStore = cookies()
  console.log("COOKIES:")
  console.log(cookieStore)
  const jwta = cookieStore.get("jwta")?.value
  console.log(jwta)
  const userId = await getUserId(jwta)
  const user = await getUser(userId)

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
