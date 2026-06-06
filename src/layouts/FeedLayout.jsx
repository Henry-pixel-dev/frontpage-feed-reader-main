import React, { useState, useCallback } from 'react'
import { Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import FeedToolbar from "../components/FeedToolbar"

const FeedLayout = () => {
  const [filter, setFilter] = useState({ type: null, value: null })
  const [feedContent, setFeedContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const clearFeedContent = () => setFeedContent(null)

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
    setSidebarOpen(false)
  }, [])

  const fetchFeed = async (feedUrl) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/api/feed?url=${encodeURIComponent(feedUrl)}`)
      const data = await response.json()
      console.log("Fetched feed data:", data)
      const articles = data.items || data.entries || data.articles || []
      setFeedContent(articles)
    } catch (error) {
      console.error("Failed to fetch feed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col font-sans">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar — always visible at md+ */}
        <div className="hidden md:block w-sidebar shrink-0 overflow-y-auto border-r border-light-border-subtle bg-light-bg-primary dark:border-dark-border dark:bg-dark-bg-primary">
          <Sidebar filter={filter} setFilter={setFilter} />
        </div>

        {/* Mobile sidebar — slide-over overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeSidebar}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 z-50 w-[280px] overflow-y-auto border-r border-light-border-subtle bg-light-bg-primary shadow-xl dark:border-dark-border dark:bg-dark-bg-primary md:hidden"
              >
                <div className="flex items-center justify-between border-b border-light-border-subtle px-4 py-3 dark:border-dark-border">
                  <span className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                    Feeds
                  </span>
                  <button
                    onClick={closeSidebar}
                    className="rounded-md p-1.5 text-light-text-tertiary transition-colors hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <Sidebar filter={filter} setFilter={handleFilterChange} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="shrink-0">
            <FeedToolbar onToggleSidebar={() => setSidebarOpen(true)} />
          </div>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-container-feed px-4 py-4 sm:px-6 sm:py-6">
              <Outlet context={{ filter, fetchFeed, feedContent, clearFeedContent, loading }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default FeedLayout
