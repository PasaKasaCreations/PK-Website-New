import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/server";
import { withAuth, errorResponse, successResponse } from "@/lib/api/auth";

/**
 * GET /api/admin/inquiries
 * List all inquiries (for admin review)
 */
export const GET = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    let query = supabase.from("inquiries").select("*");

    // Filter by status if provided
    if (status && ["new", "in_progress", "resolved"].includes(status)) {
      query = query.eq("status", status as "new" | "in_progress" | "resolved");
    }

    // Filter by type if provided
    if (type && ["general", "course", "career", "partnership"].includes(type)) {
      query = query.eq(
        "inquiry_type",
        type as "general" | "course" | "career" | "partnership"
      );
    }

    const { data: inquiries, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error fetching inquiries:", error);
      return errorResponse("Failed to fetch inquiries", 500);
    }

    return successResponse(inquiries);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});
