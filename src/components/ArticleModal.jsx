import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ArrowLeft } from 'lucide-react'

const ArticleModal = ({ article, onClose }) => {
  const [showFullContent, setShowFullContent] = useState(false)

  const hasFullContent = article.content && article.content.trim().length > 0

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />

        <motion.div
          className="relative z-10 flex w-full max-w-[600px] max-h-[85vh] flex-col rounded-lg border border-light-border-subtle bg-light-surface shadow-xl dark:border-dark-border-subtle dark:bg-dark-surface"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-light-border-subtle px-4 py-3 sm:px-6 dark:border-dark-border-subtle">
            {showFullContent ? (
              <button
                onClick={() => setShowFullContent(false)}
                className="flex items-center gap-1.5 text-xs font-medium text-light-text-tertiary transition-colors hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary"
              >
                <ArrowLeft className="size-3.5" />
                Back to summary
              </button>
            ) : (
              <span />
            )}

            <button
              onClick={onClose}
              className="rounded-md p-1 text-light-text-tertiary transition-colors hover:bg-light-bg-tertiary hover:text-light-text-primary dark:text-dark-text-tertiary dark:hover:bg-dark-bg-tertiary dark:hover:text-dark-text-primary"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="overflow-y-auto p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {!showFullContent ? (
                <motion.div
                  key="summary"
                  className="flex flex-col gap-3 sm:gap-4"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="font-serif text-lg sm:text-xl font-medium leading-snug text-light-text-primary dark:text-dark-text-primary">
                    {article.title}
                  </h2>

                  {(article.author || article.publishedAt) && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
                      {article.author && <span>{article.author}</span>}
                      {article.author && article.publishedAt && (
                        <span className="text-light-border dark:text-dark-border">|</span>
                      )}
                      {article.publishedAt && <span>{article.publishedAt}</span>}
                    </div>
                  )}

                  {article.summary && (
                    <p className="text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
                      {article.summary}
                    </p>
                  )}

                  <div className="mt-1 flex items-center gap-3">
                    {hasFullContent ? (
                      <button
                        onClick={() => setShowFullContent(true)}
                        className="rounded-md bg-light-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-light-accent-hover dark:bg-dark-accent dark:text-dark-bg-primary dark:hover:bg-dark-accent-hover"
                      >
                        Read More
                      </button>
                    ) : (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-light-accent transition-colors hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
                      >
                        Read on original site
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="full-content"
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="article-content prose-sm max-w-none text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary [&_a]:text-light-accent [&_a]:underline [&_a]:decoration-light-accent/30 [&_a]:underline-offset-2 hover:[&_a]:text-light-accent-hover hover:[&_a]:decoration-light-accent/60 dark:[&_a]:text-dark-accent dark:[&_a]:decoration-dark-accent/30 dark:hover:[&_a]:text-dark-accent-hover [&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-md [&_p]:mb-3 [&_h1]:mb-3 [&_h1]:mt-4 [&_h1]:text-base [&_h1]:font-medium [&_h1]:text-light-text-primary dark:[&_h1]:text-dark-text-primary [&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:text-sm [&_h2]:font-medium [&_h2]:text-light-text-primary dark:[&_h2]:text-dark-text-primary [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-light-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-light-text-tertiary dark:[&_blockquote]:border-dark-border dark:[&_blockquote]:text-dark-text-tertiary [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-light-bg-tertiary [&_pre]:p-3 [&_pre]:text-xs dark:[&_pre]:bg-dark-bg-tertiary [&_code]:rounded [&_code]:bg-light-bg-tertiary [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs dark:[&_code]:bg-dark-bg-tertiary"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  <div className="mt-1 border-t border-light-border-subtle pt-3 dark:border-dark-border-subtle">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-fit items-center gap-1.5 text-xs font-medium text-light-accent transition-colors hover:text-light-accent/80 dark:text-dark-accent dark:hover:text-dark-accent/80"
                    >
                      Read on original site
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ArticleModal
