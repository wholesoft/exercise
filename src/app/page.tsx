import Link from "next/link"

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/user">User</Link>
        </li>
        <li>
          <Link href="/exercise">Exercise</Link>
        </li>
        <li>
          <Link href="/workout">Workout</Link>
        </li>
        <li>
          <Link href="/workout-exercise">WorkoutExercise</Link>
        </li>
        <li>
          <Link href="/workout-sets">WorkoutSets</Link>
        </li>
      </ul>
    </div>
  )
}
