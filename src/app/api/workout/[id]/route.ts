import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

type Props = {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params: { id } }: Props) {
  const parsedId = parseInt(id.toString())
  if (isNaN(parsedId)) return NextResponse.json({ message: "Invalid ID" })

  const data = await prisma.workout.findUnique({ where: { id: parsedId } })

  return data
    ? NextResponse.json(data)
    : NextResponse.json({ message: `No Workout with id ${id}` })
}

export async function PATCH(request: Request, { params: { id } }: Props) {
  const { scheduled }: any = await request.json()
  const parsedId = parseInt(id.toString())
  let success = false
  /* TODO: Validate fields and user_id */

  console.log(`${id} : ${scheduled}`)
  console.log(typeof scheduled)

  if (!id || typeof scheduled !== "boolean")
    return NextResponse.json({ message: "Missing required data." })

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
  if (success) {
    NextResponse.json({ success: true, message: "Workout Updated" })
  }

  return NextResponse.json({ success: false, message: "Error Patching Set" })
}
