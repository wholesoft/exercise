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

  const exercise = await prisma.exercise.findUnique({ where: { id: parsedId } })

  return exercise
    ? NextResponse.json(exercise)
    : NextResponse.json({ message: `No exercise with id ${id}` })
} */

export async function PATCH(request: Request, { params: { id } }: Props) {
  const { name, inactive }: any = await request.json()
  const parsedId = parseInt(id.toString())
  let success = false

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

  /* TODO: Validate fields and user_id */

  console.log("OUTPUT JSON")
  console.log(`Name: ${name}`)
  console.log(`Inactive: ${inactive}`)
  console.log(typeof inactive)

  if (!id || (!name && typeof inactive !== "boolean"))
    return NextResponse.json({ message: "Missing required data." })

  if (name != null) {
    console.log("UPDATE NAME")
    const updatedRecord = await prisma.exercise.update({
      data: {
        name: name,
      },
      where: {
        id: parsedId,
      },
    })
    //return NextResponse.json(updatedRecord)
    success = true
  }
  if (typeof inactive === "boolean") {
    console.log("UPDATE INACTIVE!")
    const updatedRecord = await prisma.exercise.update({
      data: {
        inactive: inactive,
      },
      where: {
        id: parsedId,
      },
    })
    console.log(updatedRecord)
    success = true
  }

  if (success) {
    return NextResponse.json({ success: true, message: "Exercise Updated" })
  }

  return NextResponse.json({ success: false, message: "Error Patching Set" })
}
