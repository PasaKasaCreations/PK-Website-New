"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes.constants";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Code,
  Zap,
} from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              READY TO START?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Let's build something amazing
            </h2>
          </motion.div>

          {/* Floating decorative elements */}
          <div className="absolute -top-8 left-1/4 w-16 h-16 bg-blue-200/40 dark:bg-blue-500/10 rounded-2xl rotate-12 blur-sm" />
          <div className="absolute top-1/2 -left-4 w-12 h-12 bg-orange-200/50 dark:bg-orange-500/10 rounded-full" />
          <div className="absolute -bottom-6 right-1/3 w-20 h-20 bg-blue-100/60 dark:bg-blue-500/10 rounded-3xl -rotate-6" />
          <div className="absolute top-1/4 -right-2 w-10 h-10 bg-orange-200/40 dark:bg-orange-500/10 rounded-xl rotate-45" />

          {/* Animated floating icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-1/4 hidden lg:block"
          >
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-8 left-1/4 hidden lg:block"
          >
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
          </motion.div>

          {/* Cards Container */}
          <div className="relative grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

              <div className="relative bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-blue-900/50 rounded-2xl p-8 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 rounded-bl-[100px] -z-0" />

                {/* Decorative dots */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-200 dark:bg-blue-700" />
                  <div className="w-2 h-2 rounded-full bg-blue-300 dark:bg-blue-600" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MessageCircle className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Start a project
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Have an idea? Tell us what you're building and we'll help
                    bring it to life. Let's create something great together.
                  </p>

                  <Link href={ROUTES.CONTACT}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                      Get in Touch
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Courses Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

              <div className="relative bg-white dark:bg-slate-800 border-2 border-orange-100 dark:border-orange-900/50 rounded-2xl p-8 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-xl overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent dark:from-orange-900/20 rounded-bl-[100px] -z-0" />

                {/* Decorative dots */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-200 dark:bg-orange-700" />
                  <div className="w-2 h-2 rounded-full bg-orange-300 dark:bg-orange-600" />
                  <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-orange-500" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-6 shadow-lg shadow-orange-500/25 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    Learn with us
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Join our hands-on programming classes in Kathmandu. Build
                    real projects from day one and launch your tech career.
                  </p>

                  <Link href={ROUTES.COURSES}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all">
                      View Courses
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
