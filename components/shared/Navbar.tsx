"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constants";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: ROUTES.HOME },
  { label: "About", href: ROUTES.ABOUT },
  { label: "Courses", href: ROUTES.COURSES },
  { label: "Games", href: ROUTES.GAMES },
  { label: "Careers", href: ROUTES.CAREERS },
  { label: "Contact", href: ROUTES.CONTACT },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-2">
            <Image
              src="/logos/pk_long_Logo.webp"
              alt="Pasakasa Creations"
              width={180}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4">
              <Link href={ROUTES.COURSES}>
                <Button size="sm" className="font-medium">
                  Join Classes
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-md hover:bg-accent transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href={ROUTES.COURSES}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full font-medium">Join Classes</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
