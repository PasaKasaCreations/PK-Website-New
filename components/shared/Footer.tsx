import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/constants/routes.constants";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Smartphone,
  Database,
  Palette,
  Gamepad2,
  GraduationCap,
} from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Web Development", href: ROUTES.CONTACT, icon: Globe },
    { label: "Mobile Apps", href: ROUTES.CONTACT, icon: Smartphone },
    { label: "CRM Software", href: ROUTES.CONTACT, icon: Database },
    { label: "UI/UX Design", href: ROUTES.CONTACT, icon: Palette },
    { label: "Game Development", href: ROUTES.GAMES, icon: Gamepad2 },
    { label: "Live Training", href: ROUTES.COURSES, icon: GraduationCap },
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
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socialLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    color: "hover:text-blue-400",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    color: "hover:text-blue-600",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    color: "hover:text-gray-600",
  },
  {
    name: "Facebook",
    icon: Mail,
    href: "https://facebook.com",
    color: "hover:text-blue-500",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@pasakasacreations.com",
    href: "mailto:contact@pasakasacreations.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977-986-2751805",
    href: "tel:+9779840000000",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kathmandu, Nepal",
    href: null,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Image
              src="/logos/pk_long_Logo.webp"
              alt="Pasakasa Creations"
              width={200}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
              Your trusted software development partner. Building web apps,
              mobile apps, CRM systems, games, and training the next generation
              of developers in Nepal.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        index % 2 === 0
                          ? "bg-blue-100 dark:bg-blue-900/20"
                          : "bg-orange-100 dark:bg-orange-900/20"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          index % 2 === 0
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-orange-600 dark:text-orange-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        index % 2 === 0
                          ? "border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
                          : "border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-600 hover:border-orange-600 hover:text-white"
                      }`}
                      title={social.name}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold mb-4 text-base">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.Services.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                    >
                      <Icon className="h-3.5 w-3.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4 text-base">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.Company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Links */}
          <div>
            <h4 className="font-bold mb-4 text-base">Learning</h4>
            <ul className="space-y-2.5">
              {footerLinks.Learning.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold mb-4 text-base">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>
                &copy; {new Date().getFullYear()} Pasakasa Creations. All rights
                reserved.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                Made with ❤️ in Nepal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
