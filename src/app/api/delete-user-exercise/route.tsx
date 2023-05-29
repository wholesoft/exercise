import { NextResponse } from "next/server"
import { User, Exercise } from "@prisma/client"
import prisma from "@/lib/prisma"

// DELETE REQUESTS NOT WORKING IN NEXTJS SO WILL USE POST

export async function POST(request: Request) {
  const { id }: Partial<Exercise> = await request.json()

  console.log(`DELETE Exercise ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.exercise.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `Exercise ${id} deleted` })
}
