import React from 'react'
import { Link } from "react-router-dom"

const NavSignUp = ({ onClick }) => {
  return (
    <Link
      to="/signup"
      onClick={onClick}
      className="rounded-md border border-light-border px-4 py-2 text-sm font-medium text-light-text-primary shadow-sm transition-all duration-150 hover:border-light-accent hover:bg-light-accent-subtle hover:text-light-accent active:scale-[0.97] active:bg-light-bg-tertiary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text-primary dark:hover:border-dark-accent dark:hover:bg-dark-accent-subtle dark:hover:text-dark-accent dark:active:bg-dark-bg-tertiary dark:focus-visible:outline-dark-accent"
    >
      Sign Up
    </Link>
  )
}

export default NavSignUp
