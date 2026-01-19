import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Server-side Supabase client with cookie-based authentication
 * Used for admin portal authentication and authorized operations
 *
 * SECURITY NOTES:
 * - Handles session cookies for admin authentication
 * - Used in Server Components, Server Actions, and API Routes
 * - Always verify admin status after getting session
 */
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component - cookie setting not supported
            // This is expected when reading in Server Components
          }
        },
      },
    }
  );
}

/**
 * Check if an email is in the admin_users table
 */
async function isEmailAdmin(
  supabase: Awaited<ReturnType<typeof createAdminClient>>,
  email: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return false;
  }

  return true;
}

/**
 * Update last login timestamp for admin user
 */
async function updateLastLogin(
  supabase: Awaited<ReturnType<typeof createAdminClient>>,
  email: string
): Promise<void> {
  await supabase
    .from("admin_users")
    .update({ last_login: new Date().toISOString() })
    .eq("email", email);
}

/**
 * Get current admin user from session
 * Returns null if not authenticated or not an admin
 */
export async function getAdminUser() {
  const supabase = await createAdminClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return null;
  }

  // Check if user's email is in admin_users table
  const isAdmin = await isEmailAdmin(supabase, user.email);

  if (!isAdmin) {
    return null;
  }

  return user;
}

/**
 * Require admin authentication for Server Actions
 * Throws error if not authenticated as admin
 */
export async function requireAdmin() {
  const user = await getAdminUser();

  if (!user) {
    throw new Error("Unauthorized: Admin access required");
  }

  return user;
}

/**
 * Check admin status and update last login
 * Used after successful login
 */
export async function verifyAndUpdateAdminLogin(email: string): Promise<boolean> {
  const supabase = await createAdminClient();
  const isAdmin = await isEmailAdmin(supabase, email);

  if (isAdmin) {
    await updateLastLogin(supabase, email);
  }

  return isAdmin;
}
