import { NextResponse } from "next/server"
import { User, Workout, WorkoutSets } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-authOptions"

// DELETE REQUESTS NOT WORKING IN NEXTJS SO WILL USE POST

export async function POST(request: Request) {
  const { we_id }: Partial<WorkoutSets> = await request.json()

  const session: any = await getServerSession(authOptions)
  let atoken = ""
  if (session != null) {
    if (session.user != null) {
      atoken = session.user.access_token
    }
  }
  let jwtUserId = ""
  if (atoken) {
    jwtUserId = await getUserId(atoken)
  }
  if (jwtUserId === "Invalid JWT" || jwtUserId === "") {
    return NextResponse.json({ message: "INVALID Credentials" }) // 401
  }

  console.log(`DELETE Workout Exercise Sets ${we_id}`)
  if (!we_id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workoutSets.deleteMany({
    where: { we_id: we_id },
  })

  return NextResponse.json({
    message: `Workout Exercise Sets ${we_id} deleted`,
  })
}
