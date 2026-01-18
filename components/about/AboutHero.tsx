"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Gamepad2,
  GraduationCap,
  Users,
  Globe,
  Rocket,
  Target,
} from "lucide-react";

/**
 * AboutHero - Split Stats Hero
 *
 * Two-column layout with bold typography on left
 * and animated stats/counters on right.
 * No image required - uses numbers and icons for visual impact.
 *
 * DELETE THIS FILE if not selected as final design.
 */

const stats = [
  {
    icon: Gamepad2,
    value: "2+",
    label: "Live Games",
    description: "On Play Store & App Store",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Players",
    description: "Active worldwide",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: GraduationCap,
    value: "15+",
    label: "Students",
    description: "Trained in game and web dev",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Globe,
    value: "Nepal",
    label: "Based",
    description: "Kathmandu HQ",
    color: "from-blue-500 to-blue-600",
  },
];

function AnimatedCounter({ value, delay }: { value: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {value}
    </motion.span>
  );
}

export function AboutHero() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950 overflow-hidden flex items-center">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full text-sm font-semibold text-white shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4" />
              OUR STORY
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-slate-900 dark:text-white">Building </span>
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Games
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">Building </span>
              <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Developers
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              A Nepal-based game studio creating strategic multiplayer games and
              empowering the next generation of game developers through hands-on
              training.
            </motion.p>

            {/* Quick Highlights */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Rocket, text: "Live on App Stores" },
                { icon: Target, text: "Made in Nepal" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-100 dark:border-slate-700"
                  >
                    <Icon className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="group relative bg-white dark:bg-slate-800/80 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Background Gradient on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-1">
                      <AnimatedCounter
                        value={stat.value}
                        delay={0.5 + index * 0.1}
                      />
                    </div>

                    <div className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                      {stat.label}
                    </div>

                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-gray-50 dark:fill-background"
          />
        </svg>
      </div>
    </div>
  );
}
