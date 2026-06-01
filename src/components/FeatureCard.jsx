import React from 'react'
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="group flex flex-1 flex-col gap-4 rounded-xl border border-light-border bg-light-surface p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-dark-border dark:bg-dark-surface"
    >
      <div className="flex size-11 items-center justify-center rounded-lg bg-light-accent-subtle dark:bg-dark-accent-subtle">
        <Icon className="size-5 text-light-accent dark:text-dark-accent" strokeWidth={1.8} />
      </div>
      <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
        {description}
      </p>
    </motion.div>
  )
}

export default FeatureCard
