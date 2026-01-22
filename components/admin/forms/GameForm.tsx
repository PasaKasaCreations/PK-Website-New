"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "../ui/ImageUpload";
import { MultiImageUpload } from "../ui/MultiImageUpload";
import { FieldError } from "../ui/FieldError";
import { WASABI_FOLDERS } from "@/lib/wasabi/client";
import { Loader2 } from "lucide-react";
import {
  createGame,
  updateGame,
  checkGameSlugExists,
} from "@/lib/admin/actions/games";
import {
  gameFormSchema,
  type GameFormData,
} from "@/lib/admin/schemas/game.schema";
import {
  validateFormData,
  parseServerError,
  type FieldErrors,
} from "@/lib/utils/form-validation";
import { cn } from "@/lib/utils";
import type { Tables } from "@/types/database.types";

interface GameFormProps {
  game?: Tables<"games">;
}

interface HeroStats {
  reviews: string;
  rating: string;
  downloads: string;
  feature: string;
}

export function GameForm({ game }: GameFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Parse hero_stats from game if it exists
  const initialHeroStats: HeroStats = game?.hero_stats
    ? (game.hero_stats as unknown as HeroStats)
    : { reviews: "", rating: "", downloads: "", feature: "" };

  // Form state
  const [name, setName] = useState(game?.name || "");
  const [slug, setSlug] = useState(game?.slug || "");
  const [tagline, setTagline] = useState(game?.tagline || "");
  const [description, setDescription] = useState(game?.description || "");
  const [longDescription, setLongDescription] = useState(
    game?.long_description || "",
  );
  const [genre, setGenre] = useState(game?.genre || "");
  const [category, setCategory] = useState(game?.category || "game");
  const [thumbnailUrl, setThumbnailUrl] = useState(game?.thumbnail_url || "");
  const [screenshots, setScreenshots] = useState<string[]>(
    game?.screenshots || [],
  );
  const [playStoreUrl, setPlayStoreUrl] = useState(game?.play_store_url || "");
  const [appStoreUrl, setAppStoreUrl] = useState(game?.app_store_url || "");
  const [webUrl, setWebUrl] = useState(game?.web_url || "");
  const [releaseDate, setReleaseDate] = useState(game?.release_date || "");
  const [status, setStatus] = useState<
    "in_development" | "coming_soon" | "released"
  >(game?.status || "in_development");
  const [isPublished, setIsPublished] = useState(game?.is_published || false);
  const [featured, setFeatured] = useState(game?.featured || false);

  // Hero stats state (ensure values are never undefined to prevent controlled/uncontrolled warnings)
  const [heroReviews, setHeroReviews] = useState(
    initialHeroStats.reviews || "",
  );
  const [heroRating, setHeroRating] = useState(initialHeroStats.rating || "");
  const [heroDownloads, setHeroDownloads] = useState(
    initialHeroStats.downloads || "",
  );
  const [heroFeature, setHeroFeature] = useState(
    initialHeroStats.feature || "",
  );

  // New fields state
  const [accentColor, setAccentColor] = useState(
    game?.accent_color || "#3B82F6",
  );
  const [heroBackgroundImage, setHeroBackgroundImage] = useState(
    game?.hero_background_image || "",
  );
  const [trailerUrl, setTrailerUrl] = useState(game?.trailer_url || "");

  // Auto-generate slug from name
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!game) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Build hero_stats object
    const heroStats = {
      reviews: heroReviews || "0",
      rating: heroRating || "0",
      downloads: heroDownloads || "0",
      feature: heroFeature || "",
    };

    const formData: GameFormData = {
      name,
      slug,
      tagline,
      description,
      long_description: longDescription,
      genre,
      category,
      thumbnail_url: thumbnailUrl,
      screenshots,
      play_store_url: playStoreUrl || null,
      app_store_url: appStoreUrl || null,
      web_url: webUrl || null,
      trailer_url: trailerUrl || null,
      release_date: releaseDate || null,
      status,
      is_published: isPublished,
      featured,
      hero_stats: heroStats,
      accent_color: accentColor,
      hero_background_image: heroBackgroundImage || null,
    };

    // Client-side validation
    const validation = validateFormData(gameFormSchema, formData);
    if (!validation.success && validation.errors) {
      setFieldErrors(validation.errors);
      setError("Please fix the validation errors below.");
      return;
    }

    // Check slug uniqueness
    try {
      const slugExists = await checkGameSlugExists(slug, game?.id);
      if (slugExists) {
        setFieldErrors({ slug: "A game with this slug already exists" });
        setError("A game with this slug already exists. Please use a different name.");
        return;
      }
    } catch {
      setError("Failed to validate slug. Please try again.");
      return;
    }

    startTransition(async () => {
      try {
        if (game) {
          await updateGame(game.id, formData);
        } else {
          await createGame(formData);
        }
      } catch (err) {
        const { message, fieldErrors: serverFieldErrors } = parseServerError(err);
        if (serverFieldErrors) {
          setFieldErrors(serverFieldErrors);
          setError("Please fix the validation errors below.");
        } else if (message) {
          setError(message);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={cn(fieldErrors.name && "border-red-500")}
                  />
                  <FieldError error={fieldErrors.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    disabled
                    className={cn("bg-slate-100 cursor-not-allowed", fieldErrors.slug && "border-red-500")}
                  />
                  <FieldError error={fieldErrors.slug} />
                  <p className="text-xs text-slate-500">
                    Auto-generated from name
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline *</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="A short catchy phrase..."
                  className={cn(fieldErrors.tagline && "border-red-500")}
                />
                <FieldError error={fieldErrors.tagline} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={cn(fieldErrors.description && "border-red-500")}
                />
                <FieldError error={fieldErrors.description} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="long_description">Long Description *</Label>
                <Textarea
                  id="long_description"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  rows={6}
                  className={cn(fieldErrors.long_description && "border-red-500")}
                />
                <FieldError error={fieldErrors.long_description} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre *</Label>
                  <Input
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="e.g., Puzzle, Action, RPG"
                    className={cn(fieldErrors.genre && "border-red-500")}
                  />
                  <FieldError error={fieldErrors.genre} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., game, app"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Stats</CardTitle>
              <p className="text-sm text-slate-500">
                Stats displayed on the games hero section
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hero_reviews">Reviews</Label>
                  <Input
                    id="hero_reviews"
                    value={heroReviews}
                    onChange={(e) => setHeroReviews(e.target.value)}
                    placeholder="e.g., 10K+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_rating">Rating</Label>
                  <Input
                    id="hero_rating"
                    value={heroRating}
                    onChange={(e) => setHeroRating(e.target.value)}
                    placeholder="e.g., 4.5"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hero_downloads">Downloads</Label>
                  <Input
                    id="hero_downloads"
                    value={heroDownloads}
                    onChange={(e) => setHeroDownloads(e.target.value)}
                    placeholder="e.g., 100K+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_feature">Feature Highlight</Label>
                  <Input
                    id="hero_feature"
                    value={heroFeature}
                    onChange={(e) => setHeroFeature(e.target.value)}
                    placeholder="e.g., Tournaments, Live Tables"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Game Thumbnail *</Label>
                <ImageUpload
                  value={thumbnailUrl}
                  onChange={(key) => setThumbnailUrl(key || "")}
                  folder={WASABI_FOLDERS.games}
                  placeholder="Upload game thumbnail image"
                />
                <FieldError error={fieldErrors.thumbnail_url} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Screenshots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Game Screenshots</Label>
                <MultiImageUpload
                  value={screenshots}
                  onChange={setScreenshots}
                  folder={WASABI_FOLDERS.screenshots}
                  maxFiles={10}
                  placeholder="Upload game screenshots"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <p className="text-sm text-slate-500">
                Background image displayed in the games hero carousel
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Hero Background Image</Label>
                <ImageUpload
                  value={heroBackgroundImage}
                  onChange={(key) => setHeroBackgroundImage(key || "")}
                  folder={WASABI_FOLDERS.games}
                  placeholder="Upload hero background image"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trailer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="trailer_url">Trailer URL</Label>
                <Input
                  id="trailer_url"
                  type="url"
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-sm text-slate-500">
                  YouTube or Vimeo video URL for the game trailer
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Links Tab */}
        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store & Web Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="play_store_url">Play Store URL</Label>
                <Input
                  id="play_store_url"
                  type="url"
                  value={playStoreUrl}
                  onChange={(e) => setPlayStoreUrl(e.target.value)}
                  placeholder="https://play.google.com/store/apps/details?id=..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="app_store_url">App Store URL</Label>
                <Input
                  id="app_store_url"
                  type="url"
                  value={appStoreUrl}
                  onChange={(e) => setAppStoreUrl(e.target.value)}
                  placeholder="https://apps.apple.com/app/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="web_url">Web URL</Label>
                <Input
                  id="web_url"
                  type="url"
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  placeholder="https://game.example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status & Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="status">Development Status *</Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as typeof status)}
                  >
                    <SelectTrigger className={cn(fieldErrors.status && "border-red-500")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_development">
                        In Development
                      </SelectItem>
                      <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      <SelectItem value="released">Released</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError error={fieldErrors.status} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="release_date">Release Date</Label>
                  <Input
                    id="release_date"
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <Label>Published</Label>
                  <p className="text-sm text-slate-500">
                    Make this game visible on the public site
                  </p>
                </div>
                <Switch
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Featured</Label>
                  <p className="text-sm text-slate-500">
                    Show this game in featured sections
                  </p>
                </div>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accent_color">Accent Color</Label>
                <div className="flex gap-3 items-center">
                  <div
                    className="w-10 h-10 rounded-md border border-slate-300 shadow-sm shrink-0"
                    style={{ backgroundColor: accentColor }}
                    title={accentColor}
                  />
                  <Input
                    id="accent_color"
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    placeholder="#3B82F6"
                    className="flex-1 font-mono"
                  />
                  <input
                    type="color"
                    value={
                      accentColor.startsWith("#") ? accentColor : "#3B82F6"
                    }
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 p-0 border-0 cursor-pointer rounded-md"
                    title="Pick a color"
                  />
                </div>
                <p className="text-sm text-slate-500">
                  Enter a hex color code (e.g., #FF5722) or use the color picker
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/games")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : game ? (
            "Update Game"
          ) : (
            "Create Game"
          )}
        </Button>
      </div>
    </form>
  );
}
