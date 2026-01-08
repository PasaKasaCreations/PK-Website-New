"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Gamepad2,
  GraduationCap,
  Users,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const highlights = [
  {
    icon: Gamepad2,
    title: "Real Games, Real Results",
    description:
      "Our games are live on Play Store and App Store with thousands of active players. We teach what we actually do.",
    color: "orange",
  },
  {
    icon: GraduationCap,
    title: "Live In-Person Classes",
    description:
      "Physical classes in Kathmandu. No recordings, no shortcuts—just hands-on learning with real instructor interaction.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description:
      "Limited students per batch means personalized attention, mentorship, and a tight-knit learning community.",
    color: "orange",
  },
  {
    icon: MapPin,
    title: "Made in Nepal",
    description:
      "Based in Kathmandu, reaching players worldwide. We're building Nepal's game development community.",
    color: "blue",
  },
];

const colorStyles = {
  blue: {
    border: "border-blue-100 dark:border-blue-900/50",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
    iconGradient: "from-blue-500 to-blue-600",
    iconShadow: "shadow-blue-500/25",
    accent: "bg-blue-500",
    glow: "from-blue-500 to-blue-600",
    dotColors: ["bg-blue-200 dark:bg-blue-700", "bg-blue-300 dark:bg-blue-600", "bg-blue-400 dark:bg-blue-500"],
    bgPattern: "from-blue-50 dark:from-blue-900/20",
    icon: "text-blue-600 dark:text-blue-400",
  },
  orange: {
    border: "border-orange-100 dark:border-orange-900/50",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
    iconGradient: "from-orange-500 to-orange-600",
    iconShadow: "shadow-orange-500/25",
    accent: "bg-orange-500",
    glow: "from-orange-500 to-orange-600",
    dotColors: ["bg-orange-200 dark:bg-orange-700", "bg-orange-300 dark:bg-orange-600", "bg-orange-400 dark:bg-orange-500"],
    bgPattern: "from-orange-50 dark:from-orange-900/20",
    icon: "text-orange-600 dark:text-orange-400",
  },
};

export function WhatMakesUsDifferentSection() {
  return (
    <section className="py-20 bg-white dark:bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Header */}
          <div className="max-w-2xl mb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900/30 dark:to-blue-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              WHAT SETS US APART
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              What makes us different
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-lg"
            >
              We combine real-world game development with hands-on education
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              const colors = colorStyles[highlight.color as keyof typeof colorStyles];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="relative group"
                >
                  {/* Card glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${colors.glow} rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500`} />

                  <div
                    className={`
                      relative h-full p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                      ${colors.border} ${colors.hoverBorder}
                      hover:shadow-xl hover:-translate-y-1
                      bg-white dark:bg-slate-900/50 overflow-hidden
                    `}
                  >
                    {/* Background pattern */}
                    <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${colors.bgPattern} to-transparent rounded-bl-[80px] -z-0`} />

                    {/* Top accent line */}
                    <div
                      className={`absolute top-0 left-6 right-6 h-0.5 ${colors.accent} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
                    />

                    {/* Decorative dots */}
                    <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {colors.dotColors.map((dotColor, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                      ))}
                    </div>

                    {/* Icon */}
                    <div
                      className={`
                        relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4
                        bg-gradient-to-br ${colors.iconGradient} shadow-lg ${colors.iconShadow}
                        transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                      `}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {highlight.title}
                        </h3>
                        <ArrowUpRight
                          className={`h-4 w-4 ${colors.icon} opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                        />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
