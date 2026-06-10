import React from 'react'
import { ExternalLink, Bookmark } from "lucide-react"

const ArticleItem = ({ title, summary, author, publishedAt, url, onTitleClick, isSaved, onToggleSave }) => {
  return (
    <div className="flex flex-row items-start gap-3 rounded-lg border border-light-border-subtle bg-light-surface p-4 sm:p-6 transition-colors duration-150 hover:border-light-border dark:border-dark-border-subtle dark:bg-dark-surface dark:hover:border-dark-border">
      <div className="flex flex-1 flex-col gap-2.5 sm:gap-3">
        <h3
          onClick={onTitleClick}
          className="cursor-pointer text-base sm:text-lg font-medium leading-snug text-light-text-primary transition-colors hover:text-light-accent dark:text-dark-text-primary dark:hover:text-dark-accent"
        >
          {title}
        </h3>

      {summary && (
        <p className="text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
          {summary}
        </p>
      )}

      {(author || publishedAt) && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
          {author && <span>{author}</span>}
          {author && publishedAt && (
            <span className="text-light-border dark:text-dark-border">|</span>
          )}
          {publishedAt && <span>{publishedAt}</span>}
        </div>
      )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5 text-xs font-medium text-light-accent transition-colors hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
        >
          Read original
          <ExternalLink className="size-3" />
        </a>
      </div>

      <button
        onClick={onToggleSave}
        className={`shrink-0 rounded-md p-1.5 transition-colors ${
          isSaved
            ? "text-light-accent dark:text-dark-accent"
            : "text-light-text-tertiary hover:bg-light-bg-secondary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
        }`}
      >
        <Bookmark className="size-4" fill={isSaved ? "currentColor" : "none"} />
      </button>
    </div>
  )
}

export default ArticleItem
