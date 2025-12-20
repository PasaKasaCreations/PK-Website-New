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
 * Validation schema for creating job postings
 */
const JobPostingSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  employment_type: z.enum(["full_time", "part_time", "contract", "internship"]),
  description: z.string().min(1),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  nice_to_have: z.array(z.string()).optional(),
  is_published: z.boolean().optional(),
  application_deadline: z.string().optional().nullable(),
});

/**
 * GET /api/admin/job-postings
 * List all job postings
 */
export const GET = withAuth(async (req: NextRequest) => {
  try {
    const { data: jobPostings, error } = await supabase
      .from("job_postings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching job postings:", error);
      return errorResponse("Failed to fetch job postings", 500);
    }

    return successResponse(jobPostings);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});

/**
 * POST /api/admin/job-postings
 * Create a new job posting
 */
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await parseBody(req);

    if (!body) {
      return errorResponse("Invalid JSON body");
    }

    // Validate input
    const parsed = JobPostingSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        parsed.error.issues[0]?.message || "Validation failed"
      );
    }

    const validatedData = parsed.data;

    // Insert into database
    const insertData: Database["public"]["Tables"]["job_postings"]["Insert"] = {
      title: validatedData.title,
      slug: validatedData.slug,
      department: validatedData.department,
      location: validatedData.location,
      employment_type: validatedData.employment_type,
      description: validatedData.description,
      requirements: validatedData.requirements ?? [],
      responsibilities: validatedData.responsibilities ?? [],
      nice_to_have: validatedData.nice_to_have ?? [],
      is_published: validatedData.is_published ?? false,
      application_deadline: validatedData.application_deadline ?? null,
    };

    const { data: jobPosting, error } = await supabase
      .from("job_postings")
      .insert(insertData as any)
      .select()
      .single();

    if (error) {
      console.error("Error creating job posting:", error);
      return errorResponse(
        "Failed to create job posting: " + error.message,
        500
      );
    }

    return successResponse(jobPosting, 201);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});
