"use client";

import { useState, useCallback, useEffect } from "react";
import { Upload, X, Loader2, ImageIcon, AlertCircle, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WasabiFolder } from "@/lib/wasabi/client";

interface MultiImageUploadProps {
  value?: string[]; // Array of S3 keys or URLs
  onChange: (keys: string[]) => void;
  folder: WasabiFolder;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

interface ImagePreviewItem {
  key: string;
  url: string;
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

export function MultiImageUpload({
  value = [],
  onChange,
  folder,
  maxFiles = 10,
  className,
  disabled = false,
  placeholder = "Click to upload or drag and drop images",
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<ImagePreviewItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch signed URLs when value changes
  useEffect(() => {
    async function fetchSignedUrls() {
      if (!value || value.length === 0) {
        setPreviews([]);
        return;
      }

      // Separate URLs from S3 keys
      const s3Keys = value.filter(isS3Key);
      const urls = value.filter((v) => !isS3Key(v));

      // Initialize previews with URLs
      const initialPreviews: ImagePreviewItem[] = value.map((key) => ({
        key,
        url: isS3Key(key) ? "" : key,
      }));

      if (s3Keys.length === 0) {
        setPreviews(initialPreviews);
        return;
      }

      try {
        const response = await fetch("/api/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keys: s3Keys }),
        });

        if (response.ok) {
          const data = await response.json();
          const previewItems: ImagePreviewItem[] = value.map((key) => ({
            key,
            url: isS3Key(key) ? (data.urls[key] || "") : key,
          }));
          setPreviews(previewItems);
        } else {
          setPreviews(initialPreviews);
        }
      } catch (err) {
        console.error("Failed to fetch signed URLs:", err);
        setPreviews(initialPreviews);
      }
    }

    fetchSignedUrls();
  }, [value]);

  const handleUpload = useCallback(
    async (files: FileList | File[]) => {
      setError(null);

      const fileArray = Array.from(files);
      const remainingSlots = maxFiles - value.length;

      if (fileArray.length > remainingSlots) {
        setError(`Can only upload ${remainingSlots} more image(s). Maximum: ${maxFiles}`);
        return;
      }

      setIsUploading(true);

      try {
        const newKeys: string[] = [];

        for (const file of fileArray) {
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

          newKeys.push(data.key);

          // Add local preview immediately
          const localPreview = URL.createObjectURL(file);
          setPreviews((prev) => [...prev, { key: data.key, url: localPreview }]);
        }

        onChange([...value, ...newKeys]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange, value, maxFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleUpload(files);
      }
      // Reset input
      e.target.value = "";
    },
    [handleUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length > 0) {
        handleUpload(files);
      } else {
        setError("Please drop image files");
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

  const handleRemove = useCallback(
    async (keyToRemove: string) => {
      // Delete from S3 if it's an S3 key
      if (isS3Key(keyToRemove)) {
        await deleteS3Image(keyToRemove);
      }

      onChange(value.filter((key) => key !== keyToRemove));
      setPreviews((prev) => prev.filter((p) => p.key !== keyToRemove));
    },
    [onChange, value]
  );

  const moveImage = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= value.length) return;

      const newValue = [...value];
      const [removed] = newValue.splice(fromIndex, 1);
      newValue.splice(toIndex, 0, removed);
      onChange(newValue);
    },
    [onChange, value]
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-slate-200 hover:border-slate-300",
          disabled && "opacity-50 cursor-not-allowed",
          value.length >= maxFiles && "pointer-events-none opacity-50"
        )}
        onDrop={!disabled && value.length < maxFiles ? handleDrop : undefined}
        onDragOver={!disabled && value.length < maxFiles ? handleDragOver : undefined}
        onDragLeave={!disabled && value.length < maxFiles ? handleDragLeave : undefined}
      >
        <label
          className={cn(
            "flex flex-col items-center justify-center py-8 cursor-pointer",
            (disabled || value.length >= maxFiles) && "cursor-not-allowed"
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || isUploading || value.length >= maxFiles}
          />
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
              <p className="text-sm text-slate-500">Uploading...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm text-slate-600 text-center">{placeholder}</p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, WebP, GIF up to 10MB each ({value.length}/{maxFiles})
              </p>
            </>
          )}
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Image previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div
              key={preview.key}
              className="relative group aspect-video rounded-lg overflow-hidden border border-slate-200"
            >
              {preview.url ? (
                <img
                  src={preview.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
              )}

              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    {index > 0 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => moveImage(index, index - 1)}
                      >
                        <GripVertical className="w-4 h-4 rotate-90" />
                      </Button>
                    )}
                    {index < previews.length - 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => moveImage(index, index + 1)}
                      >
                        <GripVertical className="w-4 h-4 -rotate-90" />
                      </Button>
                    )}
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="h-8"
                    onClick={() => handleRemove(preview.key)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Index badge */}
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
