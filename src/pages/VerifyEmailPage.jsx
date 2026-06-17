import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

const stagger = (i) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
})

const VerifyEmailPage = () => {
  const location = useLocation()
  const email = location.state?.email || 'your email'

  return (
    <section className="relative isolate flex min-h-[calc(100vh-57px)] items-center justify-center overflow-hidden bg-light-bg-primary px-6 py-16 dark:bg-dark-bg-primary">
      {/* Paper grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-150 w-150 -translate-x-1/2 rounded-full bg-light-accent/4 blur-[100px] dark:bg-dark-accent/6"
      />

      <motion.div
        variants={stagger(0)}
        initial="hidden"
        animate="visible"
        className="w-full max-w-104"
      >
        {/* Card */}
        <div className="rounded-2xl border border-light-border bg-light-surface p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10 dark:border-dark-border dark:bg-dark-surface dark:shadow-none">
          {/* Logo */}
          <motion.div
            variants={stagger(1)}
            initial="hidden"
            animate="visible"
            className="mb-8 flex flex-col items-center gap-5"
          >
            <Link
              to="/"
              aria-label="Back to Frontpage"
              className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-light-text-primary font-serif text-lg italic text-white dark:bg-dark-text-primary dark:text-dark-bg-primary">
                f
              </span>
              <span className="font-serif text-xl tracking-[-0.02em] text-light-text-primary dark:text-dark-text-primary">
                Frontpage
              </span>
            </Link>
          </motion.div>

          {/* Icon + heading + subtext */}
          <motion.div
            variants={stagger(2)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-light-accent/10 dark:bg-dark-accent/10">
              <Mail
                size={28}
                strokeWidth={1.5}
                className="text-light-accent dark:text-dark-accent"
              />
            </div>

            <h1 className="font-serif text-2xl tracking-[-0.02em] text-light-text-primary dark:text-dark-text-primary">
              Check your email
            </h1>

            <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
              We sent a confirmation link to{' '}
              <span className="font-medium text-light-accent dark:text-dark-accent">
                {email}
              </span>
            </p>
          </motion.div>

          {/* Instructions */}
          <motion.div
            variants={stagger(3)}
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-col items-center gap-3 text-center"
          >
            <p className="max-w-xs font-sans text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
              We sent a confirmation link to your email address. Click the link
              in the email to activate your account.
            </p>
            <p className="font-sans text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
              Can't find it? Check your spam folder.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={stagger(4)}
            initial="hidden"
            animate="visible"
            className="my-6 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-light-border dark:bg-dark-border" />
            <span className="font-sans text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
              or
            </span>
            <div className="h-px flex-1 bg-light-border dark:bg-dark-border" />
          </motion.div>

          {/* Sign in link */}
          <motion.p
            variants={stagger(5)}
            initial="hidden"
            animate="visible"
            className="text-center font-sans text-sm text-light-text-secondary dark:text-dark-text-secondary"
          >
            Already confirmed?{' '}
            <Link
              to="/signin"
              className="font-medium text-light-accent underline decoration-light-accent/30 underline-offset-2 transition-colors hover:text-light-accent-hover hover:decoration-light-accent dark:text-dark-accent dark:decoration-dark-accent/30 dark:hover:text-dark-accent-hover dark:hover:decoration-dark-accent"
            >
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}

export default VerifyEmailPage