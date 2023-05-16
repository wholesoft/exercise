import Link from "next/link"

export default async function Home() {
  return (
    <div>
      <b>Protected Routes:</b>
      <ul>
        <li>
          <Link href="/workout">Workouts</Link>
        </li>
        <li>
          <Link href="/account">My Account</Link>
        </li>
      </ul>

      <b>Public Routes:</b>
      <ul>
        <li>
          <Link href="/register">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/forgot">Forgot Password</Link>
        </li>
        <li>
          <Link href="/logout">Sign Out</Link>
        </li>
      </ul>
    </div>
  )
}
