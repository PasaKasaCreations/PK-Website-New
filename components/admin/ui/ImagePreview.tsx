"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImagePreview({
  value,
  onChange,
  label,
  placeholder = "Enter image URL...",
}: ImagePreviewProps) {
  const [error, setError] = useState(false);

  const handleChange = (newValue: string) => {
    setError(false);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <div className="relative mt-2">
          {error ? (
            <div className="flex items-center justify-center h-32 bg-slate-100 rounded-lg border border-dashed border-slate-300">
              <div className="text-center text-slate-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm">Failed to load image</span>
              </div>
            </div>
          ) : (
            <div className="relative h-32 bg-slate-100 rounded-lg overflow-hidden">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-contain"
                onError={() => setError(true)}
                unoptimized
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ImageListPreviewProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
}

export function ImageListPreview({
  value,
  onChange,
  label,
  placeholder = "Enter image URL...",
}: ImageListPreviewProps) {
  const [inputValue, setInputValue] = useState("");

  const addImage = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImage();
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-2 text-sm bg-slate-100 rounded-md hover:bg-slate-200"
        >
          Add
        </button>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative h-24 bg-slate-100 rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
