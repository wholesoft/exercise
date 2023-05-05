import { jwtVerify } from "jose"

const JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiTwtzhk++ZmKLydHzOlc
HgnyUEjpqDox/WDtDq4qR7k1eZ2synTs+vhbWVzXO+Wg52REdOZqPFmGi1YZT4AP
vEprMzYT53g8cwurN6zERaMY1hfVK6itk4C6jut5LdJGrc8tP7+RXOCW6vTR/Grn
m/96u8qXHSpqisn+cOeUP3sKoeqb2sfr88Olc5gOTn3ZQju49cAZLJX9du/vJix8
MpdxH07QdvIJELOZSsP4hOS+vixxqy24V7G5A9nxNjJ7XbgNrcWJZqLWXzGIJyim
lWtdQa9q77P6MBb5dVotUJDYSpHBYiV9oPmKInxlCzVXE9ItNIdRWIn+3lK9CtyF
7wIDAQAB
-----END PUBLIC KEY-----`

interface UserJwtPayload {
  jti: string
  iat: number
}

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    )
    return verified.payload as UserJwtPayload
  } catch (error) {
    throw new Error("Your token has expired. ")
  }
}

const verifyAccessToken = async (token: string | null) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_PUBLIC_KEY)
    )
    console.log(verified.payload)
    return verified.payload as UserJwtPayload
    //setResult(verified.payload)
  } catch (error) {
    //throw new Error("Your token has expired. ")
    console.log(error)
    return "Your token has expired. "
  }
}
