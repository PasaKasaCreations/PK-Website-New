"use server";

import { supabase } from "@/lib/supabase/server";
import { z } from "zod";
import { headers } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Inquiry Form Validation Schema
 *
 * SECURITY:
 * - Server-side validation (client validation can be bypassed)
 * - Strict length limits to prevent abuse
 * - Email format validation
 * - Required fields enforcement
 */
const InquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email is too long")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .optional()
    .nullable()
    .transform((val) => val || null),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long")
    .trim(),
  inquiry_type: z.enum(["general", "course", "career", "partnership"], {
    message: "Invalid inquiry type",
  }),
  course_id: z.string().uuid().optional().nullable(),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Submit Inquiry Form (Server Action)
 *
 * SECURITY FEATURES:
 * - Server-side only execution
 * - Zod validation
 * - Honeypot check (bot detection)
 * - IP address & User-Agent logging (for abuse tracking)
 * - RLS policies enforce database-level security
 *
 * FUTURE ENHANCEMENTS:
 * - Rate limiting (5 submissions per IP per hour)
 * - reCAPTCHA integration
 * - Email notification to admin
 */
export async function submitInquiry(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    // 1. Validate input
    const parsed = InquirySchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid form data",
      };
    }

    const validatedData = parsed.data;

    // 2. Honeypot check (bot detection)
    if (validatedData.website) {
      // Silently fail - don't reveal honeypot to bots
      return {
        success: true,
        data: { id: "blocked" },
      };
    }

    // 3. Get request metadata for security tracking
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
    const userAgent = headersList.get("user-agent");

    // 4. Insert into database (RLS policies enforce security)
    const insertData: Database["public"]["Tables"]["inquiries"]["Insert"] = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      inquiry_type: validatedData.inquiry_type,
      course_id: validatedData.course_id ?? null,
      ip_address: ip,
      user_agent: userAgent,
    };

    const { data: inquiry, error } = (await supabase
      .from("inquiries")
      .insert(insertData as any)
      .select("id")
      .single()) as { data: { id: string } | null; error: any };

    if (error) {
      console.error("Inquiry submission error:", error);
      return {
        success: false,
        error: "Failed to submit inquiry. Please try again.",
      };
    }

    if (!inquiry) {
      return {
        success: false,
        error: "Failed to submit inquiry. Please try again.",
      };
    }

    // 5. Success
    return {
      success: true,
      data: { id: inquiry.id },
    };
  } catch (error) {
    console.error("Unexpected error in submitInquiry:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Example Usage in a Client Component:
 *
 * ```tsx
 * "use client"
 *
 * import { submitInquiry } from "@/actions/inquiry.actions"
 * import { useState } from "react"
 *
 * export function InquiryForm() {
 *   const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
 *
 *   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
 *     e.preventDefault()
 *     setStatus("submitting")
 *
 *     const formData = new FormData(e.currentTarget)
 *     const result = await submitInquiry({
 *       name: formData.get("name"),
 *       email: formData.get("email"),
 *       phone: formData.get("phone"),
 *       message: formData.get("message"),
 *       inquiry_type: formData.get("inquiry_type"),
 *       website: formData.get("website"), // honeypot
 *     })
 *
 *     if (result.success) {
 *       setStatus("success")
 *       e.currentTarget.reset()
 *     } else {
 *       setStatus("error")
 *       alert(result.error)
 *     }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {/* form fields *\/}
 *       {/* honeypot field (hidden) *\/}
 *       <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
 *     </form>
 *   )
 * }
 * ```
 */
