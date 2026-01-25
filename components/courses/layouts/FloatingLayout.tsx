"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ConsultationModal } from "@/components/shared/ConsultationModal";
import { TestimonialsCarousel } from "@/components/shared/TestimonialsCarousel";
import { CourseHero } from "../CourseHero";
import { FloatingSidebar } from "../FloatingSidebar";
import { MobileCourseCard } from "../MobileCourseCard";
import { CheckCircle2, BookOpen, Sparkles } from "lucide-react";
import type { Course } from "@/types/course.interface";

interface FloatingLayoutProps {
  course: Course;
  whatsappNumber: string | null;
}

export function FloatingLayout({
  course,
  whatsappNumber,
}: FloatingLayoutProps) {
  const totalTopics =
    course.syllabus?.reduce(
      (acc, module) => acc + (module.topics?.length || 0),
      0,
    ) || 0;

  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero Section - Full width blue gradient background */}
      <div
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900"
        data-section="hero"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-[calc(100%-450px)]">
            <CourseHero course={course} whatsappNumber={whatsappNumber} />
          </div>
        </div>
      </div>

      {/* Mobile Course Card - Shows below hero on mobile */}
      <div className="bg-white border-b lg:hidden">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <MobileCourseCard course={course} whatsappNumber={whatsappNumber} />
        </div>
      </div>

      {/* Content Section - Full width white background */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="lg:max-w-[calc(100%-450px)] space-y-10">
            {/* What You'll Learn */}
            <AnimatedWrapper>
              <section>
                <Card className="border border-slate-200 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="text-xl lg:text-2xl font-bold mb-6">
                      What you'll learn
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                      {course.learning_outcomes.map(
                        (outcome: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 leading-relaxed">
                              {outcome}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </AnimatedWrapper>

            {/* Course Syllabus */}
            <AnimatedWrapper delay={0.1}>
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold">
                      Course content
                    </h2>
                    {course.syllabus && course.syllabus.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.syllabus.length} modules • {totalTopics} topics
                      </p>
                    )}
                  </div>
                  <ConsultationModal
                    trigger={
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 font-medium"
                      >
                        Get consultation
                      </Button>
                    }
                    courseName={course.title}
                    courseId={course.id}
                  />
                </div>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  Our curriculum is researched, developed & updated by
                  understanding the global scope & job demands. The program
                  offers more than 85% practical approach backed by essential
                  theoretical frameworks.
                </p>

                {/* Class Format Info */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-900">
                        CLASS FORMAT
                      </p>
                      <p className="text-sm text-blue-700">
                        Physical & Online Classes (Day and Night)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modules - Show first 4 */}
                {course.syllabus &&
                  Array.isArray(course.syllabus) &&
                  course.syllabus.length > 0 && (
                    <div className="space-y-3">
                      {course.syllabus
                        .slice(0, 4)
                        .map(
                          (
                            module: { title: string; topics: string[] },
                            moduleIndex: number,
                          ) => (
                            <Card
                              key={moduleIndex}
                              className="border border-slate-200 hover:border-slate-300 transition-colors"
                            >
                              <CardContent className="p-4 lg:p-5">
                                <h3 className="font-semibold text-slate-900 mb-3">
                                  Module {moduleIndex + 1}: {module.title}
                                </h3>
                                <ul className="space-y-2">
                                  {module.topics.map(
                                    (topic: string, index: number) => (
                                      <li
                                        key={index}
                                        className="flex items-start gap-3 text-sm text-slate-600"
                                      >
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                        <span>{topic}</span>
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
                        <Card className="border border-dashed border-slate-300 bg-slate-50/50">
                          <CardContent className="p-6 text-center">
                            <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2 text-slate-700">
                              {course.syllabus.length - 4} More Module
                              {course.syllabus.length - 4 > 1 ? "s" : ""}{" "}
                              Available
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Get complete syllabus with free consultation
                            </p>
                            <ConsultationModal
                              trigger={
                                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                                  <Sparkles className="h-4 w-4" />
                                  View Full Syllabus
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
              <section>
                <h2 className="text-xl lg:text-2xl font-bold mb-5">
                  Requirements
                </h2>
                <Card className="border border-slate-200">
                  <CardContent className="p-6 lg:p-8">
                    <ul className="space-y-3">
                      {course.prerequisites.map(
                        (prereq: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{prereq}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            </AnimatedWrapper>

            {/* Student Testimonials */}
            {course.testimonials && course.testimonials.length > 0 && (
              <AnimatedWrapper delay={0.3}>
                <section>
                  <div className="text-center mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold mb-2">
                      What Our Students Say
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Hear from our successful graduates who transformed their
                      careers
                    </p>
                  </div>
                  <TestimonialsCarousel testimonials={course.testimonials} />
                </section>
              </AnimatedWrapper>
            )}
          </div>
        </div>
      </div>

      {/* Floating Sidebar */}
      <FloatingSidebar course={course} whatsappNumber={whatsappNumber} />
    </div>
  );
}
