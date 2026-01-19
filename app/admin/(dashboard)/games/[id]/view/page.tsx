import { notFound } from "next/navigation";
import Link from "next/link";
import { getGame } from "@/lib/admin/actions/games";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DetailView,
  DetailSection,
  DetailField,
  DetailGrid,
  DetailImage,
  DetailImageGallery,
  DetailDate,
} from "@/components/admin/ui/DetailView";
import { ExternalLink } from "lucide-react";

interface ViewGamePageProps {
  params: Promise<{ id: string }>;
}

const statusColors: Record<string, string> = {
  in_development: "bg-yellow-100 text-yellow-800",
  coming_soon: "bg-blue-100 text-blue-800",
  released: "bg-green-100 text-green-800",
};

const statusLabels: Record<string, string> = {
  in_development: "In Development",
  coming_soon: "Coming Soon",
  released: "Released",
};

export default async function ViewGamePage({ params }: ViewGamePageProps) {
  const { id } = await params;

  let game;
  try {
    game = await getGame(id);
  } catch {
    notFound();
  }

  return (
    <DetailView
      title={game.name}
      subtitle={`/${game.slug}`}
      backHref="/admin/games"
      editHref={`/admin/games/${game.id}`}
      publicHref={game.is_published ? `/games` : undefined}
      status={{
        label: game.is_published ? "Published" : "Draft",
        variant: game.is_published ? "default" : "secondary",
      }}
      badges={[
        ...(game.featured ? [{ label: "Featured", className: "bg-yellow-100 text-yellow-800" }] : []),
        { label: statusLabels[game.status] || game.status, className: statusColors[game.status] || "" },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <DetailSection title="Basic Information">
            <DetailGrid columns={2}>
              <DetailField label="Name" value={game.name} />
              <DetailField label="Slug" value={game.slug} />
              <DetailField label="Tagline" value={game.tagline} />
              <DetailField label="Genre" value={game.genre} />
              <DetailField label="Category" value={game.category} />
              <DetailField label="Release Date">
                <DetailDate date={game.release_date} />
              </DetailField>
            </DetailGrid>
          </DetailSection>

          {/* Description */}
          <DetailSection title="Description">
            <div className="space-y-4">
              <DetailField label="Short Description" value={game.description} />
              <DetailField label="Long Description">
                {game.long_description ? (
                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                    {game.long_description}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">Not set</span>
                )}
              </DetailField>
            </div>
          </DetailSection>

          {/* Hero Stats */}
          <DetailSection title="Hero Stats">
            {game.hero_stats ? (
              <DetailGrid columns={2}>
                <DetailField label="Reviews" value={(game.hero_stats as { reviews?: string }).reviews || "Not set"} />
                <DetailField label="Rating" value={(game.hero_stats as { rating?: string }).rating || "Not set"} />
                <DetailField label="Downloads" value={(game.hero_stats as { downloads?: string }).downloads || "Not set"} />
                <DetailField label="Feature" value={(game.hero_stats as { feature?: string }).feature || "Not set"} />
              </DetailGrid>
            ) : (
              <span className="text-slate-400 italic">No hero stats configured</span>
            )}
          </DetailSection>

          {/* Store Links */}
          <DetailSection title="Store Links">
            <div className="space-y-3">
              {game.play_store_url ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Google Play Store</p>
                    <p className="text-xs text-slate-500 truncate max-w-md">{game.play_store_url}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={game.play_store_url} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-400">Play Store link not set</p>
                </div>
              )}

              {game.app_store_url ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Apple App Store</p>
                    <p className="text-xs text-slate-500 truncate max-w-md">{game.app_store_url}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={game.app_store_url} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-400">App Store link not set</p>
                </div>
              )}

              {game.web_url ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Web URL</p>
                    <p className="text-xs text-slate-500 truncate max-w-md">{game.web_url}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={game.web_url} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-400">Web URL not set</p>
                </div>
              )}

              {game.trailer_url ? (
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Trailer URL</p>
                    <p className="text-xs text-slate-500 truncate max-w-md">{game.trailer_url}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={game.trailer_url} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-400">Trailer URL not set</p>
                </div>
              )}
            </div>
          </DetailSection>

          {/* Screenshots */}
          <DetailSection title="Screenshots">
            <DetailImageGallery
              images={game.screenshots}
              emptyMessage="No screenshots uploaded"
            />
          </DetailSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <DetailSection title="Thumbnail">
            <DetailImage
              src={game.thumbnail_url}
              alt={game.name}
              className="aspect-square w-full"
            />
          </DetailSection>

          {/* Hero Background Image */}
          <DetailSection title="Hero Background">
            {game.hero_background_image ? (
              <DetailImage
                src={game.hero_background_image}
                alt={`${game.name} hero background`}
                className="aspect-video w-full"
              />
            ) : (
              <div className="aspect-video w-full bg-slate-100 rounded-lg flex items-center justify-center">
                <span className="text-slate-400 text-sm">No hero background set</span>
              </div>
            )}
          </DetailSection>

          {/* Status */}
          <DetailSection title="Game Status">
            <Badge className={statusColors[game.status] + " text-base px-4 py-2"}>
              {statusLabels[game.status] || game.status}
            </Badge>
          </DetailSection>

          {/* Visibility */}
          <DetailSection title="Visibility">
            <DetailGrid columns={2}>
              <DetailField label="Published" value={game.is_published} />
              <DetailField label="Featured" value={game.featured} />
            </DetailGrid>
          </DetailSection>

          {/* Appearance */}
          <DetailSection title="Appearance">
            <DetailField label="Accent Color">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-md border border-slate-200 shadow-sm"
                  style={{ backgroundColor: game.accent_color || "#3B82F6" }}
                />
                <span className="text-sm font-mono text-slate-600">
                  {game.accent_color || "#3B82F6"}
                </span>
              </div>
            </DetailField>
          </DetailSection>

          {/* Metadata */}
          <DetailSection title="Metadata">
            <div className="space-y-4 text-sm">
              <DetailField label="Created">
                <DetailDate date={game.created_at} showTime />
              </DetailField>
              <DetailField label="Last Updated">
                <DetailDate date={game.updated_at} showTime />
              </DetailField>
            </div>
          </DetailSection>
        </div>
      </div>
    </DetailView>
  );
}
