import React, { useState } from 'react'
import { Plus, Check } from 'lucide-react'

const FollowButton = () => {
  const [followed, setFollowed] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    setFollowed((prev) => !prev)
  }

  return (
    <button
      onClick={handleClick}
      className={`group/follow relative flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-250 ease-out ${
        followed
          ? 'bg-light-accent/10 text-light-accent ring-1 ring-inset ring-light-accent/25 hover:bg-red-500/10 hover:text-red-500 hover:ring-red-500/25 dark:bg-dark-accent/10 dark:text-dark-accent dark:ring-dark-accent/25 dark:hover:bg-red-400/10 dark:hover:text-red-400 dark:hover:ring-red-400/25'
          : 'bg-light-bg-tertiary text-light-text-secondary ring-1 ring-inset ring-light-border hover:bg-light-accent/10 hover:text-light-accent hover:ring-light-accent/30 dark:bg-dark-bg-tertiary dark:text-dark-text-secondary dark:ring-dark-border dark:hover:bg-dark-accent/10 dark:hover:text-dark-accent dark:hover:ring-dark-accent/30'
      }`}
    >
      {followed ? (
        <>
          <Check className="size-3.5 transition-transform duration-200 group-hover/follow:hidden" strokeWidth={2.5} />
          <Plus className="hidden size-3.5 rotate-45 transition-transform duration-200 group-hover/follow:block" strokeWidth={2.5} />
          <span className="group-hover/follow:hidden">Following</span>
          <span className="hidden group-hover/follow:inline">Unfollow</span>
        </>
      ) : (
        <>
          <Plus className="size-3.5 transition-transform duration-200 group-hover/follow:rotate-90" strokeWidth={2.5} />
          <span>Follow</span>
        </>
      )}
    </button>
  )
}

export default FollowButton
