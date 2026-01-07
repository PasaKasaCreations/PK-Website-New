"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";
import Link from "next/link";
import Image from "next/image";
import {
  Rocket,
  GraduationCap,
  Award,
  MapPin,
  Users,
  Code,
} from "lucide-react";

const rotatingTexts = [
  {
    line1: "Digital Solutions",
    line2: "That Transform Businesses",
  },
  {
    line1: "Mobile Games",
    line2: "That Players Love",
  },
  {
    line1: "Web Applications",
    line2: "That Scale Seamlessly",
  },
  {
    line1: "Future Developers",
    line2: "Through Live Training",
  },
];

interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  imageSrc = "/homepage_hero.png",
  imageAlt = "Pasakasa Creations",
}: HeroProps) {
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full text-sm font-semibold text-white shadow-lg"
            >
              <Code className="h-4 w-4" />
              SOFTWARE DEVELOPMENT COMPANY
            </motion.div>

            {/* Heading with Rotating Text */}
            <div className="min-h-[180px] sm:min-h-[200px] lg:min-h-[220px]">
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
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              From web and mobile apps to games and CRM systems—we deliver
              cutting-edge software solutions and train the next generation of
              developers in Nepal.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-2 max-w-md">
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
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
              />

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500 rounded-full opacity-80 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full opacity-80 blur-sm" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    7+ Years
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Experience
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
