import React from "react"
import Link from "next/link"
import UpdateUser from "../UpdateUser"

type Props = {
  params: {
    id: string
  }
}

async function getUser(id: string) {
  const url = `http://localhost:3000/api/user/${id}`
  const res = await fetch(url, {
    cache: "no-store",
  })

  //console.log(res)

  const data = await res.json()
  //console.log("fetch results")
  //console.log(data)
  return data
}

export default async function UserPage({ params: { id } }: Props) {
  try {
    console.log(id)
    const data = await getUser(id)
    return (
      <>
        <h1>User</h1>
        <div>
          <p>{data.id}</p>
          <p>{data.email}</p>
          <p>{data.role}</p>
          <p>{data.created}</p>
        </div>

        <UpdateUser user={data} />
      </>
    )
  } catch (err: any) {
    return (
      <>
        <h1>Error.</h1>
        <p>{err.message}</p>
      </>
    )
  }
}
