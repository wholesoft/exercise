import { NextResponse, NextRequest } from "next/server"
import { User, Workout, WorkoutExercise } from "@prisma/client"
import prisma from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-authOptions"

function getQueryStringParams(url: string) {
  let result: any = {}
  if (url.indexOf("?") > 0) {
    let paramString = url.slice(url.indexOf("?") + 1)
    let paramArray = paramString.split("&")
    for (let item of paramArray) {
      let keyvalue = item.split("=")
      result[keyvalue[0]] = keyvalue[1]
    }
  }
  return result
}
export async function GET(request: NextRequest) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "")

  let jwtUserId = ""
  if (accessToken) {
    jwtUserId = await getUserId(accessToken)
  }
  if (jwtUserId === "Invalid JWT" || jwtUserId === "") {
    return NextResponse.json({ message: "INVALID Credentials" }) // 401
  }
  console.log(jwtUserId)

  const { url } = request
  const params = getQueryStringParams(url)
  const { exerciseId } = params
  const results = await prisma.workoutExercise.findMany({
    where: { exercise_id: parseInt(exerciseId.toString()) },
  })
  return new NextResponse(JSON.stringify(results))
}

export async function POST(request: Request) {
  const { exercise_id, workout_id }: Partial<WorkoutExercise> =
    await request.json()

  const session: any = await getServerSession(authOptions)
  let atoken = ""
  if (session != null) {
    if (session.user != null) {
      atoken = session.user.access_token
    }
  }
  let jwtUserId = ""
  if (atoken) {
    jwtUserId = await getUserId(atoken)
  }
  if (jwtUserId === "Invalid JWT" || jwtUserId === "") {
    return NextResponse.json({ message: "INVALID Credentials" }) // 401
  }

  if (!exercise_id || !workout_id)
    return NextResponse.json({ message: "Missing required data." })
  const data = { exercise_id, workout_id }

  const newRecord = await prisma.workoutExercise.create({ data })
  return NextResponse.json(newRecord)
}
/* 
export async function DELETE(request: Request) {
  const { id }: Partial<WorkoutExercise> = await request.json()

  console.log(`DELETE WORKOUT ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workoutExercise.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `Workout Exercise ${id} deleted` })
} */
/* 
export async function PUT(request: Request) {
  const { id, exercise_id, workout_id }: WorkoutExercise = await request.json()

  console.log(request.json())

  if (!id || !exercise_id || !workout_id)
    return NextResponse.json({ message: "Missing required data." })

  const updatedRecord = await prisma.workoutExercise.update({
    data: {
      exercise_id: exercise_id,
      workout_id: workout_id,
    },
    where: {
      id: id,
    },
  })

  return NextResponse.json(updatedRecord)
}
 */
