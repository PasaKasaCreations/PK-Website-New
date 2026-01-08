"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Sparkles,
  CheckCircle2,
  Target,
  Gift,
  ArrowLeft,
  Mail,
  ArrowRight,
  Building2,
  User,
  Linkedin,
} from "lucide-react";
import { formatEmploymentType } from "@/lib/utils/index";
import { Job } from "@/types/job.interface";


interface JobDetailClientProps {
  job: Job;
}

export function JobDetailClient({ job }: JobDetailClientProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-background border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all positions
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-blue-100 dark:from-orange-900/30 dark:to-blue-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                {job.department}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Briefcase className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    {formatEmploymentType(job.employment_type)}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    {job.location}
                  </span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <DollarSign className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {job.salary}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About the Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                <div className="relative p-8 rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-white dark:bg-slate-900/50 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      About the Role
                    </h2>
                  </div>
                  <p className="text-slate-800 dark:text-slate-300 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </motion.div>

              {/* The Company */}
              {job.company && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                  <div className="relative p-8 rounded-2xl border-2 border-orange-100 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 bg-white dark:bg-slate-900/50 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        About {job.company.name}
                      </h2>
                    </div>
                    <p className="text-slate-800 dark:text-slate-300 leading-relaxed">
                      {job.company.description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                <div className="relative p-8 rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-white dark:bg-slate-900/50 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      What You'll Do
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-slate-800 dark:text-slate-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                <div className="relative p-8 rounded-2xl border-2 border-orange-100 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 bg-white dark:bg-slate-900/50 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      What We're Looking For
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {job.requirements.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="text-slate-800 dark:text-slate-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                  <div className="relative p-8 rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-white dark:bg-slate-900/50 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Gift className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        What You'll Get
                      </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {job.benefits.map((item: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-800 dark:text-slate-300">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-24 space-y-6">
                {/* Apply Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

                  <div className="relative p-6 rounded-2xl border-2 border-orange-100 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-700 bg-white dark:bg-slate-900/50 space-y-6 transition-all duration-300 hover:shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 flex items-center justify-center">
                          <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Employment Type
                          </p>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {formatEmploymentType(job.employment_type)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Location
                          </p>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {job.location}
                          </p>
                        </div>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Salary Range
                            </p>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {job.salary}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <p className="text-xs text-center text-slate-500">
                      We typically respond within 5 business days
                    </p>
                  </div>
                </motion.div>

                {/* Contact Card */}
                {job.contact && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                    <div className="relative p-6 rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-900/50 transition-all duration-300 hover:shadow-xl overflow-hidden">
                      <div className="absolute top-0 left-6 right-6 h-0.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        Questions?
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {job.contact.name}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {job.contact.title}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <a
                          href={`mailto:${job.contact.email}`}
                          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          {job.contact.email}
                        </a>
                        {job.contact.linkedin && (
                          <a
                            href={job.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn Profile
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Line */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full"
        />
      </div>
    </div>
  );
}
