"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const supabase = createBrowserSupabaseClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Check if user's email is in admin_users table
    const userEmail = data.user?.email;
    if (!userEmail) {
      await supabase.auth.signOut();
      setError("Unable to verify email. Please try again.");
      setLoading(false);
      return;
    }

    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", userEmail)
      .eq("is_active", true)
      .single();

    if (adminError || !adminUser) {
      await supabase.auth.signOut();
      setError("Access denied. Admin privileges required.");
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="text-slate-500">
          Enter your credentials to access the admin dashboard
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Authentication failed</p>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="admin@pasakasacreations.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              required
              disabled={loading}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
