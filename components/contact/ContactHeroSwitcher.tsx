"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactHeroV1 } from "./ContactHeroV1";
import { ContactHeroV2 } from "./ContactHeroV2";
import { ContactHeroV3 } from "./ContactHeroV3";
import { ContactHeroV4 } from "./ContactHeroV4";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ContactHeroSwitcher - Development Component
 *
 * Allows switching between different hero design variants
 * for comparison and selection.
 *
 * DELETE THIS FILE after selecting final design.
 * Also delete unused ContactHeroVX.tsx files.
 */

type HeroVariant = "v1" | "v2" | "v3" | "v4";

const heroVariants: { id: HeroVariant; name: string; description: string }[] = [
  {
    id: "v1",
    name: "Geometric",
    description: "Playful shapes + glassmorphic",
  },
  {
    id: "v2",
    name: "Grid Lines",
    description: "Dark tech aesthetic",
  },
  {
    id: "v3",
    name: "Stacked Cards",
    description: "Light premium 3D cards",
  },
  {
    id: "v4",
    name: "Hybrid",
    description: "V1 content + V2 grid style",
  },
];

export function ContactHeroSwitcher() {
  const [activeVariant, setActiveVariant] = useState<HeroVariant>("v1");

  const currentIndex = heroVariants.findIndex((v) => v.id === activeVariant);

  const goToPrev = () => {
    const newIndex = currentIndex === 0 ? heroVariants.length - 1 : currentIndex - 1;
    setActiveVariant(heroVariants[newIndex].id);
  };

  const goToNext = () => {
    const newIndex = currentIndex === heroVariants.length - 1 ? 0 : currentIndex + 1;
    setActiveVariant(heroVariants[newIndex].id);
  };

  const renderHero = () => {
    switch (activeVariant) {
      case "v1":
        return <ContactHeroV1 />;
      case "v2":
        return <ContactHeroV2 />;
      case "v3":
        return <ContactHeroV3 />;
      case "v4":
        return <ContactHeroV4 />;
      default:
        return <ContactHeroV1 />;
    }
  };

  return (
    <div className="relative">
      {/* Hero Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVariant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderHero()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Switcher Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3">
            <div className="flex items-center gap-2">
              {/* Prev Button */}
              <button
                onClick={goToPrev}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </button>

              {/* Variant Buttons */}
              <div className="flex-1 flex gap-2">
                {heroVariants.map((variant) => (
                  <motion.button
                    key={variant.id}
                    onClick={() => setActiveVariant(variant.id)}
                    className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 ${
                      activeVariant === variant.id
                        ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold text-sm">{variant.name}</div>
                    <div
                      className={`text-xs mt-0.5 ${
                        activeVariant === variant.id
                          ? "text-white/80"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {variant.description}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-1.5 mt-3">
              {heroVariants.map((variant, index) => (
                <motion.div
                  key={variant.id}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeVariant === variant.id
                      ? "w-8 bg-gradient-to-r from-blue-500 to-orange-500"
                      : "w-2 bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
