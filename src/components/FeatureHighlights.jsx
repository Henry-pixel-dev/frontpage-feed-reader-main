import React from 'react'
import { CodeXml, ShieldCheck, Rocket } from "lucide-react";
import FeatureCard from "./FeatureCard";

const iconMap = {
  "code-slash": CodeXml,
  "shield-check": ShieldCheck,
  "rocket-launch": Rocket,
};

const features = [
  {
    id: 1,
    icon: "code-slash",
    title: "Master Modern Frameworks",
    description:
      "Stay ahead of the curve with daily updates on the JavaScript ecosystem and web development best practices.",
  },
  {
    id: 2,
    icon: "shield-check",
    title: "AI & Cybersecurity Trends",
    description:
      "Monitor real-time breakthroughs in artificial intelligence and the latest strategies for securing your software.",
  },
  {
    id: 3,
    icon: "rocket-launch",
    title: "Build & Launch",
    description:
      "Discover actionable insights, product strategies, and tech news to help turn your next big idea into reality.",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="bg-light-bg-secondary px-6 py-20 font-sans md:py-28 dark:bg-dark-bg-secondary">
      <div className="mx-auto flex max-w-container-page flex-col items-center gap-12">
        <div className="max-w-lg text-center">
          <h2 className="text-2xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
            Everything you need to stay informed
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
            Curated feeds, smart filtering, and a reading experience built for focus.
          </p>
        </div>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={iconMap[feature.icon]}
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
