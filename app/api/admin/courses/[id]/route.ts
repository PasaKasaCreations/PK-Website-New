import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/server";
import {
  withAuth,
  parseBody,
  errorResponse,
  successResponse,
} from "@/lib/api/auth";
import { z } from "zod";

/**
 * Validation schema for updating courses (all fields optional)
 */
const UpdateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  long_description: z.string().min(1).optional(),
  instructor: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  skill_level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  thumbnail_url: z.string().url().optional(),
  syllabus: z.any().optional(),
  learning_outcomes: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  is_published: z.boolean().optional(),
  featured: z.boolean().optional(),
  sessions_running: z.number().optional(),
  sessions_completed: z.number().optional(),
  next_batch_date: z.string().optional().nullable(),
  location: z.string().min(1).optional(),
  max_students: z.number().optional(),
  current_students: z.number().optional().nullable(),
  testimonials: z.any().optional(),
  price: z.number().optional(),
  currency: z.string().optional(),
});

/**
 * GET /api/admin/courses/[id]
 * Get a single course by ID
 */
export const GET = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const { data: course, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !course) {
        return errorResponse("Course not found", 404);
      }

      return successResponse(course);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);

/**
 * PATCH /api/admin/courses/[id]
 * Update a course by ID
 */
export const PATCH = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await parseBody(req);

      if (!body) {
        return errorResponse("Invalid JSON body");
      }

      // Validate input
      const parsed = UpdateCourseSchema.safeParse(body);
      if (!parsed.success) {
        return errorResponse(
          parsed.error.issues[0]?.message || "Validation failed"
        );
      }

      const validatedData = parsed.data;

      // Update in database
      const { data: course, error } = await supabase
        .from("courses")
        .update(validatedData as any)
        .eq("id", id)
        .select()
        .single();

      if (error || !course) {
        console.error("Error updating course:", error);
        return errorResponse("Failed to update course", 500);
      }

      return successResponse(course);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);

/**
 * DELETE /api/admin/courses/[id]
 * Delete a course by ID
 */
export const DELETE = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const { error } = await supabase.from("courses").delete().eq("id", id);

      if (error) {
        console.error("Error deleting course:", error);
        return errorResponse("Failed to delete course", 500);
      }

      return successResponse({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);
