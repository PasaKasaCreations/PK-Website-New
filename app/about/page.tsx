import { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Journey } from "@/components/about/Journey";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { WhatMakesUsDifferentSection } from "@/components/about/WhatMakesUsDifferentSection";
import { WhyLearnWithUsSection } from "@/components/about/WhyLearnWithUsSection";

export const metadata: Metadata = {
  title: "About Us - Pasakasa Creations",
  description:
    "Nepal-based game studio creating strategic multiplayer games and teaching live game development classes in Kathmandu. Learn from real developers who've shipped games.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Who We Are Section */}
      <WhoWeAreSection />

      {/* What Makes Us Different */}
      <WhatMakesUsDifferentSection />

      {/* Journey Timeline */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-gray-900">
        <Journey />
      </div>

      {/* Why Learn With Us */}
      <WhyLearnWithUsSection />
    </div>
  );
}
