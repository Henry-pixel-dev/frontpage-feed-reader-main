import React from 'react'
import { Link } from "react-router-dom"

const NavLogo = () => {
  return (
    <Link
      to="/"
      aria-label="TechFeed home"
      className="group flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-70"
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-light-accent text-sm font-semibold text-white dark:bg-dark-accent">
        T
      </span>
      <span className="text-lg font-semibold tracking-tight text-light-text-primary dark:text-dark-text-primary">
        TechFeed
      </span>
    </Link>
  )
}

export default NavLogo
