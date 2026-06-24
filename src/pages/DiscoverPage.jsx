import React, { useState } from 'react'
import { Rss } from 'lucide-react'
import { ClipLoader } from 'react-spinners'
import ArticleCard from '../components/ArticleCard'
import ArticleItem from '../components/ArticleItem'
import { ArrowLeft } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';




const DiscoverPage = () => {

  const [url, setUrl] = useState('')
  const [showArticles, setShowArticles] = useState(false)
  const { selectArticle } = useOutletContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [feedPreview, setFeedPreview] = useState(null)
  const { user } = useAuth();
  const [followed, setFollowed] = useState(false)

  const fetchFeed = async (feedUrl) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/api/preview-feed?url=${encodeURIComponent(feedUrl)}`)
      const data = await response.json()
      // console.log("Fetched feed data:", data)

      if (data.error) {
        setError(data.error)  // show error message
        return               // don't set feedPreview
      }

      if (!user) return
      const { data: existingFeed } = await supabase
        .from('feeds')
        .select('id')
        .eq('feed_url', data.feedUrl)
        .eq('user_id', user.id)
        .single()

      if (existingFeed) {
        setFollowed(true)
      } else {
        setFollowed(false)
      }

      setFeedPreview(data)

    } catch (error) {
      console.error("Failed to fetch feed:", error)
    } finally {
      setLoading(false)
      setUrl('')
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setFeedPreview(null) 
    setError('')         
    setShowArticles(false)
    fetchFeed(url)

    // console.log("Submitted URL:", url)
    // console.log("Feed preview data:", feedPreview)
  }

  const insertFeed = async () => {

    try {

      if (followed) {
        const { error: deleteError } = await supabase
          .from('feeds')
          .delete()
          .eq('feed_url', feedPreview.feedUrl)
          .eq('user_id', user.id)

          if (deleteError) {
            setError(deleteError.message)
            return
          }
          
          setFollowed(false) 
          toast.success(`Unfollowed ${feedPreview.title}`)  

        } else {
        const {data, error} = await supabase
        .from('feeds')
        .insert({
          title: feedPreview.title,
          feed_url: feedPreview.feedUrl,
          description: feedPreview.description,
          favicon: feedPreview.favicon,
          status: 'active',
          user_id: user.id,
          category_id: null
        })

        if (error) {
          setError(error.message)
          return;
        }

        setFollowed(true)
        toast.success(`you followed ${feedPreview.title}`);
      }
    } catch (error) {
      setError(error.message)
      console.error("Error fetching categories:", error)
      
    }

  }





  return (
    <div className="flex min-h-[60vh] flex-col items-start gap-6 font-sans ">
      <div className="w-full max-w-150">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-1.5">
          <h1 className="font-serif text-2xl tracking-[-0.02em] text-light-text-primary dark:text-dark-text-primary">
            Discover Feeds
          </h1>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Add any blog, newsletter or publication by pasting its URL below
          </p>
        </div>

        {/* Input row */}
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <div className="relative flex-1">
            <Rss className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a feed or website URL..."
              disabled={loading}
              className="w-full rounded-lg border border-light-border bg-light-bg-secondary py-3 pl-10 pr-4 font-sans text-base text-light-text-primary outline-none transition-all duration-200 placeholder:text-light-text-tertiary hover:border-light-text-tertiary focus:border-light-accent focus:ring-2 focus:ring-light-accent/20 disabled:opacity-60 dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary dark:hover:border-dark-text-tertiary dark:focus:border-dark-accent dark:focus:ring-dark-accent/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-light-text-primary px-5 py-3 font-sans text-sm font-medium text-white transition-all duration-200 hover:bg-light-text-primary/85 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 dark:bg-dark-text-primary dark:text-dark-bg-primary dark:hover:bg-dark-text-primary/90"
          >
            {loading ? (
              <ClipLoader size={16} color="currentColor" />
            ) : (
              'Find Feed'
            )}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="mt-3 rounded-lg border border-light-error/20 bg-light-error/5 px-4 py-3 text-sm text-light-error dark:border-dark-error/20 dark:bg-dark-error/5 dark:text-dark-error">
            {error}
          </div>
        )}
      </div>
      
      <div className='flex flex-col space-y-6 w-full mt-12'>
        {showArticles && (
          <button
          onClick={() => setShowArticles(false)}
          className="flex items-center gap-1.5 text-sm font-medium text-light-text-secondary transition-colors hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to feeds
        </button>
        )}
        {loading ? (
          <div className='w-full text-center self-center mt-12'>
            <ClipLoader size={64} color="currentColor" />
          </div>
        ): feedPreview && (showArticles ? 
            feedPreview.items.map((article, index) => (
              <ArticleItem
                key={article.url || index}
                title={article.title}
                summary={article.summary}
                author={article.author}
                publishedAt={article.publishedAt}
                url={article.url}
                onTitleClick={() => selectArticle(article)}
              />
            ))
            :
            <ArticleCard
              title={feedPreview.title}
              feedUrl={feedPreview.feedUrl}
              siteUrl={feedPreview.siteUrl}
              description={feedPreview.description}
              format={feedPreview.format}
              category={feedPreview.category}
              onCardClick={() => setShowArticles(true)}
              showFollow={true}
              insertFeed={insertFeed}
              followed={followed}
              setFollowed={setFollowed}
            />
        )}
      </div>

    </div>
  )
}

export default DiscoverPage
