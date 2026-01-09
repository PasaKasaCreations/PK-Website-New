"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";

export function WhoWeAreSection() {
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
              WHO WE ARE
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              The honest version
            </motion.h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group order-2 lg:order-1"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />

              {/* Image Container - Replace placeholder with your actual image */}
              <div className="relative h-[450px] rounded-2xl overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-xl bg-gradient-to-br from-blue-100 via-purple-50 to-orange-100 dark:from-blue-950 dark:via-purple-950 dark:to-orange-950">
                {/* Decorative corners */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px]" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-tr-[80px]" />

                {/* Placeholder - Replace this div with next/image when you have the photo */}
                <div className="flex items-center justify-center h-full relative z-10">
                  <div className="text-center space-y-4 px-8">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                    </motion.div>
                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      Team at Work
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      Add a real photo here: team working, whiteboard sessions,
                      or casual office moments
                    </p>
                  </div>
                </div>

                {/*
                  When you have the image, replace the placeholder div above with:

                  <Image
                    src="/images/about/team-working.jpg"
                    alt="Pasakasa team working together"
                    fill
                    className="object-cover"
                  />
                */}
              </div>

              {/* Background shapes */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-100 dark:bg-blue-900/30 rounded-2xl -z-10 rotate-6" />
              <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-orange-100 dark:bg-orange-900/30 rounded-2xl -z-10 -rotate-6" />
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="space-y-5">
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  We started Pasakasa because we were tired of the same pattern:
                  talented people in Nepal either leaving for abroad or working
                  on projects they didn't care about. We wanted to build
                  something different.
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Some days are great. A feature works exactly how we imagined,
                  or a student messages us that they got their first job. Those
                  days make everything worth it. Other days? We're debugging the
                  same issue for hours, or dealing with app store rejections, or
                  staring at analytics that aren't moving.
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We don't have all the answers. We've launched things that
                  flopped. We've made decisions we'd change if we could. But we
                  show up every day, try to get a little better, and keep
                  building. That's really all we can promise.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-slate-800 dark:text-slate-200 font-medium mb-6">
                  If that sounds like people you'd want to learn from or work
                  with, we'd love to meet you.
                </p>

                <Link href={ROUTES.CONTACT}>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                    Say Hello
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
