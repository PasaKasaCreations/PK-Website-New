"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Gamepad2,
  Users,
  Zap,
  Heart,
} from "lucide-react";

/**
 * ContactHeroV2 - Minimal Grid Lines Hero
 *
 * Modern, tech-forward design with animated grid pattern
 * and left-aligned content. Apple-inspired minimalism.
 *
 * DELETE THIS FILE if not selected as final design.
 */

const quickContacts = [
  {
    icon: Mail,
    label: "Email Us",
    value: "contact@pasakasacreations.com",
    hint: "Best for detailed inquiries",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+977 9840000000",
    hint: "Mon-Fri, 10am-6pm NPT",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Kathmandu, Nepal",
    hint: "In-person classes available",
  },
];

const whyReachOut = [
  { icon: Gamepad2, text: "Ask about our games" },
  { icon: Users, text: "Join our courses" },
  { icon: Zap, text: "Collaborate with us" },
  { icon: Heart, text: "Say hello" },
];

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Horizontal Lines */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{ top: `${(i + 1) * 10}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: i * 0.08 }}
        />
      ))}
      {/* Vertical Lines */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-400/50 to-transparent"
          style={{ left: `${(i + 1) * 6}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, delay: i * 0.04 }}
        />
      ))}
      {/* Animated Glowing Dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute h-3 w-3 rounded-full"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 4) * 18}%`,
            background: i % 2 === 0
              ? "radial-gradient(circle, rgba(251,146,60,0.8) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(96,165,250,0.8) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

function TypewriterText() {
  const words = ["courses", "games", "team", "story"];

  return (
    <motion.span className="inline-block">
      {words.map((word, index) => (
        <motion.span
          key={word}
          className="absolute"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 3,
            delay: index * 3,
            repeat: Infinity,
            repeatDelay: (words.length - 1) * 3,
            times: [0, 0.1, 0.9, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function ContactHeroV2() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden flex items-center">
      {/* Animated Grid Background */}
      <AnimatedGrid />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Accent Line */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-px w-16 bg-gradient-to-r from-orange-500 to-orange-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">
                  Get in Touch
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block text-white">Got questions</span>
                <span className="block text-white">about our</span>
                <span className="block relative h-[1.2em]">
                  <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 bg-clip-text text-transparent">
                    <TypewriterText />
                  </span>
                  <span className="invisible">courses</span>
                  <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 bg-clip-text text-transparent">?</span>
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-300 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We're not a faceless corporation. We're a passionate team of game developers
                who remember what it's like to start from scratch. Drop us a line —
                <span className="text-orange-300"> we actually read every message.</span>
              </motion.p>

              {/* Why Reach Out Pills */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {whyReachOut.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:border-orange-500/30 transition-all cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <Icon className="h-4 w-4 text-orange-400" />
                      {item.text}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex items-center gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-orange-500/25 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send us a message
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Usually reply in a few hours
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Contact Cards */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {quickContacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.div
                    key={contact.label}
                    className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-blue-500/30 transition-all border border-white/5">
                        <Icon className="h-6 w-6 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-400 mb-0.5">{contact.label}</p>
                        <p className="font-semibold text-white group-hover:text-orange-300 transition-colors text-lg">
                          {contact.value}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{contact.hint}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-orange-400 transition-all group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                );
              })}

              {/* Trust Indicators */}
              <motion.div
                className="grid grid-cols-3 gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  { value: "24h", label: "Response Time", subtext: "or less" },
                  { value: "500+", label: "Happy Students", subtext: "and counting" },
                  { value: "5", label: "Team Members", subtext: "real humans" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/20 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-300 mt-1">{stat.label}</p>
                    <p className="text-[10px] text-slate-500">{stat.subtext}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 dark:from-background to-transparent" />
    </div>
  );
}
