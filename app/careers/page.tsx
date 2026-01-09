import { Metadata } from "next";
import { getAllJobs } from "@/lib/api/jobs";
import { CareersHero } from "@/components/careers/CareersHero";
import { WhyJoinUsSection } from "@/components/careers/WhyJoinUsSection";
import { BenefitsSection } from "@/components/careers/BenefitsSection";
import { OpenPositionsSection } from "@/components/careers/OpenPositionsSection";
import { CareersCTASection } from "@/components/careers/CareersCTASection";

export const metadata: Metadata = {
  title: "Careers - Pasakasa Creations",
  description:
    "Work with us in Kathmandu. We build card games, teach coding, and ship real software.",
};

export default async function CareersPage() {
  // Fetch all job postings from Supabase
  const openPositions = await getAllJobs();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <CareersHero />

      {/* Why Join Us Section */}
      <WhyJoinUsSection />

      {/* Benefits & Perks */}
      <BenefitsSection />

      {/* Open Positions */}
      <OpenPositionsSection positions={openPositions} />

      {/* CTA Section */}
      <CareersCTASection />
    </div>
  );
}
