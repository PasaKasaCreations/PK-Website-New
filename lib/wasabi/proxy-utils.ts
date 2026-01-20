import { isS3Key } from "./utils";

/**
 * ============================================================================
 * PROXY URL UTILITIES FOR S3 IMAGES
 * ============================================================================
 *
 * IMPORTANT: Use these functions for ALL image URL generation from S3 keys
 * on public-facing pages. This creates stable proxy URLs that work correctly
 * with Vercel's image caching.
 *
 * WHY: Signed URLs expire (1-3 hours) and change on every generation.
 * Vercel caches images by URL, so changing URLs = cache misses + broken images.
 * The proxy provides stable URLs that never change for the same S3 key.
 *
 * WHEN TO USE:
 * - Public pages (games, courses, homepage, etc.)
 * - Any place where images need to be cached by Vercel/browser
 *
 * WHEN NOT TO USE:
 * - Admin panel (uses direct signed URLs with unoptimized flag)
 * - File downloads that need direct S3 access
 *
 * Example:
 *   import { getProxyImageUrl } from "@/lib/wasabi/proxy-utils";
 *   const imageUrl = getProxyImageUrl("games/abc123.jpg");
 *   // Returns: "/api/image/games/abc123.jpg"
 *
 * ============================================================================
 */

/**
 * Convert an S3 key to a stable proxy URL for image display.
 *
 * Use this function for ALL S3 images on public-facing pages.
 * The proxy URL is stable and works with Vercel's image caching.
 *
 * @param keyOrUrl - S3 key (e.g., "games/abc123.jpg") or existing URL
 * @returns Proxy URL (e.g., "/api/image/games/abc123.jpg") or the original URL if not an S3 key
 */
export function getProxyImageUrl(keyOrUrl: string | null | undefined): string | null {
  if (!keyOrUrl) return null;

  // If it's already a URL, return as-is
  if (!isS3Key(keyOrUrl)) {
    return keyOrUrl;
  }

  // Strip leading slashes for consistency
  const normalizedKey = keyOrUrl.replace(/^\/+/, "");

  // Return proxy URL
  return `/api/image/${normalizedKey}`;
}

/**
 * Convert multiple S3 keys to stable proxy URLs.
 *
 * Use this function for arrays of S3 images (e.g., screenshots, galleries).
 *
 * @param keysOrUrls - Array of S3 keys or URLs
 * @returns Array of proxy URLs (same order as input)
 */
export function getProxyImageUrls(
  keysOrUrls: readonly (string | null | undefined)[]
): (string | null)[] {
  if (!keysOrUrls || keysOrUrls.length === 0) return [];

  return keysOrUrls.map((item) => getProxyImageUrl(item));
}
