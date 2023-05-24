import Link from "next/link"

export default async function Home() {
  return (
    <div>
      <h4>Test 6</h4>
      <b>Protected Routes:</b>
      <ul>
        <li>
          <Link href="/workout" prefetch={false}>
            Workouts
          </Link>
        </li>
        <li>
          <Link href="/auth/account" prefetch={false}>
            My Account
          </Link>
        </li>
      </ul>

      <b>Public Routes:</b>
      <ul>
        <li>
          <Link href="/auth/register" prefetch={false}>
            Register
          </Link>
        </li>
        <li>
          <Link href="/auth/forgot" prefetch={false}>
            Forgot Password
          </Link>
        </li>
        {/*  Login and Signout are public but controlled by next-auth */}
      </ul>
    </div>
  )
}
