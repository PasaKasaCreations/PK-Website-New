"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Globe,
  Smartphone,
  Gamepad2,
  Palette,
  GraduationCap,
  Rocket,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";

export function WhyLearnWithUsSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
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
              WHY US
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              We're not specialists. That's the point.
            </motion.h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-5">
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Most companies pick one thing and stick to it. We didn't. We
                  build web apps, mobile apps, games, design assets, train
                  students, and work on our own products. All at the same time.
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Why? Because real problems don't fit into neat boxes. A game
                  needs a website. A mobile app needs backend APIs. A course
                  needs actual projects to teach from. Everything connects.
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  When you work with us or learn from us, you're getting people
                  who've shipped across platforms. We know what breaks, what
                  scales, and what's just hype. That's harder to find than you'd
                  think.
                </p>
              </div>

              <div className="pt-2">
                <Link href={ROUTES.CONTACT}>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                    Work With Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Bento Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[400px]">
                {/* Web - Large card spanning 2 cols */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="col-span-2 row-span-1 group"
                >
                  <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center gap-4 transition-all hover:shadow-xl hover:scale-[1.02]">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        Web Development
                      </div>
                      <div className="text-sm text-blue-100">
                        Full-stack apps
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile - Tall vertical card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="row-span-2 group"
                >
                  <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex flex-col items-center justify-center text-center transition-all hover:shadow-xl hover:scale-[1.02]">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                      <Smartphone className="w-7 h-7" />
                    </div>
                    <div className="font-semibold">Mobile</div>
                    <div className="text-xs text-orange-100 mt-1">
                      iOS & Android
                    </div>
                  </div>
                </motion.div>

                {/* Games */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="group"
                >
                  <div className="h-full p-4 rounded-2xl border-2 border-orange-200 dark:border-orange-800 bg-white dark:bg-slate-800/50 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700">
                    <Gamepad2 className="w-8 h-8 text-orange-500 mb-2" />
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Games
                    </div>
                  </div>
                </motion.div>

                {/* Design */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="group"
                >
                  <div className="h-full p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800/50 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
                    <Palette className="w-8 h-8 text-blue-500 mb-2" />
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Design
                    </div>
                  </div>
                </motion.div>

                {/* Training - Wide card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  className="col-span-2 group"
                >
                  <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white flex items-center gap-4 transition-all hover:shadow-xl hover:scale-[1.02]">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold">Training & Courses</div>
                      <div className="text-sm text-slate-400">
                        Learn from real projects
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Products */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="group"
                >
                  <div className="h-full p-4 rounded-2xl border-2 border-orange-200 dark:border-orange-800 bg-white dark:bg-slate-800/50 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700">
                    <Rocket className="w-8 h-8 text-orange-500 mb-2" />
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Products
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
