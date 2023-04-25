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

  const exercise = await prisma.exercise.findUnique({ where: { id: parsedId } })

  return exercise
    ? NextResponse.json(exercise)
    : NextResponse.json({ message: `No exercise with id ${id}` })
}
