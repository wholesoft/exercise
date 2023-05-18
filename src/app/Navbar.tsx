"use client"

import { useState } from "react"
import Link from "next/link"
import { NavMenu } from "./NavMenu"

type Props = {}

export default function Navbar({}: Props) {
  const [activeNav, setActiveNav] = useState(false)
  const handleToggleButtonClick = () => {
    console.log(activeNav)
    if (activeNav) {
      setActiveNav(false)
    } else {
      setActiveNav(true)
    }
  }

  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex" }}>
          <div className="" style={{ width: "50px" }}>
            <Link href="/">
              <img className="logo" src="/wholesoft.svg" />
            </Link>
          </div>
          <div className="" style={{ width: "190px" }}>
            <Link href="/">
              <h1 className="title">Wholesoft Strength</h1>
            </Link>
          </div>
        </div>
        <a href="#" className="toggle-button" onClick={handleToggleButtonClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={activeNav ? "navbar-links active" : "navbar-links"}>
          <NavMenu />
        </div>
      </div>
    </>
  )
}
