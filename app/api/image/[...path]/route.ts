import { NextRequest, NextResponse } from "next/server";
import { getImageSignedUrl } from "@/lib/wasabi/actions";
import { WASABI_FOLDERS, type WasabiFolder } from "@/lib/wasabi/client";

// Allowed folders for security - only serve images from known folders
const ALLOWED_FOLDERS = new Set(Object.values(WASABI_FOLDERS));

/**
 * Image Proxy API Route
 *
 * This endpoint serves images from Wasabi S3 with stable URLs that work with Vercel's image caching.
 * Instead of exposing signed URLs (which expire and break caching), this proxy:
 * 1. Accepts stable S3 key paths (e.g., /api/image/games/abc123.jpg)
 * 2. Fetches from Wasabi using fresh signed URL server-side
 * 3. Returns image with long cache headers
 *
 * Usage: /api/image/{folder}/{filename}
 * Example: /api/image/games/Kzq2nM9pL1xA.jpg
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;

    // Validate path exists and has at least folder + filename
    if (!path || path.length < 2) {
      return NextResponse.json(
        { error: "Invalid path. Expected: /api/image/{folder}/{filename}" },
        { status: 400 },
      );
    }

    const folder = path[0] as WasabiFolder;
    const filename = path.slice(1).join("/"); // Handle nested paths

    // Security: Only allow known folders
    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    // Reconstruct S3 key
    const s3Key = `${folder}/${filename}`;

    // Generate a fresh signed URL with short expiry (just for this fetch)
    const result = await getImageSignedUrl(s3Key, 60);

    if (!result.success || !result.url) {
      return NextResponse.json(
        { error: result.error || "Failed to generate signed URL" },
        { status: 404 },
      );
    }

    // Fetch image from Wasabi
    const imageResponse = await fetch(result.url);

    if (!imageResponse.ok) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Get image data and content type
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";

    // Return image with long cache headers
    // The URL is stable (based on S3 key), so we can cache aggressively
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
