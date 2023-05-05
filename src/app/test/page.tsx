"use client"

import { useState } from "react"
import { importSPKI, jwtVerify } from "jose"

const JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiTwtzhk++ZmKLydHzOlc
HgnyUEjpqDox/WDtDq4qR7k1eZ2synTs+vhbWVzXO+Wg52REdOZqPFmGi1YZT4AP
vEprMzYT53g8cwurN6zERaMY1hfVK6itk4C6jut5LdJGrc8tP7+RXOCW6vTR/Grn
m/96u8qXHSpqisn+cOeUP3sKoeqb2sfr88Olc5gOTn3ZQju49cAZLJX9du/vJix8
MpdxH07QdvIJELOZSsP4hOS+vixxqy24V7G5A9nxNjJ7XbgNrcWJZqLWXzGIJyim
lWtdQa9q77P6MBb5dVotUJDYSpHBYiV9oPmKInxlCzVXE9ItNIdRWIn+3lK9CtyF
7wIDAQAB
-----END PUBLIC KEY-----`

export default function page() {
  const [result, setResult] = useState("")

  const verifyAccessToken = async (token: string | null) => {
    const alg = "RS256"
    const publicKey = await importSPKI(JWT_PUBLIC_KEY, alg)
    try {
      const { payload, protectedHeader } = await jwtVerify(token, publicKey, {
        issuer: "wholesoft",
        audience: "strength.wholesoft.net",
      })
      console.log(payload)
      console.log(protectedHeader)
      let result = payload
      setResult(JSON.stringify(result))
      return result
    } catch (error) {
      //console.log(error)
      let result = {
        success: false,
        message: "Invalid token",
        error: error.code,
      }
      setResult(JSON.stringify(result))
      return result
    }
  }

  const atoken = localStorage.getItem("atoken")

  verifyAccessToken(atoken)

  const refreshToken = async () => {
    //const response = await axiosAuth.get("/refresh", { withCredentials: true })
    const res = await fetch("http://localhost:3456/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    })

    const result = await res.json()
    console.log(result)
    if (result.success == true) {
      const { access_token, roles, email_confirmed, user_id, email } = result
      setResult(`${email} (${user_id})`)
      localStorage.setItem("atoken", access_token)
    } else {
      setResult(result.message)
    }
  }

  return (
    <div>
      <h3>Key</h3>
      <pre>{JWT_PUBLIC_KEY}</pre>
      <h3>AToken</h3>
      <p>{atoken}</p>
      <h3>Result</h3>
      <p>{result}</p>
      <button onClick={refreshToken}>REFRESH TOKEN</button>
    </div>
  )
}
