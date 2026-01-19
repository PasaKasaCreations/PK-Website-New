import { NextRequest, NextResponse } from "next/server";
import { uploadImage, uploadMultipleImages } from "@/lib/wasabi/actions";
import { WASABI_FOLDERS, WasabiFolder } from "@/lib/wasabi/client";
import { getAdminUser } from "@/lib/supabase/admin-client";

export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    const adminUser = await getAdminUser();
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const folder = formData.get("folder") as WasabiFolder;
    const multiple = formData.get("multiple") === "true";

    // Validate folder
    if (!folder || !Object.values(WASABI_FOLDERS).includes(folder)) {
      return NextResponse.json(
        { error: "Invalid folder specified" },
        { status: 400 }
      );
    }

    if (multiple) {
      const result = await uploadMultipleImages(formData, folder);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ keys: result.keys });
    } else {
      const result = await uploadImage(formData, folder);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ key: result.key });
    }
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
