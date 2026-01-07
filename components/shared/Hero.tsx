"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";
import Link from "next/link";
import {
  Rocket,
  GraduationCap,
  Code,
  Globe,
  ArrowRight,
  Gamepad2,
  Award,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";

const rotatingTexts = [
  { line1: "Digital Solutions", line2: "That Transform Businesses" },
  { line1: "Mobile Games", line2: "That Players Love" },
  { line1: "Web Applications", line2: "That Scale Seamlessly" },
  { line1: "Future Developers", line2: "Through Live Training" },
];

const cardColors = {
  orange: {
    iconBg: "bg-orange-100",
    icon: "text-orange-600",
    border: "border-orange-100 hover:border-orange-300",
    badge: "bg-orange-100 text-orange-700",
  },
  blue: {
    iconBg: "bg-blue-100",
    icon: "text-blue-600",
    border: "border-blue-100 hover:border-blue-300",
    badge: "bg-blue-100 text-blue-700",
  },
  purple: {
    iconBg: "bg-purple-100",
    icon: "text-purple-600",
    border: "border-purple-100 hover:border-purple-300",
    badge: "bg-purple-100 text-purple-700",
  },
} as const;

type CardColor = keyof typeof cardColors;

interface ServiceCardData {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: CardColor;
  rotation: number;
}

const serviceCards: ServiceCardData[] = [
  {
    id: "web-mobile",
    category: "DEVELOPMENT",
    title: "Web & Mobile Apps",
    description:
      "Custom websites, web apps, and mobile applications built with modern technologies",
    icon: Globe,
    link: ROUTES.CONTACT,
    color: "blue",
    rotation: 2,
  },
  {
    id: "games",
    category: "GAMING",
    title: "Game Development",
    description:
      "Engaging mobile games and interactive experiences using Unity and modern game engines",
    icon: Gamepad2,
    link: ROUTES.GAMES,
    color: "orange",
    rotation: -1.5,
  },
  {
    id: "training",
    category: "EDUCATION",
    title: "Live Training",
    description:
      "Hands-on programming courses and bootcamps to kickstart your tech career",
    icon: GraduationCap,
    link: ROUTES.COURSES,
    color: "purple",
    rotation: 1,
  },
];

function ServiceCard({
  card,
  index,
}: {
  card: ServiceCardData;
  index: number;
}) {
  const Icon = card.icon;
  const colors = cardColors[card.color];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotate: card.rotation }}
      animate={{
        opacity: 1,
        x: 0,
        rotate: card.rotation,
        y: [0, -4, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: 0.3 + index * 0.12 },
        x: { duration: 0.6, delay: 0.3 + index * 0.12 },
        rotate: { duration: 0.6, delay: 0.3 + index * 0.12 },
        y: {
          duration: 3.5 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.25,
        },
      }}
      whileHover={{
        scale: 1.03,
        rotate: 0,
        y: -8,
        zIndex: 10,
        transition: { duration: 0.2 },
      }}
      className={`relative bg-white rounded-2xl p-6 border-2 ${colors.border} shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
    >
      <Link href={card.link} className="block">
        <span
          className={`inline-block px-3 py-1 ${colors.badge} rounded-full text-xs font-semibold mb-4`}
        >
          {card.category}
        </span>

        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {card.description}
            </p>
          </div>
          <div
            className={`h-12 w-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`h-6 w-6 ${colors.icon}`} />
          </div>
        </div>

        <div className="flex items-center justify-end mt-4 pt-4 border-t border-slate-100">
          <span
            className={`text-sm font-medium ${colors.icon} group-hover:underline`}
          >
            Learn more
          </span>
          <motion.div
            className={`ml-2 h-6 w-6 rounded-full ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
            whileHover={{ x: 2 }}
          >
            <ArrowRight className={`h-3.5 w-3.5 ${colors.icon}`} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentText = rotatingTexts[currentTextIndex];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/40 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-200/40 dark:bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full text-sm font-semibold text-white shadow-lg">
                <Code className="h-4 w-4" />
                SOFTWARE DEVELOPMENT COMPANY
              </span>
            </motion.div>

            {/* Heading with Rotating Text */}
            <div className="min-h-[160px] sm:min-h-[180px] lg:min-h-[200px]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="text-slate-900 dark:text-white">
                  Building{" "}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                      {currentText.line1}
                    </span>
                    <br />
                    <span className="text-slate-900 dark:text-white">
                      {currentText.line2}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
            >
              We&apos;re a Nepal-based team passionate about creating software
              that makes a difference. Whether you need a stunning website, a
              mobile app, or want to learn coding—we&apos;ve got you covered.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-2 max-w-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="font-bold text-xl text-slate-900 dark:text-white">
                  100+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Projects
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="font-bold text-xl text-slate-900 dark:text-white">
                  500+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Students
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="font-bold text-xl text-slate-900 dark:text-white">
                  Nepal
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Based
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href={ROUTES.CONTACT}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Start Your Project
                </Button>
              </Link>
              <Link href={ROUTES.COURSES}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 dark:border-slate-600 hover:border-orange-500 hover:text-orange-600 h-14 px-8 text-lg font-semibold transition-all"
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Join Live Classes
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Service Cards */}
          <div className="relative lg:pl-4">
            <div className="space-y-4">
              {serviceCards.map((card, index) => (
                <ServiceCard key={card.id} card={card} index={index} />
              ))}
            </div>

            {/* Decorative glow behind cards */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-orange-100/50 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-orange-500/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
