"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { cn } from "@/lib/utils/index";

interface AdminLayoutProps {
  user: User;
  children: React.ReactNode;
}

export function AdminLayout({ user, children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AdminSidebar
          collapsed={false}
          onToggle={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out min-h-screen",
          sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}
      >
        <AdminHeader
          user={user}
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        <main className="p-4 lg:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
