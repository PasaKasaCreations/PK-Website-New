"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.interface";
import {
  Star,
  Share2,
  Play,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Apple,
  Clock,
  Shield,
  X,
} from "lucide-react";

interface GamesHeroVariantsProps {
  games: Product[];
}

export function GamesHeroVariants({ games }: GamesHeroVariantsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(
    null
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
    setImageError(false);
  }, [games.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
    setImageError(false);
  }, [games.length]);

  useEffect(() => {
    if (
      !isAutoPlaying ||
      games.length <= 1 ||
      showTrailer ||
      selectedScreenshot
    )
      return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, games.length, showTrailer, selectedScreenshot]);

  if (!games || games.length === 0) {
    return (
      <div className="min-h-[600px] bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">No games available</p>
      </div>
    );
  }

  const currentGame = games[currentIndex];
  const backgroundImage =
    currentGame.hero_background_image ||
    currentGame.thumbnail_url ||
    "/placeholder-game.jpg";
  const stats = currentGame.hero_stats || {
    players: "10K+",
    rating: "4.5",
    feature: "",
  };
  const rating = parseFloat(stats.rating) || 4.5;
  const hasPlayStore = !!currentGame.play_store_url;
  const hasAppStore = !!currentGame.app_store_url;
  const isComingSoon = !hasPlayStore && !hasAppStore;
  const hasTrailer = !!currentGame.trailer_url;
  const screenshots = currentGame.screenshots || [];

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleShare = async () => {
    const shareUrl =
      currentGame.play_store_url ||
      currentGame.app_store_url ||
      window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentGame.name,
          text: currentGame.tagline,
          url: shareUrl,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  // ============================================
  // PLAY STORE HERO (Dark Theme)
  // ============================================
  const PlayStoreVariant = () => (
    <section
      className="relative w-full bg-[#1f1f1f] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => !showTrailer && setIsAutoPlaying(true)}
    >
      {/* Hero Container */}
      <div className="relative h-[600px] md:h-[650px] lg:h-[700px]">
        {/* Background Image with Animation */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentGame.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={imageError ? "/placeholder-game.jpg" : backgroundImage}
              alt={currentGame.name}
              fill
              className="object-cover object-right-top md:object-center"
              priority
              onError={() => setImageError(true)}
            />
            {/* Play Store style gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1f1f1f] via-[#1f1f1f]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-transparent to-[#1f1f1f]/30" />
          </motion.div>
        </AnimatePresence>

        {/* Content - Positioned at bottom */}
        <div className="absolute inset-0 flex items-end pb-20 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGame.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Game Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                    {currentGame.name}
                  </h1>

                  {/* Developer Name */}
                  <p className="text-[#01875f] font-medium text-lg md:text-xl mb-2">
                    Pasakasa Creations
                  </p>

                  {/* Tagline */}
                  <p className="text-gray-300 text-base md:text-lg mb-6 max-w-xl">
                    {currentGame.tagline}
                  </p>

                  {/* Stats Row - Play Store Style */}
                  <div className="flex items-center gap-4 md:gap-6 mb-8 flex-wrap">
                    {/* Game Icon + Rating */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-600">
                        <Image
                          src={
                            currentGame.thumbnail_url || "/placeholder-game.jpg"
                          }
                          alt={`${currentGame.name} icon`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-white font-semibold text-lg">
                            {rating.toFixed(1)}
                          </span>
                          <Star className="h-4 w-4 text-white fill-white" />
                        </div>
                        <span className="text-gray-400 text-sm">
                          {stats.players || "10K+"} reviews
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-12 w-px bg-gray-600 hidden sm:block" />

                    {/* Downloads */}
                    <div className="flex flex-col items-center">
                      <span className="text-white font-semibold text-lg">
                        100K+
                      </span>
                      <span className="text-gray-400 text-sm">Downloads</span>
                    </div>

                    {/* Divider */}
                    <div className="h-12 w-px bg-gray-600 hidden sm:block" />

                    {/* Privacy Policy */}
                    <Link
                      href={`/games/${currentGame.slug}/privacy-policy`}
                      className="flex flex-col items-center hover:opacity-80 transition-opacity"
                    >
                      <div className="flex items-center justify-center w-10 h-10 border border-gray-500 rounded-lg">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-400 text-sm mt-1">
                        Privacy Policy
                      </span>
                    </Link>

                    {/* Status Badge */}
                    {currentGame.status === "coming_soon" && (
                      <>
                        <div className="h-12 w-px bg-gray-600 hidden sm:block" />
                        <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-2 rounded-lg">
                          <Clock className="h-4 w-4 text-orange-400" />
                          <span className="text-orange-400 font-medium text-sm">
                            Coming Soon
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Play Store Button */}
                    {hasPlayStore && (
                      <Link
                        href={currentGame.play_store_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="lg"
                          className="bg-[#01875f] hover:bg-[#017a56] text-white font-medium px-8 md:px-12 h-14 rounded-lg text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        >
                          <Smartphone className="h-5 w-5" />
                          <span>Play Store</span>
                        </Button>
                      </Link>
                    )}

                    {/* App Store Button */}
                    {hasAppStore && (
                      <Link
                        href={currentGame.app_store_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="lg"
                          className="bg-white hover:bg-gray-100 text-black font-medium px-8 md:px-12 h-14 rounded-lg text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        >
                          <Apple className="h-5 w-5" />
                          <span>App Store</span>
                        </Button>
                      </Link>
                    )}

                    {/* Coming Soon Button */}
                    {isComingSoon && (
                      <Button
                        size="lg"
                        disabled
                        className="bg-gray-600 text-white font-medium px-8 md:px-12 h-14 rounded-lg text-base cursor-not-allowed flex items-center gap-2"
                      >
                        <Clock className="h-5 w-5" />
                        <span>Coming Soon</span>
                      </Button>
                    )}

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 text-[#8ab4f8] hover:text-[#aecbfa] transition-colors px-4 py-2"
                    >
                      <Share2 className="h-5 w-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Trailer Preview Button */}
        {hasTrailer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-24 right-4 md:bottom-28 md:right-8 lg:right-16 hidden md:block z-10"
          >
            <Button
              variant="ghost"
              onClick={() => setShowTrailer(true)}
              className="bg-[#282828]/90 hover:bg-[#383838] text-white rounded-full px-6 py-3 h-auto flex items-center gap-2 shadow-lg backdrop-blur-sm"
            >
              <Play className="h-5 w-5 fill-white" />
              <span className="text-sm font-medium">Trailer</span>
            </Button>
          </motion.div>
        )}

        {/* Navigation Arrows */}
        {games.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all shadow-lg"
              aria-label="Previous game"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all shadow-lg"
              aria-label="Next game"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </>
        )}

        {/* Game Counter & Slide Indicators */}
        {games.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            {/* Counter */}
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {games.length}
            </span>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {games.map((game, index) => (
                <button
                  key={game.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setImageError(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-10 bg-[#01875f]"
                      : "w-2 bg-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to ${game.name}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );

  // ============================================
  // SCREENSHOT LIGHTBOX
  // ============================================
  const ScreenshotLightbox = () => (
    <AnimatePresence>
      {selectedScreenshot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 flex items-center gap-2"
            >
              <span className="text-sm">Close</span>
              <X className="h-6 w-6" />
            </button>
            <div className="relative aspect-[9/16] max-h-[80vh] mx-auto rounded-2xl overflow-hidden">
              <Image
                src={selectedScreenshot}
                alt="Screenshot"
                fill
                className="object-contain"
              />
            </div>
            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-4">
              {screenshots.map((screenshot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedScreenshot(screenshot)}
                  className={`relative w-12 h-20 rounded-lg overflow-hidden ${
                    selectedScreenshot === screenshot
                      ? "ring-2 ring-[#1f3cff]"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={screenshot}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ============================================
  // TRAILER MODAL
  // ============================================
  const TrailerModal = () => (
    <AnimatePresence>
      {showTrailer && hasTrailer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => {
            setShowTrailer(false);
            setIsAutoPlaying(true);
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowTrailer(false);
                setIsAutoPlaying(true);
              }}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 flex items-center gap-2"
            >
              <span className="text-sm">Close</span>
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                currentGame.trailer_url!
              )}?autoplay=1&rel=0`}
              title={`${currentGame.name} Trailer`}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <PlayStoreVariant />
      <ScreenshotLightbox />
      <TrailerModal />
    </>
  );
}
