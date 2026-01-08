"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin } from "lucide-react";
import { Job } from "@/types/job.interface";

interface JobContactProps {
  contact: Job["contact"];
}

export function JobContact({ contact }: JobContactProps) {
  if (!contact) return null;

  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Contact</h3>

        {/* Contact Photo - Circular */}
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={contact.photo} alt={contact.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-blue-500/20 text-2xl font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-4">
          <h4 className="font-bold text-base">{contact.name}</h4>
          <p className="text-sm text-muted-foreground">{contact.title}</p>
        </div>

        {/* Email */}
        <div className="space-y-3">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="break-all">{contact.email}</span>
          </a>

          {/* LinkedIn */}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Linkedin className="h-4 w-4 flex-shrink-0" />
              <span>Follow on LinkedIn</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
