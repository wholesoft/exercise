import { NextResponse } from "next/server"
import { Exercise, PrismaClient } from "@prisma/client"

export async function GET(request: Request) {
  const prisma = new PrismaClient()
  const exercises = await prisma.exercise.findMany()
  return new NextResponse(JSON.stringify(exercises))
}

export async function POST(request: Request) {
  const { user_id, name }: Partial<Exercise> = await request.json()
  if (!user_id || !name)
    return NextResponse.json({ message: "Missing required data." })
  const data = { user_id, name }
  const prisma = new PrismaClient()
  const newExercise = await prisma.exercise.create({ data })
  return NextResponse.json(newExercise)
}
