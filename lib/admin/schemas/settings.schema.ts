import { z } from "zod";

// URL validation helper (optional URLs)
const optionalUrlSchema = z
  .string()
  .url("Invalid URL format")
  .nullable()
  .optional()
  .or(z.literal(""))
  .transform((val) => (val === "" ? null : val || null));

// Optional phone number validation
const optionalPhoneSchema = z
  .string()
  .regex(/^[\d\s\-+()]*$/, "Invalid phone number format")
  .nullable()
  .optional()
  .or(z.literal(""))
  .transform((val) => (val === "" ? null : val || null));

export const settingsFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),

  contact_number: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^[\d\s\-+()]+$/, "Invalid phone number format"),

  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location too long"),

  location_map_url: optionalUrlSchema,
  whatsapp_number: optionalPhoneSchema,
  linkedin_url: optionalUrlSchema,
  instagram_url: optionalUrlSchema,
  facebook_url: optionalUrlSchema,
  youtube_url: optionalUrlSchema,
});

export type SettingsFormData = z.infer<typeof settingsFormSchema>;
