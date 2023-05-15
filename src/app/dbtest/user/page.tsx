import React from "react"
import CreateUser from "./CreateUser"
import DeleteUser from "./DeleteUser"
import Link from "next/link"

type Props = {}

async function getUsers() {
  const url = "http://localhost:3000/api/user"
  const res = await fetch(url, {
    cache: "no-store",
  })
  const data = await res.json()
  console.log("users data")
  console.log(data)
  return data
}

export default async function page({}: Props) {
  const users = await getUsers()
  return (
    <>
      <p>Users ({users.length})</p>
      <ul>
        {users?.map((user: any) => {
          return (
            <li key={user.id}>
              <User user={user} />
            </li>
          )
        })}
      </ul>
      <br />
      <hr />
      <br />
      <CreateUser />
    </>
  )
}

function User(props: any) {
  const { user } = props
  console.log("xxx")
  console.log(user)
  const { id, email, role, created } = user || {}

  return (
    <div className="flex">
      <Link href={`/user/${id}`}>
        <span>{user.email}</span>
      </Link>
      <DeleteUser user={user} />
    </div>
  )
}
