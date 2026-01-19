"use server";

import { createAdminClient } from "@/lib/supabase/admin-client";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createAdminClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
