"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes.constants";
import { CourseCard } from "@/components/shared/CourseCard";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course.interface";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeaturedCoursesSectionProps {
  courses: Course[];
}

export function FeaturedCoursesSection({
  courses,
}: FeaturedCoursesSectionProps) {
  return (
    <section className="py-20 bg-white dark:bg-background overflow-hidden">
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
              LIVE TRAINING
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Learn to code with us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-lg"
            >
              Hands-on classes in Kathmandu. No boring lectures—you'll build
              real projects from week one.
            </motion.p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                {/* Card glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />
                <div className="relative">
                  <CourseCard course={course} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 relative z-10"
          >
            <Link href={ROUTES.COURSES}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
              >
                Explore All Courses
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
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
