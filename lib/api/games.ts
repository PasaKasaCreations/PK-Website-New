import { createClient } from "@/lib/supabase/server";
import { Game } from "@/types/product.interface";
import { getProxyImageUrl, getProxyImageUrls } from "@/lib/wasabi/proxy-utils";

/**
 * Transform game data to include proxy URLs for S3 images
 * Uses proxy URLs instead of signed URLs for stable caching with Vercel
 */
function transformGameImages(game: Game): Game {
  // Get proxy URL for thumbnail if it's an S3 key
  const thumbnailUrl = getProxyImageUrl(game.thumbnail_url);

  // Get proxy URLs for screenshots
  const screenshotUrls = game.screenshots
    ? getProxyImageUrls(game.screenshots)
    : [];

  // Get proxy URL for hero background if exists
  const heroBackgroundUrl = game.hero_background_image
    ? getProxyImageUrl(game.hero_background_image)
    : null;

  return {
    ...game,
    thumbnail_url: thumbnailUrl || game.thumbnail_url,
    screenshots: screenshotUrls.filter((url): url is string => url !== null),
    hero_background_image: heroBackgroundUrl || game.hero_background_image,
  };
}

/**
 * Transform multiple games to include proxy URLs
 */
function transformGamesImages(games: Game[]): Game[] {
  return games.map(transformGameImages);
}

/**
 * Sort games with coming_soon at the end
 * Order: released first, then coming_soon
 */
function sortGamesByStatus(games: Game[]): Game[] {
  const statusOrder: Record<string, number> = {
    released: 0,
    coming_soon: 1,
  };

  return [...games].sort((a, b) => {
    const orderA = statusOrder[a.status] ?? 0;
    const orderB = statusOrder[b.status] ?? 0;
    return orderA - orderB;
  });
}

/**
 * Fetch all games/products from Supabase
 * Used in games listing page
 * Excludes in_development games, sorted with released first, coming_soon at the end
 */
export async function getAllGames(): Promise<Game[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .in("status", ["released", "coming_soon"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching games:", error);
    return [];
  }

  const games = data as unknown as Game[];
  const transformedGames = transformGamesImages(games);
  return sortGamesByStatus(transformedGames);
}

/**
 * Fetch featured games from Supabase
 * Used in homepage
 * Excludes in_development games, sorted with released first, coming_soon at the end
 */
export async function getFeaturedGames(): Promise<Game[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("featured", true)
    .in("status", ["released", "coming_soon"])
    .order("created_at", { ascending: false })
    .limit(6); // Fetch more to allow for sorting, will display top 3 after sort

  if (error) {
    console.error("Error fetching featured games:", error);
    return [];
  }

  const games = data as unknown as Game[];
  const transformedGames = transformGamesImages(games);
  return sortGamesByStatus(transformedGames).slice(0, 3);
}

/**
 * Fetch games by status
 */
export async function getGamesByStatus(
  status: "released" | "coming_soon" | "in_development",
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
