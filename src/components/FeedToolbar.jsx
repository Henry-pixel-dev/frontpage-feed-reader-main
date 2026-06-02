import React from 'react'
import { LayoutGrid, LayoutList, ChevronDown, RefreshCw, CheckCheck } from "lucide-react"

const ToolbarButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-light-text-secondary transition-colors duration-150 hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
    >
      <Icon className="size-4" />
      {label && <span className="hidden sm:inline">{label}</span>}
    </button>
  )
}

const FeedToolbar = () => {
  return (
    <div className="flex items-center justify-between border-b border-light-border-subtle px-6 py-2.5 dark:border-dark-border">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
          All Items
        </h2>
        <div className="flex items-center rounded-md border border-light-border dark:border-dark-border">
          <button
            aria-label="Grid view"
            className="flex items-center justify-center rounded-l-md bg-light-bg-secondary px-2 py-1.5 text-light-accent dark:bg-dark-bg-secondary dark:text-dark-accent"
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            aria-label="List view"
            className="flex items-center justify-center rounded-r-md px-2 py-1.5 text-light-text-tertiary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary"
          >
            <LayoutList className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-light-text-secondary transition-colors duration-150 hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary">
          Newest
          <ChevronDown className="size-3.5" />
        </button>
        <ToolbarButton icon={RefreshCw} label="Refresh" />
        <ToolbarButton icon={CheckCheck} label="Mark all as read" />
      </div>
    </div>
  )
}

export default FeedToolbar
