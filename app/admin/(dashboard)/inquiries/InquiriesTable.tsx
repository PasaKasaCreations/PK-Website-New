"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateInquiryStatus } from "@/lib/admin/actions/inquiries";
import type { Tables, Enums } from "@/types/database.types";

type InquiryWithCourse = Tables<"inquiries"> & {
  courses: { title: string } | null;
};

interface InquiriesTableProps {
  inquiries: InquiryWithCourse[];
}

const statusLabels: Record<Enums<"inquiry_status">, string> = {
  new: "New",
  in_progress: "In Progress",
  resolved: "Resolved",
};

const statusColors: Record<Enums<"inquiry_status">, string> = {
  new: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
};

const typeLabels: Record<Enums<"inquiry_type">, string> = {
  general: "General",
  course: "Course",
  career: "Career",
  partnership: "Partnership",
};

function StatusSelect({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: Enums<"inquiry_status">;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (status: Enums<"inquiry_status">) => {
    startTransition(async () => {
      await updateInquiryStatus(id, status);
      router.refresh();
    });
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const columns: Column<InquiryWithCourse>[] = [
    {
      key: "name",
      header: "From",
      cell: (inquiry) => (
        <div>
          <p className="font-medium">{inquiry.name}</p>
          <a
            href={`mailto:${inquiry.email}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {inquiry.email}
          </a>
        </div>
      ),
    },
    {
      key: "inquiry_type",
      header: "Type",
      cell: (inquiry) => (
        <Badge variant="outline">{typeLabels[inquiry.inquiry_type]}</Badge>
      ),
    },
    {
      key: "message",
      header: "Message",
      cell: (inquiry) => (
        <p className="text-sm text-slate-600 max-w-xs truncate">
          {inquiry.message}
        </p>
      ),
    },
    {
      key: "courses",
      header: "Related Course",
      cell: (inquiry) =>
        inquiry.courses ? (
          <span className="text-sm">{inquiry.courses.title}</span>
        ) : (
          <span className="text-sm text-slate-400">-</span>
        ),
    },
    {
      key: "created_at",
      header: "Received",
      cell: (inquiry) => (
        <span className="text-sm">
          {new Date(inquiry.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (inquiry) => (
        <StatusSelect id={inquiry.id} currentStatus={inquiry.status} />
      ),
    },
  ];

  return (
    <DataTable
      data={inquiries}
      columns={columns}
      searchKey="name"
      searchPlaceholder="Search inquiries..."
      viewHref={(inquiry) => `/admin/inquiries/${inquiry.id}`}
      emptyMessage="No inquiries found."
    />
  );
}
