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
} from "lucide-react";

const floatingIcons = [
  {
    Icon: Code,
    position: "top-[15%] left-[8%]",
    color: "text-blue-500",
    size: "h-9 w-9",
    animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    duration: 5,
  },
  {
    Icon: Gamepad2,
    position: "top-[12%] right-[10%]",
    color: "text-orange-500",
    size: "h-10 w-10",
    animation: { y: [0, 10, 0], rotate: [0, -6, 0] },
    duration: 6,
  },
  {
    Icon: GraduationCap,
    position: "top-[45%] left-[6%]",
    color: "text-purple-500",
    size: "h-9 w-9",
    animation: { x: [0, 8, 0], y: [0, -8, 0] },
    duration: 6,
  },
  {
    Icon: Rocket,
    position: "bottom-[15%] left-[12%]",
    color: "text-blue-500",
    size: "h-10 w-10",
    animation: { y: [0, -14, 0], rotate: [0, 10, 0] },
    duration: 5.5,
  },
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

export function CareersHero() {
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

      {/* Floating Icons */}
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
            <Link href="/about#who-we-are">
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
