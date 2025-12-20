import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Server-side Supabase client for Next.js App Router
 *
 * SECURITY NOTES:
 * - Uses ANON key (safe to expose, protected by RLS)
 * - No cookie handling (no user auth on this site)
 * - Used ONLY in Server Components and Server Actions
 * - All database access protected by Row Level Security (RLS)
 *
 * Usage:
 * - Server Components: Direct import and use
 * - API Routes: Import and use
 * - Client Components: NEVER - use Server Actions instead
 */
export function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false, // No user sessions on this site
      },
    }
  );
}

// Export a default instance for convenience
export const supabase = createClient();

/**
 * Validates environment variables are present
 * Call this during build/startup to fail fast
 */
export function validateSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
}
