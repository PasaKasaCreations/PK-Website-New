import { BaseEntity, Platform } from "./common.interface";

export interface HeroStats {
  players: string;
  rating: string;
  feature: string;
}

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  thumbnail_url: string;
  screenshots: readonly string[];
  platforms: readonly Platform[];
  category: "game" | "tool" | "service";
  status: "released" | "coming_soon" | "in_development";
  play_store_url?: string;
  app_store_url?: string;
  web_url?: string;
  featured: boolean;
  is_published: boolean;
  // Hero section fields
  hero_background_image?: string;
  hero_stats?: HeroStats;
  accent_color?: string;
}

export interface GameStats {
  downloads?: number;
  rating?: number;
  reviews_count?: number;
}
