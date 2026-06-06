import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="relative isolate overflow-hidden bg-light-text-primary px-6 py-24 md:py-36 dark:bg-dark-bg-secondary">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-96 w-[600px] rounded-full bg-light-accent/[0.12] blur-[140px] dark:bg-dark-accent/[0.1]" />
      </div>

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-container-content flex-col items-center gap-8 text-center"
      >
        <h2 className="font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-white md:text-6xl">
          Read smarter,{" "}
          <span className="italic text-light-accent dark:text-dark-accent">
            not harder.
          </span>
        </h2>
        <p className="max-w-md font-sans text-lg leading-relaxed text-white/60">
          The calm, organized home your reading list deserves. Start with 19
          curated sources  no setup, no clutter.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-sans text-base font-medium text-light-text-primary transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] dark:bg-dark-text-primary dark:text-dark-bg-primary dark:hover:bg-dark-text-primary/90"
          >
            Get Started Free
          </Link>
          <Link
            to="/guest"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white/25 px-8 py-4 font-sans text-base font-medium text-white transition-all duration-200 hover:border-white/60 hover:bg-white/[0.06] active:scale-[0.98]"
          >
            Try as Guest
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default CallToAction
