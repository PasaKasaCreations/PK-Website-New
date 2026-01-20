import { NextRequest, NextResponse } from "next/server";
import { getImageSignedUrl, getMultipleSignedUrls } from "@/lib/wasabi/actions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, keys, expiresIn = 3600 } = body;

    // Handle multiple keys
    if (keys && Array.isArray(keys)) {
      const result = await getMultipleSignedUrls(keys, expiresIn);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ urls: result.urls });
    }

    // Handle single key
    if (key) {
      const result = await getImageSignedUrl(key, expiresIn);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ url: result.url });
    }

    return NextResponse.json({ error: "No key provided" }, { status: 400 });
  } catch (error) {
    console.error("Signed URL API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
