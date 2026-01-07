"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Gamepad2,
  GraduationCap,
  Coffee,
  ArrowRight,
} from "lucide-react";

/**
 * ContactHeroV4 - Hybrid Hero (V1 + V2 Mix)
 *
 * Combines V2's dark grid aesthetic with V1's playful
 * animations, glassmorphic card, and conversational content.
 *
 * DELETE THIS FILE if not selected as final design.
 */

const floatingShapes = [
  { size: 90, color: "bg-orange-500/10", delay: 0, duration: 8, x: "5%", y: "15%" },
  { size: 60, color: "bg-blue-500/10", delay: 1, duration: 10, x: "92%", y: "10%" },
  { size: 70, color: "bg-orange-400/10", delay: 2, duration: 9, x: "85%", y: "75%" },
  { size: 50, color: "bg-blue-400/10", delay: 0.5, duration: 7, x: "8%", y: "80%" },
  { size: 80, color: "bg-blue-300/10", delay: 3, duration: 12, x: "75%", y: "40%" },
];

const conversationStarters = [
  { icon: Gamepad2, text: "Want to play our games?" },
  { icon: GraduationCap, text: "Ready to learn game dev?" },
  { icon: Coffee, text: "Just want to say hi?" },
];

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

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
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
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-400/50 to-transparent"
          style={{ left: `${(i + 1) * 7}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, delay: i * 0.04 }}
        />
      ))}
    </div>
  );
}

function FloatingShape({
  size,
  color,
  delay,
  duration,
  x,
  y,
}: {
  size: number;
  color: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      className={`absolute ${color} rounded-full backdrop-blur-sm border border-white/5`}
      style={{ width: size, height: size, left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -20, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

export function ContactHeroV4() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden flex items-center">
      {/* Animated Grid Background */}
      <AnimatedGrid />

      {/* Floating Shapes */}
      {floatingShapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Glassmorphic Card (from V1) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-sm font-semibold mb-6 shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Sparkles className="h-4 w-4" />
                  WE'D LOVE TO HEAR FROM YOU
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Hey there!
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 bg-clip-text text-transparent">
                    Let's have a chat.
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg text-slate-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  We're a small team of gamers and developers based in Kathmandu.
                  Whether you're curious about our courses, our games, or just want
                  to geek out about game development —
                  <span className="text-orange-300"> we actually read every message.</span>
                </motion.p>

                {/* Conversation Starters */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {conversationStarters.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.text}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Icon className="h-4 w-4 text-orange-400" />
                        <span className="text-sm font-medium text-slate-200">{item.text}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Response Promise */}
                <motion.div
                  className="flex flex-wrap items-center gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">Reply within 24 hours</span>
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-white/20" />
                  <div className="flex items-center gap-2 text-slate-300">
                    <MessageCircle className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">Real humans, no bots</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right - Contact Cards (from V2 style) */}
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
                    transition={{ delay: 0.5 + index * 0.15 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-5">
                      <motion.div
                        className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-blue-500/30 transition-all border border-white/5"
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon className="h-6 w-6 text-orange-400" />
                      </motion.div>
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

              {/* Stats Row */}
              <motion.div
                className="grid grid-cols-3 gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {[
                  { value: "24h", label: "Response", subtext: "or less" },
                  { value: "500+", label: "Students", subtext: "trained" },
                  { value: "5", label: "Team", subtext: "real humans" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/20 transition-all"
                    whileHover={{ y: -4, scale: 1.02 }}
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-background to-transparent" />
    </div>
  );
}
