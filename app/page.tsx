import { Metadata } from "next";
import { Hero } from "@/components/shared/Hero";
import { ServicesSection } from "@/components/shared/ServicesSection";
import { AboutSectionVariants } from "@/components/shared/AboutSectionVariants";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { FeaturedGamesSection } from "@/components/shared/FeaturedGamesSection";
import { FeaturedCoursesSection } from "@/components/shared/FeaturedCoursesSection";
import { CTASection } from "@/components/shared/CTASection";
import { supabase } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";
import type { Product } from "@/types/product.interface";
import type {
  Course,
  SyllabusItem,
  Testimonial,
} from "@/types/course.interface";
import type { Platform } from "@/types/common.interface";

export const metadata: Metadata = {
  title: "Pasakasa Creations - Software Development Company in Nepal",
  description:
    "We build web apps, mobile apps, and multiplayer games from Kathmandu. Our card games have 15K+ downloads. We also teach programming through hands-on classes.",
};

// Type conversion helpers
function convertToProduct(dbGame: Tables<"games">): Product {
  return {
    ...dbGame,
    category: dbGame.category as "game" | "tool" | "service",
    status: dbGame.status as "released" | "coming_soon" | "in_development",
    platforms: dbGame.platforms as unknown as Platform[],
    screenshots: dbGame.screenshots as readonly string[],
    play_store_url: dbGame.play_store_url ?? undefined,
    app_store_url: dbGame.app_store_url ?? undefined,
    web_url: dbGame.web_url ?? undefined,
    created_at: dbGame.created_at,
    updated_at: dbGame.updated_at,
  };
}

function convertToCourse(dbCourse: Tables<"courses">): Course {
  return {
    ...dbCourse,
    next_batch_date: dbCourse.next_batch_date || "",
    current_students: dbCourse.current_students ?? undefined,
    syllabus: (Array.isArray(dbCourse.syllabus)
      ? dbCourse.syllabus
      : []) as unknown as readonly SyllabusItem[],
    learning_outcomes: dbCourse.learning_outcomes as readonly string[],
    prerequisites: dbCourse.prerequisites as readonly string[],
    testimonials: (Array.isArray(dbCourse.testimonials)
      ? dbCourse.testimonials
      : []) as unknown as readonly Testimonial[],
  };
}

// Fallback mock data for featured courses
const fallbackCourses: Tables<"courses">[] = [
  {
    id: "1",
    title: "Unity Game Development - Complete Bootcamp",
    slug: "unity-game-development",
    description:
      "Build 2D and 3D games from scratch. Learn Unity, C#, game design, and publish to Play Store.",
    long_description:
      "Complete bootcamp covering Unity game development from basics to advanced.",
    instructor: "Pasakasa Dev Team",
    duration: "12 weeks",
    skill_level: "beginner",
    thumbnail_url: "/placeholder-course.jpg",
    syllabus: [],
    learning_outcomes: [],
    prerequisites: [],
    is_published: true,
    featured: true,
    sessions_running: 2,
    sessions_completed: 15,
    next_batch_date: "2025-01-15",
    location: "Kshitij Marg, Kathmandu, Nepal",
    max_students: 15,
    current_students: 12,
    testimonials: [],
    price: 15000,
    currency: "NPR",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Full Stack Web Development",
    slug: "fullstack-web-development",
    description:
      "Master modern web development with React, Node.js, databases, and deployment. Build production-ready applications.",
    long_description:
      "Comprehensive full-stack web development course covering modern frameworks and tools.",
    instructor: "Pasakasa Dev Team",
    duration: "16 weeks",
    skill_level: "beginner",
    thumbnail_url: "/placeholder-course.jpg",
    syllabus: [],
    learning_outcomes: [],
    prerequisites: [],
    is_published: true,
    featured: true,
    sessions_running: 1,
    sessions_completed: 8,
    next_batch_date: "2025-02-01",
    location: "Kshitij Marg, Kathmandu, Nepal",
    max_students: 15,
    current_students: 9,
    testimonials: [],
    price: 18000,
    currency: "NPR",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const fallbackGames: Tables<"games">[] = [
  {
    id: "1",
    name: "Teen Patti Friends",
    slug: "teen-patti-friends",
    tagline: "10K+ downloads • 4.5★ rating",
    description:
      "Play Teen Patti with friends online. Join tables, compete in tournaments, and enjoy real-time multiplayer card games.",
    long_description:
      "A complete multiplayer Teen Patti experience with real-time gameplay, chat, and tournaments.",
    genre: "Card Game",
    thumbnail_url: "/images/TeenPattiFriendsLogo.png",
    screenshots: [
      "/images/TeenPatti_Dashboard.png",
      "/images/TeenPatti_Gameplay.png",
      "/images/TeenPatti_FortuneWheel.png",
    ],
    platforms: ["android", "ios"],
    category: "game",
    status: "released",
    play_store_url:
      "https://play.google.com/store/apps/details?id=com.pasakasa.teenpatti",
    app_store_url: "https://apps.apple.com",
    web_url: null,
    release_date: "2023-06-01",
    featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Callbreak Multiplayer",
    slug: "callbreak-multiplayer",
    tagline: "5K+ downloads • 4.5★ rating",
    description:
      "The classic Callbreak card game, now online. Play with friends or match with players worldwide.",
    long_description:
      "The ultimate Callbreak multiplayer experience with tournaments, leaderboards, and daily challenges.",
    genre: "Card Game",
    thumbnail_url: "/images/callbreaklogo.webp",
    screenshots: [
      "/images/callbreakLoginScreen.webp",
      "/images/callbreakMainTable.webp",
      "/images/callbreakMultiplayerLobby.webp",
    ],
    platforms: ["android"],
    category: "game",
    status: "released",
    play_store_url:
      "https://play.google.com/store/apps/details?id=com.pasakasa.callbreak",
    app_store_url: null,
    web_url: null,
    release_date: "2023-08-15",
    featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function Home() {
  // Fetch featured courses from Supabase
  const { data: coursesData } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(2);

  const dbCourses =
    coursesData && coursesData.length > 0 ? coursesData : fallbackCourses;
  const featuredCourses: Course[] = dbCourses.map(convertToCourse);

  // Fetch featured games from Supabase
  const { data: gamesData } = await supabase
    .from("games")
    .select("*")
    .eq("is_published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(2);

  const dbGames = gamesData && gamesData.length > 0 ? gamesData : fallbackGames;
  const featuredGames: Product[] = dbGames.map(convertToProduct);

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
