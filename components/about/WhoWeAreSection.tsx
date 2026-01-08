"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Heart,
  Users,
  Gamepad2,
  ArrowRight,
  Quote,
  MapPin,
  Lightbulb,
  Target,
  Coffee,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";

// ============================================
// VARIANT 1: Classic Two-Column with Quote
// ============================================
function WhoWeAreVariant1() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
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
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-20 hidden xl:block z-10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -8, 0], rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 left-10 hidden xl:block z-10"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text Content */}
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
                  A small team doing real work
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 mb-8"
                >
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    We're not a big corporation with layers of management. We're a
                    small group of people who like building things and teaching others
                    how to do it.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    No fancy offices, no corporate speak. Just developers who ship
                    products, solve problems, and help others learn along the way.
                    That's pretty much it.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href={ROUTES.CONTACT}>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                      Get in Touch
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
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />

                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-10 overflow-hidden">
                  {/* Decorative corners */}
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
                      <div className="font-semibold text-white">Pasakasa Creations</div>
                      <div className="text-sm text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Kathmandu, Nepal
                      </div>
                    </div>
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

// ============================================
// VARIANT 2: Our Values & Approach
// ============================================
const values = [
  {
    icon: Target,
    title: "Ship It",
    description: "We believe in launching and iterating. Perfect is the enemy of done.",
    color: "orange",
  },
  {
    icon: Lightbulb,
    title: "Stay Curious",
    description: "Technology changes fast. We're always learning something new.",
    color: "blue",
  },
  {
    icon: Handshake,
    title: "Be Honest",
    description: "No overselling, no hype. We tell you what we can and can't do.",
    color: "orange",
  },
  {
    icon: Coffee,
    title: "Keep It Simple",
    description: "Simple solutions beat complex ones. We don't overcomplicate things.",
    color: "blue",
  },
];

function WhoWeAreVariant2() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Floating icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-20 hidden xl:block z-10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, 8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-40 left-10 hidden xl:block z-10"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
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
                  How we think about work
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 mb-8"
                >
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    We're not trying to be the biggest company. We just want to do
                    good work with good people. Here's what guides us:
                  </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href={ROUTES.CAREERS}>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                      Join Our Team
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right: Values Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  const isBlue = value.color === "blue";
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="group relative"
                    >
                      <div className={`absolute -inset-1 bg-gradient-to-r ${isBlue ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500`} />

                      <div className={`relative p-5 rounded-xl border-2 ${isBlue ? 'border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700' : 'border-orange-100 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700'} bg-white dark:bg-slate-900/50 transition-all hover:shadow-xl hover:-translate-y-1`}>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${isBlue ? 'from-blue-500 to-blue-600 shadow-blue-500/25' : 'from-orange-500 to-orange-600 shadow-orange-500/25'} shadow-lg flex items-center justify-center mb-3 transition-all group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{value.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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

// ============================================
// VARIANT 3: Mission & Vision Style
// ============================================
function WhoWeAreVariant3() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Floating icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-16 hidden xl:block z-10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="absolute bottom-20 left-16 hidden xl:block z-10"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="max-w-2xl mb-12">
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
                Why we do what we do
              </motion.h2>
            </div>

            {/* Two Big Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Our Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />

                <div className="relative h-full p-8 rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-900/50 transition-all hover:shadow-xl">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3">
                    <Target className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    What we're building
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    We want to prove that you can build successful tech products from
                    Nepal. Not by copying what others do, but by solving real problems
                    in our own way.
                  </p>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our games are played by people around the world. Our students
                    are getting jobs and building their own projects. That's the
                    kind of impact we're after.
                  </p>
                </div>
              </motion.div>

              {/* Our Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500" />

                <div className="relative h-full p-8 rounded-2xl border-2 border-orange-100 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700 bg-white dark:bg-slate-900/50 transition-all hover:shadow-xl">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3">
                    <Lightbulb className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    How we work
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    We don't follow trends or chase hype. We pick problems that
                    interest us, build solutions that work, and ship them to real users.
                  </p>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    When we teach, we share what we've actually learned from building
                    and running live products—not just theory from textbooks.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 text-center"
            >
              <Link href={ROUTES.CONTACT}>
                <Button className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all">
                  Let's Work Together
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN COMPONENT WITH VARIANT SWITCHER
// ============================================
export function WhoWeAreSection() {
  const [variant, setVariant] = useState<1 | 2 | 3>(1);

  return (
    <>
      {/* Variant Switcher */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 p-1.5">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 hidden sm:inline">Who We Are:</span>
        {[1, 2, 3].map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v as 1 | 2 | 3)}
            className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
              variant === v
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Render Selected Variant */}
      {variant === 1 && <WhoWeAreVariant1 />}
      {variant === 2 && <WhoWeAreVariant2 />}
      {variant === 3 && <WhoWeAreVariant3 />}
    </>
  );
}
