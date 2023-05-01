import { NextResponse } from "next/server"
import { PrismaClient, User, Workout } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const results = await prisma.workout.findMany()
  return new NextResponse(JSON.stringify(results))
}

export async function POST(request: Request) {
  const { user_id, timestamp, notes }: Partial<Workout> = await request.json()

  console.log("Add Workout")
  if (!user_id || !timestamp || !notes)
    return NextResponse.json({ message: "Missing required data." })
  const data = { user_id, timestamp, notes }

  const newRecord = await prisma.workout.create({ data })
  return NextResponse.json(newRecord)
}

export async function DELETE(request: Request) {
  const { id }: Partial<Workout> = await request.json()

  console.log(`DELETE WORKOUT ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workout.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `User ${id} deleted` })
}

export async function PUT(request: Request) {
  const { id, timestamp, notes }: Workout = await request.json()

  console.log(request.json())

  if (!id || !timestamp || !notes)
    return NextResponse.json({ message: "Missing required data." })

  const updatedRecord = await prisma.workout.update({
    data: {
      timestamp: timestamp,
      notes: notes,
    },
    where: {
      id: id,
    },
  })

  return NextResponse.json(updatedRecord)
}
