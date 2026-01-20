import { ZodSchema } from "zod";

export type FieldErrors = Record<string, string>;

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: FieldErrors;
}

/**
 * Validate form data against a Zod schema
 * Returns field-level errors for display in the form
 */
export function validateFormData<T>(
  schema: ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: FieldErrors = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    // Only keep the first error for each field
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return { success: false, errors };
}

/**
 * Parse a server error that might contain ZodError details
 * Returns field-level errors if it's a validation error, or a general error message
 */
export function parseServerError(error: unknown): {
  message: string | null;
  fieldErrors: FieldErrors | null;
} {
  if (!(error instanceof Error)) {
    return { message: "An unexpected error occurred", fieldErrors: null };
  }

  // Skip NEXT_REDIRECT errors (these are expected when redirect() is called)
  if (error.message.includes("NEXT_REDIRECT")) {
    return { message: null, fieldErrors: null };
  }

  // Try to parse as ZodError JSON
  const message = error.message;
  if (message.startsWith("[") && message.includes('"path"')) {
    try {
      const zodErrors = JSON.parse(message) as Array<{
        path: (string | number)[];
        message: string;
      }>;
      const fieldErrors: FieldErrors = {};
      zodErrors.forEach((err) => {
        const path = err.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = err.message;
        }
      });
      return { message: null, fieldErrors };
    } catch {
      // Not valid JSON, fall through to return as message
    }
  }

  return { message: error.message, fieldErrors: null };
}

/**
 * Get error class for input styling
 */
export function getInputErrorClass(fieldName: string, errors: FieldErrors): string {
  return errors[fieldName] ? "border-red-500 focus:ring-red-500" : "";
}
