import React from 'react'
import { Link } from "react-router-dom"

const NavLogo = () => {
  return (
    <Link
      to="/"
      aria-label="Frontpage home"
      className="group flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-70"
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-light-text-primary font-serif text-lg italic text-white dark:bg-dark-text-primary dark:text-dark-bg-primary">
        f
      </span>
      <span className="font-serif text-xl tracking-[-0.02em] text-light-text-primary dark:text-dark-text-primary">
        Frontpage
      </span>
    </Link>
  )
}

export default NavLogo
