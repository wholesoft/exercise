import { NextResponse } from "next/server"
import { User } from "@prisma/client"
import prisma from "@/lib/prisma"

//const prisma = new PrismaClient()

interface RequestBody {
  email: string
}

export async function GET(request: Request) {
  const results = await prisma.user.findMany()
  return new NextResponse(JSON.stringify(results))
}

export async function POST(request: Request) {
  console.log("CREATE LOCAL USER: POSTED")
  const { email, authUserId }: Partial<User> = await request.json()
  const data = { email, authUserId }
  console.log(data)

  if (!email || !authUserId)
    return NextResponse.json({ message: "Missing required data." })

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
