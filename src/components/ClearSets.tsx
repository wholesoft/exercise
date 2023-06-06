"use client"
import { useRouter } from "next/navigation"

type Props = {
  weId: number
}

const atoken = "x"

export default function ClearSets({ weId }: Props) {
  const router = useRouter()

  async function clearSets(weId: number) {
    console.log(`Delete: ${weId}`)
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/delete-workout-sets`

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ we_id: weId }),
    })

    const data = await res.json()
    console.log("fetch results")
    console.log(data)
    router.refresh()
  }

  return (
    <div className="rounded-button-container">
      <span className="rounded-button" onClick={() => clearSets(weId)}>
        <i className="bi-dash bs-icon"></i>
        <span className="bs-icon-label">Clear Sets</span>
      </span>
    </div>
  )
}
