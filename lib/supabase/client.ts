/**
 * ⚠️ DEPRECATED - DO NOT USE
 *
 * This browser client should NOT be used for this project.
 *
 * REASON:
 * - No user authentication on this public site
 * - All data mutations go through Server Actions (secure)
 * - All reads happen in Server Components (SEO-friendly)
 *
 * WHAT TO USE INSTEAD:
 * - Server Components: Import from '@/lib/supabase/server'
 * - Forms: Use Server Actions from '@/actions'
 *
 * This file is kept only to prevent import errors during migration.
 * TODO: Remove this file once all imports are cleaned up.
 */

import { createBrowserClient } from "@supabase/ssr";

/** @deprecated Use server-side supabase client instead */
export function createClient() {
  console.warn(
    "⚠️ Browser Supabase client should not be used. Use Server Actions instead."
  );

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
