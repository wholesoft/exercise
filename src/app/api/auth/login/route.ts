import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

type loginInput = {
  email: string
  password: string
}

interface RequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  console.log("authLogin: POST")
  const body: RequestBody = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  console.log(user)
}
