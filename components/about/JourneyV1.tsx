"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * JourneyV1 - Horizontal Scroll Timeline
 *
 * Horizontal scrollable timeline with snap points.
 * Modern, clean design with year indicators.
 *
 * DELETE THIS FILE if not selected as final design.
 */

const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "Started as a small team of passionate game developers in Kathmandu",
  },
  {
    year: "2020",
    title: "First Launch",
    description: "Callbreak Multiplayer hits Play Store—our first published game",
  },
  {
    year: "2022",
    title: "Teen Patti Friends",
    description:
      "Launched on both Play Store and App Store with cross-platform multiplayer",
  },
  {
    year: "2023",
    title: "Teaching What We Build",
    description:
      "Started live Unity and C# classes in Kathmandu for aspiring developers",
  },
  {
    year: "2024",
    title: "Growing Community",
    description:
      "Multiple batches running, students building real games, community thriving",
  },
];

export function JourneyV1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 350;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
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

        {/* Timeline Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          </button>

          {/* Horizontal Timeline */}
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth px-16"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <div className="flex gap-6 pb-8 pt-4" style={{ width: "max-content" }}>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="relative"
                  style={{ scrollSnapAlign: "center" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Year Badge */}
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className={`h-16 w-16 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                        index % 2 === 0
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : "bg-gradient-to-br from-orange-500 to-orange-600"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {milestone.year}
                    </motion.div>
                  </div>

                  {/* Connector Line */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-1 h-8 ${
                        index % 2 === 0
                          ? "bg-gradient-to-b from-blue-500 to-blue-300"
                          : "bg-gradient-to-b from-orange-500 to-orange-300"
                      }`}
                    />
                  </div>

                  {/* Content Card */}
                  <Card
                    className={`w-72 border-2 transition-all duration-300 hover:shadow-xl ${
                      index % 2 === 0
                        ? "hover:border-blue-300 dark:hover:border-blue-700"
                        : "hover:border-orange-300 dark:hover:border-orange-700"
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Horizontal Line Connector */}
                  {index < milestones.length - 1 && (
                    <div className="absolute top-8 left-full w-6 h-0.5 bg-gradient-to-r from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-700" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {milestones.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index % 2 === 0
                    ? "w-2 bg-blue-300 dark:bg-blue-700"
                    : "w-2 bg-orange-300 dark:bg-orange-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
