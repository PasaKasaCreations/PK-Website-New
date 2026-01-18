"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export function WhyJoinUsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
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
              JOIN OUR TEAM
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Here's what it's actually like to work here
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group order-2 lg:order-1"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700" />

              {/* Main Image Container */}
              <div className="relative h-[450px] rounded-2xl overflow-hidden border-2 border-orange-200 dark:border-orange-800 shadow-2xl">
                <Image
                  src="/career/career_1.jpeg"
                  alt="Team members"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-100 dark:bg-blue-900/30 rounded-2xl -z-10 rotate-6" />
              <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-orange-100 dark:bg-orange-900/30 rounded-2xl -z-10 -rotate-6" />

              {/* Animated corner accents */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-blue-500 rounded-tl-lg"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-orange-500 rounded-br-lg"
              />
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="space-y-5">
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  We're not going to lie to you with corporate speak. Here's the
                  deal:
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We're a small team in Kathmandu building games and teaching
                  people how to make them. Some days are exciting—launching a
                  new feature, seeing player counts go up, watching a student
                  finally get that tricky concept. Other days are just... work.
                  Fixing bugs. Writing docs. Answering support emails.
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  What makes it worth it? The people. We've built a team where
                  everyone genuinely likes working together. No politics, no
                  drama, no one trying to climb over someone else. Just people
                  who care about doing good work.
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We're flexible about where and when you work. We don't track
                  your hours or micromanage your day. We hired you because we
                  trust you. Act like it, and we'll get along great.
                </p>
              </div>

              <div className="pt-4">
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  Sound like your kind of place? Keep scrolling.
                </p>
              </div>
            </motion.div>
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
