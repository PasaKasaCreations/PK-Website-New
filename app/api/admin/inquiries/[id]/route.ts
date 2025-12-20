import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/server";
import {
  withAuth,
  parseBody,
  errorResponse,
  successResponse,
} from "@/lib/api/auth";
import { z } from "zod";

const UpdateInquirySchema = z.object({
  status: z.enum(["new", "in_progress", "resolved"]),
});

/**
 * GET /api/admin/inquiries/[id]
 * Get a single inquiry by ID
 */
export const GET = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const { data: inquiry, error } = await supabase
        .from("inquiries")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !inquiry) {
        return errorResponse("Inquiry not found", 404);
      }

      return successResponse(inquiry);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);

/**
 * PATCH /api/admin/inquiries/[id]
 * Update inquiry status (for admin workflow)
 */
export const PATCH = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await parseBody(req);

      if (!body) {
        return errorResponse("Invalid JSON body");
      }

      const parsed = UpdateInquirySchema.safeParse(body);
      if (!parsed.success) {
        return errorResponse(
          parsed.error.issues[0]?.message || "Validation failed"
        );
      }

      const { status } = parsed.data;

      const { data: inquiry, error } = await supabase
        .from("inquiries")
        .update({ status } as any)
        .eq("id", id)
        .select()
        .single();

      if (error || !inquiry) {
        console.error("Error updating inquiry:", error);
        return errorResponse("Failed to update inquiry", 500);
      }

      return successResponse(inquiry);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);
