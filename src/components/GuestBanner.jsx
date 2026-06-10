import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const GuestBanner = () => {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="fixed bottom-6 right-6 z-40 w-[calc(100%-2rem)] max-w-105 rounded-lg border border-light-border-subtle bg-light-surface px-5 py-4 shadow-lg dark:border-dark-border-subtle dark:bg-dark-surface">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-sans text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            You're browsing as a guest
          </p>
          <p className="font-sans text-xs leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
            Sign up to save feeds, sync across devices, and add your own sources
          </p>
        </div>
        <Link
          to="/signup"
          className="inline-flex w-full items-center justify-center rounded-md bg-light-accent px-4 py-2 font-sans text-sm font-medium text-white transition-all duration-200 hover:bg-light-accent-hover hover:scale-[1.02] active:scale-[0.98] dark:bg-dark-accent dark:text-dark-bg-primary dark:hover:bg-dark-accent-hover"
        >
          Sign Up Free
        </Link>
      </div>
    </motion.div>
  )
}

export default GuestBanner
