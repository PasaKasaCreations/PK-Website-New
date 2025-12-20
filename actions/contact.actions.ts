"use server";

import { supabase } from "@/lib/supabase/server";
import { z } from "zod";
import { headers } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Contact Form Validation Schema
 *
 * SECURITY:
 * - Server-side validation only
 * - Strict length limits
 * - Email format validation
 */
const ContactSchema = z.object({
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
  subject: z
    .string()
    .max(200, "Subject is too long")
    .optional()
    .nullable()
    .transform((val) => val || null),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long")
    .trim(),
  // Honeypot field - should be empty
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Submit Contact Form (Server Action)
 *
 * SECURITY FEATURES:
 * - Server-side execution only
 * - Zod validation
 * - Honeypot check
 * - IP & User-Agent tracking
 * - RLS policies at database level
 *
 * RATE LIMITING:
 * - TODO: Implement rate limiting (5 messages per IP per hour)
 * - Use Vercel Edge Config, Upstash Redis, or similar
 */
export async function submitContactMessage(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    // 1. Validate input
    const parsed = ContactSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid form data",
      };
    }

    const validatedData = parsed.data;

    // 2. Honeypot check (bot detection)
    if (validatedData.company) {
      // Silently succeed - don't reveal honeypot
      return {
        success: true,
        data: { id: "blocked" },
      };
    }

    // 3. Get request metadata
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") || headersList.get("x-real-ip");
    const userAgent = headersList.get("user-agent");

    // 4. Insert into database
    const insertData: Database["public"]["Tables"]["contact_messages"]["Insert"] =
      {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        ip_address: ip,
        user_agent: userAgent,
      };

    const { data: message, error } = (await supabase
      .from("contact_messages")
      .insert(insertData as any)
      .select("id")
      .single()) as { data: { id: string } | null; error: any };

    if (error) {
      console.error("Contact form submission error:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again.",
      };
    }

    if (!message) {
      return {
        success: false,
        error: "Failed to send message. Please try again.",
      };
    }

    // 5. Success
    return {
      success: true,
      data: { id: message.id },
    };
  } catch (error) {
    console.error("Unexpected error in submitContactMessage:", error);
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
 * import { submitContactMessage } from "@/actions/contact.actions"
 * import { useState } from "react"
 *
 * export function ContactForm() {
 *   const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
 *
 *   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
 *     e.preventDefault()
 *     setStatus("submitting")
 *
 *     const formData = new FormData(e.currentTarget)
 *     const result = await submitContactMessage({
 *       name: formData.get("name"),
 *       email: formData.get("email"),
 *       subject: formData.get("subject"),
 *       message: formData.get("message"),
 *       company: formData.get("company"), // honeypot
 *     })
 *
 *     if (result.success) {
 *       setStatus("success")
 *       e.currentTarget.reset()
 *       // Show success message
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
 *       <input
 *         type="text"
 *         name="company"
 *         style={{ display: "none" }}
 *         tabIndex={-1}
 *         autoComplete="off"
 *       />
 *     </form>
 *   )
 * }
 * ```
 */
