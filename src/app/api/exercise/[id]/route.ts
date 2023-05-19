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
