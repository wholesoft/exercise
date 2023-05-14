import { NextResponse } from "next/server"
import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const results = await prisma.user.findMany()
  return new NextResponse(JSON.stringify(results))
}

export async function POST(request: Request) {
  const { email }: Partial<User> = await request.json()

  if (!email) return NextResponse.json({ message: "Missing required data." })
  const data = { email }

  const newRecord = await prisma.user.create({ data })
  return NextResponse.json(newRecord)
}

export async function DELETE(request: Request) {
  const { id }: Partial<User> = await request.json()

  console.log(`DELETE USER ${id}`)
  if (!id) return NextResponse.json({ message: "id required" })

  const response = await prisma.user.delete({
    where: { id: id },
  })

  return NextResponse.json({ message: `User ${id} deleted` })
}

export async function PUT(request: Request) {
  const { id, email, role }: User = await request.json()

  console.log(request.json())

  /*   if (!id || !email || !role)
    return NextResponse.json({ message: "Missing required data." }) */

  const updatedUser = await prisma.user.update({
    data: {
      email: email,
      role: role,
    },
    where: {
      id: id,
    },
  })

  return NextResponse.json(updatedUser)
}