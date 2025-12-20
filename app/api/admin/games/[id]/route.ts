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
 * Validation schema for updating games (all fields optional)
 */
const UpdateGameSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  long_description: z.string().min(1).optional(),
  genre: z.string().min(1).optional(),
  thumbnail_url: z.string().url().optional(),
  screenshots: z.array(z.string().url()).optional(),
  play_store_url: z.string().url().optional().nullable(),
  app_store_url: z.string().url().optional().nullable(),
  is_published: z.boolean().optional(),
  featured: z.boolean().optional(),
  release_date: z.string().optional().nullable(),
  status: z
    .enum(["in_development", "coming_soon", "released"])
    .optional(),
});

/**
 * GET /api/admin/games/[id]
 * Get a single game by ID
 */
export const GET = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const { data: game, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !game) {
        return errorResponse("Game not found", 404);
      }

      return successResponse(game);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);

/**
 * PATCH /api/admin/games/[id]
 * Update a game by ID
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
      const parsed = UpdateGameSchema.safeParse(body);
      if (!parsed.success) {
        return errorResponse(
          parsed.error.issues[0]?.message || "Validation failed"
        );
      }

      const validatedData = parsed.data;

      // Update in database
      const { data: game, error } = await supabase
        .from("games")
        .update(validatedData as any)
        .eq("id", id)
        .select()
        .single();

      if (error || !game) {
        console.error("Error updating game:", error);
        return errorResponse("Failed to update game", 500);
      }

      return successResponse(game);
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);

/**
 * DELETE /api/admin/games/[id]
 * Delete a game by ID
 */
export const DELETE = withAuth(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const { error } = await supabase.from("games").delete().eq("id", id);

      if (error) {
        console.error("Error deleting game:", error);
        return errorResponse("Failed to delete game", 500);
      }

      return successResponse({ message: "Game deleted successfully" });
    } catch (error) {
      console.error("Unexpected error:", error);
      return errorResponse("Internal server error", 500);
    }
  }
);
