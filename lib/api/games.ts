import { createClient } from "@/lib/supabase/server";
import { Game } from "@/types/product.interface";
import { getImageUrl, getImageUrls } from "@/lib/wasabi/utils";

/**
 * Transform game data to include signed URLs for S3 images
 */
async function transformGameImages(game: Game): Promise<Game> {
  // Get signed URL for thumbnail if it's an S3 key
  const thumbnailUrl = await getImageUrl(game.thumbnail_url);

  // Get signed URLs for screenshots
  const screenshotUrls = game.screenshots
    ? await getImageUrls(game.screenshots)
    : [];

  // Get signed URL for hero background if exists
  const heroBackgroundUrl = game.hero_background_image
    ? await getImageUrl(game.hero_background_image)
    : null;

  return {
    ...game,
    thumbnail_url: thumbnailUrl || game.thumbnail_url,
    screenshots: screenshotUrls.filter((url): url is string => url !== null),
    hero_background_image: heroBackgroundUrl || game.hero_background_image,
  };
}

/**
 * Transform multiple games to include signed URLs
 */
async function transformGamesImages(games: Game[]): Promise<Game[]> {
  return Promise.all(games.map(transformGameImages));
}

/**
 * Fetch all games/products from Supabase
 * Used in games listing page
 */
export async function getAllGames(): Promise<Game[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching games:", error);
    return [];
  }

  const games = data as unknown as Game[];
  return transformGamesImages(games);
}

/**
 * Fetch featured games from Supabase
 * Used in homepage
 */
export async function getFeaturedGames(): Promise<Game[]> {
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

  const games = data as unknown as Game[];
  return transformGamesImages(games);
}

/**
 * Fetch games by status
 */
export async function getGamesByStatus(
  status: "released" | "coming_soon" | "in_development"
): Promise<Game[]> {
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

  const games = data as unknown as Game[];
  return transformGamesImages(games);
}

/**
 * Fetch games for hero carousel
 * Returns released games with hero_background_image, sorted by featured first
 */
export async function getGamesForHero(): Promise<Game[]> {
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

  const games = data as unknown as Game[];
  return transformGamesImages(games);
}
