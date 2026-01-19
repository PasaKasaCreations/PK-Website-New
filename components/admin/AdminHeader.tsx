"use client";

import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User as UserIcon, Menu } from "lucide-react";
import { signOut } from "@/lib/admin/actions/auth";

interface AdminHeaderProps {
  user: User;
  onMenuClick?: () => void;
}

// Map routes to page titles
const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/courses": "Courses",
  "/admin/courses/new": "Add Course",
  "/admin/games": "Games",
  "/admin/games/new": "Add Game",
  "/admin/job-postings": "Job Postings",
  "/admin/job-postings/new": "Add Job Posting",
  "/admin/inquiries": "Inquiries",
  "/admin/contact-messages": "Contact Messages",
};

function getPageTitle(pathname: string): string {
  // Check for exact match first
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }

  // Check for edit pages (e.g., /admin/courses/[id])
  if (pathname.match(/^\/admin\/courses\/[^/]+$/)) {
    return "Edit Course";
  }
  if (pathname.match(/^\/admin\/games\/[^/]+$/)) {
    return "Edit Game";
  }
  if (pathname.match(/^\/admin\/job-postings\/[^/]+$/)) {
    return "Edit Job Posting";
  }
  if (pathname.match(/^\/admin\/inquiries\/[^/]+$/)) {
    return "Inquiry Details";
  }

  return "Admin Portal";
}

export function AdminHeader({ user, onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const initials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : "AD";

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Manage your website content
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 hover:bg-slate-100 px-2"
            >
              <Avatar className="w-8 h-8 border-2 border-slate-200">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900">
                  {user.email?.split("@")[0]}
                </p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-slate-900">Account</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="text-slate-400">
              <UserIcon className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
