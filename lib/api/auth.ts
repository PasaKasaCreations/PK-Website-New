import { NextRequest, NextResponse } from "next/server";

/**
 * API Authentication Middleware
 *
 * SECURITY:
 * - Simple API key authentication for admin endpoints
 * - API key stored in environment variable
 * - Should be replaced with proper OAuth/JWT when scaling
 *
 * Usage:
 * ```ts
 * import { withAuth } from "@/lib/api/auth";
 *
 * export const GET = withAuth(async (req) => {
 *   // Your protected logic here
 * });
 * ```
 */

export type AuthenticatedHandler = (
  req: NextRequest,
  context?: any
) => Promise<NextResponse>;

/**
 * Wraps an API route handler with authentication
 */
export function withAuth(handler: AuthenticatedHandler): AuthenticatedHandler {
  return async (req, context) => {
    // 1. Check if API key is configured
    const validApiKey = process.env.ADMIN_API_KEY;

    if (!validApiKey) {
      console.error("ADMIN_API_KEY is not configured");
      return NextResponse.json(
        {
          error: "Server configuration error",
          message: "API authentication is not properly configured",
        },
        { status: 500 }
      );
    }

    // 2. Get API key from request header
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "API key is required. Add 'x-api-key' header.",
        },
        { status: 401 }
      );
    }

    // 3. Validate API key
    if (apiKey !== validApiKey) {
      return NextResponse.json(
        {
          error: "Forbidden",
          message: "Invalid API key",
        },
        { status: 403 }
      );
    }

    // 4. API key is valid, proceed to handler
    return handler(req, context);
  };
}

/**
 * Helper to parse JSON body safely
 */
export async function parseBody<T = any>(req: NextRequest): Promise<T | null> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

/**
 * Standard error response
 */
export function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    {
      error: true,
      message,
    },
    { status }
  );
}

/**
 * Standard success response
 */
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}
