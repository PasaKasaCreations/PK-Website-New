"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateInquiryStatus } from "@/lib/admin/actions/inquiries";
import type { Enums } from "@/types/database.types";

interface InquiryStatusSelectProps {
  id: string;
  currentStatus: Enums<"inquiry_status">;
}

export function InquiryStatusSelect({
  id,
  currentStatus,
}: InquiryStatusSelectProps) {
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
      <SelectTrigger className="w-full">
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
