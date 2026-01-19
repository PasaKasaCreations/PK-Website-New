import { Metadata } from "next";
import { Hero } from "@/components/shared/Hero";
import { ServicesSection } from "@/components/shared/ServicesSection";
import { AboutSectionVariants } from "@/components/shared/AboutSectionVariants";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { FeaturedGamesSection } from "@/components/shared/FeaturedGamesSection";
import { FeaturedCoursesSection } from "@/components/shared/FeaturedCoursesSection";
import { CTASection } from "@/components/shared/CTASection";
import { getFeaturedCourses } from "@/lib/api/courses";
import { getFeaturedGames } from "@/lib/api/games";
import type { Product } from "@/types/product.interface";
import type { Course } from "@/types/course.interface";

export const metadata: Metadata = {
  title: "Pasakasa Creations - Software Development Company in Nepal",
  description:
    "We build web apps, mobile apps, and multiplayer games from Kathmandu. Our card games have 15K+ downloads. We also teach programming through hands-on classes.",
};

export default async function Home() {
  // Fetch featured courses and games with signed URLs for S3 images
  const [featuredCourses, featuredGames] = await Promise.all([
    getFeaturedCourses(),
    getFeaturedGames(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section - With Concept Switcher */}
      <AboutSectionVariants />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Featured Games */}
      <FeaturedGamesSection games={featuredGames} />

      {/* Featured Courses */}
      <FeaturedCoursesSection courses={featuredCourses} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
