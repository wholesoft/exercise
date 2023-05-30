"use client"

import { WorkoutExercise } from "@prisma/client"
import { useState } from "react"
import CreateWorkoutSet from "./CreateWorkoutSet2"
type Props = {
  weId: number
  setNo: number
}

export default function AddSet({ weId, setNo }: Props) {
  const [step, setStep] = useState(1)
  return step === 1 ? (
    <div className="rounded-button-container" style={{ width: "70px" }}>
      <span className="rounded-button" onClick={() => setStep(2)}>
        <i className="bi-plus bs-icon"></i>
        <span className="bs-icon-label">Add Set</span>
      </span>
    </div>
  ) : (
    <div>
      <CreateWorkoutSet weId={weId} setNo={setNo} setStep={setStep} />
    </div>
  )
}
