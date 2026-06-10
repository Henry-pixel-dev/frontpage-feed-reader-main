import React, { useMemo } from 'react'
import { useOutletContext } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { PulseLoader } from "react-spinners"
import sampleFeeds from "../../data/sample-feeds.json"
import ArticleCard from "../components/ArticleCard"
import ArticleItem from "../components/ArticleItem"
import GuestBanner from "../components/GuestBanner"

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const GuestMode = () => {
  const { filter, fetchFeed, feedContent, clearFeedContent, loading, selectArticle, viewMode, debouncedSearchQuery, savedArticles, toggleSaveArticle } = useOutletContext()

  const shuffledFeeds = useMemo(() => {
    const allFeeds = sampleFeeds.categories.flatMap((category) =>
      category.feeds.map((feed) => ({
        ...feed,
        category: category.name,
      }))
    )
    return shuffle(allFeeds)
  }, [])

  const visibleFeeds = useMemo(() => {
    let feeds = shuffledFeeds

    if (filter.type === "category") {
      feeds = feeds.filter((feed) => feed.category === filter.value)
    } else if (filter.type === "feed") {
      feeds = feeds.filter((feed) => feed.title === filter.value)
    }

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase()
      feeds = feeds.filter((feed) =>
        feed.title.toLowerCase().includes(query) ||
        feed.description?.toLowerCase().includes(query)
      )
    }

    return feeds
  }, [filter, shuffledFeeds, debouncedSearchQuery])

  return (
    <div className="flex min-h-[60vh] flex-col items-start gap-6 font-sans">
      {feedContent ? (
        <button
          onClick={clearFeedContent}
          className="flex items-center gap-1.5 text-sm font-medium text-light-text-secondary transition-colors hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to feeds
        </button>
      ) : (
        <h1 className="text-base font-semibold text-light-text-primary dark:text-dark-text-primary">
          {filter.type === null ? "Today" : filter.value}
        </h1>
      )}

      <div className={`w-full ${
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
          : 'flex flex-col gap-3'
      }`}>
        {loading ? (
          <div className={`flex flex-col space-y-3 items-center justify-center py-20 ${
            viewMode === 'grid' ? 'sm:col-span-2' : ''
          }`}>
            <PulseLoader color="#6b7280" size={10} />
            <span className="ml-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">Loading feed...</span>
          </div>
        ) : filter.type === "saved" ? (
          savedArticles.length === 0 ? (
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary py-10 text-center w-full">
              No saved articles yet
            </p>
          ) : (
            savedArticles.map((article, index) => (
              <ArticleItem
                key={article.url || index}
                title={article.title}
                summary={article.summary}
                author={article.author}
                publishedAt={article.publishedAt}
                url={article.url}
                onTitleClick={() => selectArticle(article)}
                isSaved={true}
                onToggleSave={() => toggleSaveArticle(article)}
              />
            ))
          )
        ) : feedContent ? (
          feedContent.map((article, index) => (
            <ArticleItem
              key={article.url || index}
              title={article.title}
              summary={article.summary}
              author={article.author}
              publishedAt={article.publishedAt}
              url={article.url}
              onTitleClick={() => selectArticle(article)}
              isSaved={savedArticles.some((a) => a.url === article.url)}
              onToggleSave={() => toggleSaveArticle(article)}
            />
          ))
        ) : (
          visibleFeeds.length === 0 ? (
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary py-10 text-center w-full">
              No feeds found for &ldquo;{debouncedSearchQuery}&rdquo;
            </p>
          ) : (
            visibleFeeds.map((feed) => (
              <ArticleCard
                key={feed.feedUrl}
                title={feed.title}
                feedUrl={feed.feedUrl}
                siteUrl={feed.siteUrl}
                description={feed.description}
                format={feed.format}
                notes={feed.notes}
                category={feed.category}
                onCardClick={fetchFeed}
              />
            ))
          )
        )}
      </div>
      <GuestBanner />
    </div>
  )
}

export default GuestMode
