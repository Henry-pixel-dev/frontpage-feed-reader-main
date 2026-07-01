import React, { useState } from 'react'
import { ChevronRight } from "lucide-react"

const categoryDotColors = {
  "Frontend": "bg-light-accent dark:bg-dark-accent",
  "Design": "bg-purple-500 dark:bg-purple-400",
  "Backend & DevOps": "bg-light-success dark:bg-dark-success",
  "General Tech": "bg-light-warning dark:bg-dark-warning",
  "AI & ML": "bg-rose-500 dark:bg-rose-400",
}

const CategoryGroup = ({ name, feeds, filter, setFilter, deleteCategory }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)


  const dotColor = categoryDotColors[name] || "bg-light-text-tertiary dark:bg-dark-text-tertiary"

  const isCategoryActive = filter.type === "category" && filter.value === name
  const isFeedActive = (feedTitle) =>
    filter.type === "feed" && filter.value === feedTitle

  const handleCategoryClick = () => {
    setIsOpen((prev) => !prev)

    if (isCategoryActive) {
      setFilter({ type: null, value: null })
    } else {
      setFilter({ type: "category", value: name })
    }
  }

  const handleFeedClick = (feedTitle) => {
    if (isFeedActive(feedTitle)) {
      setFilter({ type: null, value: null })
    } else {
      setFilter({ type: "feed", value: feedTitle })
    }
  }

  const handleDeleteCategory = (categoryName) => {
    if (window.confirm(`Are you sure you want to delete the category "${categoryName}"? This will also remove all feeds under this category.`)) {
      deleteCategory(categoryName)
      setShowMenu(false) // Close the menu after deletion;
    }
  }


  return (
    <div>
      <div className="flex space-x-3 items-start">
        <button
          onClick={handleCategoryClick}
          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
            isCategoryActive
              ? "bg-light-accent-subtle text-light-accent dark:bg-dark-accent-subtle dark:text-dark-accent"
              : "text-light-text-secondary hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span className={`inline-block size-2 rounded-full ${dotColor}`} />
            {name}
          </span>
          <ChevronRight
            className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          />
        </button>

        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className={`opacity-40 transition-opacity duration-150 ${
            showMenu
              ? "text-light-accent dark:text-dark-accent"
              : "text-light-text-secondary dark:text-dark-text-secondary"
          } hover:opacity-100 hover:text-light-accent dark:hover:text-dark-accent`}
        >
          <span className="text-lg">...</span>
        </button>
      </div>

      {showMenu && (
        <div className="absolute z-10 mt-2 w-48 rounded-md bg-light-bg-secondary shadow-lg dark:bg-dark-bg-secondary">
          <ul className="py-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <li>
              <button className="block w-full px-4 py-2 hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary">
                Edit Category
              </button>
            </li>
            <li>
              <button className="block w-full px-4 py-2 hover:bg-light-bg-primary dark:hover:bg-dark-bg-primary" onClick={() => handleDeleteCategory(name)}>
                Delete Category
              </button>
            </li>
          </ul>
        </div>
      )}

      {isOpen && (
        <div className="ml-5 flex flex-col gap-0.5 border-l border-light-border-subtle py-1 pl-3 dark:border-dark-border-subtle">
          {feeds.map((feed) => (
            <button
              key={feed.feedUrl || feed.feed_url}
              onClick={() => handleFeedClick(feed.title)}
              className={`w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors duration-150 ${
                isFeedActive(feed.title)
                  ? "bg-light-accent-subtle text-light-accent dark:bg-dark-accent-subtle dark:text-dark-accent"
                  : "text-light-text-tertiary hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
              }`}
            >
              {feed.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryGroup
