import React from 'react'
import { LayoutGrid, LayoutList, ChevronDown, RefreshCw, CheckCheck, PanelLeft } from "lucide-react"

const ToolbarButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-light-text-secondary transition-colors duration-150 hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
    >
      <Icon className="size-4" />
      {label && <span className="hidden sm:inline">{label}</span>}
    </button>
  )
}

const FeedToolbar = ({ onToggleSidebar }) => {
  return (
    <div className="flex items-center justify-between border-b border-light-border-subtle px-4 py-2 sm:px-6 sm:py-2.5 dark:border-dark-border">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          aria-label="Open sidebar"
          className="flex items-center justify-center rounded-md p-1.5 text-light-text-secondary transition-colors hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary md:hidden"
        >
          <PanelLeft className="size-[18px]" />
        </button>

        <h2 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
          All Items
        </h2>
        <div className="hidden sm:flex items-center rounded-md border border-light-border dark:border-dark-border">
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
      <div className="flex items-center gap-0.5 sm:gap-1">
        <button className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-light-text-secondary transition-colors duration-150 hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary">
          <span className="text-xs sm:text-sm">Newest</span>
          <ChevronDown className="size-3.5" />
        </button>
        <ToolbarButton icon={RefreshCw} label="Refresh" />
        <ToolbarButton icon={CheckCheck} label="Mark all as read" />
      </div>
    </div>
  )
}

export default FeedToolbar
