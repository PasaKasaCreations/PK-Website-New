import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { CourseCard } from "@/components/shared/CourseCard";
import { ProductCard } from "@/components/shared/ProductCard";
import { Hero } from "@/components/shared/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";
import { supabase } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";
import type { Product } from "@/types/product.interface";
import type {
  Course,
  SyllabusItem,
  Testimonial,
} from "@/types/course.interface";
import type { Platform } from "@/types/common.interface";
import {
  CheckCircle2,
  Sparkles,
  Gamepad2,
  GraduationCap,
  Trophy,
  MapPin,
  Code,
  Target,
  ArrowRight,
  BookOpen,
  Heart,
  Globe,
  Smartphone,
  Database,
  Palette,
  Zap,
  Rocket,
} from "lucide-react";
import Link from "next/link";

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
    location: "Kathmandu, Nepal",
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
    location: "Kathmandu, Nepal",
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

// const stats = [
//   {
//     icon: Users,
//     value: "50+",
//     label: "Happy Clients",
//     color: "text-blue-600 dark:text-blue-400",
//     bgColor: "bg-blue-100 dark:bg-blue-900/20",
//   },
//   {
//     icon: Award,
//     value: "100+",
//     label: "Projects Delivered",
//     color: "text-orange-600 dark:text-orange-400",
//     bgColor: "bg-orange-100 dark:bg-orange-900/20",
//   },
//   {
//     icon: GraduationCap,
//     value: "500+",
//     label: "Students Trained",
//     color: "text-blue-600 dark:text-blue-400",
//     bgColor: "bg-blue-100 dark:bg-blue-900/20",
//   },
//   {
//     icon: Trophy,
//     value: "7+",
//     label: "Years Experience",
//     color: "text-orange-600 dark:text-orange-400",
//     bgColor: "bg-orange-100 dark:bg-orange-900/20",
//   },
// ];

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "We build websites and web apps using React, Next.js, and Node.js. Clean code, fast load times, works on every device.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Android and iOS apps that actually get used. We handle everything from UI design to Play Store submission.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: Database,
    title: "CRM Software",
    description:
      "Custom systems to track your customers, sales, and operations. Built around how your business actually works.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Interfaces people enjoy using. We design with your users in mind—not just what looks good in a mockup.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description:
      "Multiplayer card games are our specialty. Our games have 15K+ downloads on Play Store with 4.5★ ratings.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: GraduationCap,
    title: "Live Training",
    description:
      "In-person coding classes in Kathmandu. You'll write real code from day one—no death by PowerPoint.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
];

const features = [
  {
    icon: Code,
    title: "We Ship Real Products",
    description:
      "Our games are on the Play Store with thousands of downloads. We build things that people actually use.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Zap,
    title: "No Bloated Teams",
    description:
      "You'll talk directly to the developers working on your project. No account managers, no telephone game.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: Target,
    title: "We Finish What We Start",
    description:
      "Every project gets shipped. We don't disappear halfway through or leave you with half-built software.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: MapPin,
    title: "Based in Kathmandu",
    description:
      "Local team, local timezone. Easy to meet in person if you're in Nepal, or hop on a call if you're not.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
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

      {/* Stats Section */}
      {/* <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedWrapper key={index} delay={0.1 + index * 0.1}>
                  <Card className="border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg text-center">
                    <CardContent className="p-6">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${stat.bgColor} mb-4`}
                      >
                        <Icon className={`h-7 w-7 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 rounded-full text-sm font-semibold text-orange-600 dark:text-orange-400 mb-4">
                <Sparkles className="h-4 w-4" />
                OUR SERVICES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We Build
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Games, apps, websites—if it runs on code, we can build it.
                Here's what we do best.
              </p>
            </div>
          </AnimatedWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedWrapper key={index} delay={0.2 + index * 0.1}>
                  <Card className="h-full border-2 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="p-6">
                      <div
                        className={`h-16 w-16 rounded-full ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`h-8 w-8 ${service.color}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image Placeholder */}
            <AnimatedWrapper delay={0.2}>
              <div className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-orange-200 dark:border-orange-800 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-blue-50 to-blue-100 dark:from-orange-950 dark:via-blue-950 dark:to-blue-950">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                      <Code className="h-32 w-32 mx-auto text-orange-600 dark:text-orange-400" />
                      <p className="text-lg font-semibold text-muted-foreground">
                        Office / Team Photo
                      </p>
                      <p className="text-sm text-muted-foreground px-4">
                        [Image placeholder - Add office or team photo here]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>

            {/* Text Content */}
            <AnimatedWrapper delay={0.3}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <Heart className="h-4 w-4" />
                  WHO WE ARE
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  The Team Behind the Code
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're Pasakasa Creations—a software development company based
                  in Kathmandu, Nepal. We build web apps, mobile apps, games,
                  and custom business software. Our card games alone have been
                  downloaded over 15,000 times.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  We started because we love building things that work. Whether
                  it's a multiplayer game or a business dashboard, we care about
                  the details. We also run programming classes because we
                  believe Nepal needs more developers—and we want to help train
                  them.
                </p>

                <div className="space-y-3 pt-4">
                  {[
                    "Small team, direct communication—no middlemen",
                    "We handle design, development, deployment, and support",
                    "React, Next.js, Unity, Node.js—tools that work",
                    "Live coding classes in Kathmandu for beginners",
                  ].map((reason, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                          index % 2 === 0
                            ? "bg-blue-100 dark:bg-blue-900/20"
                            : "bg-orange-100 dark:bg-orange-900/20"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            index % 2 === 0
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-orange-600 dark:text-orange-400"
                          }`}
                        />
                      </div>
                      <span className="text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>

                <Link href={ROUTES.ABOUT}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white mt-4"
                  >
                    Learn More About Us
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                <Trophy className="h-4 w-4" />
                WHY CHOOSE US
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Work With Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're not for everyone. But if you want a team that actually
                builds and ships, here's what you get.
              </p>
            </div>
          </AnimatedWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedWrapper key={index} delay={0.2 + index * 0.1}>
                  <Card className="h-full border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`h-16 w-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 rounded-full text-sm font-semibold text-orange-600 dark:text-orange-400 mb-4">
                <Gamepad2 className="h-4 w-4" />
                OUR GAMES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Games We've Built
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                15K+ downloads and counting. Our card games are played daily
                across South Asia.
              </p>
            </div>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredGames.map((game, index) => (
              <AnimatedWrapper key={game.id} delay={0.2 + index * 0.1}>
                <ProductCard product={game} />
              </AnimatedWrapper>
            ))}
          </div>

          <AnimatedWrapper delay={0.4}>
            <div className="mt-12 text-center">
              <Link href={ROUTES.GAMES}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white"
                >
                  View All Games
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedWrapper>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                <BookOpen className="h-4 w-4" />
                LIVE TRAINING
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Learn to Code With Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hands-on classes in Kathmandu. No boring lectures—you'll build
                real projects from week one.
              </p>
            </div>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredCourses.map((course, index) => (
              <AnimatedWrapper key={course.id} delay={0.2 + index * 0.1}>
                <CourseCard course={course} />
              </AnimatedWrapper>
            ))}
          </div>

          <AnimatedWrapper delay={0.4}>
            <div className="mt-12 text-center">
              <Link href={ROUTES.COURSES}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  Explore All Courses
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedWrapper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 via-orange-600 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedWrapper>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-full text-sm font-semibold">
                <Rocket className="h-4 w-4" />
                START A PROJECT
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Have an idea? Let's talk.
              </h2>

              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Tell us what you're building. We'll figure out the rest
                together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href={ROUTES.CONTACT}>
                  <Button
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-blue-50 h-14 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Rocket className="h-5 w-5 mr-2" />
                    Start Your Project
                  </Button>
                </Link>
                <Link href={ROUTES.COURSES}>
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 h-14 px-10 text-lg font-semibold transition-all shadow-lg"
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </section>
    </div>
  );
}
