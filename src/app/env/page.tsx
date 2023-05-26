import React from "react"

type Props = {}

function objectToText(object: any) {
  var output = ""
  for (var property in object) {
    output += property + ": " + object[property] + "\n"
  }
  return output
}

export default function EnvPage({}: Props) {
  console.log(process.env)

  return (
    <div>
      <h4>Environment Variables</h4>
      <br />
      <pre>{objectToText(process.env)}</pre>
    </div>
  )
}
