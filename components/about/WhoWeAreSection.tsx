"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";

// Images for the carousel
const carouselImages = [
  {
    src: "/career-page-1.png",
    alt: "Team exploring new technologies",
  },
  {
    src: "/about/about_1.jpeg",
    alt: "Team collaboration",
  },
  {
    src: "/about/about_2.jpeg",
    alt: "Creative workspace",
  },
  {
    src: "/about/about_3.jpeg",
    alt: "Team at work",
  },
  {
    src: "/about/about_4.jpeg",
    alt: "Company culture",
  },
  {
    src: "/about/about_5.jpeg",
    alt: "Team building",
  },
];

export function WhoWeAreSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

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
            {/* Left: Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative order-2 lg:order-1"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl opacity-10 blur-2xl" />

              {/* Carousel Container */}
              <div className="relative h-[450px] rounded-2xl overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-xl bg-slate-900">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={carouselImages[currentIndex].src}
                      alt={carouselImages[currentIndex].alt}
                      fill
                      className="object-cover"
                      priority={currentIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10 group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10 group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="group relative"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "bg-white w-6"
                            : "bg-white/40 hover:bg-white/60 w-2"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                  <motion.div
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: isAutoPlaying ? "100%" : "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
                  />
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="mt-4 flex gap-2 justify-center">
                {carouselImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentIndex
                        ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-105"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
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
