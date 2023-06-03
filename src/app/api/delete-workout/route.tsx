import { NextResponse } from "next/server"
import { User, Workout, WorkoutExercise } from "@prisma/client"
import prisma from "@/lib/prisma"

// DELETE REQUESTS NOT WORKING IN NEXTJS SO WILL USE POST

export async function POST(request: Request) {
  const { id }: Partial<Workout> = await request.json()

  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workout.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `Workout ${id} deleted` })
}
