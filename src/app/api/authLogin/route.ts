import { NextResponse } from "next/server"

type loginInput = {
  email: string
  password: string
}

export async function POST(request: Request) {
  console.log("authLogin: POST")
  const { email, password }: loginInput = await request.json()

  if (!email || !password)
    return NextResponse.json({ message: "Missing required data." })
  const data = { email, password }

  console.log("LOGIN REQUEST SENDING")

  const res = await fetch("http://localhost:3456/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(data),
  })
  console.log(res)
  console.log("LOGIN REQUEST SENT")

  try {
    console.log(res)
    const result = await res.json()
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message })
  }
}
