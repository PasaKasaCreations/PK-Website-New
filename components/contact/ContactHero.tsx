"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  Zap,
  Heart,
  Gamepad2,
  BookOpen,
  Handshake,
  ChevronDown,
} from "lucide-react";

const cardLayers = [
  {
    title: "Reply Within 24 Hours",
    description: "Your inbox, not your spam folder.",
    icon: Clock,
    rotate: -8,
    translateX: -50,
    translateY: 30,
    zIndex: 1,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "We Speak Gamer",
    description: "No jargon. Just straight talk.",
    icon: Gamepad2,
    rotate: 5,
    translateX: 50,
    translateY: -15,
    zIndex: 2,
    gradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Every Message Counts",
    description: "Big question or small — we're listening.",
    icon: Heart,
    rotate: -2,
    translateX: 0,
    translateY: 5,
    zIndex: 3,
    gradient: "from-blue-600 via-purple-500 to-orange-500",
  },
];

const reasonsToReach = [
  {
    icon: BookOpen,
    title: "Course Questions",
    description: "Fees, schedule, or anything else",
  },
  {
    icon: Gamepad2,
    title: "Game Feedback",
    description: "Tell us what you think",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    description: "Let's explore together",
  },
  {
    icon: Heart,
    title: "Just Saying Hi",
    description: "We love that too",
  },
];

function StackedCard({
  title,
  description,
  icon: Icon,
  rotate,
  translateX,
  translateY,
  zIndex,
  gradient,
  index,
}: {
  title: string;
  description: string;
  icon: typeof Clock;
  rotate: number;
  translateX: number;
  translateY: number;
  zIndex: number;
  gradient: string;
  index: number;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ zIndex }}
      initial={{
        opacity: 0,
        x: "-50%",
        y: "-50%",
        rotate: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        x: `calc(-50% + ${translateX}px)`,
        y: `calc(-50% + ${translateY}px)`,
        rotate,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        delay: 0.4 + index * 0.15,
        type: "spring",
        stiffness: 80,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.25 },
      }}
    >
      <div
        className={`w-72 h-44 bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-2xl cursor-pointer border border-white/20`}
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg leading-tight">
              {title}
            </h3>
            <p className="text-white/80 text-sm mt-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white/60" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactHero() {
  return (
    <div className="relative min-h-[90vh] pt-16 lg:pt-20 bg-gradient-to-b from-slate-50 via-white to-blue-50/50 dark:from-slate-900 dark:via-background dark:to-blue-950/20 overflow-hidden flex items-center">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-5 w-80 h-80 bg-blue-200/40 dark:bg-blue-500/10 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-96 h-96 bg-orange-200/40 dark:bg-orange-500/10 rounded-full blur-[80px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 2 === 0 ? "bg-blue-400/30" : "bg-orange-400/30"
            }`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full text-sm font-semibold text-white shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4" />
              Hey, We're Listening
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Got something
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                on your mind?
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We're a small team based in Kathmandu who genuinely loves what we
              do. Whether you're curious about learning game development, have
              feedback on our games, or just want to connect —{" "}
              <span className="text-orange-500 font-medium">
                we'd love to hear from you.
              </span>
            </motion.p>

            {/* Reasons to Reach Out - Grid */}
            <motion.div
              className="grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {reasonsToReach.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={reason.title}
                    className="group p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg transition-all cursor-pointer"
                    whileHover={{ y: -4, scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          i % 2 === 0
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : "bg-orange-100 dark:bg-orange-900/30"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            i % 2 === 0
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-orange-600 dark:text-orange-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white text-sm">
                          {reason.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="hidden lg:flex items-center gap-3 text-slate-400 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center p-1.5">
                  <motion.div
                    className="w-1.5 h-2.5 bg-slate-400 rounded-full"
                    animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <ChevronDown className="h-4 w-4 -mt-1 text-slate-300" />
              </motion.div>
              <span className="text-sm">
                Scroll down — we can't wait to hear from you
              </span>
            </motion.div>
          </motion.div>

          {/* Right Content - Stacked Cards */}
          <div className="relative h-80 lg:h-[420px] hidden md:block">
            {cardLayers.map((card, index) => (
              <StackedCard key={card.title} {...card} index={index} />
            ))}

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-24 h-24 border-2 border-dashed border-blue-300/50 dark:border-blue-700/50 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-20 h-20 border-2 border-dashed border-orange-300/50 dark:border-orange-700/50 rounded-xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-orange-400/10 rounded-lg"
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-4">
            {cardLayers.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-5 shadow-lg border border-white/20`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
