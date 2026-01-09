"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Heart,
  Award,
  Briefcase,
  ArrowRight,
  Code,
  Rocket,
  Zap,
  Lightbulb,
  Gamepad2,
  GraduationCap,
  Laptop,
} from "lucide-react";

/**
 * CAREERS HERO VARIANTS
 *
 * Following the same design theme as Home (Hero.tsx) and About (AboutHero.tsx):
 * - Light gradient background (slate-50 → white → blue-50)
 * - Soft blur decorations (blue/orange)
 * - Gradient badge & text accents
 * - Subtle Framer Motion animations
 */

// ============================================================================
// VARIANT 1: Stacked Center Layout with Horizontal Scroll Benefits
// Unique design different from homepage - centered with horizontal benefits strip
// ============================================================================

const teamHighlights = [
  { icon: Code, label: "Developers", color: "text-blue-500" },
  { icon: Gamepad2, label: "Game Designers", color: "text-orange-500" },
  { icon: GraduationCap, label: "Instructors", color: "text-purple-500" },
  { icon: Laptop, label: "Engineers", color: "text-blue-500" },
];

const perks = [
  {
    icon: Users,
    title: "Remote-First",
    description: "Work from anywhere",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible schedules",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: Award,
    title: "Career Growth",
    description: "Learn & advance",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Exciting Work",
    description: "Games & software",
    gradient: "from-blue-500 to-blue-600",
  },
];

export function CareersHeroVariant1() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950">
      {/* Unique animated grid pattern background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-200/40 via-purple-200/30 to-transparent dark:from-blue-500/10 dark:via-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Centered Content Stack */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full text-sm font-semibold text-white shadow-lg">
              <Briefcase className="h-4 w-4" />
              CAREERS AT PASAKASA
            </span>
          </motion.div>

          {/* Large Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-slate-900 dark:text-white">
              We're Looking for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Creative Minds
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Join our Kathmandu-based team building games, creating software, and
            teaching the next generation of developers.
          </motion.p>

          {/* Animated Team Roles - Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-10 flex-wrap"
          >
            {teamHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-100 dark:border-slate-700"
                >
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="#open-positions">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                View Open Positions
              </Button>
            </Link>
            <Link href="#culture">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 dark:border-slate-600 hover:border-slate-900 dark:hover:border-white h-14 px-8 text-lg font-semibold transition-all"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Our Culture
              </Button>
            </Link>
          </motion.div>

          {/* Perks Cards - Unique Horizontal Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {perks.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative bg-white dark:bg-slate-800/80 rounded-2xl p-5 shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${perk.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${perk.gradient} flex items-center justify-center mb-3 shadow-md`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                        {perk.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {perk.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// VARIANT 2: Centered Layout with Evenly Distributed Floating Icons
// ============================================================================

const floatingIcons = [
  // Top left
  {
    Icon: Code,
    position: "top-[15%] left-[8%]",
    color: "text-blue-500",
    size: "h-9 w-9",
    animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    duration: 5,
  },
  // Top right
  {
    Icon: Gamepad2,
    position: "top-[12%] right-[10%]",
    color: "text-orange-500",
    size: "h-10 w-10",
    animation: { y: [0, 10, 0], rotate: [0, -6, 0] },
    duration: 6,
  },
  // Middle left
  {
    Icon: GraduationCap,
    position: "top-[45%] left-[6%]",
    color: "text-purple-500",
    size: "h-9 w-9",
    animation: { x: [0, 8, 0], y: [0, -8, 0] },
    duration: 6,
  },
  // Bottom left
  {
    Icon: Rocket,
    position: "bottom-[15%] left-[12%]",
    color: "text-blue-500",
    size: "h-10 w-10",
    animation: { y: [0, -14, 0], rotate: [0, 10, 0] },
    duration: 5.5,
  },
  // Bottom right
  {
    Icon: Lightbulb,
    position: "bottom-[18%] right-[10%]",
    color: "text-yellow-500",
    size: "h-8 w-8",
    animation: { y: [0, 10, 0], scale: [1, 1.15, 1] },
    duration: 4.5,
  },
];

const benefits = [
  {
    icon: Users,
    title: "Remote-First",
    description: "Work from anywhere in Nepal or beyond",
    color: "blue",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible hours, no burnout culture",
    color: "orange",
  },
  {
    icon: Award,
    title: "Growth Focused",
    description: "Learn, improve, and advance your career",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Exciting Projects",
    description: "Games, apps, and educational content",
    color: "blue",
  },
];

const colorVariants = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    iconBg: "bg-blue-100 dark:bg-blue-800/50",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-800",
    glow: "group-hover:shadow-blue-200/50 dark:group-hover:shadow-blue-500/20",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    iconBg: "bg-orange-100 dark:bg-orange-800/50",
    icon: "text-orange-600 dark:text-orange-400",
    border: "border-orange-100 dark:border-orange-800",
    glow: "group-hover:shadow-orange-200/50 dark:group-hover:shadow-orange-500/20",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    iconBg: "bg-purple-100 dark:bg-purple-800/50",
    icon: "text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-800",
    glow: "group-hover:shadow-purple-200/50 dark:group-hover:shadow-purple-500/20",
  },
} as const;

export function CareersHeroVariant2() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Floating Icons - Evenly Distributed */}
      {floatingIcons.map(
        ({ Icon, position, color, size, animation, duration }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} hidden md:flex items-center justify-center`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.7,
              scale: 1,
              ...animation,
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.3 + index * 0.08 },
              scale: { duration: 0.5, delay: 0.3 + index * 0.08 },
              ...Object.fromEntries(
                Object.keys(animation).map((key) => [
                  key,
                  { duration, repeat: Infinity, ease: "easeInOut" },
                ])
              ),
            }}
            whileHover={{
              scale: 1.4,
              opacity: 1,
              transition: { duration: 0.2 },
            }}
          >
            <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-xl transition-shadow">
              <Icon className={`${size} ${color}`} />
            </div>
          </motion.div>
        )
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full text-sm font-semibold text-white shadow-lg mb-8">
              <Sparkles className="h-4 w-4" />
              WE'RE GROWING
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-slate-900 dark:text-white">Find Your </span>
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Place
            </span>
            <br />
            <span className="text-slate-900 dark:text-white">On Our </span>
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Team
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We're a small but ambitious team in Kathmandu building games,
            creating software, and teaching the next generation of developers.
            Ready to join us?
          </motion.p>

          {/* Interactive Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const colors =
                colorVariants[benefit.color as keyof typeof colorVariants];
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group ${colors.bg} ${colors.border} border rounded-xl p-5 shadow-sm hover:shadow-xl ${colors.glow} transition-all duration-300 cursor-pointer`}
                >
                  <motion.div
                    className={`h-12 w-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4 mx-auto`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                  </motion.div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#open-positions">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Explore Open Positions
                </Button>
              </motion.div>
            </Link>
            <Link href="#culture">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 dark:border-slate-600 hover:border-orange-500 hover:text-orange-600 h-14 px-8 text-lg font-semibold transition-all"
                >
                  Learn About Us
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
