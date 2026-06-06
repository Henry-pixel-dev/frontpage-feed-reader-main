import React from 'react'
import { Rss, Globe } from "lucide-react"

const categoryColors = {
  "Frontend": "bg-light-accent dark:bg-dark-accent",
  "Design": "bg-purple-500 dark:bg-purple-400",
  "Backend & DevOps": "bg-light-success dark:bg-dark-success",
  "General Tech": "bg-light-warning dark:bg-dark-warning",
  "AI & ML": "bg-rose-500 dark:bg-rose-400",
}

const ArticleCard = ({ title, feedUrl, siteUrl, description, format, notes, category, onCardClick }) => {
  const dotColor = categoryColors[category] || "bg-light-text-tertiary dark:bg-dark-text-tertiary"

  return (
    <div
      onClick={() => onCardClick(feedUrl)}
      className="cursor-pointer flex flex-row space-x-3 rounded-lg border border-light-border-subtle bg-light-surface p-4 sm:p-6 transition-colors duration-150 hover:border-light-border dark:border-dark-border-subtle dark:bg-dark-surface dark:hover:border-dark-border">
      <div className="pt-1.5">
        <span className={`inline-block size-2.5 shrink-0 rounded-full ${dotColor}`} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-row items-center gap-2 text-light-text-tertiary dark:text-dark-text-tertiary">
          <Rss className="size-3.5" />
          <span className="text-xs font-medium uppercase tracking-wide">{format}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-base sm:text-lg font-medium leading-snug text-light-text-primary dark:text-dark-text-primary">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-light-accent dark:hover:text-dark-accent"
            >
              <Globe className="size-3" />
              {siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
            <span className="text-light-border dark:text-dark-border">|</span>
            <span className="truncate">{feedUrl}</span>
          </div>
        </div>

        {notes && (
          <p className="rounded-md bg-light-bg-tertiary px-3 py-2 text-xs leading-relaxed text-light-text-tertiary dark:bg-dark-bg-tertiary dark:text-dark-text-tertiary">
            {notes}
          </p>
        )}
      </div>
    </div>
  )
}

export default ArticleCard
