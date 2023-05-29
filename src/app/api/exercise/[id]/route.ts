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

  const exercise = await prisma.exercise.findUnique({ where: { id: parsedId } })

  return exercise
    ? NextResponse.json(exercise)
    : NextResponse.json({ message: `No exercise with id ${id}` })
}

export async function PATCH(request: Request, { params: { id } }: Props) {
  const { name }: any = await request.json()
  const parsedId = parseInt(id.toString())
  let success = false
  /* TODO: Validate fields and user_id */

  console.log("OUTPUT JSON")
  console.log(`Name: ${name}`)

  if (!id || !name)
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
  /*   if (reps !== null) {
    console.log("UPDATE REPS!")
    const updatedRecord = await prisma.workoutSets.update({
      data: {
        reps: reps,
      },
      where: {
        id: parsedId,
      },
    })
    success = true
  } */

  if (success) {
    NextResponse.json({ success: true, message: "Exercise Updated" })
  }

  return NextResponse.json({ success: false, message: "Error Patching Set" })
}
