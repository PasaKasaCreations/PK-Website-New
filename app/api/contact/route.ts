import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/email";
import { z } from "zod";

const ContactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(100),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must not exceed 20 digits"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = ContactMessageSchema.parse(body);

    const supabase = createClient();

    // Insert contact message into database
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
      },
    ]);

    if (error) {
      console.error("Error creating contact message:", error);
      return NextResponse.json(
        { error: "Failed to submit contact message. Please try again." },
        { status: 500 }
      );
    }

    // Send email notification to admin (non-blocking)
    // We don't want email failures to affect the user's submission
    sendContactNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
    }).catch((emailError) => {
      // Log email errors but don't fail the request
      console.error("Failed to send contact notification email:", emailError);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We will get back to you soon.",
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
