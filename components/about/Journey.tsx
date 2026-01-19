"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Journey - Zigzag Path Timeline
 *
 * Alternating left/right cards with animated SVG path.
 * Premium, engaging design with flowing connector.
 */

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Started as a small team of passionate game developers in Kathmandu",
  },
  {
    year: "2024",
    title: "Callbreak Friends",
    description:
      "Launched Callbreak Friends on Play Store, Our first published multiplayer game",
  },
  {
    year: "2025",
    title: "Teen Patti Friends",
    description:
      "Built and launched Teen Patti Friends with cross-platform multiplayer",
  },
  {
    year: "2026",
    title: "Teaching What We Build",
    description:
      "Started live Unity and C# classes in Kathmandu for aspiring developers",
  },
];

function ZigzagConnector() {
  return (
    <svg
      className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-24 hidden md:block"
      viewBox="0 0 100 1000"
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M50 0 C50 50, 20 100, 50 150 C80 200, 80 250, 50 300 C20 350, 20 400, 50 450 C80 500, 80 550, 50 600 C20 650, 20 700, 50 750 C80 800, 80 850, 50 900 C20 950, 50 1000, 50 1000"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="25%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="75%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a small team to a growing community
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Zigzag Path */}
          <ZigzagConnector />

          {/* Center Line for Mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-orange-500 to-blue-500 md:hidden" />

          {/* Milestones */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Year Badge - Center */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      className={`h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl ${
                        isLeft
                          ? "bg-gradient-to-br from-blue-500 to-blue-600"
                          : "bg-gradient-to-br from-orange-500 to-orange-600"
                      }`}
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {milestone.year}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[45%] ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`border-2 transition-all duration-300 hover:shadow-xl ${
                          isLeft
                            ? "hover:border-blue-300 dark:hover:border-blue-700"
                            : "hover:border-orange-300 dark:hover:border-orange-700"
                        }`}
                      >
                        <CardContent className="p-6">
                          {/* Decorative Corner */}
                          <div
                            className={`absolute top-0 ${
                              isLeft ? "right-0" : "left-0"
                            } w-16 h-16 ${
                              isLeft
                                ? "bg-gradient-to-bl from-blue-100 dark:from-blue-900/20"
                                : "bg-gradient-to-br from-orange-100 dark:from-orange-900/20"
                            } rounded-bl-3xl ${
                              isLeft ? "rounded-tr-xl" : "rounded-tl-xl"
                            }`}
                          />

                          <div className="relative">
                            <h3 className="text-xl font-bold mb-2">
                              {milestone.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
