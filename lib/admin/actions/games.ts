"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, requireAdmin } from "@/lib/supabase/admin-client";
import { gameFormSchema, type GameFormData } from "../schemas/game.schema";

export async function getGames() {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getGame(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function checkGameSlugExists(slug: string, excludeId?: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  let query = supabase
    .from("games")
    .select("id")
    .eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function createGame(formData: GameFormData) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const validated = gameFormSchema.parse(formData);

  const { error } = await supabase.from("games").insert({
    name: validated.name,
    slug: validated.slug,
    tagline: validated.tagline,
    description: validated.description,
    long_description: validated.long_description,
    genre: validated.genre,
    category: validated.category,
    thumbnail_url: validated.thumbnail_url,
    screenshots: validated.screenshots,
    play_store_url: validated.play_store_url || null,
    app_store_url: validated.app_store_url || null,
    web_url: validated.web_url || null,
    trailer_url: validated.trailer_url || null,
    release_date: validated.release_date || null,
    status: validated.status,
    is_published: validated.is_published,
    featured: validated.featured,
    hero_stats: validated.hero_stats || null,
    accent_color: validated.accent_color,
    hero_background_image: validated.hero_background_image || null,
  });

  if (error) throw error;

  revalidatePath("/admin/games");
  revalidatePath("/games");
  redirect("/admin/games");
}

export async function updateGame(id: string, formData: GameFormData) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const validated = gameFormSchema.parse(formData);

  const { error } = await supabase
    .from("games")
    .update({
      name: validated.name,
      slug: validated.slug,
      tagline: validated.tagline,
      description: validated.description,
      long_description: validated.long_description,
      genre: validated.genre,
      category: validated.category,
      thumbnail_url: validated.thumbnail_url,
      screenshots: validated.screenshots,
      play_store_url: validated.play_store_url || null,
      app_store_url: validated.app_store_url || null,
      web_url: validated.web_url || null,
      trailer_url: validated.trailer_url || null,
      release_date: validated.release_date || null,
      status: validated.status,
      is_published: validated.is_published,
      featured: validated.featured,
      hero_stats: validated.hero_stats || null,
      accent_color: validated.accent_color,
      hero_background_image: validated.hero_background_image || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/games");
  revalidatePath("/games");
  redirect("/admin/games");
}

export async function deleteGame(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { error } = await supabase.from("games").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/games");
  revalidatePath("/games");
}
