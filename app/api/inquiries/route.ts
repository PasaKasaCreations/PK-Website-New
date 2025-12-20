import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const InquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(100),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(20).optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  inquiry_type: z.enum(['general', 'course', 'career', 'partnership']),
  course_id: z.string().uuid().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = InquirySchema.parse(body);

    const supabase = createClient();

    // Insert inquiry into database
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
          inquiry_type: validatedData.inquiry_type,
          course_id: validatedData.course_id,
          status: 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating inquiry:', error);
      return NextResponse.json(
        { error: 'Failed to submit inquiry. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry! We will get back to you soon.',
        data
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
