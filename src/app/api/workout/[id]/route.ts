import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-authOptions"

type Props = {
  params: {
    id: string
  }
}

/* export async function GET(request: Request, { params: { id } }: Props) {
  const parsedId = parseInt(id.toString())
  if (isNaN(parsedId)) return NextResponse.json({ message: "Invalid ID" })

  const data = await prisma.workout.findUnique({ where: { id: parsedId } })

  return data
    ? NextResponse.json(data)
    : NextResponse.json({ message: `No Workout with id ${id}` })
} */

export async function PATCH(request: Request, { params: { id } }: Props) {
  const { scheduled, notes }: any = await request.json()
  const parsedId = parseInt(id.toString())

  const session: any = await getServerSession(authOptions)
  let atoken = ""
  if (session != null) {
    if (session.user != null) {
      atoken = session.user.accessToken
    }
  }
  let jwtUserId = ""
  if (atoken) {
    jwtUserId = await getUserId(atoken)
  }
  if (jwtUserId === "Invalid JWT" || jwtUserId === "") {
    return NextResponse.json({ message: "INVALID Credentials" }) // 401
  }

  let success = false
  /* TODO: Validate fields and user_id */

  console.log(`${id} : ${notes}`)
  //console.log(typeof scheduled)

  if (!id || (typeof scheduled !== "boolean" && !notes))
    return NextResponse.json({ message: "Missing required data." })

  console.log("Edit Something")

  if (typeof scheduled === "boolean") {
    console.log("UPDATE SCHEDULED!")
    const updatedRecord = await prisma.workout.update({
      data: {
        scheduled: scheduled,
      },
      where: {
        id: parsedId,
      },
    })
    //return NextResponse.json(updatedRecord)
    success = true
  }
  if (notes != null) {
    console.log("UPDATE NOTES!")
    const updatedRecord = await prisma.workout.update({
      data: {
        notes: notes,
      },
      where: {
        id: parsedId,
      },
    })
    success = true
  }

  if (success) {
    NextResponse.json({ success: true, message: "Workout Updated" })
  }

  return NextResponse.json({ success: false, message: "Error Patching Set" })
}
