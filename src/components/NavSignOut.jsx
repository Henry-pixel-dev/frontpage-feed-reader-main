import React from 'react'

const NavSignOut = ({ onClick }) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className="rounded-md bg-light-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-light-accent-hover hover:shadow-md active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-dark-accent dark:text-dark-bg-primary dark:hover:bg-dark-accent-hover dark:focus-visible:outline-dark-accent"
        >
            Sign Out
    </button>
  )
}

export default NavSignOut