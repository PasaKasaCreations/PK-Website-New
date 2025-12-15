import { BaseEntity, Platform } from "./common.interface";

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  thumbnail_url: string;
  screenshots: readonly string[];
  platforms: readonly Platform[];
  category: "game" | "tool" | "service";
  status: "launched" | "coming_soon" | "in_development";
  play_store_url?: string;
  app_store_url?: string;
  web_url?: string;
  featured: boolean;
}

export interface GameStats {
  downloads?: number;
  rating?: number;
  reviews_count?: number;
}
