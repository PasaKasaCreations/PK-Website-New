import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logos/pasakasalogo.webp"
                alt="Pasakasa Creations"
                width={48}
                height={48}
                className="rounded-xl shadow-lg"
              />
              <span className="text-xl font-bold text-slate-900">
                Pasakasa Creations
              </span>
            </Link>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              Admin Portal
            </h1>
            <p className="text-lg text-slate-600 max-w-md">
              Manage your courses, games, job postings, and inquiries all in one place.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Secure Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            Building Games, Shaping Developers
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logos/pasakasalogo.webp"
                alt="Pasakasa Creations"
                width={40}
                height={40}
                className="rounded-xl shadow-lg"
              />
              <span className="text-lg font-bold text-slate-900">
                Pasakasa Creations
              </span>
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            }
          >
            <LoginForm />
          </Suspense>

          <p className="mt-8 text-center text-sm text-slate-400">
            Protected area. Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
