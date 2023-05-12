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

  const user = await prisma.user.findUnique({
    include: {
      workouts: {
        include: {
          workout_exercise: {
            include: {
              workout_set: {},
            },
          },
        },
      },
      exercises: {},
    },
    where: { id: parsedId },
  })

  return user
    ? NextResponse.json(user)
    : NextResponse.json({ message: `No user with id ${id}` })
}
