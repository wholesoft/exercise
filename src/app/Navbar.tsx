"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../hooks/useAuth"

type Props = {}

export default function Navbar({}: Props) {
  const { auth, setAuth } = useAuth()
  const [activeNav, setActiveNav] = useState("hidden")
  const handleToggleButtonClick = () => {
    console.log(activeNav)
    if (activeNav == "flex") {
      setActiveNav("hidden")
    } else {
      setActiveNav("flex")
    }
  }

  return (
    <div className="navbar flex flex-col items-start md:flex-row md:items-center pt-1 pb-1 ">
      <div className="flex items-center pl-2 pr-6">
        <Link href="/">
          <img className="h-11" src="/wholesoft.svg" />
        </Link>

        <Link href="/">
          <h1 className="title text-xl ml-2">Wholesoft Strength</h1>
        </Link>
      </div>
      <a
        href="#"
        className="toggle-button flex md:hidden"
        onClick={handleToggleButtonClick}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className={`${activeNav} text-center w-full md:w-auto`}>
        <div className="navbar-links flex flex-col w-full md:w-autos">
          <ul className="flex flex-col md:flex-row">
            <li>
              <a href="/mynotes">My Notes</a>
            </li>
            <li>
              <a href="/account">My Account</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
            <li>
              <a href="/admin">Admin</a>
            </li>
          </ul>
        </div>
      </div>
      <div>{auth.email}</div>
    </div>
  )
}
