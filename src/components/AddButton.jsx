import React from 'react'

const AddButton = ({ onClick }) => {
  return (
    <button
      aria-label="Add new article"
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-light-border text-lg font-light text-light-text-secondary transition-all duration-150 hover:border-light-accent hover:bg-light-accent-subtle hover:text-light-accent active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:bg-dark-accent-subtle dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
    >
      +
    </button>
  )
}

export default AddButton
