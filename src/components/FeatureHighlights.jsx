import React from 'react'
import { Rss, LayoutGrid, Zap, Globe } from "lucide-react";
import FeatureCard from "./FeatureCard";

const iconMap = {
  "rss": Rss,
  "layout-grid": LayoutGrid,
  "zap": Zap,
  "globe": Globe,
};

const features = [
  {
    id: 1,
    icon: "rss",
    title: "All your feeds, unified",
    description:
      "Add any RSS or Atom feed and see everything in one clean timeline. No more tab-hopping between blogs, newsletters, and changelogs.",
  },
  {
    id: 2,
    icon: "layout-grid",
    title: "Read your way",
    description:
      "Switch between a dense list, magazine cards, or a full reader view. Your layout, your pace  one preference for all feeds or per-category.",
  },
  {
    id: 3,
    icon: "zap",
    title: "Built for speed readers",
    description:
      "Keyboard shortcuts, mark-all-read, and smart filtering let you triage hundreds of items in minutes. Stay informed without the overwhelm.",
  },
  {
    id: 4,
    icon: "globe",
    title: "Try before you commit",
    description:
      "Explore a fully populated dashboard as a guest  no account needed. 19 curated sources across 5 categories, ready the moment you click.",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="bg-light-bg-secondary px-6 py-24 md:py-32 dark:bg-dark-bg-secondary">
      <div className="mx-auto flex max-w-container-page flex-col gap-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-lg space-y-3">
            <h2 className="font-serif text-4xl leading-[1.1] tracking-[-0.02em] text-light-text-primary md:text-5xl dark:text-dark-text-primary">
              Everything you need to stay informed
            </h2>
            <p className="font-sans text-base leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
              Curated feeds, smart filtering, and a reading experience built for focus.
            </p>
          </div>
          <span className="hidden font-sans text-xs tracking-widest text-light-text-tertiary uppercase md:block dark:text-dark-text-tertiary">
            Features
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={iconMap[feature.icon]}
              number={`0${feature.id}`}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureHighlights
