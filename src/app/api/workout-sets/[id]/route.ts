import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

type Props = {
  params: {
    id: string
  }
}

const prisma = new PrismaClient()

export async function GET(request: Request, { params: { id } }: Props) {
  const parsedId = parseInt(id.toString())
  if (isNaN(parsedId)) return NextResponse.json({ message: "Invalid ID" })

  const data = await prisma.workoutSets.findUnique({
    where: { id: parsedId },
  })

  return data
    ? NextResponse.json(data)
    : NextResponse.json({ message: `No Workout Set with id ${id}` })
}

export async function PATCH(request: Request, { params: { id } }: Props) {
  const { setNo, weight, reps }: any = await request.json()
  const parsedId = parseInt(id.toString())
  let success = false
  /* TODO: Validat3 fields and user_id */

  console.log("OUTPUT JSON")
  console.log(`REPS: ${reps}`)

  if (!id || (!setNo && !weight && !reps))
    return NextResponse.json({ message: "Missing required data." })

  if (setNo != null) {
    console.log("UPDATE SETNO!")
    const updatedRecord = await prisma.workoutSets.update({
      data: {
        setno: setNo,
      },
      where: {
        id: parsedId,
      },
    })
    //return NextResponse.json(updatedRecord)
    success = true
  }
  if (reps !== null) {
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
  }
  if (weight !== null) {
    console.log("UPDATE WEIGHT!")
    const updatedRecord = await prisma.workoutSets.update({
      data: {
        weight: weight,
      },
      where: {
        id: parsedId,
      },
    })
    success = true
  }

  if (success) {
    NextResponse.json({ success: true, message: "Set Updated" })
  }

  return NextResponse.json({ success: false, message: "Error Patching Set" })
}
