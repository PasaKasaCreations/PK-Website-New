"use client";

import { motion } from "framer-motion";
import { Gamepad2, Sparkles, Rocket, Star, Zap, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = ["Multiplayer", "Strategy", "Card Games", "Casual"];

export function ComingSoonSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Floating gaming icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -12, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 hidden xl:block z-10"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-white" />
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
            className="absolute bottom-10 right-20 hidden xl:block z-10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <Timer className="w-6 h-6 text-white" />
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-lg shadow-purple-500/25 flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
          </motion.div>

          {/* Header */}
          <div className="max-w-2xl mb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              STAY TUNED
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              More games coming soon
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-lg"
            >
              We&apos;re crafting new multiplayer experiences. Strategic
              gameplay and fun challenges await.
            </motion.p>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature, i) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                    i % 2 === 0
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400"
                      : "bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400"
                  }`}
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <Button className="bg-gradient-to-r from-[#1f3cff] to-blue-500 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                <Rocket className="h-4 w-4 mr-2" />
                Get Notified
              </Button>

              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, -8, 0, 8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="hidden sm:block"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/25 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
