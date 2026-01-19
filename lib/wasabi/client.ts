import { S3Client } from "@aws-sdk/client-s3";

// Wasabi S3-compatible client
// Wasabi regions: us-east-1, us-east-2, us-central-1, us-west-1, eu-central-1, eu-central-2, eu-west-1, eu-west-2, ap-northeast-1, ap-northeast-2, ap-southeast-1, ap-southeast-2

const region = process.env.WASABI_REGION || "ap-south-1";

// Wasabi endpoint format: s3.{region}.wasabisys.com
const endpoint = `https://s3.${region}.wasabisys.com`;

export const wasabiClient = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true, // Required for Wasabi
});

export const WASABI_BUCKET = process.env.WASABI_BUCKET_NAME || "";

// Folder structure in bucket
export const WASABI_FOLDERS = {
  courses: "courses",
  games: "games",
  thumbnails: "thumbnails",
  screenshots: "screenshots",
  testimonials: "testimonials",
  resumes: "resumes",
} as const;

export type WasabiFolder = (typeof WASABI_FOLDERS)[keyof typeof WASABI_FOLDERS];
