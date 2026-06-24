import React from 'react'
import { Link, useLocation } from "react-router-dom"

const linkDefs = [
  { to: "/dashboard", label: "Feed" },
  { to: "/digest", label: "Digest" },
  { to: "/discover", label: "Discover" },
]

const NavLinks = ({ onClick, links = linkDefs }) => {
  const location = useLocation()

  return links.map(({ to, label }) => {
    const isActive = location.pathname === to
    return (
      <Link
        key={to}
        to={to}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={`relative py-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent ${
          isActive
            ? "text-light-accent dark:text-dark-accent"
            : "text-light-text-secondary underline-offset-4 hover:text-light-text-primary hover:underline active:text-light-accent dark:text-dark-text-secondary dark:hover:text-dark-text-primary dark:active:text-dark-accent"
        }`}
      >
        {label}
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute -bottom-3 left-0 right-0 h-0.5 rounded-full bg-light-accent dark:bg-dark-accent"
          />
        )}
      </Link>
    )
  })
}

export { linkDefs }
export default NavLinks
