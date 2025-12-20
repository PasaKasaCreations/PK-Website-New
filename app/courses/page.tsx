import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { CourseCard } from "@/components/shared/CourseCard";
import { GraduationCap, Sparkles, BookOpen } from "lucide-react";
import { getPublishedCourses } from "@/lib/api/courses";

export const metadata: Metadata = {
  title: "Game Development Classes - Pasakasa Creations",
  description:
    "Live, in-person Unity and C# game development classes in Kathmandu. Learn from developers who've shipped real games. Small batch sizes, hands-on projects.",
};

// Mock data - COMMENTED OUT - Now using Supabase
// const allCourses = [
//   {
//     id: "1",
//     title: "Unity Game Development - Complete Bootcamp",
//     slug: "unity-game-development",
//     description:
//       "Build 2D and 3D games from scratch. Learn Unity, C#, game design, and publish to Play Store.",
//     long_description: "",
//     instructor: "Pasakasa Dev Team",
//     duration: "12 weeks",
//     skill_level: "beginner" as const,
//     thumbnail_url: "/placeholder-course.jpg",
//     syllabus: [],
//     learning_outcomes: [],
//     prerequisites: [],
//     is_published: true,
//     featured: true,
//     sessions_running: 2,
//     sessions_completed: 15,
//     next_batch_date: "2025-01-15",
//     location: "Kathmandu, Nepal",
//     max_students: 15,
//     current_students: 12,
//     testimonials: [],
//     created_at: "",
//     updated_at: "",
//   },
//   {
//     id: "2",
//     title: "C# Programming for Game Developers",
//     slug: "csharp-for-games",
//     description:
//       "Master C# fundamentals and advanced concepts specifically for game development. Build solid coding foundations.",
//     long_description: "",
//     instructor: "Pasakasa Dev Team",
//     duration: "8 weeks",
//     skill_level: "beginner" as const,
//     thumbnail_url: "/placeholder-course.jpg",
//     syllabus: [],
//     learning_outcomes: [],
//     prerequisites: [],
//     is_published: true,
//     featured: true,
//     sessions_running: 1,
//     sessions_completed: 8,
//     next_batch_date: "2025-02-01",
//     location: "Kathmandu, Nepal",
//     max_students: 15,
//     current_students: 9,
//     testimonials: [],
//     created_at: "",
//     updated_at: "",
//   },
//   {
//     id: "3",
//     title: "2D Mobile Game Development with Unity",
//     slug: "unity-2d-mobile",
//     description:
//       "Create and publish 2D mobile games. Learn UI systems, touch controls, monetization, and app store deployment.",
//     long_description: "",
//     instructor: "Pasakasa Dev Team",
//     duration: "10 weeks",
//     skill_level: "intermediate" as const,
//     thumbnail_url: "/placeholder-course.jpg",
//     syllabus: [],
//     learning_outcomes: [],
//     prerequisites: [],
//     is_published: true,
//     featured: false,
//     sessions_running: 1,
//     sessions_completed: 6,
//     next_batch_date: "2025-02-15",
//     location: "Kathmandu, Nepal",
//     max_students: 12,
//     current_students: 10,
//     testimonials: [],
//     created_at: "",
//     updated_at: "",
//   },
//   {
//     id: "4",
//     title: "Multiplayer Game Development - Networking Basics",
//     slug: "multiplayer-networking",
//     description:
//       "Build real-time multiplayer games. Learn server-client architecture, photon networking, and matchmaking systems.",
//     long_description: "",
//     instructor: "Pasakasa Dev Team",
//     duration: "8 weeks",
//     skill_level: "intermediate" as const,
//     thumbnail_url: "/placeholder-course.jpg",
//     syllabus: [],
//     learning_outcomes: [],
//     prerequisites: [],
//     is_published: true,
//     featured: false,
//     sessions_running: 0,
//     sessions_completed: 3,
//     next_batch_date: "2025-03-01",
//     location: "Kathmandu, Nepal",
//     max_students: 12,
//     current_students: 0,
//     testimonials: [],
//     created_at: "",
//     updated_at: "",
//   },
// ];

export default async function CoursesPage() {
  // Fetch courses from Supabase
  const allCourses = await getPublishedCourses();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                PROFESSIONAL TRAINING COURSES
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your Career with
                <br />
                Industry-Ready Courses
              </h1>

              <p className="text-xl md:text-2xl text-blue-100">
                Live, hands-on training by industry experts. Build real projects,
                get certified, and launch your career.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  <span className="text-lg">15,000+ Alumni</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-lg">Industry-Led Curriculum</span>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>

      {/* Courses Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Our Courses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our carefully designed courses that combine theory
                with extensive hands-on practice
              </p>
            </div>
          </AnimatedWrapper>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course, index) => (
              <AnimatedWrapper key={course.id} delay={0.3 + index * 0.1}>
                <CourseCard course={course} />
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
