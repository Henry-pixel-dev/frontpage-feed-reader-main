import React from 'react'
import { Inbox, Bookmark } from "lucide-react"
import sampleFeeds from "../../data/sample-feeds.json"
import SidebarItem from "./SidebarItem"
import CategoryGroup from "./CategoryGroup"
import SidebarFooter from "./SidebarFooter"
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ filter, setFilter, savedCount, categories, uncategorizedData }) => {
  const { user } = useAuth();

  const handleAllItems = () => {
    setFilter({ type: null, value: null })
  }

  const handleSaved = () => {
    setFilter({ type: "saved", value: "Saved" })
  }

    const currentCategories = user ? categories : sampleFeeds.categories

  return (
    <aside className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <SidebarItem
          icon={Inbox}
          label="All Items"
          count={37}
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

        <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-light-text-tertiary dark:text-dark-text-tertiary">
          Categories
        </span>

        {currentCategories.map((category) => (
          <CategoryGroup
            key={category.name}
            name={category.name}
            feeds={category.feeds}
            filter={filter}
            setFilter={setFilter}
          />
        ))}

        {uncategorizedData?.length > 0 && (
          <CategoryGroup
            name="Uncategorized"
            feeds={uncategorizedData}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <SidebarFooter />
    </aside>
  )
}

export default Sidebar
