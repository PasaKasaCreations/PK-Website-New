"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Upload, X, Loader2, ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WasabiFolder } from "@/lib/wasabi/client";

interface ImageUploadProps {
  value?: string; // S3 key or URL
  onChange: (key: string | null) => void;
  folder: WasabiFolder;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

// Check if a value is an S3 key (not a URL)
function isS3Key(value: string): boolean {
  return !value.startsWith("http://") && !value.startsWith("https://");
}

// Delete an image from S3
async function deleteS3Image(key: string): Promise<void> {
  if (!key || !isS3Key(key)) return;

  try {
    await fetch("/api/delete-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
  } catch (err) {
    console.error("Failed to delete image:", err);
  }
}

export function ImageUpload({
  value,
  onChange,
  folder,
  className,
  disabled = false,
  placeholder = "Click to upload or drag and drop",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Keep track of the previous value to delete old images
  const previousValueRef = useRef<string | undefined>(value);

  // Fetch signed URL when value changes
  useEffect(() => {
    async function fetchSignedUrl() {
      if (!value) {
        setPreview(null);
        return;
      }

      // If it's already a URL, use it directly
      if (!isS3Key(value)) {
        setPreview(value);
        return;
      }

      try {
        const response = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: value }),
        });

        if (response.ok) {
          const data = await response.json();
          setPreview(data.url);
        }
      } catch (err) {
        console.error("Failed to fetch signed URL:", err);
      }
    }

    fetchSignedUrl();
  }, [value]);

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);
      setIsUploading(true);

      // Store the old key to delete after successful upload
      const oldKey = value;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        // Delete old image if it was an S3 key
        if (oldKey && isS3Key(oldKey)) {
          await deleteS3Image(oldKey);
        }

        onChange(data.key);

        // Create local preview immediately
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange, value]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
      // Reset input value to allow re-selecting the same file
      e.target.value = "";
    },
    [handleUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleUpload(file);
      } else {
        setError("Please drop an image file");
      }
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleRemove = useCallback(async () => {
    // Delete the image from S3 if it's an S3 key
    if (value && isS3Key(value)) {
      await deleteS3Image(value);
    }

    onChange(null);
    setPreview(null);
    setError(null);
  }, [onChange, value]);

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-slate-200 hover:border-slate-300",
          disabled && "opacity-50 cursor-not-allowed",
          !preview && "min-h-[160px]"
        )}
        onDrop={!disabled ? handleDrop : undefined}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
      >
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={disabled || isUploading}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="pointer-events-none"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Replace
                  </Button>
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            )}
          </div>
        ) : (
          <label
            className={cn(
              "flex flex-col items-center justify-center h-full min-h-[160px] cursor-pointer p-6",
              disabled && "cursor-not-allowed"
            )}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled || isUploading}
            />
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
                <p className="text-sm text-slate-500">Uploading...</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 text-center">
                  {placeholder}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PNG, JPG, WebP, GIF up to 10MB
                </p>
              </>
            )}
          </label>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {value && (
        <p className="text-xs text-slate-400 truncate">Key: {value}</p>
      )}
    </div>
  );
}
