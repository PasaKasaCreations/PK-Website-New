"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  glow?: boolean;
}

export function CTAButton({
  href,
  children,
  variant = "default",
  size = "default",
  className,
  glow = false,
}: CTAButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(glow && "relative")}
    >
      {glow && (
        <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full animate-glow" />
      )}
      <Link href={href}>
        <Button
          variant={variant}
          size={size}
          className={cn("relative z-10", className)}
        >
          {children}
        </Button>
      </Link>
    </motion.div>
  );
}
