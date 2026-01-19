"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/shared/ContactForm";
import {
  Mail,
  MapPin,
  Phone,
  Zap,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import type { SiteSettings } from "@/types/settings.interface";

const faqs = [
  {
    question: "How do I join a live class?",
    answer:
      "Head over to our Courses page to see upcoming batches, then reach out to reserve your spot.",
  },
  {
    question: "Are the classes beginner-friendly?",
    answer:
      "Absolutely! Whether you're just starting out or have some experience, we've got you covered.",
  },
  {
    question: "Where are the classes held?",
    answer:
      "We teach in-person at our location in Kathmandu with small class sizes.",
  },
  {
    question: "Can I download your games for free?",
    answer:
      "Yes! Teen Patti Friends and Callbreak Multiplayer are free on Play Store & App Store.",
  },
];

function FloatingContactCard({
  icon: Icon,
  label,
  value,
  description,
  href,
  gradient,
  rotate,
  index,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  description: string;
  href: string | null;
  gradient: string;
  rotate: number;
  index: number;
}) {
  const content = (
    <motion.div
      className={`relative bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-2xl border border-white/20 cursor-pointer h-full`}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        y: -8,
        transition: { duration: 0.25 },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-sm">{label}</p>
            <p className="font-bold text-white text-base sm:text-lg break-all leading-tight mt-0.5">
              {value}
            </p>
            <p className="text-white/60 text-sm mt-1">{description}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-white/60" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return href ? (
    <a href={href} className="block h-full">
      {content}
    </a>
  ) : (
    content
  );
}

function FAQCard({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border-2 transition-all duration-300 ${
          isHovered
            ? "border-orange-400 dark:border-orange-500 shadow-xl shadow-orange-500/10"
            : "border-slate-200 dark:border-slate-700"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isHovered
                ? "bg-gradient-to-br from-orange-500 to-blue-500"
                : "bg-slate-100 dark:bg-slate-700"
            }`}
          >
            <MessageCircle
              className={`h-5 w-5 transition-colors ${
                isHovered ? "text-white" : "text-slate-500 dark:text-slate-400"
              }`}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
              {question}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {answer}
            </p>
          </div>
          <ChevronRight
            className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
              isHovered
                ? "text-orange-500 translate-x-1"
                : "text-slate-300 dark:text-slate-600"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface ContactContentProps {
  settings: SiteSettings;
}

export function ContactContent({ settings }: ContactContentProps) {
  // Build contact methods dynamically from settings
  const contactMethods = [
    {
      icon: Mail,
      label: "Email Us",
      value: settings.email,
      description: "Best for detailed inquiries",
      href: `mailto:${settings.email}`,
      gradient: "from-blue-500 to-blue-600",
      rotate: -3,
    },
    {
      icon: Phone,
      label: "Call Us",
      value: settings.contact_number,
      description: "Mon-Fri, 10am-6pm NPT",
      href: `tel:${settings.contact_number.replace(/[\s\-()]/g, "")}`,
      gradient: "from-orange-500 to-orange-600",
      rotate: 2,
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: settings.location,
      description: "By appointment only",
      href: settings.location_map_url,
      gradient: "from-blue-600 via-purple-500 to-orange-500",
      rotate: -1,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Contact Methods Section */}
      <div className="relative py-16 bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-800/50">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          {/* Floating dots */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 2 === 0 ? "bg-blue-400/40" : "bg-orange-400/40"
              }`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <FloatingContactCard
                key={method.label}
                {...method}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form Section with Glassmorphism */}
      <div className="relative py-20 bg-gradient-to-b from-slate-100/50 to-white dark:from-slate-800/50 dark:to-background">
        {/* Decorative border */}
        <motion.div
          className="absolute top-10 left-1/4 w-32 h-32 border-2 border-dashed border-blue-300/30 dark:border-blue-700/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-24 h-24 border-2 border-dashed border-orange-300/30 dark:border-orange-700/30 rounded-xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              {/* Glow effect behind form */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 rounded-3xl blur-2xl" />
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Quick Answers
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Things you might be wondering
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQCard key={faq.question} {...faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
