import { getImageSignedUrl, getMultipleSignedUrls } from "./actions";

/**
 * Check if a string is an S3 key (not a full URL)
 */
export function isS3Key(value: string): boolean {
  // S3 keys don't start with http:// or https://
  return !value.startsWith("http://") && !value.startsWith("https://");
}

/**
 * Get the display URL for an image (handles both S3 keys and external URLs)
 * Use this in server components for public pages
 * Default expiration: 3 hours (10800 seconds)
 */
export async function getImageUrl(
  keyOrUrl: string | null | undefined,
  expiresIn: number = 10800,
): Promise<string | null> {
  if (!keyOrUrl) return null;

  // If it's already a URL, return as-is
  if (!isS3Key(keyOrUrl)) {
    return keyOrUrl;
  }

  // It's an S3 key, get signed URL
  const result = await getImageSignedUrl(keyOrUrl, expiresIn);
  return result.success ? result.url || null : null;
}

/**
 * Get display URLs for multiple images
 * Use this in server components for public pages
 * Default expiration: 3 hours (10800 seconds)
 */
export async function getImageUrls(
  keysOrUrls: readonly (string | null | undefined)[],
  expiresIn: number = 10800,
): Promise<(string | null)[]> {
  if (!keysOrUrls || keysOrUrls.length === 0) return [];

  const results: (string | null)[] = [];
  const s3Keys: { index: number; key: string }[] = [];

  // Separate S3 keys from URLs
  keysOrUrls.forEach((item, index) => {
    if (!item) {
      results[index] = null;
    } else if (!isS3Key(item)) {
      results[index] = item;
    } else {
      s3Keys.push({ index, key: item });
      results[index] = null; // Placeholder
    }
  });

  // Fetch signed URLs for S3 keys
  if (s3Keys.length > 0) {
    const keys = s3Keys.map((k) => k.key);
    const urlResult = await getMultipleSignedUrls(keys, expiresIn);

    if (urlResult.success && urlResult.urls) {
      s3Keys.forEach(({ index, key }) => {
        results[index] = urlResult.urls![key] || null;
      });
    }
  }

  return results;
}

/**
 * React hook-friendly version for getting image URLs
 * This wraps the server action for client components
 */
export async function fetchSignedUrl(key: string): Promise<string | null> {
  if (!key) return null;
  if (!isS3Key(key)) return key;

  try {
    const response = await fetch("/api/signed-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.url || null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch multiple signed URLs from client
 */
export async function fetchSignedUrls(
  keys: string[],
): Promise<Record<string, string>> {
  if (!keys || keys.length === 0) return {};

  const s3Keys = keys.filter(isS3Key);
  const result: Record<string, string> = {};

  // Add non-S3 keys directly
  keys.forEach((key) => {
    if (!isS3Key(key)) {
      result[key] = key;
    }
  });

  if (s3Keys.length === 0) return result;

  try {
    const response = await fetch("/api/signed-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys: s3Keys }),
    });

    if (response.ok) {
      const data = await response.json();
      Object.assign(result, data.urls || {});
    }
  } catch {
    // Return partial results
  }

  return result;
}
