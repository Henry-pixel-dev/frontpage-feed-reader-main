import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-light-border-subtle bg-light-bg-primary/95 font-sans backdrop-blur-sm dark:border-dark-border dark:bg-dark-bg-primary/90">
      <div className="mx-auto flex max-w-container-page items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-70"
        >
          {/* icon placeholder — swap with FA icon later */}
          <span className="flex size-8 items-center justify-center rounded-md bg-light-accent text-sm font-semibold text-white dark:bg-dark-accent">
            T
          </span>
          <span className="text-lg font-semibold tracking-tight text-light-text-primary dark:text-dark-text-primary">
            TechFeed
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/signup"
            className="rounded-md border border-light-border px-4 py-2 text-sm font-medium text-light-text-primary shadow-sm transition-all duration-150 hover:border-light-accent hover:bg-light-accent-subtle hover:text-light-accent active:scale-[0.97] active:bg-light-bg-tertiary dark:border-dark-border dark:text-dark-text-primary dark:hover:border-dark-accent dark:hover:bg-dark-accent-subtle dark:hover:text-dark-accent dark:active:bg-dark-bg-tertiary"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="rounded-md bg-light-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-light-accent-hover hover:shadow-md active:scale-[0.97] dark:bg-dark-accent dark:text-dark-bg-primary dark:hover:bg-dark-accent-hover"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
