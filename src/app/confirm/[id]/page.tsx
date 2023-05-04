import React from "react"
import Link from "next/link"

type Props = {
  params: {
    id: string
  }
}

async function confirmEmail(id: string) {
  const url = `http://localhost:3456/confirm/${id}`
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

export default async function ConfirmEmailPage({ params: { id } }: Props) {
  console.log(id)
  const data = await confirmEmail(id)
  return data ? (
    <>
      <div>
        <p>{JSON.stringify(data)}</p>
        <p>
          Thank you for confirming your email address.
          <br />
          Please <Link href="/login">Login</Link>.
        </p>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  )
}
