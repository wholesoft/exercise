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

  let jwtUserId = ""
  console.log(accessToken)
  if (accessToken) {
    jwtUserId = await getUserId(accessToken)
  }
  console.log(`GET USER: (${jwtUserId})`)
  if (jwtUserId === "Invalid JWT" || jwtUserId === "") {
    return NextResponse.json({ message: "INVALID Credentials" }) // 401
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
    where: { authUserId: jwtUserId },
  })

  return user
    ? NextResponse.json(user)
    : NextResponse.json({ message: `No user with id ${id}` })
}
