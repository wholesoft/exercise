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
