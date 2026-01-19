"use client";

import { useState } from "react";
import { DataTable, Column } from "@/components/admin/tables/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, MapPin } from "lucide-react";
import type { Tables } from "@/types/database.types";

interface ContactMessagesTableProps {
  messages: Tables<"contact_messages">[];
}

export function ContactMessagesTable({ messages }: ContactMessagesTableProps) {
  const [selectedMessage, setSelectedMessage] = useState<Tables<"contact_messages"> | null>(null);

  const columns: Column<Tables<"contact_messages">>[] = [
    {
      key: "name",
      header: "From",
      cell: (message) => (
        <div>
          <p className="font-medium">{message.name}</p>
          <a
            href={`mailto:${message.email}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {message.email}
          </a>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (message) => (
        <span className="text-sm">{message.phone || "-"}</span>
      ),
    },
    {
      key: "message",
      header: "Message",
      cell: (message) => (
        <p className="text-sm text-slate-600 max-w-xs truncate">
          {message.message}
        </p>
      ),
    },
    {
      key: "created_at",
      header: "Received",
      cell: (message) => (
        <span className="text-sm">
          {new Date(message.created_at).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={messages}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search messages..."
        onView={(message) => setSelectedMessage(message)}
        emptyMessage="No contact messages found."
      />

      {/* Message Detail Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedMessage.phone && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    Phone
                  </h4>
                  <p className="font-medium">{selectedMessage.phone}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  Message
                </h4>
                <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg">
                  {selectedMessage.message}
                </p>
              </div>

              {selectedMessage.ip_address && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span>IP: {selectedMessage.ip_address}</span>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
                <Button asChild>
                  <a href={`mailto:${selectedMessage.email}`}>Reply via Email</a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
