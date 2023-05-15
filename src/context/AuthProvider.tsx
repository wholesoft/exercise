"use client"

import { createContext, useState } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: 0,
    email: "",
    roles: [0],
  })
  /*   const [auth, setAuth] = useState({
    userId: 1,
    email: "erikthompson@yandex.com",
    roles: [1001],
  }) */

  const [persist, setPersist] = useState(true)
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
