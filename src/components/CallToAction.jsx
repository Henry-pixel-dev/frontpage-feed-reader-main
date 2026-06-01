import React from 'react'
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-light-bg-primary px-6 py-20 font-sans md:py-28 dark:bg-dark-bg-primary">
      <div className="mx-auto flex max-w-container-content flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-light-text-primary md:text-3xl dark:text-dark-text-primary">
          Read smarter, not harder.
        </h2>
        <p className="max-w-md text-base text-light-text-secondary dark:text-dark-text-secondary">
          Join thousands of developers who start their day with TechFeed.
        </p>
        <Link
          to="/signup"
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-light-accent px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-light-accent-hover hover:shadow-md active:scale-[0.97] dark:bg-dark-accent dark:text-dark-bg-primary dark:hover:bg-dark-accent-hover"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  )
}

export default CallToAction
