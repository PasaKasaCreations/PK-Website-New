import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { CourseCard } from "@/components/shared/CourseCard";
import { ProductCard } from "@/components/shared/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";
import {
  CheckCircle2,
  Sparkles,
  Gamepad2,
  Users,
  GraduationCap,
  Trophy,
  MapPin,
  Star,
  Rocket,
  Code,
  Target,
  ArrowRight,
  Play,
  BookOpen,
  Heart,
  Globe,
  Smartphone,
  Layout,
  Database,
  Palette,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pasakasa Creations - Software Development & Live Classes in Nepal",
  description:
    "Nepal-based software development company offering Web Development, Mobile Apps, CRM Solutions, UI/UX Design, Game Development, and live programming classes.",
};

// Mock data - Replace with actual Supabase queries
const featuredCourses = [
  {
    id: "1",
    title: "Unity Game Development - Complete Bootcamp",
    slug: "unity-game-development",
    description:
      "Build 2D and 3D games from scratch. Learn Unity, C#, game design, and publish to Play Store.",
    long_description: "",
    instructor: "Pasakasa Dev Team",
    duration: "12 weeks",
    skill_level: "beginner" as const,
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
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "Full Stack Web Development",
    slug: "fullstack-web-development",
    description:
      "Master modern web development with React, Node.js, databases, and deployment. Build production-ready applications.",
    long_description: "",
    instructor: "Pasakasa Dev Team",
    duration: "16 weeks",
    skill_level: "beginner" as const,
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
    created_at: "",
    updated_at: "",
  },
];

const featuredGames = [
  {
    id: "1",
    name: "Teen Patti Friends",
    slug: "teen-patti-friends",
    tagline: "Play with friends, win big!",
    description:
      "Experience the thrill of Teen Patti with your friends. Join tables, compete, and enjoy the ultimate Indian card game experience.",
    thumbnail_url: "/images/TeenPattiFriendsLogo.png",
    screenshots: [
      "/images/TeenPatti_Dashboard.png",
      "/images/TeenPatti_Gameplay.png",
      "/images/TeenPatti_FortuneWheel.png",
    ],
    platforms: ["android", "ios"] as const,
    category: "game" as const,
    status: "launched" as const,
    play_store_url:
      "https://play.google.com/store/apps/details?id=com.pasakasa.teenpatti",
    app_store_url: "https://apps.apple.com",
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Callbreak Multiplayer",
    slug: "callbreak-multiplayer",
    tagline: "Master the tricks, win the game",
    description:
      "Play the classic Callbreak card game online with players worldwide. Strategic gameplay with stunning visuals.",
    thumbnail_url: "/images/callbreaklogo.webp",
    screenshots: [
      "/images/callbreakLoginScreen.webp",
      "/images/callbreakMainTable.webp",
      "/images/callbreakMultiplayerLobby.webp",
    ],
    platforms: ["android"] as const,
    category: "game" as const,
    status: "launched" as const,
    play_store_url:
      "https://play.google.com/store/apps/details?id=com.pasakasa.callbreak",
    featured: true,
    created_at: "",
    updated_at: "",
  },
];

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Award,
    value: "100+",
    label: "Projects Delivered",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: GraduationCap,
    value: "500+",
    label: "Students Trained",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Trophy,
    value: "7+",
    label: "Years Experience",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
];

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Full-stack web applications with modern frameworks. Responsive, scalable, and optimized for performance.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps for Android and iOS. User-friendly interfaces with robust functionality.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: Database,
    title: "CRM Software",
    description:
      "Custom CRM solutions to manage customer relationships, streamline operations, and boost productivity.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that users love. From wireframes to high-fidelity designs and prototypes.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description:
      "Strategic multiplayer games with engaging gameplay. Published on Play Store and App Store with thousands of players.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: GraduationCap,
    title: "Live Training",
    description:
      "In-person programming classes in Kathmandu. Learn web dev, mobile dev, and game development from industry experts.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
];

const features = [
  {
    icon: Code,
    title: "Modern Technology Stack",
    description:
      "We use cutting-edge technologies and frameworks to build scalable, maintainable solutions.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Agile development process with quick iterations. We deliver quality projects on time, every time.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: Target,
    title: "Client-Focused Approach",
    description:
      "Your success is our success. We work closely with you to understand and exceed your expectations.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: MapPin,
    title: "Made in Nepal",
    description:
      "Based in Kathmandu, serving clients worldwide. Building Nepal's tech ecosystem one project at a time.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Startup Founder",
    image: "/placeholder-avatar.jpg",
    rating: 5,
    text: "Pasakasa built our entire web platform from scratch. Their technical expertise and professionalism are outstanding. Highly recommended!",
  },
  {
    name: "Priya Sharma",
    role: "E-commerce Manager",
    image: "/placeholder-avatar.jpg",
    rating: 5,
    text: "The mobile app they developed for our business exceeded expectations. User-friendly, fast, and exactly what we needed.",
  },
  {
    name: "Anil Thapa",
    role: "Unity Developer",
    image: "/placeholder-avatar.jpg",
    rating: 5,
    text: "I took their game development course and now I'm working as a professional developer. The training was practical and industry-focused.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-orange-600 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedWrapper>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                NEPAL'S PREMIUM SOFTWARE DEVELOPMENT COMPANY
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Building Digital Solutions
                <br />
                That Transform Businesses
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                From web and mobile apps to games and CRM systems—we deliver
                cutting-edge software solutions and train the next generation of
                developers in Nepal.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Rocket className="h-6 w-6" />
                  <span className="text-lg">100+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  <span className="text-lg">7+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  <span className="text-lg">Based in Kathmandu</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
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
                    Join Live Classes
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
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
      </section>

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
                Complete Software Solutions Under One Roof
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From concept to deployment, we handle every aspect of your
                digital needs with expertise and precision.
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
                  Your Trusted Technology Partner in Nepal
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Pasakasa Creations is a full-service software development
                  company based in Kathmandu, Nepal. We specialize in building
                  web applications, mobile apps, CRM systems, games, and
                  beautiful UI/UX designs.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  With 7+ years of experience and 100+ successful projects, we've
                  helped startups, SMEs, and enterprises transform their ideas
                  into powerful digital solutions. We're also passionate about
                  education—teaching the next generation of developers through
                  live, hands-on classes.
                </p>

                <div className="space-y-3 pt-4">
                  {[
                    "Experienced team of full-stack developers and designers",
                    "End-to-end project delivery from concept to launch",
                    "Modern tech stack with proven frameworks",
                    "Live training programs for aspiring developers",
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
                Excellence in Every Project
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine technical expertise with creative thinking to deliver
                solutions that drive real results
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
                Published Games
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Strategic multiplayer games with thousands of active players on
                Play Store and App Store
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
                Learn From Industry Experts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                In-person programming classes in Kathmandu. Build real projects,
                get mentorship, launch your career.
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 rounded-full text-sm font-semibold text-orange-600 dark:text-orange-400 mb-4">
                <Star className="h-4 w-4" />
                CLIENT TESTIMONIALS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real feedback from businesses and students who worked with us
              </p>
            </div>
          </AnimatedWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedWrapper key={index} delay={0.2 + index * 0.1}>
                <Card className="border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900 dark:to-orange-900 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-orange-500 text-orange-500"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 via-orange-600 to-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedWrapper>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-full text-sm font-semibold">
                <Rocket className="h-4 w-4" />
                LET'S BUILD SOMETHING AMAZING
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Ready to Transform Your Business with Technology?
              </h2>

              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Whether you need a website, mobile app, CRM system, or want to
                learn programming—we're here to help you succeed.
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
