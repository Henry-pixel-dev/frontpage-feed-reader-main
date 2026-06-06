import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stagger = (i) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
});

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-light-bg-primary px-6 pt-24 pb-20 md:pt-36 md:pb-32 dark:bg-dark-bg-primary">
      {/* Paper grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle radial highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-80 right-0 -z-10 h-150 w-150 rounded-full bg-light-accent/4 blur-[120px] dark:bg-dark-accent/6"
      />

      <div className="mx-auto flex max-w-container-page flex-col gap-16 lg:gap-20">
        {/* ── Headline block ── */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Badge */}
          <motion.div variants={stagger(0)} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 rounded-full border border-light-border bg-light-bg-secondary px-3.5 py-1.5 font-sans text-xs font-medium tracking-wide text-light-text-secondary dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
              <span className="inline-block size-1.5 rounded-full bg-light-success dark:bg-dark-success" />
              Now in early access
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={stagger(1)}
            initial="hidden"
            animate="visible"
            className="font-serif text-[2.75rem] leading-[1.05] font-normal tracking-[-0.02em] text-light-text-primary sm:text-[4rem] md:text-[5.25rem] lg:text-[6.5rem] dark:text-dark-text-primary"
          >
            Your personal{" "}
            <span className="block text-light-accent dark:text-dark-accent">
              front page
            </span>{" "}
            for tech content.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={stagger(2)}
            initial="hidden"
            animate="visible"
            className="max-w-xl font-sans text-lg leading-relaxed text-light-text-secondary sm:text-xl dark:text-dark-text-secondary"
          >
            Cut through the noise. A focused feed reader built for developers
            and designers who read for a living.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={stagger(3)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-light-text-primary px-8 py-4 font-sans text-base font-medium text-white transition-all duration-200 hover:bg-light-text-primary/85 hover:scale-[1.02] active:scale-[0.98] dark:bg-dark-text-primary dark:text-dark-bg-primary dark:hover:bg-dark-text-primary/90"
            >
              Get Started Free
            </Link>
            <Link
              to="/guest"
              className="inline-flex items-center justify-center rounded-lg border-2 border-light-text-primary px-8 py-4 font-sans text-base font-medium text-light-text-primary transition-all duration-200 hover:bg-light-text-primary hover:text-white active:scale-[0.98] dark:border-dark-text-primary dark:text-dark-text-primary dark:hover:bg-dark-text-primary dark:hover:text-dark-bg-primary"
            >
              Try as Guest
            </Link>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          variants={stagger(4)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-light-border bg-light-border sm:grid-cols-4 dark:border-dark-border dark:bg-dark-border"
        >
          {[
            { value: "19", label: "Curated sources" },
            { value: "5", label: "Categories" },
            { value: "< 3s", label: "Feed load time" },
            { value: "0", label: "Setup required" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 bg-light-bg-primary px-5 py-5 dark:bg-dark-bg-primary"
            >
              <span className="font-serif text-3xl leading-none font-normal tracking-[-0.02em] text-light-text-primary dark:text-dark-text-primary">
                {stat.value}
              </span>
              <span className="font-sans text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
