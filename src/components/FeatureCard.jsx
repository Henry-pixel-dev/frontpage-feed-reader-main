import React from 'react'
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, number, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col gap-6 border-t border-light-border pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:pt-0 md:first:border-l-0 md:pl-10 dark:border-dark-border"
    >
      <div className="flex flex-col gap-5">
        <span className="font-serif text-4xl leading-none tracking-[-0.02em] text-light-text-primary/15 dark:text-dark-text-primary/10">
          {number}
        </span>
        <div className="flex size-12 items-center justify-center rounded-lg bg-light-bg-tertiary dark:bg-dark-bg-tertiary">
          <Icon className="size-5 text-light-text-primary dark:text-dark-text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="font-sans text-xl font-medium tracking-[-0.01em] text-light-text-primary dark:text-dark-text-primary">
          {title}
        </h3>
      </div>
      <p className="font-sans text-base leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
        {description}
      </p>
    </motion.div>
  )
}

export default FeatureCard
