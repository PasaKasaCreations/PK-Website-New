"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes.constants";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Sparkles,
  Users,
  Heart,
  MapPin,
  Quote,
  Code2,
  Rocket,
} from "lucide-react";

const highlights = [
  "Small team, direct communication",
  "Design to deployment, we handle it all",
  "React, Next.js, Unity, Node.js",
  "Live classes in Kathmandu",
];

export function AboutSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Floating icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -12, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 hidden xl:block z-10"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center">
              <Code2 className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-20 hidden xl:block z-10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute top-8 left-1/4 hidden xl:block z-10"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/25 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -8, 0], rotate: [0, -10, 0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-32 left-10 hidden xl:block z-10"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  WHO WE ARE
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6"
                >
                  The team behind the code
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 mb-8"
                >
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                    We're Pasakasa Creations—a software company in Kathmandu. We
                    build web apps, mobile apps, games, and business software.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We started because we love building things that work. We
                    also run programming classes because Nepal needs more
                    developers.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-4 mb-8"
                >
                  {highlights.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 group hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-500/25 group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-tight pt-1">
                        {item}
                      </span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href={ROUTES.ABOUT}>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                      Learn More About Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right: Quote Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500" />

                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-10 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px]" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-tr-[80px]" />

                  {/* Quote icon */}
                  <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 mb-6 shadow-lg">
                    <Quote className="w-6 h-6 text-white" />
                  </div>

                  {/* Quote */}
                  <blockquote className="relative z-10 text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                    "We build things that people actually use. That's always
                    been our focus—shipping real products that make a
                    difference."
                  </blockquote>

                  {/* Author */}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      PK
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        Pasakasa Creations
                      </div>
                      <div className="text-sm text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Kathmandu, Nepal
                      </div>
                    </div>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute bottom-4 right-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                    <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
                    <div className="w-2 h-2 rounded-full bg-orange-500/50" />
                  </div>
                </div>

                {/* Background shapes */}
                <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-100 dark:bg-blue-900/30 rounded-2xl -z-10 rotate-6" />
                <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-orange-100 dark:bg-orange-900/30 rounded-2xl -z-10 -rotate-6" />
              </motion.div>
            </div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
