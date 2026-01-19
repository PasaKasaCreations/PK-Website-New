import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadResume } from "@/lib/wasabi/actions";
import { z } from "zod";
import { ResumeSubmission } from "@/types/resume.interface";

const ResumeSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(100),
  role_looking_for: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(100),
  cover_letter: z.string().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract text fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role_looking_for = formData.get("role_looking_for") as string;
    const cover_letter = formData.get("cover_letter") as string | null;
    const file = formData.get("file") as File | null;

    // Validate text fields
    const validatedData = ResumeSubmissionSchema.parse({
      name,
      email,
      role_looking_for,
      cover_letter: cover_letter || undefined,
    });

    // Validate file
    if (!file) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    // Upload resume to Wasabi S3
    const uploadFormData = new FormData();
    uploadFormData.set("file", file);
    const uploadResult = await uploadResume(uploadFormData);

    if (!uploadResult.success || !uploadResult.key) {
      return NextResponse.json(
        { error: uploadResult.error || "Failed to upload resume" },
        { status: 500 }
      );
    }

    // Store submission in database
    // Note: Table type will be available after running migration and regenerating database types
    const supabase: { from: (table: string) => ReturnType<ReturnType<typeof createClient>["from"]> } = createClient();
    const insertData = {
      name: validatedData.name,
      email: validatedData.email,
      role_looking_for: validatedData.role_looking_for,
      cover_letter: validatedData.cover_letter || null,
      resume_key: uploadResult.key,
      status: "pending",
    };

    const { error } = await supabase
      .from("resume_submissions")
      .insert([insertData]);

    if (error) {
      console.error("Error creating resume submission:", error);
      return NextResponse.json(
        { error: "Failed to submit resume. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for submitting your resume! We will review it and get back to you if there is a suitable opportunity.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
