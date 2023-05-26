import { NextResponse } from "next/server"
import { Exercise } from "@prisma/client"
import prisma from "@/lib/prisma"

//const prisma = new PrismaClient()

/* export async function GET(request: Request) {
  const exercises = await prisma.exercise.findMany({
    where: { user_id: 1 },
  })
  return new NextResponse(JSON.stringify(exercises))
} */

export async function POST(request: Request) {
  console.log("POST: ADD EXERCISE")
  const { user_id, name }: Partial<Exercise> = await request.json()

  if (!user_id || !name)
    return NextResponse.json({ message: "Missing required data." })
  const data = { user_id, name }
  console.log("Data:")
  console.log(data)
  const newExercise = await prisma.exercise.create({ data })
  return NextResponse.json(newExercise)
}

export async function DELETE(request: Request) {
  const { id }: Partial<Exercise> = await request.json()

  console.log(`DELETE Exercise ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.exercise.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `Exercise ${id} deleted` })
}

export async function PUT(request: Request) {
  const { id, name }: Exercise = await request.json()

  console.log(request.json())

  /*   if (!id || !email || !role)
    return NextResponse.json({ message: "Missing required data." }) */

  const updatedRecord = await prisma.exercise.update({
    data: {
      name: name,
    },
    where: {
      id: id,
    },
  })

  return NextResponse.json(updatedRecord)
}
