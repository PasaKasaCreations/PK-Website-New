import { z } from "zod";

// Custom validation for image paths (accepts both URLs and S3 keys)
const imagePathSchema = z
  .string()
  .min(1, "Image is required")
  .refine(
    (val) => {
      // Accept URLs (http:// or https://)
      if (val.startsWith("http://") || val.startsWith("https://")) {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      }
      // Accept S3 keys (folder/filename pattern)
      return /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(val);
    },
    { message: "Invalid image path or URL" },
  );

// Optional image path (for screenshots array items)
const optionalImagePathSchema = z.string().refine(
  (val) => {
    if (!val) return true;
    // Accept URLs (http:// or https://)
    if (val.startsWith("http://") || val.startsWith("https://")) {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }
    // Accept S3 keys (folder/filename pattern)
    return /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(val);
  },
  { message: "Invalid image path or URL" },
);

// Hero stats schema for game hero section
const heroStatsSchema = z.object({
  reviews: z.string().default("0"),
  rating: z.string().default("0"),
  downloads: z.string().default("0"),
  feature: z.string().default(""),
});

export const gameFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  long_description: z.string().min(1, "Long description is required"),
  genre: z.string().min(1, "Genre is required"),
  category: z.string().default("game"),
  thumbnail_url: imagePathSchema,
  screenshots: z.array(optionalImagePathSchema).default([]),
  play_store_url: z.string().url().nullable().optional(),
  app_store_url: z.string().url().nullable().optional(),
  web_url: z.string().url().nullable().optional(),
  trailer_url: z.string().url().nullable().optional(),
  release_date: z.string().nullable().optional(),
  status: z.enum(["in_development", "coming_soon", "released"]),
  is_published: z.boolean().default(false),
  featured: z.boolean().default(false),
  hero_stats: heroStatsSchema.default({
    reviews: "0",
    rating: "0",
    downloads: "0",
    feature: "",
  }),
  accent_color: z.string().default("#3B82F6"),
  hero_background_image: optionalImagePathSchema.nullable().optional(),
});

export type GameFormData = z.infer<typeof gameFormSchema>;
