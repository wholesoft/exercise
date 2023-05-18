import { NextResponse } from "next/server"
/* import { PrismaClient } from "@prisma/client" */
import prisma from "@/lib/prisma"
import { getUserId } from "@/lib/auth"

type Props = {
  params: {
    id: string
  }
}

/* const prisma = new PrismaClient() */

export async function GET(request: Request, { params: { id } }: Props) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "")

  if (!accessToken) {
    // TODO or if !verified
    return NextResponse.json({ message: "Missing Credentials" }) // 401
  } else {
    const jwtUserId = await getUserId(accessToken)
    console.log(jwtUserId)
  }

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
    where: { authUserId: id },
  })

  return user
    ? NextResponse.json(user)
    : NextResponse.json({ message: `No user with id ${id}` })
}
