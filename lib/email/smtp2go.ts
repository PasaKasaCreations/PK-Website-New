/**
 * SMTP2GO Email Service
 *
 * Uses SMTP2GO HTTP API to send transactional emails with templates.
 * API Documentation: https://apidoc.smtp2go.com/documentation/#/POST%20/email/send
 *
 * Required Environment Variables:
 * - SMTP2GO_API_KEY: Your SMTP2GO API key
 * - SMTP2GO_SENDER_EMAIL: The verified sender email address
 * - NOTIFICATION_EMAIL: Email address to receive contact form notifications
 */

const SMTP2GO_API_URL = "https://api.smtp2go.com/v3/email/send";

// Template ID for contact form notifications
const CONTACT_TEMPLATE_ID = "6168728";

export interface EmailOptions {
  to: string | string[];
  subject: string;
  htmlBody?: string;
  textBody?: string;
  senderName?: string;
  templateId?: string;
  templateData?: Record<string, string>;
}

export interface SMTP2GOResponse {
  request_id: string;
  data: {
    succeeded: number;
    failed: number;
    failures: string[];
    email_id: string;
  };
}

export interface EmailResult {
  success: boolean;
  message: string;
  requestId?: string;
  emailId?: string;
}

/**
 * Validates that all required environment variables are set
 */
function validateEnvVars(): { valid: boolean; missing: string[] } {
  const required = [
    "SMTP2GO_API_KEY",
    "SMTP2GO_SENDER_EMAIL",
    "NOTIFICATION_EMAIL",
  ];
  const missing = required.filter((key) => !process.env[key]);

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Sends an email using SMTP2GO HTTP API (supports both template and inline content)
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const envCheck = validateEnvVars();

  if (!envCheck.valid) {
    console.error(
      `SMTP2GO: Missing environment variables: ${envCheck.missing.join(", ")}`
    );
    return {
      success: false,
      message: `Email configuration error: Missing ${envCheck.missing.join(
        ", "
      )}`,
    };
  }

  const apiKey = process.env.SMTP2GO_API_KEY!;
  const senderEmail = process.env.SMTP2GO_SENDER_EMAIL!;
  const senderName = options.senderName || "Pasakasa Creations";

  const recipients = Array.isArray(options.to) ? options.to : [options.to];

  // Build request body based on whether using template or inline content
  const requestBody: Record<string, unknown> = {
    api_key: apiKey,
    to: recipients,
    sender: `${senderName} <${senderEmail}>`,
    subject: options.subject,
  };

  if (options.templateId) {
    // Use template-based email
    requestBody.template_id = options.templateId;
    if (options.templateData) {
      requestBody.template_data = options.templateData;
    }
  } else {
    // Use inline HTML/text content
    if (options.htmlBody) {
      requestBody.html_body = options.htmlBody;
    }
    if (options.textBody) {
      requestBody.text_body = options.textBody;
    }
  }

  try {
    const response = await fetch(SMTP2GO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SMTP2GO API error:", response.status, errorText);
      return {
        success: false,
        message: `Email service error: ${response.status}`,
      };
    }

    const result: SMTP2GOResponse = await response.json();

    if (result.data.failed > 0) {
      console.error("SMTP2GO delivery failures:", result.data.failures);
      return {
        success: false,
        message: `Email delivery failed: ${result.data.failures.join(", ")}`,
        requestId: result.request_id,
      };
    }

    return {
      success: true,
      message: "Email sent successfully",
      requestId: result.request_id,
      emailId: result.data.email_id,
    };
  } catch (error) {
    console.error("SMTP2GO send error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error sending email",
    };
  }
}

/**
 * Formats date for email template
 */
function formatSubmissionDate(): string {
  return new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats time for email template
 */
function formatSubmissionTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Sends a contact form notification email to the admin using SMTP2GO template
 *
 * Template Variables:
 * - Name: Contact person's name
 * - Email: Contact person's email
 * - Phone: Contact person's phone number
 * - Message: The message content
 * - submission_date: Date of submission (e.g., "January 15, 2026")
 * - submission_time: Time of submission (e.g., "2:30 PM")
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<EmailResult> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    console.error("NOTIFICATION_EMAIL environment variable is not set");
    return {
      success: false,
      message: "Notification email not configured",
    };
  }

  // Prepare template variables matching the SMTP2GO template
  const templateData: Record<string, string> = {
    Name: data.name,
    Email: data.email,
    Phone: data.phone,
    Message: data.message,
    submission_date: formatSubmissionDate(),
    submission_time: formatSubmissionTime(),
  };

  return sendEmail({
    to: notificationEmail,
    subject: `New Contact Form Submission from ${data.name}`,
    templateId: CONTACT_TEMPLATE_ID,
    templateData,
    senderName: "Pasakasa Creations Website",
  });
}
