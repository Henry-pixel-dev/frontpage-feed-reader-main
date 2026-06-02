import React from 'react'
import { Inbox, Bookmark } from "lucide-react"

const SidebarItem = ({ icon: Icon, label, count, active }) => {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
        active
          ? "bg-light-accent-subtle text-light-accent dark:bg-dark-accent-subtle dark:text-dark-accent"
          : "text-light-text-secondary hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="size-4" />
        {label}
      </span>
      {count != null && (
        <span className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-xs font-medium leading-none ${
          active
            ? "bg-light-accent/10 text-light-accent dark:bg-dark-accent/15 dark:text-dark-accent"
            : "bg-light-bg-tertiary text-light-text-tertiary dark:bg-dark-bg-tertiary dark:text-dark-text-tertiary"
        }`}>
          {count}
        </span>
      )}
    </button>
  )
}

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-1 px-3 py-4">
      <SidebarItem icon={Inbox} label="All Items" count={37} active />
      <SidebarItem icon={Bookmark} label="Saved" count={3} />
    </aside>
  )
}

export default Sidebar
