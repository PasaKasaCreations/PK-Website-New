import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/server";
import {
  withAuth,
  parseBody,
  errorResponse,
  successResponse,
} from "@/lib/api/auth";
import { z } from "zod";

const UpdateJobPostingSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  department: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  employment_type: z
    .enum(["full_time", "part_time", "contract", "internship"])
    .optional(),
  description: z.string().min(1).optional(),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  nice_to_have: z.array(z.string()).optional(),
  is_published: z.boolean().optional(),
  application_deadline: z.string().optional().nullable(),
});

export const GET = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const { data: jobPosting, error } = await supabase
        .from("job_postings")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !jobPosting) {
        return errorResponse("Job posting not found", 404);
      }

      return successResponse(jobPosting);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);

export const PATCH = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await parseBody(req);

      if (!body) {
        return errorResponse("Invalid JSON body");
      }

      const parsed = UpdateJobPostingSchema.safeParse(body);
      if (!parsed.success) {
        return errorResponse(
          parsed.error.issues[0]?.message || "Validation failed"
        );
      }

      const validatedData = parsed.data;

      const { data: jobPosting, error } = await supabase
        .from("job_postings")
        .update(validatedData as any)
        .eq("id", id)
        .select()
        .single();

      if (error || !jobPosting) {
        console.error("Error updating job posting:", error);
        return errorResponse("Failed to update job posting", 500);
      }

      return successResponse(jobPosting);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);

export const DELETE = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const { error } = await supabase
        .from("job_postings")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting job posting:", error);
        return errorResponse("Failed to delete job posting", 500);
      }

      return successResponse({ message: "Job posting deleted successfully" });
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);
