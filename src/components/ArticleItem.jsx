import React from 'react'
import { ExternalLink } from "lucide-react"

const ArticleItem = ({ title, summary, author, publishedAt, url }) => {
  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 rounded-lg border border-light-border-subtle bg-light-surface p-4 sm:p-6 transition-colors duration-150 hover:border-light-border dark:border-dark-border-subtle dark:bg-dark-surface dark:hover:border-dark-border">
      <h3 className="text-base sm:text-lg font-medium leading-snug text-light-text-primary dark:text-dark-text-primary">
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
  )
}

export default ArticleItem
