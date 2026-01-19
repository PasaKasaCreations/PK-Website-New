import type { Tables } from "./database.types";

// Typed structure for hero_stats JSONB field
export interface HeroStats {
  reviews: string;
  rating: string;
  downloads: string;
  feature: string;
}

// Game type derived from database, with typed hero_stats
export type Game = Omit<Tables<"games">, "hero_stats"> & {
  hero_stats: HeroStats | null;
};

// Alias for backward compatibility
export type Product = Game;
