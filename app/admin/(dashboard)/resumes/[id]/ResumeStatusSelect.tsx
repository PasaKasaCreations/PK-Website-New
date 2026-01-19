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
import { updateResumeStatus } from "@/lib/admin/actions/resumes";
import { ResumeSubmissionStatus } from "@/types/resume.interface";

interface ResumeStatusSelectProps {
  id: string;
  currentStatus: ResumeSubmissionStatus;
}

export function ResumeStatusSelect({
  id,
  currentStatus,
}: ResumeStatusSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (status: ResumeSubmissionStatus) => {
    startTransition(async () => {
      await updateResumeStatus(id, status);
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
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="reviewed">Reviewed</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}
