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
  Gamepad2,
  GraduationCap,
  Rocket,
  Zap,
  Target,
  Lightbulb,
  Globe,
} from "lucide-react";

const floatingIcons = [
  {
    Icon: Code,
    position: "top-20 left-[10%]",
    color: "text-blue-400",
    size: "h-12 w-12",
    animation: { y: [0, -20, 0], rotate: [0, 10, 0] },
    duration: 6,
    delay: 0,
  },
  {
    Icon: Gamepad2,
    position: "top-32 right-[15%]",
    color: "text-orange-400",
    size: "h-14 w-14",
    animation: { y: [0, 15, 0], rotate: [0, -8, 0] },
    duration: 7,
    delay: 0.5,
  },
  {
    Icon: GraduationCap,
    position: "top-[45%] left-[5%]",
    color: "text-purple-400",
    size: "h-10 w-10",
    animation: { y: [0, -15, 0], x: [0, 10, 0] },
    duration: 5,
    delay: 1,
  },
  {
    Icon: Rocket,
    position: "bottom-32 left-[12%]",
    color: "text-red-400",
    size: "h-12 w-12",
    animation: { y: [0, -25, 0], rotate: [0, 15, 0] },
    duration: 8,
    delay: 1.5,
  },
  {
    Icon: Zap,
    position: "top-[30%] right-[8%]",
    color: "text-yellow-400",
    size: "h-8 w-8",
    animation: { y: [0, 12, 0], scale: [1, 1.1, 1] },
    duration: 4,
    delay: 2,
  },
  {
    Icon: Target,
    position: "bottom-40 right-[18%]",
    color: "text-green-400",
    size: "h-10 w-10",
    animation: { y: [0, -18, 0], rotate: [0, -12, 0] },
    duration: 6.5,
    delay: 0.8,
  },
  {
    Icon: Lightbulb,
    position: "top-[60%] right-[5%]",
    color: "text-amber-400",
    size: "h-9 w-9",
    animation: { y: [0, 20, 0], x: [0, -8, 0] },
    duration: 5.5,
    delay: 1.2,
  },
  {
    Icon: Globe,
    position: "bottom-24 left-[25%]",
    color: "text-cyan-400",
    size: "h-11 w-11",
    animation: { rotate: [0, 360] },
    duration: 20,
    delay: 0,
  },
];

export function CareersHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-700 to-orange-600">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-transparent" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(
        (
          { Icon, position, color, size, animation, duration, delay },
          index
        ) => (
          <motion.div
            key={index}
            animate={animation}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            className={`absolute ${position} opacity-30 hidden md:block`}
          >
            <Icon className={`${size} ${color}`} />
          </motion.div>
        )
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white shadow-lg mb-8 border border-white/30"
          >
            <Sparkles className="h-4 w-4" />
            WE'RE HIRING
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-6"
          >
            Build the Future with
            <br />
            <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent">
              Pasakasa Creations
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10"
          >
            Join a passionate team creating innovative games and educational
            experiences that make a difference.
          </motion.p>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-10"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
              <Users className="h-6 w-6 text-white" />
              <span className="text-lg text-white font-medium">
                Remote-First
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
              <Heart className="h-6 w-6 text-white" />
              <span className="text-lg text-white font-medium">
                Work-Life Balance
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
              <Award className="h-6 w-6 text-white" />
              <span className="text-lg text-white font-medium">
                Competitive Pay
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#open-positions">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-white/90 h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                View Open Positions
              </Button>
            </Link>
            <Link href="#culture">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold transition-all"
              >
                Learn About Our Culture
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Animated scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1, duration: 0.5 },
              y: { delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="mt-16"
          >
            <div className="w-8 h-12 mx-auto border-2 border-white/50 rounded-full flex items-start justify-center pt-2">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
