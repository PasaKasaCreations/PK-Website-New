"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { ResumeSubmissionModal } from "./ResumeSubmissionModal";

export function CareersCTASection() {
  return (
    <section
      id="careers-cta"
      className="py-20 bg-white dark:bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Full Width CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500" />

            <div className="relative w-full p-10 md:p-16 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
                >
                  Don't see a position for you?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                >
                  That's okay. Send us your resume anyway and tell us what
                  you're good at. We're always looking for talented people, and
                  if something opens up that matches your skills, we'll reach
                  out.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <ResumeSubmissionModal
                    trigger={
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all px-8"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Your Resume
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    }
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-sm text-slate-500 dark:text-slate-500"
                >
                  No formal application needed. Just tell us about yourself.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
