"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trash2,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Smartphone,
  Facebook,
  ArrowRight,
} from "lucide-react";

interface AccountDeletionContentProps {
  gameName: string;
  gameSlug: string;
}

export function AccountDeletionContent({
  gameName,
}: AccountDeletionContentProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-red-50/50 dark:from-slate-900 dark:via-background dark:to-red-950/20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-64 h-64 bg-red-200/30 dark:bg-red-500/10 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-80 h-80 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-[80px]"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
              {gameName}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Account Deletion Guide
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              If you wish to permanently delete your {gameName} account and all
              associated data, this page explains the complete process.
            </p>
            <p className="text-sm text-red-500 dark:text-red-400 mt-4 font-medium">
              Once deleted, your account and data cannot be recovered.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Warning Card */}
            <section className="mb-12">
              <motion.div
                className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-3 text-lg">
                      What Happens When You Delete Your Account?
                    </h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>
                          All user data stored on our servers is permanently
                          deleted.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>
                          All Facebook Platform Data (ID, Name, Picture, Friends
                          List) is deleted.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Permissions previously granted to our app are revoked.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Your game progress, coins, statistics, and
                          achievements are removed.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold">
                          This action is irreversible.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Deletion Sections */}
            <div className="space-y-10">
              {/* Delete From App */}
              <DeletionSection
                title="Delete Your Account From the App"
                icon={<Smartphone className="h-6 w-6" />}
              >
                <div className="space-y-6">
                  <StepItem
                    step={1}
                    title="Sign in your Account from the app."
                  >
                    <p>
                      Open the {gameName} app and make sure you are logged into
                      the account you want to delete.
                    </p>
                  </StepItem>

                  <StepItem step={2} title="Go to account section.">
                    <p>
                      Navigate to your account settings or profile section
                      within the app.
                    </p>
                  </StepItem>

                  <StepItem step={3} title="Click the Delete Button.">
                    <p>
                      Look for the account deletion option and tap on the delete
                      button to proceed.
                    </p>
                  </StepItem>

                  <StepItem
                    step={4}
                    title="All saved records of the account will be deleted and can't be restored."
                  >
                    <p>
                      Once confirmed, all your game progress, statistics,
                      achievements, and account data will be permanently removed
                      from our servers.
                    </p>
                  </StepItem>
                </div>
              </DeletionSection>

              {/* Delete Through Facebook */}
              <DeletionSection
                title="Delete App Data Through Facebook (Optional)"
                icon={<Facebook className="h-6 w-6" />}
              >
                <p className="mb-4">
                  You can also remove data directly from your Facebook account:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                  <li>
                    Go to Facebook → <strong>Settings & Privacy</strong> →{" "}
                    <strong>Apps and Websites</strong>
                  </li>
                  <li>
                    Find <strong>{gameName}</strong>
                  </li>
                  <li>
                    Click <strong>Remove</strong>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  This will delete all Facebook Platform Data shared with our
                  game.
                </p>
              </DeletionSection>

              {/* Request via Email */}
              <DeletionSection
                title="Request Deletion via Email"
                icon={<Mail className="h-6 w-6" />}
              >
                <p className="mb-4">
                  If you prefer, you may request data deletion manually by
                  emailing us:
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 space-y-2">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:contact@pasakasacreations.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      contact@pasakasacreations.com
                    </a>
                  </p>
                  <p>
                    <strong>Subject:</strong> Facebook / Account Data Deletion
                    Request
                  </p>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Your request will be processed within 5 working business days.
                </p>
              </DeletionSection>

              {/* Deletion Timeline */}
              <DeletionSection
                title="Deletion Timeline"
                icon={<Clock className="h-6 w-6" />}
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                      In-app deletion
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Immediate (data removed within 24–72 hours)
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                      Email request
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Processed within 5 working days
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                      Facebook removal
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Immediate effect on Facebook&apos;s side
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-slate-600 dark:text-slate-300">
                  If you have any questions about data deletion or privacy, feel
                  free to contact us anytime.
                </p>
              </DeletionSection>

              {/* Related Documents */}
              <DeletionSection title="Related Documents" isLast={true}>
                <p className="mb-6">
                  For more information about your rights and our data practices,
                  please review:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link
                    href="/privacy-policy"
                    className="group p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                      Privacy Policy
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Learn how we protect your data
                    </p>
                  </Link>
                  <Link
                    href="/terms-of-service"
                    className="group p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-600 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                      Terms and Conditions
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Understand our service terms
                    </p>
                  </Link>
                  <Link
                    href="/eula"
                    className="group p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                      End User License Agreement
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Review software usage terms
                    </p>
                  </Link>
                </div>
              </DeletionSection>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DeletionSection({
  title,
  icon,
  children,
  isLast = false,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <motion.section
      className={`${
        !isLast ? "pb-10 border-b border-slate-200 dark:border-slate-800" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

function StepItem({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
        {step}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
          Step {step}: {title}
        </h4>
        <div className="text-slate-600 dark:text-slate-400">{children}</div>
      </div>
    </div>
  );
}
