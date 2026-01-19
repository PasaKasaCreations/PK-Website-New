"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/index";

interface AdminLoaderProps {
  className?: string;
  text?: string;
  fullPage?: boolean;
}

export function AdminLoader({
  className,
  text = "Loading...",
  fullPage = false,
}: AdminLoaderProps) {
  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="text-sm text-slate-500 animate-pulse">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 text-slate-500", className)}>
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-10 w-32 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      {/* Search skeleton */}
      <div className="h-10 w-full max-w-sm bg-slate-100 rounded-lg animate-pulse" />

      {/* Table skeleton */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Table header */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex gap-4">
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Table rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="px-6 py-4 border-b border-slate-100 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-40 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-4 w-64 bg-slate-100 rounded animate-pulse" />
      </div>

      {/* Form fields */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
            <div className="h-10 w-full bg-slate-50 rounded-lg animate-pulse" />
          </div>
        ))}

        <div className="flex gap-3 pt-4">
          <div className="h-10 w-24 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-10 w-24 bg-slate-100 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
                <div className="h-8 w-16 bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="h-12 w-12 bg-slate-100 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <div className="h-6 w-32 bg-slate-100 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="h-12 w-full bg-slate-50 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
