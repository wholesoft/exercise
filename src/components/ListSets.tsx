import React from "react"

type Props = {
  sets: any
}

function displaySets(sets: any) {
  let result = ""
  let lastWeight = ""
  let lastReps = 0
  let nSets = 0
  sets.map((set: any) => {
    if (set.weight !== lastWeight || set.reps !== lastReps) {
      if (nSets > 0) {
        result += `${nSets}x${lastReps}`
        result += "<br />"
      }
      result += `${set.weight}lbs - `
      nSets = 1
    } else {
      nSets += 1
    }
    lastWeight = set.weight
    lastReps = set.reps
  })
  if (lastReps > 0) {
    result += `${nSets}x${lastReps}`
  }
  return result
}

function displaySets2(sets: any) {
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
