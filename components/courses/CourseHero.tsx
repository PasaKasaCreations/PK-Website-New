"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConsultationModal } from "@/components/shared/ConsultationModal";
import { WhatsAppEnrollButton } from "@/components/shared/WhatsAppEnrollButton";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import type { Course } from "@/types/course.interface";

interface CourseHeroProps {
  course: Course;
  whatsappNumber: string | null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

function getSkillLevelStyles(level: string): string {
  switch (level) {
    case "beginner":
      return "bg-teal-500 text-white hover:bg-teal-600";
    case "intermediate":
      return "bg-indigo-500 text-white hover:bg-indigo-600";
    case "advanced":
      return "bg-rose-500 text-white hover:bg-rose-600";
    default:
      return "bg-slate-500 text-white hover:bg-slate-600";
  }
}

function getSkillLevelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function CourseHero({ course, whatsappNumber }: CourseHeroProps) {
  return (
    <div className="text-white py-10 lg:py-14">
      <AnimatedWrapper>
        <div className="space-y-5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/courses"
              className="hover:text-white transition-colors"
            >
              Courses
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-blue-100 capitalize">
              {course.skill_level}
            </span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-blue-100 leading-relaxed">
            {course.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {course.featured && (
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 px-3 py-1 text-xs font-semibold">
                Featured
              </Badge>
            )}
            <Badge
              className={`${getSkillLevelStyles(course.skill_level)} px-3 py-1 text-xs font-semibold`}
            >
              {getSkillLevelLabel(course.skill_level)}
            </Badge>
          </div>

          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated {formatDate(course.updated_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{course.location}</span>
            </div>
          </div>

          {/* Mobile CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 lg:hidden">
            <ConsultationModal
              trigger={
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white border-0 h-12 px-8 font-semibold shadow-lg shadow-orange-500/25"
                >
                  Send an Inquiry
                </Button>
              }
              courseName={course.title}
              courseId={course.id}
            />
            <WhatsAppEnrollButton
              whatsappNumber={whatsappNumber}
              courseName={course.title}
            />
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
