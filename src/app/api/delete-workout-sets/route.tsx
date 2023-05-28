import { NextResponse } from "next/server"
import { User, Workout, WorkoutSets } from "@prisma/client"
import prisma from "@/lib/prisma"

// DELETE REQUESTS NOT WORKING IN NEXTJS SO WILL USE POST

export async function POST(request: Request) {
  const { we_id }: Partial<WorkoutSets> = await request.json()

  console.log(`DELETE Workout Exercise Sets ${we_id}`)
  if (!we_id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workoutSets.deleteMany({
    where: { we_id: we_id },
  })

  return NextResponse.json({
    message: `Workout Exercise Sets ${we_id} deleted`,
  })
}
