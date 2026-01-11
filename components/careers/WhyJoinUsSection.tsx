"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Play,
} from "lucide-react";
import Image from "next/image";

type VariantType = "single" | "carousel";

// Sample images for carousel - replace with actual team images
const carouselImages = [
  {
    src: "/career-page-1.png",
    alt: "Team member exploring VR",
    caption: "Exploring New Technologies",
  },
  {
    src: "/career-page-2.jpg",
    alt: "Team collaboration",
    caption: "Building Together",
  },
  {
    src: "/career-page-3.jpg",
    alt: "Creative workspace",
    caption: "Where Ideas Come to Life",
  },
  {
    src: "/CareersPage.png",
    alt: "Team celebration",
    caption: "Celebrating Wins",
  },
];

// Variant Switcher Component
function VariantSwitcher({
  activeVariant,
  onSwitch,
}: {
  activeVariant: VariantType;
  onSwitch: (variant: VariantType) => void;
}) {
  const variants: { id: VariantType; label: string; icon: React.ReactNode }[] =
    [
      {
        id: "single",
        label: "Single Image",
        icon: <ImageIcon className="w-4 h-4" />,
      },
      { id: "carousel", label: "Carousel", icon: <Play className="w-4 h-4" /> },
    ];

  return (
    <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
          Preview Mode — Choose a layout
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSwitch(variant.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeVariant === variant.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700"
            }`}
          >
            {variant.icon}
            {variant.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Variant 1: Single Image
function SingleImageVariant() {
  return (
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
          src="/career-page-1.png"
          alt="Team member using VR headset"
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
  );
}

// Variant 2: Interactive Carousel
function CarouselVariant() {
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
      scale: 0.9,
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
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="relative order-2 lg:order-1"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-3xl opacity-10 blur-2xl" />

      {/* Main Carousel Container */}
      <div className="relative h-[450px] rounded-2xl overflow-hidden border-2 border-orange-200 dark:border-orange-800 shadow-2xl bg-slate-900">
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
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-6 right-6"
            >
              <p className="text-white text-xl font-semibold">
                {carouselImages[currentIndex].caption}
              </p>
            </motion.div>
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
        <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
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

        {/* Image counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm font-medium z-10">
          {currentIndex + 1} / {carouselImages.length}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-100 dark:bg-blue-900/30 rounded-2xl -z-10 rotate-6" />
      <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-orange-100 dark:bg-orange-900/30 rounded-2xl -z-10 -rotate-6" />

      {/* Thumbnail preview strip */}
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
    </motion.div>
  );
}

// Text Content Component (shared across variants)
function TextContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="space-y-6 order-1 lg:order-2"
    >
      <div className="space-y-5">
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          We're not going to lie to you with corporate speak. Here's the deal:
        </p>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          We're a small team in Kathmandu building games and teaching people how
          to make them. Some days are exciting—launching a new feature, seeing
          player counts go up, watching a student finally get that tricky
          concept. Other days are just... work. Fixing bugs. Writing docs.
          Answering support emails.
        </p>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          What makes it worth it? The people. We've built a team where everyone
          genuinely likes working together. No politics, no drama, no one trying
          to climb over someone else. Just people who care about doing good
          work.
        </p>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          We're flexible about where and when you work. We don't track your
          hours or micromanage your day. We hired you because we trust you. Act
          like it, and we'll get along great.
        </p>
      </div>

      <div className="pt-4">
        <p className="text-slate-800 dark:text-slate-200 font-medium">
          Sound like your kind of place? Keep scrolling.
        </p>
      </div>
    </motion.div>
  );
}

export function WhyJoinUsSection() {
  const [activeVariant, setActiveVariant] = useState<VariantType>("single");

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

          {/* Variant Switcher */}
          <VariantSwitcher
            activeVariant={activeVariant}
            onSwitch={setActiveVariant}
          />

          {/* Content Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVariant}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10"
            >
              {/* Left: Image Variant */}
              {activeVariant === "single" ? (
                <SingleImageVariant />
              ) : (
                <CarouselVariant />
              )}

              {/* Right: Text Content */}
              <TextContent />
            </motion.div>
          </AnimatePresence>

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
