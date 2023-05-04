"use client"

import { createContext, useState } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: 123,
    email: "test@test.com",
    roles: [1002],
  })
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  )
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
