"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CourseSidebar } from "./CourseSidebar";
import type { Course } from "@/types/course.interface";

interface FloatingSidebarProps {
  course: Course;
  whatsappNumber: string | null;
}

export function FloatingSidebar({
  course,
  whatsappNumber,
}: FloatingSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarState, setSidebarState] = useState<"fixed" | "absolute-bottom">(
    "fixed",
  );
  const [absoluteTop, setAbsoluteTop] = useState(0);
  const [hasTransitioned, setHasTransitioned] = useState(false);

  const handleScroll = useCallback(() => {
    const footer = document.querySelector("footer");
    const sidebar = sidebarRef.current;

    if (!sidebar || !footer) return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const sidebarTopOffset = 80; // Distance from top when fixed
    const bottomBuffer = 40; // Buffer space above footer

    // Check if sidebar bottom would overlap with footer
    const sidebarBottomEdge =
      sidebarTopOffset + sidebarRect.height + bottomBuffer;

    if (footerRect.top <= sidebarBottomEdge) {
      // Sidebar would overlap footer - switch to absolute positioning
      const footerOffsetTop =
        footer.offsetTop || document.body.scrollHeight - footer.offsetHeight;
      const newAbsoluteTop =
        footerOffsetTop - sidebarRect.height - bottomBuffer;

      setSidebarState("absolute-bottom");
      setAbsoluteTop(newAbsoluteTop);
    } else {
      // Normal fixed positioning
      setSidebarState("fixed");
    }

    // Track if we've scrolled past the hero for transition effect
    const heroSection = document.querySelector('[data-section="hero"]');
    if (heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setHasTransitioned(heroBottom < 0);
    }
  }, []);

  useEffect(() => {
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="hidden lg:block">
      <div
        ref={sidebarRef}
        className={`w-[380px] z-10 transition-all duration-300 ease-out ${
          sidebarState === "fixed" ? "fixed right-10" : "absolute right-10"
        }`}
        style={{
          top: sidebarState === "fixed" ? "80px" : `${absoluteTop}px`,
        }}
      >
        <div
          className={`transition-all duration-500 ease-out transform ${
            hasTransitioned ? "scale-100 shadow-2xl" : "scale-[0.98] shadow-xl"
          }`}
        >
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            <CourseSidebar course={course} whatsappNumber={whatsappNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
