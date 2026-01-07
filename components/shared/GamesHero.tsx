"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Trophy,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Apple,
} from "lucide-react";
import { Product } from "@/types/product.interface";

interface GamesHeroProps {
  games: Product[];
}

const accentStyles: Record<
  string,
  {
    gradient: string;
    gradientHover: string;
    textGradient: string;
    statBg: string;
    statText: string;
  }
> = {
  orange: {
    gradient: "from-orange-500 to-red-500",
    gradientHover: "hover:from-orange-600 hover:to-red-600",
    textGradient: "from-orange-400 to-red-400",
    statBg: "bg-orange-500/20",
    statText: "text-orange-400",
  },
  blue: {
    gradient: "from-blue-500 to-purple-500",
    gradientHover: "hover:from-blue-600 hover:to-purple-600",
    textGradient: "from-blue-400 to-purple-400",
    statBg: "bg-blue-500/20",
    statText: "text-blue-400",
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    gradientHover: "hover:from-purple-600 hover:to-pink-600",
    textGradient: "from-purple-400 to-pink-400",
    statBg: "bg-purple-500/20",
    statText: "text-purple-400",
  },
  green: {
    gradient: "from-green-500 to-emerald-500",
    gradientHover: "hover:from-green-600 hover:to-emerald-600",
    textGradient: "from-green-400 to-emerald-400",
    statBg: "bg-green-500/20",
    statText: "text-green-400",
  },
};

const defaultAccent = accentStyles.orange;

export function GamesHero({ games }: GamesHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  }, [games.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  }, [games.length]);

  useEffect(() => {
    if (!isAutoPlaying || games.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, games.length]);

  // Return null if no games
  if (!games || games.length === 0) {
    return null;
  }

  const currentGame = games[currentIndex];
  const accent =
    accentStyles[currentGame.accent_color || "orange"] || defaultAccent;

  // Get background image with fallback
  const backgroundImage =
    currentGame.hero_background_image ||
    currentGame.thumbnail_url ||
    "/placeholder-game.jpg";

  // Get stats with defaults
  const stats = currentGame.hero_stats || {
    players: "0",
    rating: "0",
    feature: "",
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentGame.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={backgroundImage}
            alt={currentGame.name}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Card Symbols */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 text-6xl opacity-20 hidden lg:block text-white"
      >
        ♠
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 right-32 text-5xl opacity-20 text-red-500 hidden lg:block"
      >
        ♥
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-40 left-[60%] text-4xl opacity-15 text-white hidden lg:block"
      >
        ♦
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-40 left-[70%] text-5xl opacity-15 text-white hidden lg:block"
      >
        ♣
      </motion.div>

      {/* Navigation Arrows - Only show if multiple games */}
      {games.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
            aria-label="Previous game"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
            aria-label="Next game"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl">
          {/* Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${accent.gradient} rounded-full text-sm font-semibold text-white shadow-lg mb-6`}
            >
              <Sparkles className="h-4 w-4" />
              MADE IN NEPAL
            </motion.div>

            {/* Dynamic Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGame.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-2">
                  {currentGame.name}
                </h1>
                <p
                  className={`text-xl bg-gradient-to-r ${accent.textGradient} bg-clip-text text-transparent font-semibold mb-6`}
                >
                  {currentGame.tagline}
                </p>

                <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-8">
                  {currentGame.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  {stats.players && stats.players !== "0" && (
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full ${accent.statBg} flex items-center justify-center`}
                      >
                        <Users className={`h-5 w-5 ${accent.statText}`} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{stats.players}</p>
                        <p className="text-xs text-gray-400">Players</p>
                      </div>
                    </div>
                  )}

                  {stats.rating && stats.rating !== "0" && (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{stats.rating}</p>
                        <p className="text-xs text-gray-400">Rating</p>
                      </div>
                    </div>
                  )}

                  {stats.feature && (
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full ${accent.statBg} flex items-center justify-center`}
                      >
                        <Trophy className={`h-5 w-5 ${accent.statText}`} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{stats.feature}</p>
                        <p className="text-xs text-gray-400">Featured</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  {currentGame.play_store_url && (
                    <Link
                      href={currentGame.play_store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className={`bg-gradient-to-r ${accent.gradient} ${accent.gradientHover} text-white h-14 px-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all`}
                      >
                        <Smartphone className="h-5 w-5 mr-2" />
                        Play Store
                      </Button>
                    </Link>
                  )}
                  {currentGame.app_store_url && (
                    <Link
                      href={currentGame.app_store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 h-14 px-6 text-lg font-semibold transition-all"
                      >
                        <Apple className="h-5 w-5 mr-2 text-white" />
                        App Store
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Slide Indicators - Only show if multiple games */}
          {games.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              {games.map((game, index) => (
                <button
                  key={game.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative h-2 rounded-full transition-all duration-500 overflow-hidden ${
                    index === currentIndex
                      ? "w-12 bg-white/30"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to ${game.name}`}
                >
                  {index === currentIndex && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${accent.gradient} rounded-full`}
                      key={`progress-${currentIndex}`}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
