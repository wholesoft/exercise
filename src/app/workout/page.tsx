import Link from "next/link"
import CreateWorkout from "../../components/CreateWorkout"
import NextWorkout from "../../components/NextWorkout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-authOptions"
import axios from "axios"

async function getUser(authUserId: string, atoken: string) {
  const url = `http://localhost:3000/api/user/${authUserId}`
  //console.log(url)
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${atoken}` },
    cache: "no-store",
  })

  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

async function getUser2(authUserId: string, atoken: string) {
  const url = `http://localhost:3000/api/user/${authUserId}`

  const config = {
    headers: { Authorization: `Bearer ${atoken}` },
  }
  const response = await axios.get(url, config)
  //console.log("AXIOS")
  //console.log(response.data)
  return response.data
}

export default async function Workout() {
  const session = await getServerSession(authOptions)

  console.log(session)

  let user = null
  if (session?.user != null) {
    const authUserId = session.user.authUserId
    const atoken = session.user.access_token
    user = await getUser(authUserId, atoken)
  }
  //console.log(session)
  //console.log(user)

  return user !== null ? (
    <div>
      {/*       <p>{JSON.stringify(session)}</p>
      <p>{JSON.stringify(user)}</p> */}

      <div style={{ width: "700px", margin: "auto" }}>
        <NextWorkout user={user} />
        <br />
        <CreateWorkout user={user} />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}
