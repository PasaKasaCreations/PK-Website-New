import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/server";
import {
  withAuth,
  parseBody,
  errorResponse,
  successResponse,
} from "@/lib/api/auth";
import { z } from "zod";
import type { Database } from "@/types/database.types";

/**
 * Validation schema for creating/updating courses
 */
const CourseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  long_description: z.string().min(1),
  instructor: z.string().min(1),
  duration: z.string().min(1),
  skill_level: z.enum(["beginner", "intermediate", "advanced"]),
  thumbnail_url: z.string().url(),
  syllabus: z.any(), // JSONB
  learning_outcomes: z.array(z.string()),
  prerequisites: z.array(z.string()),
  is_published: z.boolean().optional(),
  featured: z.boolean().optional(),
  sessions_running: z.number().optional(),
  sessions_completed: z.number().optional(),
  next_batch_date: z.string().optional().nullable(),
  location: z.string().min(1),
  max_students: z.number().optional(),
  current_students: z.number().optional().nullable(),
  testimonials: z.any().optional(), // JSONB
  price: z.number().optional(),
  currency: z.string().optional(),
});

/**
 * GET /api/admin/courses
 * List all courses (published and unpublished)
 */
export const GET = withAuth(async (req: NextRequest) => {
  try {
    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching courses:", error);
      return errorResponse("Failed to fetch courses", 500);
    }

    return successResponse(courses);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});

/**
 * POST /api/admin/courses
 * Create a new course
 */
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await parseBody(req);

    if (!body) {
      return errorResponse("Invalid JSON body");
    }

    // Validate input
    const parsed = CourseSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        parsed.error.issues[0]?.message || "Validation failed"
      );
    }

    const validatedData = parsed.data;

    // Insert into database
    const insertData: Database["public"]["Tables"]["courses"]["Insert"] = {
      title: validatedData.title,
      slug: validatedData.slug,
      description: validatedData.description,
      long_description: validatedData.long_description,
      instructor: validatedData.instructor,
      duration: validatedData.duration,
      skill_level: validatedData.skill_level,
      thumbnail_url: validatedData.thumbnail_url,
      syllabus: validatedData.syllabus,
      learning_outcomes: validatedData.learning_outcomes,
      prerequisites: validatedData.prerequisites,
      is_published: validatedData.is_published ?? false,
      featured: validatedData.featured ?? false,
      sessions_running: validatedData.sessions_running ?? 0,
      sessions_completed: validatedData.sessions_completed ?? 0,
      next_batch_date: validatedData.next_batch_date ?? null,
      location: validatedData.location,
      max_students: validatedData.max_students ?? 20,
      current_students: validatedData.current_students ?? 0,
      testimonials: validatedData.testimonials ?? [],
      price: validatedData.price ?? 0,
      currency: validatedData.currency ?? "INR",
    };

    const { data: course, error } = await supabase
      .from("courses")
      .insert(insertData as any)
      .select()
      .single();

    if (error) {
      console.error("Error creating course:", error);
      return errorResponse("Failed to create course: " + error.message, 500);
    }

    return successResponse(course, 201);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});
