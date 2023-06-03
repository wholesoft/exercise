import React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-authOptions"
import ShowExercise from "../../components/Exercise"
import AddExercise from "../../components/AddExercise"

async function getUser(authUserId: string, atoken: string) {
  const url = `${process.env.APP_URL}/api/user/${authUserId}`
  console.log(url)
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${atoken}` },
    cache: "no-store",
  })

  const data = await res.json()
  console.log("fetch results")
  console.log(data)
  return data
}

type Props = {}

export default async function Exercises({}: Props) {
  const session: any = await getServerSession(authOptions)

  //console.log(session)

  let user: any = null
  if (session != null) {
    if (session.user != null) {
      const authUserId = session.user.authUserId
      const atoken = session.user.access_token
      user = await getUser(authUserId, atoken)
    }
  }
  //console.log(session)
  //console.log(user)

  return user !== null ? (
    <div>
      {user.exercises
        .filter((ex2: any) => ex2.inactive == false)
        .map((ex: any) => {
          return (
            <>
              {/* @ts-expect-error Server Component */}
              <ShowExercise key={ex.id} exercise={ex} />
            </>
          )
        })}
      <div className="py-5">
        <AddExercise user={user} />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}
