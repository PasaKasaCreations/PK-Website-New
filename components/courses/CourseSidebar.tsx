"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components/shared/ConsultationModal";
import {
  Play,
  Clock,
  BarChart3,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import type { Course, CourseProject } from "@/types/course.interface";

interface CourseSidebarProps {
  course: Course;
  whatsappNumber: string | null;
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getSkillLevelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function openWhatsApp(whatsappNumber: string | null, courseName: string) {
  if (!whatsappNumber) return;
  const cleanNumber = whatsappNumber.replace(/[\s-]/g, "");
  const message = encodeURIComponent(
    `Hi! I'm interested in enrolling for the "${courseName}" course. Could you please share more details?`,
  );
  window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
}

export function CourseSidebar({ course, whatsappNumber }: CourseSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const projects = (course.projects as CourseProject[]) || [];
  const hasProjects = projects.length > 0;

  // Sort projects by display_order
  const sortedProjects = [...projects].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
  );

  const currentProject = hasProjects ? sortedProjects[currentIndex] : null;
  const youtubeId = currentProject?.youtube_url
    ? getYouTubeVideoId(currentProject.youtube_url)
    : null;
  const hasVideo = !!youtubeId;

  const goToPrevious = () => {
    setShowVideo(false);
    setCurrentIndex((prev) =>
      prev === 0 ? sortedProjects.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setShowVideo(false);
    setCurrentIndex((prev) =>
      prev === sortedProjects.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Card className="overflow-hidden shadow-2xl border border-slate-200 bg-white ring-1 ring-slate-100">
      {/* Preview Section */}
      <div className="relative aspect-video bg-slate-900">
        {hasProjects && currentProject ? (
          <>
            {showVideo && hasVideo ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={currentProject.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {currentProject.thumbnail_url ? (
                  <Image
                    src={currentProject.thumbnail_url}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                    <FolderKanban className="h-16 w-16 text-white/30" />
                  </div>
                )}

                {/* Play button overlay */}
                {hasVideo && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
                    aria-label="Play video"
                  >
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play
                        className="h-7 w-7 text-slate-900 ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </button>
                )}

                {/* Navigation arrows for multiple projects */}
                {sortedProjects.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="h-5 w-5 text-slate-700" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all"
                      aria-label="Next project"
                    >
                      <ChevronRight className="h-5 w-5 text-slate-700" />
                    </button>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          // Fallback to course thumbnail
          <>
            {course.thumbnail_url ? (
              <Image
                src={course.thumbnail_url}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700">
                <GraduationCap className="h-16 w-16 text-white/50" />
              </div>
            )}
          </>
        )}
      </div>

      {/* Project indicators - only show if multiple projects */}
      {hasProjects && sortedProjects.length > 1 && (
        <div className="px-5 py-3 bg-slate-50 border-b">
          <div className="flex items-center justify-center gap-1.5">
            {sortedProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowVideo(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-5 bg-blue-500"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <CardContent className="p-5 space-y-5">
        {/* Project Info (if projects exist) */}
        {hasProjects && currentProject && (
          <div className="pb-4 border-b">
            <h3 className="font-bold text-base mb-1">{currentProject.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {currentProject.description}
            </p>
          </div>
        )}

        {/* Course Stats */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">{course.duration} duration</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <BarChart3 className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">
              {getSkillLevelLabel(course.skill_level)} level
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <GraduationCap className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Certificate of completion</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Briefcase className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Job placement assistance</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MessageSquare className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Mock interview preparation</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-2">
          <ConsultationModal
            trigger={
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 shadow-lg shadow-orange-500/20">
                Send an Inquiry
              </Button>
            }
            courseName={course.title}
            courseId={course.id}
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
          {whatsappNumber && (
            <Button
              onClick={() => openWhatsApp(whatsappNumber, course.title)}
              variant="outline"
              className="w-full font-semibold h-12 border-2 hover:bg-slate-50"
            >
              <svg
                className="h-5 w-5 mr-2 text-green-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enroll via WhatsApp
            </Button>
          )}
        </div>

        {/* Projects list (if more than 1 project) */}
        {hasProjects && sortedProjects.length > 1 && (
          <div className="border-t pt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Projects You'll Build
            </p>
            <div className="space-y-2">
              {sortedProjects.slice(0, 4).map((project, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowVideo(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-full text-left flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    index === currentIndex
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="relative h-9 w-12 rounded overflow-hidden flex-shrink-0 bg-slate-100">
                    {project.thumbnail_url ? (
                      <Image
                        src={project.thumbnail_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FolderKanban className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium line-clamp-1 flex-1">
                    {project.title}
                  </span>
                </button>
              ))}
              {sortedProjects.length > 4 && (
                <p className="text-xs text-muted-foreground text-center pt-1">
                  +{sortedProjects.length - 4} more projects
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
