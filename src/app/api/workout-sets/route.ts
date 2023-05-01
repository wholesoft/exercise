import { NextResponse } from "next/server"
import { PrismaClient, User, Workout, WorkoutSets } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const results = await prisma.workoutSets.findMany()
  return new NextResponse(JSON.stringify(results))
}

export async function POST(request: Request) {
  const { we_id, setno, reps, weight }: Partial<WorkoutSets> =
    await request.json()

  if (!we_id || !setno || !reps || !weight)
    return NextResponse.json({ message: "Missing required data." })
  const data = { we_id, setno, reps, weight }

  const newRecord = await prisma.workoutSets.create({ data })
  return NextResponse.json(newRecord)
}

export async function DELETE(request: Request) {
  const { id }: Partial<WorkoutSets> = await request.json()

  console.log(`DELETE WORKOUT SET ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workoutSets.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `User ${id} deleted` })
}

export async function PUT(request: Request) {
  const { id, we_id, setno, reps, weight }: WorkoutSets = await request.json()

  console.log(request.json())

  if (!id || !we_id || !setno || !reps || !weight)
    return NextResponse.json({ message: "Missing required data." })

  const updatedRecord = await prisma.workoutSets.update({
    data: {
      we_id: we_id,
      setno: setno,
      reps: reps,
      weight: weight,
    },
    where: {
      id: id,
    },
  })

  return NextResponse.json(updatedRecord)
}
