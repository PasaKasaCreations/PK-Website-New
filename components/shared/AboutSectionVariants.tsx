"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/constants/routes.constants";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";

export function AboutSectionVariants() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group order-2 lg:order-1"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />

              {/* Image Container */}
              <div className="relative h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
                <Image
                  src="/homepage.jpg"
                  alt="Pasakasa workspace - where the code happens"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Subtle overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Background shapes */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-100 dark:bg-blue-900/30 rounded-2xl -z-10 rotate-6" />
              <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-orange-100 dark:bg-orange-900/30 rounded-2xl -z-10 -rotate-6" />
            </motion.div>

            {/* Right: Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="order-1 lg:order-2"
            >
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
                Developers who actually
                <br />
                build things
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4 mb-8"
              >
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  We're a small software company in Kathmandu. Started with two
                  people, a shared laptop, and a stubborn belief that we could
                  figure things out.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Three years later, we've shipped multiplayer games with
                  thousands of players, built apps for local businesses, and
                  started teaching coding to anyone willing to learn.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We're not a big agency with fancy decks. We're the team that
                  picks up the phone, writes the code, and ships the thing.
                  That's always been the deal.
                </p>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6 mb-8"
              >
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    15K+
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Game downloads
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    15+
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Students taught
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    3+
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Years building
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <Link href={ROUTES.ABOUT}>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                    More About Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>Kshitij Marg, Kathmandu, Nepal</span>
                </div>
              </motion.div>
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
    </section>
  );
}
