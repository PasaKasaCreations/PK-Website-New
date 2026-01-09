"use client";

import { useState } from "react";
import {
  CareersHeroVariant1,
  CareersHeroVariant2,
} from "./CareersHeroVariants";

const variants = [
  {
    id: 1,
    name: "Culture Cards",
    description: "Split layout with culture highlights",
  },
  {
    id: 2,
    name: "Floating Icons",
    description: "Centered layout with interactive elements",
  },
];

export function CareersHeroSwitcher() {
  const [activeVariant, setActiveVariant] = useState(1);

  return (
    <div className="relative">
      {/* Render Active Variant */}
      {activeVariant === 1 && <CareersHeroVariant1 />}
      {activeVariant === 2 && <CareersHeroVariant2 />}

      {/* Variant Switcher - Fixed at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {/* Variant Info Badge */}
        <div className="bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
          <span className="opacity-70">Viewing:</span>{" "}
          {variants.find((v) => v.id === activeVariant)?.name} —{" "}
          <span className="opacity-70">
            {variants.find((v) => v.id === activeVariant)?.description}
          </span>
        </div>

        {/* Switcher Buttons */}
        <div className="bg-white dark:bg-slate-800 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 p-1.5 flex gap-1">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariant(variant.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeVariant === variant.id
                  ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Variant {variant.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
