import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-light-bg-primary px-6 py-24 font-sans md:py-40 dark:bg-dark-bg-primary">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-120 w-160 rounded-full bg-light-accent/[0.06] blur-[100px] dark:bg-dark-accent/[0.08]" />
      </div>

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto flex max-w-container-page flex-col items-start gap-8 md:items-center md:text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-light-border bg-light-bg-secondary px-3.5 py-1.5 text-xs font-medium tracking-wide text-light-text-secondary dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
            <span className="inline-block size-1.5 rounded-full bg-light-success dark:bg-dark-success" />
            Now in early access
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="max-w-3xl text-3xl font-bold tracking-tight text-light-text-primary sm:text-[2.75rem] sm:leading-[1.15] md:text-[3.5rem] md:leading-[1.1] dark:text-dark-text-primary"
        >
          Your tech content,{" "}
          <span className="text-light-accent dark:text-dark-accent">
            all in one place.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="max-w-lg text-lg font-normal leading-relaxed text-light-text-secondary dark:text-dark-text-secondary"
        >
          Cut through the noise. TechFeed brings all your RSS feeds into a
          focused reader built for people who read for a living.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-light-accent px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-light-accent-hover hover:shadow-md active:scale-[0.97] dark:bg-dark-accent dark:text-dark-bg-primary dark:hover:bg-dark-accent-hover"
          >
            Get Started Free
          </Link>
          <Link
            to="/guest"
            className="inline-flex items-center justify-center rounded-lg border border-light-border px-8 py-3.5 text-base font-medium text-light-text-primary shadow-sm transition-all duration-150 hover:border-light-accent hover:bg-light-accent-subtle hover:text-light-accent active:scale-[0.97] active:bg-light-bg-tertiary dark:border-dark-border dark:text-dark-text-primary dark:hover:border-dark-accent dark:hover:bg-dark-accent-subtle dark:hover:text-dark-accent dark:active:bg-dark-bg-tertiary"
          >
            See How It Works
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
