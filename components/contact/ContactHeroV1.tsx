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
} from "lucide-react";

/**
 * ContactHeroV1 - Geometric Shapes Hero
 *
 * Playful, creative design with animated geometric shapes
 * floating around the content. Gaming-inspired aesthetic.
 *
 * DELETE THIS FILE if not selected as final design.
 */

const floatingShapes = [
  { type: "circle", size: 100, color: "bg-orange-500/15", delay: 0, duration: 8, x: "8%", y: "15%" },
  { type: "square", size: 70, color: "bg-blue-500/15", delay: 1, duration: 10, x: "88%", y: "12%" },
  { type: "triangle", size: 80, color: "bg-orange-400/15", delay: 2, duration: 9, x: "78%", y: "72%" },
  { type: "circle", size: 60, color: "bg-blue-400/15", delay: 0.5, duration: 7, x: "12%", y: "78%" },
  { type: "square", size: 50, color: "bg-orange-300/15", delay: 1.5, duration: 11, x: "92%", y: "48%" },
  { type: "circle", size: 120, color: "bg-blue-300/10", delay: 3, duration: 12, x: "3%", y: "45%" },
  { type: "hexagon", size: 55, color: "bg-orange-500/10", delay: 2.5, duration: 9, x: "70%", y: "25%" },
  { type: "circle", size: 45, color: "bg-blue-500/10", delay: 1.8, duration: 8, x: "25%", y: "55%" },
];

const contactMethods = [
  { icon: Mail, label: "Drop us an email", x: "15%", y: "28%", delay: 0.2 },
  { icon: Phone, label: "Give us a call", x: "82%", y: "32%", delay: 0.4 },
  { icon: MapPin, label: "Visit in Kathmandu", x: "18%", y: "68%", delay: 0.6 },
];

const conversationStarters = [
  { icon: Gamepad2, text: "Want to play our games?" },
  { icon: GraduationCap, text: "Ready to learn game dev?" },
  { icon: Coffee, text: "Just want to say hi?" },
];

function GeometricShape({
  type,
  size,
  color,
  delay,
  duration,
  x,
  y,
}: {
  type: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) {
  const getShapeStyle = () => {
    switch (type) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-lg rotate-45";
      case "hexagon":
        return "rounded-xl rotate-12";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className={`absolute ${color} ${getShapeStyle()} backdrop-blur-sm border border-white/10`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        clipPath: type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -25, 0],
        rotate: type === "square" ? [45, 90, 45] : type === "hexagon" ? [12, 24, 12] : [0, 8, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

function FloatingContactMethod({
  icon: Icon,
  label,
  x,
  y,
  delay,
}: {
  icon: typeof Mail;
  label: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute hidden lg:flex flex-col items-center gap-2 group cursor-pointer"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay + 0.5 },
        scale: { duration: 0.5, delay: delay + 0.5 },
        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/25 flex items-center justify-center shadow-2xl group-hover:bg-white/25 transition-all duration-300">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <span className="text-xs font-medium text-white/90 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
        {label}
      </span>
    </motion.div>
  );
}

export function ContactHeroV1() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white overflow-hidden flex items-center">
      {/* Floating Geometric Shapes */}
      {floatingShapes.map((shape, index) => (
        <GeometricShape key={index} {...shape} />
      ))}

      {/* Floating Contact Methods */}
      {contactMethods.map((item, index) => (
        <FloatingContactMethod key={index} {...item} />
      ))}

      {/* Decorative Game Controller Icon */}
      <motion.div
        className="absolute bottom-20 right-10 hidden xl:block"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Gamepad2 className="h-24 w-24 text-white/10" />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glassmorphic Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 rounded-full text-sm font-semibold mb-6 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="h-4 w-4" />
              WE'D LOVE TO HEAR FROM YOU
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Hey there!
              <br />
              <span className="text-orange-300">Let's have a chat.</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              We're a small team of gamers and developers based in Kathmandu.
              Whether you're curious about our courses, our games, or just want to geek out about game development — we're all ears.
            </motion.p>

            {/* Conversation Starters */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {conversationStarters.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Icon className="h-4 w-4 text-orange-300" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Response Promise */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-2 text-blue-100">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <Clock className="h-4 w-4" />
                <span className="text-sm">We reply within 24 hours</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2 text-blue-100">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Real humans, no bots</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-gray-50 dark:fill-background"
          />
        </svg>
      </div>
    </div>
  );
}
