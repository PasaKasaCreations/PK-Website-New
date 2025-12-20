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
 * Validation schema for creating games
 */
const GameSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  long_description: z.string().min(1),
  genre: z.string().min(1),
  thumbnail_url: z.string().url(),
  screenshots: z.array(z.string().url()).optional(),
  play_store_url: z.string().url().optional().nullable(),
  app_store_url: z.string().url().optional().nullable(),
  is_published: z.boolean().optional(),
  featured: z.boolean().optional(),
  release_date: z.string().optional().nullable(),
  status: z.enum(["in_development", "coming_soon", "released"]).optional(),
});

/**
 * GET /api/admin/games
 * List all games
 */
export const GET = withAuth(async (req: NextRequest) => {
  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching games:", error);
      return errorResponse("Failed to fetch games", 500);
    }

    return successResponse(games);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});

/**
 * POST /api/admin/games
 * Create a new game
 */
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await parseBody(req);

    if (!body) {
      return errorResponse("Invalid JSON body");
    }

    // Validate input
    const parsed = GameSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(
        parsed.error.issues[0]?.message || "Validation failed"
      );
    }

    const validatedData = parsed.data;

    // Insert into database
    const insertData: Database["public"]["Tables"]["games"]["Insert"] = {
      name: validatedData.name,
      slug: validatedData.slug,
      description: validatedData.description,
      long_description: validatedData.long_description,
      genre: validatedData.genre,
      thumbnail_url: validatedData.thumbnail_url,
      screenshots: validatedData.screenshots ?? [],
      play_store_url: validatedData.play_store_url ?? null,
      app_store_url: validatedData.app_store_url ?? null,
      is_published: validatedData.is_published ?? false,
      featured: validatedData.featured ?? false,
      release_date: validatedData.release_date ?? null,
      status: validatedData.status ?? "in_development",
    };

    const { data: game, error } = await supabase
      .from("games")
      .insert(insertData as any)
      .select()
      .single();

    if (error) {
      console.error("Error creating game:", error);
      return errorResponse("Failed to create game: " + error.message, 500);
    }

    return successResponse(game, 201);
  } catch (error) {
    console.error("Unexpected error:", error);
    return errorResponse("Internal server error", 500);
  }
});
