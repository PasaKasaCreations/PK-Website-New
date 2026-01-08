"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Target,
  MapPin,
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "We Build What We Believe In",
    description:
      "Every line of code we write has a purpose. Our games have 15K+ downloads because we don't just build software—we craft experiences people love coming back to.",
    color: "blue",
    isMain: true,
  },
  {
    icon: Zap,
    title: "You Talk to the People Who Build",
    description:
      "No middlemen. No waiting days for answers. When you have a question, you'll hear directly from the developer working on your project.",
    color: "orange",
  },
  {
    icon: Target,
    title: "Your Project Will Get Finished",
    description:
      "We've seen too many projects abandoned halfway. That's not us. We commit fully to what we take on, and we don't rest until it's shipped.",
    color: "blue",
  },
  {
    icon: MapPin,
    title: "We're Right Here in Kathmandu",
    description:
      "Same timezone, same streets. We can grab chai and talk about your project face-to-face. There's something special about building with people you can actually meet.",
    color: "orange",
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
    dotColors: [
      "bg-blue-200 dark:bg-blue-700",
      "bg-blue-300 dark:bg-blue-600",
      "bg-blue-400 dark:bg-blue-500",
    ],
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
    dotColors: [
      "bg-orange-200 dark:bg-orange-700",
      "bg-orange-300 dark:bg-orange-600",
      "bg-orange-400 dark:bg-orange-500",
    ],
    bgPattern: "from-orange-50 dark:from-orange-900/20",
    icon: "text-orange-600 dark:text-orange-400",
  },
};

export function WhyChooseUsSection() {
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
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              WHY WORK WITH US
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              We're builders at heart
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-lg"
            >
              We started Pasakasa because we genuinely love creating things that
              matter. Whether it's a game or software—that's what gets us
              excited.
            </motion.p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {/* First item - large featured card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-1 lg:row-span-2 relative group"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

              <div className="relative h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px]" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-tr-[80px]" />

                {/* Icon */}
                <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Heart className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-4 relative z-10">
                  {features[0].title}
                </h3>
                <p className="text-blue-100 leading-relaxed relative z-10 text-base">
                  {features[0].description}
                </p>

                {/* Hover arrow */}
                <ArrowUpRight className="absolute bottom-6 right-6 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                {/* Decorative dots */}
                <div className="absolute bottom-6 left-6 flex gap-1 opacity-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </div>
              </div>
            </motion.div>

            {/* Remaining feature cards */}
            {features.slice(1).map((feature, index) => {
              const Icon = feature.icon;
              const colors =
                colorStyles[feature.color as keyof typeof colorStyles];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  className="relative group"
                >
                  {/* Card glow effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${colors.glow} rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500`}
                  />

                  <div
                    className={`
                      relative h-full p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                      ${colors.border} ${colors.hoverBorder}
                      hover:shadow-xl hover:-translate-y-1
                      bg-white dark:bg-slate-900/50 overflow-hidden
                    `}
                  >
                    {/* Background pattern */}
                    <div
                      className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${colors.bgPattern} to-transparent rounded-bl-[80px] -z-0`}
                    />

                    {/* Top accent line */}
                    <div
                      className={`absolute top-0 left-6 right-6 h-0.5 ${colors.accent} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
                    />

                    {/* Decorative dots */}
                    <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {colors.dotColors.map((dotColor, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                        />
                      ))}
                    </div>

                    {/* Icon */}
                    <div
                      className={`
                        relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
                        bg-gradient-to-br ${colors.iconGradient} shadow-lg ${colors.iconShadow}
                        transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                      `}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <ArrowUpRight
                          className={`h-4 w-4 ${colors.icon} opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                        />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
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
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
