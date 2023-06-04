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

export async function POST(request: NextRequest) {
  const { user_id, timestamp, notes, scheduled }: Partial<Workout> =
    await request.json()

  console.log("Add Workout")
  if (!user_id || !timestamp || scheduled === null)
    return NextResponse.json({ message: "Missing required data." })
  const data = { user_id, timestamp, notes, scheduled }
  console.log(data)
  const newRecord = await prisma.workout.create({ data })
  return NextResponse.json(newRecord)
}

export async function DELETE(request: NextRequest) {
  const { id }: Partial<Workout> = await request.json()

  console.log(`DELETE WORKOUT ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workout.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `User ${id} deleted` })
}

export async function PUT(request: NextRequest | any) {
  console.log("PUT: WORKOUT")
  const { id, timestamp, notes, scheduled }: Partial<Workout> | any =
    await request.json()

  //console.log(request.json())

  if (!id || !timestamp || !notes || scheduled === null)
    return NextResponse.json({ message: "Missing required data." })

  console.log(id)
  console.log(timestamp)
  console.log(notes)
  console.log(scheduled)
  console.log(typeof id)
  console.log(typeof new Date(timestamp))
  console.log(typeof notes)
  console.log(typeof scheduled)

  try {
    await prisma.workout.update({
      data: {
        timestamp: new Date(timestamp),
        notes: notes,
        scheduled: scheduled,
      },
      where: {
        id: id,
      },
    })
  } catch (e: any) {
    /*   if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      console.log(
        'There is a unique constraint violation, a new user cannot be created with this email'
      )
    }
  }
  throw e */
    return NextResponse.json({ message: "WTF" })
    console.log("Error trapped")
    console.log(e?.code)
    console.log(e)
  }

  console.log("HMMMMMM")
  return NextResponse.json({ message: "PUT REQUEST COMPLETE" })
}
