import React from "react"
import EditSetNo from "./editfield/EditSetNo"
import EditReps from "./editfield/EditReps"
import EditWeight from "./editfield/EditWeight"

type Props = {
  sets: any
}

export default function ListSets({ sets }: Props) {
  return (
    <>
      {sets.map((set: WorkoutSets) => {
        return (
          <div className="row" key={set.id}>
            <div className="col">
              <EditSetNo setId={set.id} setNo={set.setno} />
            </div>

            <div className="col">
              <EditWeight setId={set.id} weight={set.weight} />
              lbs
            </div>

            <div className="col">
              <EditReps setId={set.id} reps={set.reps} />
            </div>
          </div>
        )
      })}
    </>
  )
}
