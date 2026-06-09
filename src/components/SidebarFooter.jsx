import React from 'react'
import { Moon, Sun, Settings } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const SidebarFooter = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center justify-between border-t border-light-border-subtle px-3 py-3 dark:border-dark-border-subtle">
      <button
        onClick={() => {}}
        className="rounded-md p-2 text-light-text-tertiary transition-colors duration-150 hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
      >
        <Settings className="size-8" />
      </button>

      <button
        onClick={toggleTheme}
        className="rounded-md p-2 text-light-text-tertiary transition-colors duration-150 hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
      >
        {theme === 'light' ? <Moon className="size-8" /> : <Sun className="size-8" />}
      </button>
    </div>
  )
}

export default SidebarFooter
