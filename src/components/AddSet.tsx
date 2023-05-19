"use client"

import { WorkoutExercise } from "@prisma/client"
import { useState } from "react"
import CreateWorkoutSet from "./CreateWorkoutSet"
type Props = {
  weId: number
  setNo: number
}

export default function AddSet({ weId, setNo }: Props) {
  const [step, setStep] = useState(1)
  return step === 1 ? (
    <button
      onClick={() => setStep(2)}
      className="btn btn-primary pl-1 pr-1 pt-0 pb-0"
    >
      Add Set
    </button>
  ) : (
    <>
      <CreateWorkoutSet weId={weId} setNo={setNo} setStep={setStep} />
      {/*       <button
        onClick={() => setStep(1)}
        className="btn btn-secondary pl-1 pr-1 pt-0 pb-0"
      >
        Cancel
      </button> */}
    </>
  )
}
