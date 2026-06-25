import React from 'react'
import { ExternalLink, Bookmark } from "lucide-react"

const ArticleItem = ({ title, summary, author, publishedAt, url, onTitleClick, isSaved, onToggleSave, isRead }) => {
  return (
    <div
      className={`group relative flex flex-row items-start gap-3 rounded-lg border p-4 sm:p-6 transition-all duration-200 ${
        isRead
          ? "border-light-border-subtle bg-light-surface hover:border-light-border dark:border-dark-border-subtle dark:bg-dark-surface dark:hover:border-dark-border"
          : "border-light-unread/20 bg-light-accent-subtle/40 shadow-sm hover:border-light-unread/40 hover:shadow-md dark:border-dark-unread/20 dark:bg-dark-accent-subtle/40 dark:hover:border-dark-unread/40"
      }`}
    >
      {!isRead && (
        <div className="absolute top-0 left-0 h-full w-0.75 rounded-l-lg bg-light-unread dark:bg-dark-unread" />
      )}

      <div className="flex flex-1 flex-col gap-2.5 sm:gap-3">
        <div className="flex items-start gap-2">
          {!isRead && (
            <span className="mt-1.75 block size-1.75 shrink-0 rounded-full bg-light-unread dark:bg-dark-unread sm:mt-2.25" />
          )}
          <h3
            onClick={onTitleClick}
            className={`cursor-pointer text-base sm:text-lg leading-snug transition-colors ${
              isRead
                ? "font-normal text-light-text-secondary hover:text-light-accent dark:text-dark-text-secondary dark:hover:text-dark-accent"
                : "font-semibold text-light-text-primary hover:text-light-accent dark:text-dark-text-primary dark:hover:text-dark-accent"
            }`}
          >
            {title}
          </h3>
        </div>

        {summary && (
          <p
            className={`text-sm leading-relaxed ${
              isRead
                ? "text-light-text-tertiary dark:text-dark-text-tertiary"
                : "text-light-text-secondary dark:text-dark-text-secondary"
            }`}
          >
            {summary}
          </p>
        )}

        {(author || publishedAt) && (
          <div
            className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${
              isRead
                ? "text-light-text-tertiary/70 dark:text-dark-text-tertiary/70"
                : "text-light-text-tertiary dark:text-dark-text-tertiary"
            }`}
          >
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
          className={`flex w-fit items-center gap-1.5 text-xs font-medium transition-colors ${
            isRead
              ? "text-light-accent/60 hover:text-light-accent dark:text-dark-accent/60 dark:hover:text-dark-accent"
              : "text-light-accent hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
          }`}
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
