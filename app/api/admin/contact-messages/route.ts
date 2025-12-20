import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/server";
import { withAuth, errorResponse, successResponse } from "@/lib/api/auth";

/**
 * GET /api/admin/contact-messages
 * List all contact messages (read-only for admin)
 */
export const GET = withAuth(async (req: NextRequest) => {
  try {
    const { data: messages, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contact messages:", error);
      return errorResponse("Failed to fetch contact messages", 500);
    }

    return successResponse(messages);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});
