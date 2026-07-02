import React, { useState, useCallback, useEffect } from 'react'
import { Outlet, useOutletContext } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import FeedToolbar from "../components/FeedToolbar"
import ArticleModal from "../components/ArticleModal"
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext';
import CategoryOptions from '../components/CategoryOptions'
// import { a, article, pre } from 'framer-motion/client'


const FeedLayout = () => {
  const [filter, setFilter] = useState({ type: null, value: null })
  const [feedContent, setFeedContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [viewMode, setViewMode] = useState('list')
  const { searchQuery, setSearchQuery } = useOutletContext() || {}
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [savedArticles, setSavedArticles] = useState(() => {
    const stored = sessionStorage.getItem('savedArticles')
    return stored ? JSON.parse(stored) : []
  })
  const [categories, setCategories] = useState([])
  const [uncategorizedFeeds, setUncategorizedFeeds] = useState([])
  const { user } = useAuth();
  const [feedsVersion, setFeedsVersion] = useState(0)
  const [readArticleUrls, setReadArticleUrls] = useState(new Set())
  const [showCategoryOptions, setShowCategoryOptions] = useState(false)
  const [movingFeedUrl, setMovingFeedUrl] = useState(null)


  useEffect(() => {


    const fetchData = async () => {
      try {
        
        if (!user) return

        const { data, error } = await supabase
          .from('categories')
          .select(`
            id,
            name,
            feeds (
              id,
              title,
              feed_url,
              site_url,
              description
            )
          `)
          .eq('user_id', user.id)

          if (error) {
            console.error("Error fetching categories:", error.message)
            return
          }
        console.log("Fetched categories:", data)
        setCategories(data || [])

        const { data: uncategorizedData, error: uncategorizedError } = await supabase
        .from('feeds')
        .select('*')
        .eq('user_id', user.id)
        .is('category_id', null)

        if (uncategorizedError) {
          console.error("Error fetching uncategorized feeds:", uncategorizedError.message)
          return
        }
        setUncategorizedFeeds(uncategorizedData || [])


        const {data: readstateData, error: readstateError} = await supabase
          .from('read_state')
          .select(`article_url`)
          .eq('user_id', user.id)

        if (readstateError) {
          console.error("Error fetching uncategorized feeds:", readstateError.message)
          return
        }

        setReadArticleUrls(new Set(readstateData.map(item => item.article_url)))   
        
        
        const {data: bookMarkedData, error: bookMarkedError} = await supabase
          .from('bookmarks')
          .select(`
            id,
            article_url,
            title,
            summary,
            author,
            published_at,
            feed_id
            `)
          .eq('user_id', user.id)


          if(bookMarkedError) {
            console.log("Error fetching Bookmarked values:", bookMarkedError.message)
            return;
          }

          setSavedArticles(bookMarkedData)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchData()
  }, [user, feedsVersion])



  const insertBookmark = async (article) => {
     try {
      const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            article_url: article.url,
            title: article.title,
            summary: article.summary,
            author: article.author,
            published_at: article.publishedAt
          })

      if (error) {
        console.log(error.message)
        return
      }
     } catch (error) {
      console.log(error.message)
     }
  }

  const deleteBookmark = async (articleUrl) => {
    // Supabase delete
    try {
      const {error: deleteError} = await supabase
        .from('bookmarks')
        .delete()
        .eq('article_url', articleUrl)
        .eq('user_id', user.id)

        if (deleteError) {
          console.log(deleteError.message)
          return
        }
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    if (!user) {
      sessionStorage.setItem('savedArticles', JSON.stringify(savedArticles))
    }
  }, [savedArticles, user])



  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  const toggleSaveArticle = useCallback((article) => {
    setSavedArticles((prev) => {
      const exists = prev.some((a) => (a.article_url || a.url)  === article.url)
      if (exists) {
        deleteBookmark(article.url)
        return prev.filter((a) => (a.article_url || a.url)  !== article.url)
      }
      insertBookmark(article)
      return [...prev, article]
    })
  }, [])

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

      
        



  const UpdateReadStatus = async (articleUrl) => {
    console.log('UpdateReadStatus called with:', articleUrl)
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('read_state')
        .insert({
          user_id: user.id,
          article_url: articleUrl  // ← use parameter directly
        })

      if (error) {
        console.log('Failed to mark as read:', error.message)
        return
      }

      setReadArticleUrls(prev => new Set([...prev, articleUrl]))
    } catch (error) {
      console.log(error.message)
    }
  }

  const addNewCategory = async (categoryName) => {
    if (!user || !categoryName.trim()) return

    try{
      const { data, error } = await supabase
        .from('categories')
        .insert({
          user_id: user.id,
          name: categoryName.trim()
        })
        .select()

        
        if (error) {
          console.log("Error adding new category:", error.message)
          return
        }
        
        setFeedsVersion((prev) => prev + 1)

    } catch (error) {
      console.log("Error adding new category:", error.message)
    }
  }

  const deleteCategory = async (categoryName) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('categories')
        .delete()
        .eq('name', categoryName)

      if (error) {
        console.log("Error deleting category:", error.message)
        return
      }

      setFeedsVersion((prev) => prev + 1)
    } catch (error) {
      console.log("Error deleting category:", error.message)
    }
  }

  const editCategory = async (oldName, newName) => {
    if (!user || !newName.trim()) return

    try{
      const { data, error } = await supabase
        .from('categories')
        .update({ name: newName.trim() })
        .eq('user_id', user.id)
        .eq('name', oldName)
        .select()

      if (error) {
        console.log("Error editing category:", error.message)
        return
      }

      setFeedsVersion((prev) => prev + 1)

    } catch (error) {
      console.log("Error editing category:", error.message)
    }
  }

  const deleteFeed = async (feedUrl) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('feeds')
        .delete()
        .eq('feed_url', feedUrl)
        .eq('user_id', user.id)

      if (error) {
        console.log("Error deleting feed:", error.message)
        return
      }

      setFeedsVersion((prev) => prev + 1)
    } catch (error) {
      console.log("Error deleting feed:", error.message)
    }
  }

  const handleFeedMove = (feedUrl, oldCategory) => {
    setShowCategoryOptions((prev) => !prev)
    console.log(`Moving feed ${feedUrl} from category ${oldCategory}`)
    setMovingFeedUrl(feedUrl)  // Store the feed URL to be moved
    // Implement the logic to move the feed to a new category
    // This could involve calling a function passed down as a prop
    // For example: moveFeed(feedUrl, newCategory);
  }

  const moveFeed = async (feedUrl, newCategoryid) => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('feeds')
        .update({ category_id: newCategoryid ? newCategoryid : null })
        .eq('feed_url', feedUrl)
        .eq('user_id', user.id)
        

      if (error) {
        console.log("Error moving feed:", error.message)
        return
      }

      setFeedsVersion((prev) => prev + 1)
    } catch (error) {
      console.log("Error moving feed:", error.message)
    }
  }

  return (
    <div className="flex h-screen flex-col font-sans">
      {/* <NavBar  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> */}

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar — always visible at md+ */}
        <div className="hidden md:block w-sidebar shrink-0 overflow-y-auto border-r border-light-border-subtle bg-light-bg-primary dark:border-dark-border dark:bg-dark-bg-primary">
          <Sidebar filter={filter} setFilter={setFilter} savedCount={savedArticles.length} categories={categories} uncategorizedData={uncategorizedFeeds} addNewCategory={addNewCategory} deleteCategory={deleteCategory} editCategory={editCategory} deleteFeed={deleteFeed} handleFeedMove={handleFeedMove} />
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
                className="fixed left-0 top-0 bottom-0 z-50 w-70 overflow-y-auto border-r border-light-border-subtle bg-light-bg-primary shadow-xl dark:border-dark-border dark:bg-dark-bg-primary md:hidden"
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
                <Sidebar filter={filter} setFilter={handleFilterChange} categories={categories} uncategorizedData={uncategorizedFeeds} addNewCategory={addNewCategory} deleteCategory={deleteCategory} editCategory={editCategory} deleteFeed={deleteFeed} handleFeedMove={handleFeedMove} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col overflow-hidden bg-light-bg-secondary dark:bg-dark-bg-primary">
          <div className="shrink-0">
            <FeedToolbar
              onToggleSidebar={() => setSidebarOpen(true)}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onResetFilter={() => setFilter({ type: null, value: null })}
              isAllItemsActive={filter.type === null}
              onRefresh={async () => {
                setLoading(true)
                try {
                  setFeedsVersion((prev) => prev + 1)
                } finally {
                  setLoading(false)
                }
              }}
            />
          </div>

          <main className="flex-1 overflow-y-auto bg-light-bg-secondary dark:bg-dark-bg-primary">
            <div className="mx-auto max-w-container-feed px-4 py-4 sm:px-6 sm:py-6">
              <Outlet context={{ filter, fetchFeed, feedContent, clearFeedContent, loading, selectArticle: setSelectedArticle, viewMode, debouncedSearchQuery, savedArticles, toggleSaveArticle, categories, setFeedsVersion, feedsVersion, uncategorizedFeeds, markAsRead: UpdateReadStatus, readArticleUrls }} />
            </div>
          </main>
        </div>
      </div>
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCategoryOptions && (
          <CategoryOptions
            category={categories}
            onClose={() => setShowCategoryOptions(false)}
            moveFeed={moveFeed}
            movingFeedUrl={movingFeedUrl}  // Pass the feed URL to be moved
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default FeedLayout
