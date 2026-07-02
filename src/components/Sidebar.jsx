import React from 'react'
import { Inbox, Bookmark } from "lucide-react"
import sampleFeeds from "../../data/sample-feeds.json"
import SidebarItem from "./SidebarItem"
import CategoryGroup from "./CategoryGroup"
import SidebarFooter from "./SidebarFooter"
import { useAuth } from '../context/AuthContext';
import { useState } from 'react'
import { pre } from 'framer-motion/client'

const Sidebar = ({ filter, setFilter, savedCount, categories, uncategorizedData, addNewCategory, deleteCategory, editCategory, deleteFeed, handleFeedMove }) => {
  const [showInput, setShowInput] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [inputError, setInputError] = useState("")
  const { user } = useAuth();

  const handleAllItems = () => {
    setFilter({ type: null, value: null })
    console.log(categories)
  }

  const handleSaved = () => {
    setFilter({ type: "saved", value: "Saved" })
  }

    const currentCategories = user ? categories : sampleFeeds.categories

    const totalFeeds = categories.flatMap(c => c.feeds).length + uncategorizedData.length

    const handleNewCategory = () => {
      if (newCategory.trim() !== "") {
        setInputError("");
        addNewCategory(newCategory);
        setNewCategory("");
        setShowInput(false);
      } else {
        setInputError("Category name cannot be empty.");
      }
    }

    

  return (
    <aside className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <SidebarItem
          icon={Inbox}
          label="All Items"
          count={totalFeeds}
          active={filter.type === null}
          onClick={handleAllItems}
        />
        <SidebarItem
          icon={Bookmark}
          label="Saved"
          count={savedCount}
          active={filter.type === "saved"}
          onClick={handleSaved}
        />

        <div className="my-2 border-t border-light-border-subtle dark:border-dark-border-subtle" />

        <div className="flex flex-row justify-between px-3 py-1.5">
          <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-light-text-tertiary dark:text-dark-text-tertiary">
            Categories
          </span>

          <button onClick={() => setShowInput((prev) => !prev)} aria-label="Add new category"
          className={`text-lg px-2 border border-light-border-subtle dark:border-dark-border-subtle rounded-md font-light text-light-text-secondary transition-all duration-150 hover:border-light-accent hover:bg-light-accent-subtle hover:text-light-accent active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:bg-dark-accent-subtle dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent ${
            showInput
              ? "rotate-45 text-light-accent dark:text-dark-accent"
              : "rotate-0 text-light-text-secondary dark:text-dark-text-secondary"
          }`}>
            +
          </button>
        </div>

        {currentCategories.map((category) => (
          <CategoryGroup
            key={category.name}
            name={category.name}
            feeds={category.feeds}
            filter={filter}
            setFilter={setFilter}
            deleteCategory={deleteCategory}
            editCategory={editCategory}
            deleteFeed={deleteFeed}
            handleFeedMove={handleFeedMove}
          />
        ))}

        {uncategorizedData?.length > 0 && (
          <CategoryGroup
            name="Uncategorized"
            feeds={uncategorizedData}
            filter={filter}
            setFilter={setFilter}
            deleteCategory={deleteCategory}
            editCategory={editCategory}
            deleteFeed={deleteFeed}
            handleFeedMove={handleFeedMove}
          />
        )}

        {showInput && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 px-3 py-1.5">
              <input
                  type="text"
                  placeholder="Add category"
                  aria-label="Add category"
                  className={`h-9 w-full rounded-md border border-light-border bg-light-bg-secondary px-3 py-1.5 text-sm text-light-text-primary placeholder:text-light-text-tertiary focus:border-light-accent focus:outline-none focus:ring-1 focus:ring-light-accent dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary dark:focus:border-dark-accent dark:focus:ring-dark-accent ${inputError ? "border-red-500 dark:border-red-400" : ""}`}
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
              />
              <button onClick={handleNewCategory} className="rounded-md bg-light-accent text-light-accent-subtle hover:bg-light-accent-subtle hover:text-light-accent active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-accent dark:text-dark-accent-subtle dark:hover:bg-dark-accent-subtle dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent px-2 py-1.5 text-sm font-medium transition-all duration-150">
                Add
              </button>
            </div>
            {inputError && (
              <p className="px-3 text-xs text-red-500 dark:text-red-400">{inputError}</p>
            )
            }
          </div>
        )}
      </div>

      <SidebarFooter />
    </aside>
  )
}

export default Sidebar
