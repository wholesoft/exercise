import { NextResponse, NextRequest } from "next/server"
import { NextApiRequest, NextApiResponse } from "next"
import { User, Workout } from "@prisma/client"
import prisma from "@/lib/prisma"

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
  let result: any = ""
  const { url } = request
  const params = getQueryStringParams(url)
  const { scheduled } = params
  if (scheduled === "Y") {
    result = await prisma.workout.findMany({
      include: {
        workout_exercise: {
          include: {
            workout_set: {},
          },
        },
      },
      where: { scheduled: true, user_id: 1 },
    })
  } else {
    result = await prisma.workout.findMany()
  }

  return new NextResponse(JSON.stringify(result))
}

export async function POST(request: Request) {
  const { user_id, timestamp, notes, scheduled }: Partial<Workout> =
    await request.json()

  console.log("Add Workout")
  if (!user_id || !timestamp || !notes || scheduled === null)
    return NextResponse.json({ message: "Missing required data." })
  const data = { user_id, timestamp, notes, scheduled }
  console.log(data)
  const newRecord = await prisma.workout.create({ data })
  return NextResponse.json(newRecord)
}

export async function DELETE(request: Request) {
  const { id }: Partial<Workout> = await request.json()

  console.log(`DELETE WORKOUT ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workout.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `User ${id} deleted` })
}

export async function PUT(request: Request) {
  const { id, timestamp, notes, scheduled }: Workout = await request.json()

  console.log(request.json())

  if (!id || !timestamp || !notes || scheduled === null)
    return NextResponse.json({ message: "Missing required data." })

  const updatedRecord = await prisma.workout.update({
    data: {
      timestamp: timestamp,
      notes: notes,
      scheduled: scheduled,
    },
    where: {
      id: id,
    },
  })

  return NextResponse.json(updatedRecord)
}
