"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Mail,
  Trash2,
  Settings,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface PrivacyPolicyContentProps {
  gameName?: string;
  isGameSpecific?: boolean;
}

export function PrivacyPolicyContent({
  gameName,
  isGameSpecific = false,
}: PrivacyPolicyContentProps) {
  const title = isGameSpecific
    ? `${gameName} Privacy Policy`
    : "Privacy Policy";

  const description = isGameSpecific
    ? `Privacy Policy for ${gameName} by Pasakasa Creations`
    : "Your Privacy is Important to Us";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-blue-50/50 dark:from-slate-900 dark:via-background dark:to-blue-950/20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-[80px]"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-4 w-4 text-blue-500" />
              {isGameSpecific ? gameName : "Pasakasa Creations"}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {description}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Last Updated: 8 January, 2026
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
            {/* Introduction */}
            <section className="mb-12">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Pasakasa Creations Private Limited and its affiliates
                  (&quot;Pasakasa Creations&quot;, &quot;we&quot;,
                  &quot;us&quot;, or &quot;our&quot;) operate the Pasakasa
                  Creations website, games including Callbreak Friends and Teen
                  Patti Friends, and other related services (collectively, the
                  &quot;Services&quot;). We respect your privacy and are
                  committed to protecting your personal information in
                  accordance with applicable privacy laws and regulations.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                  This Privacy Policy describes how Pasakasa Creations Private
                  Limited (&quot;Pasakasa Creations&quot;) collects and uses
                  data through our games including Callbreak Friends and Teen
                  Patti Friends. We collect Facebook-related information such as
                  basic profile data and your Facebook friends list. This data
                  is used only to display which of your friends are also using
                  our games, enabling in-app social features. We do not use or
                  share this data for any other purpose.
                </p>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="mb-12">
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  whileHover={{ y: -4 }}
                >
                  <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Data Protection
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We use industry-standard security measures including
                    encryption and SSL.
                  </p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                  whileHover={{ y: -4 }}
                >
                  <Settings className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Your Control
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    You can delete your data anytime through the app or by
                    contacting us.
                  </p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  whileHover={{ y: -4 }}
                >
                  <AlertCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    No Data Selling
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We never sell, rent, or trade your personal information.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Policy Sections */}
            <div className="space-y-10">
              {/* Acceptance of Terms */}
              <PolicySection title="Acceptance of Terms">
                <p>
                  By visiting our website or using our Services, you agree to be
                  bound by these Terms of Service and our Privacy Policy. This
                  Privacy Policy may change at any time without notice, so
                  please review it periodically. If you do not agree, please do
                  not use our Services.
                </p>
              </PolicySection>

              {/* Definitions */}
              <PolicySection title="Definitions">
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Device:</strong> Any computer, mobile, or other
                    device used to access our Services.
                  </li>
                  <li>
                    <strong>Device Identifier:</strong> IP address or other
                    unique identifier for the Device.
                  </li>
                  <li>
                    <strong>Protected Information:</strong> Personal data that
                    can identify you, such as name, email, or phone number.
                  </li>
                  <li>
                    <strong>Promotion:</strong> Contests or other promotional
                    activities offered by us.
                  </li>
                </ul>
              </PolicySection>

              {/* Information We Collect */}
              <PolicySection title="Information We Collect">
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Information You Provide
                </h4>
                <p className="mb-4">
                  We may collect Protected Information when you create accounts,
                  fill forms, interact with our Services, or log in via social
                  media. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Name / Nickname</li>
                  <li>Email address</li>
                  <li>Country</li>
                  <li>Gender</li>
                  <li>Basic Facebook profile information</li>
                  <li>Your Facebook friends list</li>
                </ul>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Information Collected Automatically
                </h4>
                <p className="mb-4">
                  We collect Usage and Activity Information when you access our
                  Services, including browser type, IP address, geo-location,
                  pages visited, time spent, referral URLs, and Device
                  Identifiers. Cookies and similar technologies may be used to
                  enhance your experience.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Mobile Application Data
                </h4>
                <p className="mb-4">
                  When using our mobile apps, we may collect technical and
                  device information, such as device model, OS, language,
                  browser type, geolocation, and app usage patterns, to provide
                  updates, support, and improve functionality.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Third-Party Data
                </h4>
                <p>
                  We may supplement our data with information from third-party
                  sources, including social networks and content providers.
                  Information collected by third-party cookies or apps is not
                  governed by this Privacy Policy.
                </p>
              </PolicySection>

              {/* Facebook Login Data & Deletion */}
              <PolicySection
                title="Facebook Login Data & Deletion"
                highlight={true}
              >
                <p className="mb-4">
                  We use Facebook Login to allow you to access Teen Patti
                  Friends and Callbreak Friends. When you log in using Facebook,
                  we collect the following Facebook Platform Data (if permitted
                  by you):
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Your Facebook ID</li>
                  <li>Your profile name</li>
                  <li>Your profile picture</li>
                  <li>
                    Your friends list (only friends who also use the game)
                  </li>
                </ul>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Purpose of Use
                </h4>
                <p className="mb-6">
                  We use this data only to provide in-game social features such
                  as showing which of your Facebook friends also play the game.
                  We do not use Facebook data for advertising, nor do we sell or
                  share Facebook Platform Data with third parties except as
                  required to operate the game.
                </p>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Trash2 className="h-6 w-6 text-red-500" />
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      How to Delete Your Facebook Data
                    </h4>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium text-slate-800 dark:text-white mb-2">
                        1. Delete Facebook Data Through Your Facebook Account
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        You can remove Teen Patti Friends and Callbreak Friends
                        from your Facebook settings:
                      </p>
                      <ol className="list-decimal pl-6 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Open Facebook</li>
                        <li>Go to Settings & Privacy</li>
                        <li>Select Apps and Websites</li>
                        <li>Find Teen Patti Friends or Callbreak Friends</li>
                        <li>Click Remove App</li>
                      </ol>
                    </div>

                    <div>
                      <h5 className="font-medium text-slate-800 dark:text-white mb-2">
                        2. Delete Data Directly from the App (Recommended)
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Users can delete their account directly from the app.
                        When the in-app account is deleted, all account data and
                        Facebook Platform Data is permanently deleted.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium text-slate-800 dark:text-white mb-2">
                        3. Request Data Deletion Manually
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Email us at{" "}
                        <a
                          href="mailto:contact@pasakasacreations.com"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          contact@pasakasacreations.com
                        </a>{" "}
                        with subject &quot;Facebook Data Deletion Request&quot;.
                        Data will be deleted within 5 working days.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Deletion Guides */}
                <div className="mt-6">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-4">
                    Detailed Account Deletion Guides
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link
                      href="/games/teen-patti-friends/account-deletion"
                      className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-600 transition-colors"
                    >
                      <div>
                        <h5 className="font-medium text-slate-800 dark:text-white">
                          Teen Patti Friends
                        </h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Account deletion guide
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                    </Link>
                    <Link
                      href="/games/callbreak-friends/account-deletion"
                      className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                    >
                      <div>
                        <h5 className="font-medium text-slate-800 dark:text-white">
                          Callbreak Friends
                        </h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Account deletion guide
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  </div>
                </div>
              </PolicySection>

              {/* Use of Information */}
              <PolicySection title="Use of Information Collected">
                <p className="mb-4">
                  We use the information we collect to improve and personalize
                  your experience with our Services, monitor usage patterns, and
                  provide relevant updates, notifications, or service
                  announcements. Additionally, we may use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide requested services or information</li>
                  <li>Process transactions</li>
                  <li>Send newsletters, promotions, or special offers</li>
                  <li>Enable participation in contests or promotions</li>
                  <li>Communicate changes to Services or policies</li>
                  <li>Conduct internal analytics and business purposes</li>
                  <li>Serve targeted ads linked to anonymous cookie IDs</li>
                  <li>Send push or local notifications with your consent</li>
                </ul>
              </PolicySection>

              {/* Disclosure to Third Parties */}
              <PolicySection title="Disclosure of Information to Third Parties">
                <p className="mb-4">
                  We only share your information under specific circumstances
                  and never sell, rent, or trade it.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  With Your Consent
                </h4>
                <p className="mb-4">
                  If you opt to receive third-party offers, your information may
                  be shared with them. You should review their privacy policies,
                  as we are not responsible for them.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Service Providers
                </h4>
                <p className="mb-4">
                  We may share information with trusted third parties who
                  perform services for us, such as hosting, analytics, payment
                  processing, customer support, or technical maintenance.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Legal & Administrative Reasons
                </h4>
                <p>
                  We may disclose information to comply with laws, protect our
                  rights or property, prevent fraud, or ensure public safety.
                </p>
              </PolicySection>

              {/* Children */}
              <PolicySection title="Children Under the Age of 13">
                <p className="mb-4">
                  We do not knowingly collect or solicit personal information
                  from anyone under the age of 13. We do not knowingly allow
                  anyone under the age of 13 to register. If you are under 13,
                  please do not attempt to register for any of our Services.
                </p>
                <p>
                  If we learn that we may have unknowingly collected personal
                  information from a child under age 13 we will delete that
                  information as quickly as possible. If you believe that we
                  might have any information from or about a child under 13,
                  please contact us at{" "}
                  <a
                    href="mailto:contact@pasakasacreations.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    contact@pasakasacreations.com
                  </a>
                  .
                </p>
              </PolicySection>

              {/* Security */}
              <PolicySection title="Security">
                <p>
                  We implement industry-standard security measures, including
                  encryption, firewalls, and SSL, to protect your Protected and
                  Usage Information. While we strive to safeguard your data, no
                  system is completely secure. We cannot guarantee that
                  information transmitted to us over the Internet or wireless
                  networks will be entirely safe.
                </p>
              </PolicySection>

              {/* Grievance Officer */}
              <PolicySection title="Grievance Officer">
                <p className="mb-4">
                  Pasakasa Creations has hereby appointed a Customer Support
                  Executive as the grievance officer for the purposes of the
                  rules drafted under the Information Technology Act, 2000.
                </p>
                <p>
                  You may address any grievances you may have in respect of this
                  Privacy Policy or usage of your Protected Information to:{" "}
                  <a
                    href="mailto:contact@pasakasacreations.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    contact@pasakasacreations.com
                  </a>
                </p>
              </PolicySection>

              {/* Changes */}
              <PolicySection title="Changes to the Privacy Policy">
                <p>
                  From time to time, this Privacy Policy may be updated to
                  reflect changes to our information practices. Any changes will
                  be effective immediately upon posting of the revised Privacy
                  Policy. If we make any material changes, we may notify you by
                  email or by means of a notice on the Services prior to the
                  change becoming effective.
                </p>
              </PolicySection>

              {/* Contact */}
              <PolicySection title="Contact Us" isLast={true}>
                <p className="mb-4">
                  Feel free to contact us any time if you have further questions
                  about Pasakasa Creations or this Privacy Policy.
                </p>
                <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <a
                    href="mailto:contact@pasakasacreations.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    contact@pasakasacreations.com
                  </a>
                </div>
              </PolicySection>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PolicySection({
  title,
  children,
  highlight = false,
  isLast = false,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
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
      <h2
        className={`text-2xl font-bold mb-4 ${
          highlight
            ? "text-orange-600 dark:text-orange-400"
            : "text-slate-900 dark:text-white"
        }`}
      >
        {title}
      </h2>
      <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}
