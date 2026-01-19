import { NextRequest, NextResponse } from "next/server";
import { deleteImage, deleteMultipleImages } from "@/lib/wasabi/actions";
import { getAdminUser } from "@/lib/supabase/admin-client";

export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    const adminUser = await getAdminUser();
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { key, keys } = body;

    // Handle multiple keys
    if (keys && Array.isArray(keys)) {
      // Filter out URLs (only delete S3 keys)
      const s3Keys = keys.filter(
        (k: string) => k && !k.startsWith("http://") && !k.startsWith("https://")
      );

      if (s3Keys.length === 0) {
        return NextResponse.json({ success: true, message: "No S3 keys to delete" });
      }

      const result = await deleteMultipleImages(s3Keys);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    // Handle single key
    if (key) {
      // Don't try to delete URLs
      if (key.startsWith("http://") || key.startsWith("https://")) {
        return NextResponse.json({ success: true, message: "URL ignored" });
      }

      const result = await deleteImage(key);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "No key provided" }, { status: 400 });
  } catch (error) {
    console.error("Delete image API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
