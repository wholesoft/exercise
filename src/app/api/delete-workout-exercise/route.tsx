import { NextResponse } from "next/server"
import { User, Workout, WorkoutExercise } from "@prisma/client"
import prisma from "@/lib/prisma"

// DELETE REQUESTS NOT WORKING IN NEXTJS SO WILL USE POST

export async function POST(request: Request) {
  const { id }: Partial<WorkoutExercise> = await request.json()

  console.log(`DELETE WORKOUT ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.workoutExercise.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `Workout Exercise ${id} deleted` })
}
