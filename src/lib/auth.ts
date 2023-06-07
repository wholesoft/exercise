import { importSPKI, jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"

const JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiTwtzhk++ZmKLydHzOlc
HgnyUEjpqDox/WDtDq4qR7k1eZ2synTs+vhbWVzXO+Wg52REdOZqPFmGi1YZT4AP
vEprMzYT53g8cwurN6zERaMY1hfVK6itk4C6jut5LdJGrc8tP7+RXOCW6vTR/Grn
m/96u8qXHSpqisn+cOeUP3sKoeqb2sfr88Olc5gOTn3ZQju49cAZLJX9du/vJix8
MpdxH07QdvIJELOZSsP4hOS+vixxqy24V7G5A9nxNjJ7XbgNrcWJZqLWXzGIJyim
lWtdQa9q77P6MBb5dVotUJDYSpHBYiV9oPmKInxlCzVXE9ItNIdRWIn+3lK9CtyF
7wIDAQAB
-----END PUBLIC KEY-----`

export const verifyAccessToken = async (token: string) => {
  const alg = "RS256"
  const publicKey = await importSPKI(JWT_PUBLIC_KEY, alg)
  try {
    const { payload, protectedHeader } = await jwtVerify(token, publicKey, {
      issuer: "wholesoft",
      audience: "strength.wholesoft.net",
    })
    //console.log(payload)
    //console.log(protectedHeader)
    let result = {
      success: true,
      message: "Valid token",
      authUserId: payload.authUserId,
    }
    //updateAuth(payload)
    //setResult(JSON.stringify(result))
    return result
  } catch (error: any) {
    //console.log(error)
    let result = {
      success: false,
      message: "Invalid token",
      error: error?.code,
    }
    //setResult(JSON.stringify(result))
    return result
  }
}

export const refreshToken = async () => {
  //const response = await axiosAuth.get("/refresh", { withCredentials: true })
  const res = await fetch(`${process.env.AUTH_URL}/refresh`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  })

  let result = { success: false }
  try {
    result = await res.json()
  } catch (error) {
    //console.log(error)
  }
  /*   console.log(result)
  if (result.success == true) {
    const { access_token, roles, email_confirmed, user_id, email } = result
    console.log(`${email} (${user_id})`)
  } else {
    console.log(result.message)
  } */
  return result
}

export const getUserId = async (jwta: string) => {
  let result = ""
  //console.log("getUserId")

  //console.log(`VERIFYING ${jwta}`)
  let verified = false
  if (jwta !== null && jwta !== undefined) {
    const verify: any = await verifyAccessToken(jwta)
    //console.log(verify)
    if (verify.success === true) {
      verified = true
      result = verify.authUserId
    }
  }
  if (verified == false) {
    result = "Invalid JWT"
  }
  //console.log(`Returning: ${result}`)
  return result
}

