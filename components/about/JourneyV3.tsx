"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";

/**
 * JourneyV3 - Interactive Tabs Timeline
 *
 * Year tabs on the side with expandable content panels.
 * Interactive, modern design with smooth transitions.
 *
 * DELETE THIS FILE if not selected as final design.
 */

const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "Started as a small team of passionate game developers in Kathmandu. Just a few friends with a shared dream of building games that people would love to play.",
    highlight: "Founded in Kathmandu",
  },
  {
    year: "2020",
    title: "First Launch",
    description:
      "Callbreak Multiplayer hits Play Store—our first published game. The thrill of seeing real players enjoy something we built from scratch was incredible.",
    highlight: "First game published",
  },
  {
    year: "2022",
    title: "Teen Patti Friends",
    description:
      "Launched on both Play Store and App Store with cross-platform multiplayer. Players could compete regardless of their device—a technical milestone for us.",
    highlight: "Cross-platform multiplayer",
  },
  {
    year: "2023",
    title: "Teaching What We Build",
    description:
      "Started live Unity and C# classes in Kathmandu for aspiring developers. Sharing our real production experience with the next generation felt like the natural next step.",
    highlight: "Education branch launched",
  },
  {
    year: "2024",
    title: "Growing Community",
    description:
      "Multiple batches running, students building real games, community thriving. What started as a studio is now an ecosystem of creators, learners, and builders.",
    highlight: "500+ students trained",
  },
];

export function JourneyV3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a small team to a growing community
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-6 md:gap-10">
            {/* Year Tabs */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
              {milestones.map((milestone, index) => {
                const isActive = activeIndex === index;
                const colorClass = index % 2 === 0 ? "blue" : "orange";

                return (
                  <motion.button
                    key={milestone.year}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 flex-shrink-0 ${
                      isActive
                        ? index % 2 === 0
                          ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700"
                          : "bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-700"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600"
                    }`}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Year Badge */}
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isActive
                          ? index % 2 === 0
                            ? "bg-blue-500 text-white"
                            : "bg-orange-500 text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {milestone.year.slice(2)}
                    </div>

                    {/* Year & Title */}
                    <div className="hidden md:block">
                      <div
                        className={`font-bold ${
                          isActive
                            ? index % 2 === 0
                              ? "text-blue-700 dark:text-blue-300"
                              : "text-orange-700 dark:text-orange-300"
                            : "text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {milestone.year}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                        {milestone.title}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className={`absolute right-2 ${
                          index % 2 === 0 ? "text-blue-500" : "text-orange-500"
                        }`}
                        layoutId="activeIndicator"
                      >
                        <ChevronRight className="h-5 w-5 hidden md:block" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Content Panel */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-br ${
                    activeIndex % 2 === 0
                      ? "from-blue-50 via-white to-blue-50/50 dark:from-blue-900/10 dark:via-slate-800 dark:to-blue-900/5 border-blue-200 dark:border-blue-800"
                      : "from-orange-50 via-white to-orange-50/50 dark:from-orange-900/10 dark:via-slate-800 dark:to-orange-900/5 border-orange-200 dark:border-orange-800"
                  } rounded-2xl p-8 border-2 h-full`}
                >
                  {/* Highlight Badge */}
                  <motion.div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${
                      activeIndex % 2 === 0
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {milestones[activeIndex].highlight}
                  </motion.div>

                  {/* Year (Large) */}
                  <motion.div
                    className={`text-6xl md:text-7xl font-bold mb-4 ${
                      activeIndex % 2 === 0
                        ? "text-blue-200 dark:text-blue-900/50"
                        : "text-orange-200 dark:text-orange-900/50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {milestones[activeIndex].year}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {milestones[activeIndex].title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {milestones[activeIndex].description}
                  </motion.p>

                  {/* Progress Dots */}
                  <div className="flex gap-2 mt-8">
                    {milestones.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? index % 2 === 0
                              ? "w-8 bg-blue-500"
                              : "w-8 bg-orange-500"
                            : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
