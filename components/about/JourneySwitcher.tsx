"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyV1 } from "./JourneyV1";
import { JourneyV2 } from "./JourneyV2";
import { JourneyV3 } from "./JourneyV3";

/**
 * JourneySwitcher - Development Component
 *
 * Allows switching between different journey timeline variants
 * for comparison and selection.
 *
 * DELETE THIS FILE after selecting final design.
 * Also delete unused JourneyVX.tsx files.
 */

type JourneyVariant = "v1" | "v2" | "v3";

const journeyVariants: {
  id: JourneyVariant;
  name: string;
  description: string;
}[] = [
  {
    id: "v1",
    name: "Horizontal Scroll",
    description: "Scrollable cards",
  },
  {
    id: "v2",
    name: "Zigzag Path",
    description: "Alternating layout",
  },
  {
    id: "v3",
    name: "Interactive Tabs",
    description: "Click to explore",
  },
];

export function JourneySwitcher() {
  const [activeVariant, setActiveVariant] = useState<JourneyVariant>("v1");

  const renderJourney = () => {
    switch (activeVariant) {
      case "v1":
        return <JourneyV1 />;
      case "v2":
        return <JourneyV2 />;
      case "v3":
        return <JourneyV3 />;
      default:
        return <JourneyV1 />;
    }
  };

  return (
    <div className="relative">
      {/* Inline Switcher */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-2">
            {/* Label */}
            <div className="text-center mb-2 pt-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Journey Timeline Variants
              </span>
            </div>

            <div className="flex gap-2">
              {journeyVariants.map((variant) => (
                <motion.button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant.id)}
                  className={`flex-1 py-3 px-3 rounded-xl transition-all duration-200 ${
                    activeVariant === variant.id
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-semibold text-sm">{variant.name}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      activeVariant === variant.id
                        ? "text-slate-500 dark:text-slate-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {variant.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Journey Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVariant}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderJourney()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
