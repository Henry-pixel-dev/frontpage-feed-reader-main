import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ArrowLeft } from 'lucide-react'


const CategoryOptions = ({category, onClose, movingFeedUrl, moveFeed}) => {

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose()
        }
    }

  const allCategories = [...category, { name: 'Uncategorized', id: null }]

  const handleCategoryClick = (catId) => {
    if (movingFeedUrl) {
      moveFeed(movingFeedUrl, catId)  // Call the moveFeed function with the feed URL and the selected category ID
      onClose()
    }
  }


  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />

        <motion.div
          className="relative z-10 flex w-full max-w-150 max-h-[85vh] flex-col rounded-lg border border-light-border-subtle bg-light-surface shadow-xl dark:border-dark-border-subtle dark:bg-dark-surface"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-light-border-subtle px-4 py-3 sm:px-6 dark:border-dark-border-subtle">


            <button
              onClick={onClose}
              className="rounded-md p-1 text-light-text-tertiary transition-colors hover:bg-light-bg-tertiary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-tertiary dark:hover:text-dark-text-primary cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="overflow-y-auto p-4 sm:p-6">
            <AnimatePresence mode="wait">
              <div className="flex flex-col gap-2">
                {
                  allCategories.map((cat) => (
                    <button key={cat.id}
                    onClick={() => handleCategoryClick(cat.id ? cat.id : null)}
                    aria-label={`button-${cat.name}`}
                     className="flex items-center justify-between rounded-md border border-light-border-subtle bg-light-bg-secondary px-3 py-2 text-sm text-light-text-primary transition-colors hover:bg-blue-200 dark:border-dark-border-subtle dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:bg-dark-bg-primary cursor-pointer">
                      <span>{cat.name}</span>
                    </button>
                  ))
                }
              </div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CategoryOptions