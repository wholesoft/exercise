import React from "react"
import EditSetNo from "./editfield/EditSetNo"
import EditReps from "./editfield/EditReps"
import EditWeight from "./editfield/EditWeight"

type Props = {
  sets: any
}

function displaySets(sets: any) {
  let result = ""
  let lastWeight = ""
  let nSets = 0
  sets.map((set: any) => {
    if (set.weight !== lastWeight) {
      if (nSets > 0) {
        result += "<br />"
      }
      result += `${set.weight}lbs - ${set.reps}`
      nSets = 1
    } else {
      nSets += 1
      result += ` / ${set.reps}`
    }
    lastWeight = set.weight
  })
  return result
}

export default function ListSets({ sets }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: displaySets(sets) }}></div>
}
