"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/constants/routes.constants";
import {
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Web Development", href: ROUTES.CONTACT },
    { label: "Mobile Apps", href: ROUTES.CONTACT },
    { label: "CRM Software", href: ROUTES.CONTACT },
    { label: "UI/UX Design", href: ROUTES.CONTACT },
    { label: "Game Development", href: ROUTES.GAMES },
    { label: "Live Training", href: ROUTES.COURSES },
  ],
  Company: [
    { label: "About Us", href: ROUTES.ABOUT },
    { label: "Careers", href: ROUTES.CAREERS },
    { label: "Contact", href: ROUTES.CONTACT },
    { label: "Our Games", href: ROUTES.GAMES },
  ],
  Learning: [
    { label: "All Courses", href: ROUTES.COURSES },
    { label: "Unity Development", href: ROUTES.COURSES },
    { label: "Web Development", href: ROUTES.COURSES },
    { label: "Become an Instructor", href: ROUTES.CONTACT },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "EULA", href: "/eula" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/pasakasa-creations/", color: "blue" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/pasakasacreations", color: "orange" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/pasaKasaCreations/", color: "blue" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@pasakasacreations", color: "orange" },
];

const contactInfo = [
  { icon: Mail, value: "contact@pasakasacreations.com", href: "mailto:contact@pasakasacreations.com", color: "blue" },
  { icon: Phone, value: "+977-986-2751805", href: "tel:+9779862751805", color: "orange" },
  { icon: MapPin, value: "Kathmandu, Nepal", href: null, color: "blue" },
];

const colorStyles = {
  blue: {
    iconGradient: "from-blue-500 to-blue-600",
    iconShadow: "shadow-blue-500/25",
    glow: "from-blue-500 to-blue-600",
    border: "border-blue-200 dark:border-blue-800",
    hoverBorder: "hover:border-blue-400 dark:hover:border-blue-600",
    hoverBg: "hover:bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    hoverText: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  orange: {
    iconGradient: "from-orange-500 to-orange-600",
    iconShadow: "shadow-orange-500/25",
    glow: "from-orange-500 to-orange-600",
    border: "border-orange-200 dark:border-orange-800",
    hoverBorder: "hover:border-orange-400 dark:hover:border-orange-600",
    hoverBg: "hover:bg-orange-500",
    text: "text-orange-600 dark:text-orange-400",
    hoverText: "hover:text-orange-600 dark:hover:text-orange-400",
  },
};

export function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <Link href="/" className="inline-block group">
              <Image
                src="/logos/pk_long_Logo.webp"
                alt="Pasakasa Creations"
                width={180}
                height={45}
                className="h-10 w-auto mb-4 transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-5 leading-relaxed">
              Your trusted software development partner in Nepal. Building web
              apps, mobile apps, games, and training developers.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 mb-5">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const colors =
                  colorStyles[info.color as keyof typeof colorStyles];
                return (
                  <div key={index} className="group flex items-center gap-2.5">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${colors.iconGradient} shadow ${colors.iconShadow} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className={`text-sm text-slate-600 dark:text-slate-400 ${colors.hoverText} transition-colors`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {info.value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const colors =
                  colorStyles[social.color as keyof typeof colorStyles];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    title={social.name}
                  >
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} rounded-lg opacity-0 group-hover:opacity-40 blur transition-all duration-300`}
                    />
                    <div
                      className={`relative h-9 w-9 rounded-lg border ${colors.border} ${colors.hoverBorder} flex items-center justify-center transition-all duration-300 ${colors.hoverBg} group-hover:border-transparent group-hover:scale-110 bg-white dark:bg-slate-900`}
                    >
                      <Icon
                        className={`h-4 w-4 ${colors.text} group-hover:text-white transition-colors`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-sm text-slate-900 dark:text-white">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.Services.map((link, index) => {
                const isBlue = index % 2 === 0;
                const colors = isBlue ? colorStyles.blue : colorStyles.orange;
                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className={`group text-sm text-slate-600 dark:text-slate-400 ${colors.hoverText} transition-all inline-flex items-center gap-1`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h4 className="font-bold mb-4 text-sm text-slate-900 dark:text-white">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.Company.map((link, index) => {
                const isBlue = index % 2 === 0;
                const colors = isBlue ? colorStyles.blue : colorStyles.orange;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group text-sm text-slate-600 dark:text-slate-400 ${colors.hoverText} transition-all inline-flex items-center gap-1`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Learning Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <h4 className="font-bold mb-4 text-sm text-slate-900 dark:text-white">
              Learning
            </h4>
            <ul className="space-y-2">
              {footerLinks.Learning.map((link, index) => {
                const isBlue = index % 2 === 0;
                const colors = isBlue ? colorStyles.blue : colorStyles.orange;
                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className={`group text-sm text-slate-600 dark:text-slate-400 ${colors.hoverText} transition-all inline-flex items-center gap-1`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="hidden lg:block"
          >
            <h4 className="font-bold mb-4 text-sm text-slate-900 dark:text-white">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.Legal.map((link, index) => {
                const isBlue = index % 2 === 0;
                const colors = isBlue ? colorStyles.blue : colorStyles.orange;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group text-sm text-slate-600 dark:text-slate-400 ${colors.hoverText} transition-all inline-flex items-center gap-1`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-6"
        />

        {/* Bottom Bar */}
        <div className="flex justify-center items-center text-sm text-slate-500 dark:text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Pasakasa Creations. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
