"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/index";
import {
  LayoutDashboard,
  GraduationCap,
  Gamepad2,
  Briefcase,
  MessageSquare,
  Mail,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: GraduationCap,
  },
  {
    title: "Games",
    href: "/admin/games",
    icon: Gamepad2,
  },
  {
    title: "Job Postings",
    href: "/admin/job-postings",
    icon: Briefcase,
  },
  {
    title: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    title: "Contact Messages",
    href: "/admin/contact-messages",
    icon: Mail,
  },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({
  collapsed = false,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out shadow-sm",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logos/pasakasalogo.webp"
              alt="Pasakasa"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold text-slate-900">Admin Portal</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin" className="mx-auto">
            <Image
              src="/logos/pasakasalogo.webp"
              alt="Pasakasa"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors",
            collapsed && "hidden lg:flex absolute -right-3 top-5 bg-white border border-slate-200 shadow-sm rounded-full w-6 h-6"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
            Management
          </p>
        )}
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
              title={collapsed ? item.title : undefined}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-slate-400"
                )}
              />
              {!collapsed && (
                <span className="text-sm">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100">
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200",
            collapsed && "justify-center"
          )}
          title={collapsed ? "View Website" : undefined}
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-sm">View Website</span>}
        </Link>
        {!collapsed && (
          <p className="mt-3 px-3 text-xs text-slate-400 text-center">
            Pasakasa Creations
          </p>
        )}
      </div>
    </aside>
  );
}
