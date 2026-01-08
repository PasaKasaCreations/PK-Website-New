"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

const reasons = [
  "Learn from developers who've shipped real games to thousands of players",
  "Physical classes in Kathmandu—no online-only shortcuts",
  "Small batch sizes for personalized mentorship and guidance",
  "Build actual projects, not just tutorials—publish your own game",
  "Join a growing community of game developers in Nepal",
  "Industry-relevant curriculum updated based on real production experience",
];

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
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              WHY CHOOSE US
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Why learn with us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-lg"
            >
              We teach what we actually do—real game development from real developers.
            </motion.p>
          </div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl relative z-10">
            {reasons.map((reason, index) => {
              const isBlue = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="relative group"
                >
                  {/* Card glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${isBlue ? "from-blue-500 to-blue-600" : "from-orange-500 to-orange-600"} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500`} />

                  <div
                    className={`
                      relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300
                      ${isBlue ? "border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700" : "border-orange-100 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700"}
                      hover:shadow-lg hover:-translate-y-0.5
                      bg-white dark:bg-slate-800/50
                    `}
                  >
                    {/* Check icon */}
                    <div
                      className={`
                        flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                        bg-gradient-to-br ${isBlue ? "from-blue-500 to-blue-600 shadow-blue-500/25" : "from-orange-500 to-orange-600 shadow-orange-500/25"}
                        shadow-lg group-hover:scale-110 transition-transform
                      `}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>

                    {/* Text */}
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {reason}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

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
