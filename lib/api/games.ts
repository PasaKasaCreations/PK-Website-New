import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product.interface";

/**
 * Fetch all games/products from Supabase
 * Used in games listing page
 */
export async function getAllGames(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching games:", error);
    return [];
  }

  return data as unknown as Product[];
}

/**
 * Fetch featured games from Supabase
 * Used in homepage
 */
export async function getFeaturedGames(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching featured games:", error);
    return [];
  }

  return data as unknown as Product[];
}

/**
 * Fetch games by status
 */
export async function getGamesByStatus(
  status: "released" | "coming_soon" | "in_development"
): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching games by status:", error);
    return [];
  }

  return data as unknown as Product[];
}

/**
 * Fetch games for hero carousel
 * Returns released games with hero_background_image, sorted by featured first
 */
export async function getGamesForHero(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("is_published", true)
    .eq("status", "released")
    .not("hero_background_image", "is", null)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching games for hero:", error);
    return [];
  }

  return data as unknown as Product[];
}
