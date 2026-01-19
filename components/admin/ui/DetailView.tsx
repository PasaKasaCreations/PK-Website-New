"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Pencil, ExternalLink, Calendar, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/index";

interface DetailViewProps {
  title: string;
  subtitle?: string;
  backHref: string;
  editHref?: string;
  publicHref?: string;
  status?: {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
  badges?: Array<{
    label: string;
    className?: string;
  }>;
  children: ReactNode;
}

export function DetailView({
  title,
  subtitle,
  backHref,
  editHref,
  publicHref,
  status,
  badges,
  children,
}: DetailViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to list
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {status && (
              <Badge variant={status.variant}>{status.label}</Badge>
            )}
            {badges?.map((badge, i) => (
              <Badge key={i} className={badge.className}>
                {badge.label}
              </Badge>
            ))}
          </div>
          {subtitle && (
            <p className="text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {publicHref && (
            <Button variant="outline" size="sm" asChild>
              <Link href={publicHref} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Public Page
              </Link>
            </Button>
          )}
          {editHref && (
            <Button size="sm" asChild>
              <Link href={editHref}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

interface DetailSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function DetailSection({ title, children, className }: DetailSectionProps) {
  return (
    <Card className={cn("border-2 border-slate-100", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface DetailFieldProps {
  label: string;
  value?: string | number | boolean | null;
  children?: ReactNode;
  className?: string;
}

export function DetailField({ label, value, children, className }: DetailFieldProps) {
  const displayValue = () => {
    if (children) return children;
    if (value === null || value === undefined || value === "") {
      return <span className="text-slate-400 italic">Not set</span>;
    }
    if (typeof value === "boolean") {
      return value ? (
        <Badge variant="default">Yes</Badge>
      ) : (
        <Badge variant="secondary">No</Badge>
      );
    }
    return <span className="text-slate-900">{String(value)}</span>;
  };

  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="text-slate-900">{displayValue()}</div>
    </div>
  );
}

interface DetailGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function DetailGrid({ children, columns = 2 }: DetailGridProps) {
  const colsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", colsClass[columns])}>
      {children}
    </div>
  );
}

interface DetailImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

// Check if a value is an S3 key (not a URL)
function isS3Key(value: string): boolean {
  return !value.startsWith("http://") && !value.startsWith("https://");
}

export function DetailImage({ src, alt, className }: DetailImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSignedUrl() {
      if (!src) {
        setImageUrl(null);
        return;
      }

      // If it's already a URL, use it directly
      if (!isS3Key(src)) {
        setImageUrl(src);
        return;
      }

      // Fetch signed URL for S3 key
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: src }),
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.url);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSignedUrl();
  }, [src]);

  if (!src) {
    return (
      <div className={cn(
        "bg-slate-100 rounded-lg flex items-center justify-center text-slate-400",
        className
      )}>
        No image
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn(
        "bg-slate-100 rounded-lg flex items-center justify-center text-slate-400",
        className
      )}>
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={cn(
        "bg-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2",
        className
      )}>
        <ImageIcon className="w-8 h-8" />
        <span className="text-sm">Failed to load</span>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-lg overflow-hidden bg-slate-100", className)}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

interface S3ImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export function S3Image({ src, alt, className }: S3ImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      if (!src) {
        setImageUrl(null);
        return;
      }

      if (!isS3Key(src)) {
        setImageUrl(src);
        return;
      }

      try {
        const response = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: src }),
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.url);
        }
      } catch {
        // Keep null
      }
    }

    fetchSignedUrl();
  }, [src]);

  if (!imageUrl) {
    return null;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
    />
  );
}

interface DetailImageGalleryProps {
  images?: string[] | null;
  emptyMessage?: string;
}

export function DetailImageGallery({ images, emptyMessage = "No images" }: DetailImageGalleryProps) {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSignedUrls() {
      if (!images || images.length === 0) {
        setImageUrls({});
        return;
      }

      // Filter S3 keys from URLs
      const s3Keys = images.filter(isS3Key);
      const urlImages = images.filter((img) => !isS3Key(img));

      // Add URL images directly
      const urls: Record<string, string> = {};
      urlImages.forEach((url) => {
        urls[url] = url;
      });

      // Fetch signed URLs for S3 keys
      if (s3Keys.length > 0) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/signed-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keys: s3Keys }),
          });

          if (response.ok) {
            const data = await response.json();
            Object.assign(urls, data.urls || {});
          }
        } catch {
          // Keep partial results
        } finally {
          setIsLoading(false);
        }
      }

      setImageUrls(urls);
    }

    fetchSignedUrls();
  }, [images]);

  if (!images || images.length === 0) {
    return <span className="text-slate-400 italic">{emptyMessage}</span>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((key, i) => {
        const url = imageUrls[key];
        return (
          <div key={i} className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden">
            {url ? (
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface DetailListProps {
  items?: string[] | null;
  emptyMessage?: string;
}

export function DetailList({ items, emptyMessage = "No items" }: DetailListProps) {
  if (!items || items.length === 0) {
    return <span className="text-slate-400 italic">{emptyMessage}</span>;
  }

  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

interface DetailDateProps {
  date?: string | null;
  showTime?: boolean;
}

export function DetailDate({ date, showTime = false }: DetailDateProps) {
  if (!date) {
    return <span className="text-slate-400 italic">Not set</span>;
  }

  const d = new Date(date);
  const formatted = showTime
    ? d.toLocaleString()
    : d.toLocaleDateString();

  return (
    <span className="inline-flex items-center gap-1.5 text-slate-700">
      <Calendar className="w-4 h-4 text-slate-400" />
      {formatted}
    </span>
  );
}
