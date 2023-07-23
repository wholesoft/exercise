import ListWorkouts from "../../components/ListWorkouts"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-authOptions"

async function getUser(authUserId: string, atoken: string) {
  const url = `${process.env.APP_URL}/api/user/${authUserId}`
  console.log(url)
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${atoken}` },
    cache: "no-store",
  })

  const data = await res.json()
  //console.log("fetch results")
  console.log(data)
  return data
}

export default async function Workout() {
  const session: any = await getServerSession(authOptions)

  //console.log(session)

  let user = null
  if (session != null) {
    if (session.user != null) {
      const authUserId = session.user.authUserId
      const atoken = session.user.accessToken
      user = await getUser(authUserId, atoken)
    }
  }
  //console.log(session)
  console.log(user)

  return user !== null ? (
    <div>
      <ListWorkouts user={user} />
    </div>
  ) : (
    <div>Loading...</div>
  )
}
