"use server";

import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { wasabiClient, WASABI_BUCKET, WasabiFolder } from "./client";
import { nanoid } from "nanoid";

// Allowed image types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

// Allowed resume/document types
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface UploadResult {
  success: boolean;
  key?: string;
  error?: string;
}

interface SignedUrlResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload an image to Wasabi S3
 */
export async function uploadImage(
  formData: FormData,
  folder: WasabiFolder,
): Promise<UploadResult> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    // Generate unique filename
    const extension = file.name.split(".").pop() || "jpg";
    const uniqueId = nanoid(12);
    const key = `${folder}/${uniqueId}.${extension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Wasabi
    const command = new PutObjectCommand({
      Bucket: WASABI_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await wasabiClient.send(command);

    return { success: true, key };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Upload multiple images to Wasabi S3
 */
export async function uploadMultipleImages(
  formData: FormData,
  folder: WasabiFolder,
): Promise<{ success: boolean; keys?: string[]; error?: string }> {
  try {
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return { success: false, error: "No files provided" };
    }

    const uploadPromises = files.map(async (file) => {
      const singleFormData = new FormData();
      singleFormData.set("file", file);
      return uploadImage(singleFormData, folder);
    });

    const results = await Promise.all(uploadPromises);

    const failedUploads = results.filter((r) => !r.success);
    if (failedUploads.length > 0) {
      return {
        success: false,
        error: `Failed to upload ${failedUploads.length} file(s)`,
      };
    }

    const keys = results
      .map((r) => r.key)
      .filter((key): key is string => key !== undefined);

    return { success: true, keys };
  } catch (error) {
    console.error("Multiple upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Generate a signed URL for accessing an image
 * Default expiration: 3 hours (10800 seconds)
 */
export async function getImageSignedUrl(
  key: string,
  expiresIn: number = 10800,
): Promise<SignedUrlResult> {
  try {
    if (!key) {
      return { success: false, error: "No key provided" };
    }

    // Strip leading slashes to prevent double-slash in URL
    const normalizedKey = key.replace(/^\/+/, "");

    const command = new GetObjectCommand({
      Bucket: WASABI_BUCKET,
      Key: normalizedKey,
    });

    const url = await getSignedUrl(wasabiClient, command, { expiresIn });

    return { success: true, url };
  } catch (error) {
    console.error("Signed URL error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate URL",
    };
  }
}

/**
 * Generate signed URLs for multiple images
 * Default expiration: 3 hours (10800 seconds)
 */
export async function getMultipleSignedUrls(
  keys: string[],
  expiresIn: number = 10800,
): Promise<{
  success: boolean;
  urls?: Record<string, string>;
  error?: string;
}> {
  try {
    if (!keys || keys.length === 0) {
      return { success: false, error: "No keys provided" };
    }

    const urlPromises = keys.map(async (key) => {
      const result = await getImageSignedUrl(key, expiresIn);
      return { key, url: result.url };
    });

    const results = await Promise.all(urlPromises);

    const urls: Record<string, string> = {};
    for (const result of results) {
      if (result.url) {
        urls[result.key] = result.url;
      }
    }

    return { success: true, urls };
  } catch (error) {
    console.error("Multiple signed URLs error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate URLs",
    };
  }
}

/**
 * Delete an image from Wasabi S3
 */
export async function deleteImage(
  key: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!key) {
      return { success: false, error: "No key provided" };
    }

    // Strip leading slashes for consistency
    const normalizedKey = key.replace(/^\/+/, "");

    const command = new DeleteObjectCommand({
      Bucket: WASABI_BUCKET,
      Key: normalizedKey,
    });

    await wasabiClient.send(command);

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Delete multiple images from Wasabi S3
 */
export async function deleteMultipleImages(
  keys: string[],
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!keys || keys.length === 0) {
      return { success: false, error: "No keys provided" };
    }

    const deletePromises = keys.map((key) => deleteImage(key));
    await Promise.all(deletePromises);

    return { success: true };
  } catch (error) {
    console.error("Multiple delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Upload a resume document to Wasabi S3
 * Supports PDF, DOC, and DOCX files
 */
export async function uploadResume(formData: FormData): Promise<UploadResult> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type
    if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
      return {
        success: false,
        error: "Invalid file type. Please upload a PDF, DOC, or DOCX file.",
      };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      };
    }

    // Generate unique filename with original extension
    const extension = file.name.split(".").pop() || "pdf";
    const uniqueId = nanoid(12);
    const key = `resumes/${uniqueId}.${extension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Wasabi
    const command = new PutObjectCommand({
      Bucket: WASABI_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await wasabiClient.send(command);

    return { success: true, key };
  } catch (error) {
    console.error("Resume upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
