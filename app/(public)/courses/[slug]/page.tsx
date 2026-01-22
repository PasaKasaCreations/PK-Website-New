import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ConsultationModal } from "@/components/shared/ConsultationModal";
import { TestimonialsCarousel } from "@/components/shared/TestimonialsCarousel";
import { WhatsAppEnrollButton } from "@/components/shared/WhatsAppEnrollButton";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { getCourseBySlug, getAllCourseSlugs } from "@/lib/api/courses";
import { getSiteSettings } from "@/lib/api/settings";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock data - COMMENTED OUT - Now using Supabase
// const getCourse = async (slug: string) => {
//   const courses = {
//     "unity-game-development": {
//       id: "1",
//       title: "Unity Game Development Masterclass",
//       slug: "unity-game-development",
//       description: "Learn to build 2D and 3D games from scratch using Unity",
//       long_description:
//         "This comprehensive course takes you from absolute beginner to confident Unity developer. You'll learn the fundamentals of game development, C# programming, and Unity's powerful features through hands-on projects.",
//       instructor: "John Doe",
//       duration: "12 weeks",
//       price: 4999,
//       currency: "₹",
//       skill_level: "beginner" as const,
//       thumbnail_url: "/placeholder-course.jpg",
//       syllabus: [
//         {
//           module: 1,
//           title: "Introduction to Unity",
//           topics: ["Unity Interface", "GameObjects", "Components"],
//           duration: "2 weeks",
//         },
//         {
//           module: 2,
//           title: "C# Programming Basics",
//           topics: ["Variables", "Functions", "Classes"],
//           duration: "3 weeks",
//         },
//         {
//           module: 3,
//           title: "2D Game Development",
//           topics: ["Sprites", "Physics", "Animation"],
//           duration: "3 weeks",
//         },
//         {
//           module: 4,
//           title: "3D Game Development",
//           topics: ["3D Models", "Lighting", "Cameras"],
//           duration: "4 weeks",
//         },
//       ],
//       learning_outcomes: [
//         "Build complete 2D and 3D games",
//         "Master C# programming for games",
//         "Understand Unity's core systems",
//         "Create polished game mechanics",
//         "Publish games to multiple platforms",
//       ],
//       prerequisites: [
//         "Basic computer skills",
//         "Passion for game development",
//         "No prior programming experience required",
//       ],
//       is_published: true,
//       featured: true,
//       created_at: "",
//       updated_at: "",
//       sessions_running: 2,
//       sessions_completed: 5,
//       next_batch_date: "2025-01-15",
//       location: "Kathmandu, Nepal",
//       max_students: 30,
//       current_students: 18,
//       testimonials: [
//         {
//           id: "1",
//           student_name: "Rajesh Sharma",
//           student_image: "",
//           rating: 5,
//           comment:
//             "This course transformed my career! The instructors are incredible and the hands-on projects helped me land my dream job as a Unity developer. Highly recommended!",
//           batch: "Batch 2024 Oct",
//           date: "Nov 2024",
//         },
//         {
//           id: "2",
//           student_name: "Priya Maharjan",
//           student_image: "",
//           rating: 5,
//           comment:
//             "I had zero coding experience before this course. The teaching methodology is so clear and practical. Now I've built 3 games and feeling confident!",
//           batch: "Batch 2024 Aug",
//           date: "Oct 2024",
//         },
//         {
//           id: "3",
//           student_name: "Aditya Thapa",
//           student_image: "",
//           rating: 5,
//           comment:
//             "Best investment in my education. The curriculum is up-to-date with industry standards and the support from instructors is amazing. Worth every rupee!",
//           batch: "Batch 2024 Sep",
//           date: "Nov 2024",
//         },
//       ],
//     },
//     "advanced-csharp": {
//       id: "2",
//       title: "Advanced C# Programming for Games",
//       slug: "advanced-csharp",
//       description: "Master C# programming concepts for game development",
//       long_description:
//         "Take your C# skills to the next level with advanced programming patterns, design principles, and optimization techniques specifically for game development.",
//       instructor: "Jane Smith",
//       duration: "8 weeks",
//       price: 3999,
//       currency: "₹",
//       skill_level: "intermediate" as const,
//       thumbnail_url: "/placeholder-course.jpg",
//       syllabus: [
//         {
//           module: 1,
//           title: "Advanced OOP Concepts",
//           topics: ["Inheritance", "Polymorphism", "Interfaces"],
//           duration: "2 weeks",
//         },
//         {
//           module: 2,
//           title: "Design Patterns",
//           topics: ["Singleton", "Observer", "Factory"],
//           duration: "3 weeks",
//         },
//         {
//           module: 3,
//           title: "Performance Optimization",
//           topics: ["Memory Management", "Profiling", "Best Practices"],
//           duration: "3 weeks",
//         },
//       ],
//       learning_outcomes: [
//         "Master advanced C# concepts",
//         "Implement design patterns",
//         "Optimize game performance",
//         "Write clean, maintainable code",
//       ],
//       prerequisites: [
//         "Basic C# knowledge",
//         "Understanding of OOP principles",
//         "Unity or game dev experience helpful",
//       ],
//       is_published: true,
//       featured: true,
//       created_at: "",
//       updated_at: "",
//       sessions_running: 1,
//       sessions_completed: 3,
//       next_batch_date: "2025-02-01",
//       location: "Kathmandu, Nepal",
//       max_students: 25,
//       current_students: 12,
//       testimonials: [
//         {
//           id: "4",
//           student_name: "Suman Rai",
//           student_image: "",
//           rating: 5,
//           comment:
//             "The advanced concepts were explained brilliantly. My code quality improved significantly and I now understand design patterns deeply. Excellent course!",
//           batch: "Batch 2024 Sep",
//           date: "Nov 2024",
//         },
//         {
//           id: "5",
//           student_name: "Nisha Gurung",
//           student_image: "",
//           rating: 5,
//           comment:
//             "This course took my C# skills to the next level. The optimization techniques alone saved me weeks of debugging. Highly valuable!",
//           batch: "Batch 2024 Oct",
//           date: "Dec 2024",
//         },
//       ],
//     },
//   };
//
//   return courses[slug as keyof typeof courses] || null;
// };

// Generate static params for all course pages
export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} - Pasakasa Creations`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const [course, settings] = await Promise.all([
    getCourseBySlug(slug),
    getSiteSettings(),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                AI INTEGRATED COURSE
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {course.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-blue-100">
                {course.description}
              </p>

              {/* Course Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration} duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>
                    Training Mode: Both, Physical & Live Online Classes,
                    including Online Live Night Classes
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                <ConsultationModal
                  trigger={
                    <Button
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white border-0 h-12 px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      SEND AN INQUIRY →
                    </Button>
                  }
                  courseName={course.title}
                  courseId={course.id}
                />
                <WhatsAppEnrollButton
                  whatsappNumber={settings.whatsapp_number}
                  courseName={course.title}
                />
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* What You'll Learn */}
        <AnimatedWrapper>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {course.learning_outcomes.map(
                    (outcome: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </AnimatedWrapper>

        {/* Course Syllabus - Module 1 Only */}
        <AnimatedWrapper delay={0.1}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Your Learning Journey</h2>
              <ConsultationModal
                trigger={
                  <Button variant="link" className="text-primary">
                    Expand All
                  </Button>
                }
                courseName={course.title}
                courseId={course.id}
              />
            </div>

            <p className="text-muted-foreground mb-8">
              Our curriculum is researched, developed & updated by understanding
              the global scope & job demands. Conducted by industry-leading
              expert instructors, the program offers more than 85% of an
              in-depth practical approach backed by essential theoretical
              frameworks.
            </p>

            {/* Class Format Info */}
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    CLASS FORMAT
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Physical & Online Classes (Day and Night)
                  </p>
                </div>
              </div>
            </div>

            {/* First 4 Modules */}
            {course.syllabus &&
              Array.isArray(course.syllabus) &&
              course.syllabus.length > 0 && (
                <div className="space-y-4">
                  {course.syllabus
                    .slice(0, 4)
                    .map(
                      (
                        module: { title: string; topics: string[] },
                        moduleIndex: number,
                      ) => (
                        <Card key={moduleIndex} className="border-2">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">
                                  Lesson {moduleIndex + 1}: {module.title}
                                </h3>
                              </div>
                            </div>
                            <ul className="space-y-3">
                              {module.topics.map(
                                (topic: string, index: number) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span className="text-sm leading-relaxed">
                                      {topic}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      ),
                    )}

                  {/* Show remaining modules count */}
                  {course.syllabus.length > 4 && (
                    <Card className="border-2 border-dashed">
                      <CardContent className="p-8 text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {course.syllabus.length - 4} More Lesson
                          {course.syllabus.length - 4 > 1 ? "s" : ""} Available
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Get complete syllabus and course details with free
                          consultation from our expert team
                        </p>
                        <ConsultationModal
                          trigger={
                            <Button size="lg" className="gap-2">
                              <Sparkles className="h-4 w-4" />
                              View Full Syllabus & Get Free Consultation
                            </Button>
                          }
                          courseName={course.title}
                          courseId={course.id}
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
          </section>
        </AnimatedWrapper>

        {/* Prerequisites */}
        <AnimatedWrapper delay={0.2}>
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Prerequisites</h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {course.prerequisites.map((prereq: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </AnimatedWrapper>

        {/* Student Testimonials */}
        {course.testimonials && course.testimonials.length > 0 && (
          <AnimatedWrapper delay={0.3}>
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our Students Say
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from our successful graduates who transformed their
                  careers with our courses
                </p>
              </div>
              <TestimonialsCarousel testimonials={course.testimonials} />
            </section>
          </AnimatedWrapper>
        )}
      </div>
    </div>
  );
}
