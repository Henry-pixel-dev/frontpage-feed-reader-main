import React from 'react'
import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="relative flex items-center">
      <Search
        className="pointer-events-none absolute left-3 size-4 text-light-text-tertiary dark:text-dark-text-tertiary"
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder="Search articles"
        aria-label="Search articles"
        className="h-9 w-full rounded-md border border-light-border bg-light-bg-secondary pl-9 pr-10 text-sm text-light-text-primary placeholder:text-light-text-tertiary focus:border-light-accent focus:outline-none focus:ring-1 focus:ring-light-accent dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary dark:focus:border-dark-accent dark:focus:ring-dark-accent"
      />
      <kbd
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 flex h-5 items-center rounded border border-light-border bg-light-bg-primary px-1.5 text-[0.625rem] font-medium text-light-text-tertiary dark:border-dark-border dark:bg-dark-bg-primary dark:text-dark-text-tertiary"
      >
        /
      </kbd>
    </div>
  )
}

export default SearchBar
