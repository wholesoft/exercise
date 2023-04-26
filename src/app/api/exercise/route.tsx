import { NextResponse } from "next/server"
import { Exercise, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const exercises = await prisma.exercise.findMany()
  return new NextResponse(JSON.stringify(exercises))
}

export async function POST(request: Request) {
  const { user_id, name }: Partial<Exercise> = await request.json()

  if (!user_id || !name)
    return NextResponse.json({ message: "Missing required data." })
  const data = { user_id, name }

  const newExercise = await prisma.exercise.create({ data })
  return NextResponse.json(newExercise)
}

export async function DELETE(request: Request) {
  const { id }: Partial<Exercise> = await request.json()

  if (!id) return NextResponse.json({ message: "id required" })
  const response = await prisma.exercise.delete({
    id: id,
  })
  return NextResponse.json({ message: `Exercise ${id} deleted` })
}
