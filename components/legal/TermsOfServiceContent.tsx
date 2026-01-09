"use client";

import { motion } from "framer-motion";
import {
  ScrollText,
  Mail,
  Shield,
  AlertTriangle,
  Gamepad2,
} from "lucide-react";

export function TermsOfServiceContent() {
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
              <ScrollText className="h-4 w-4 text-blue-500" />
              Pasakasa Creations
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Please read these terms carefully before using our services
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
            {/* Quick Info Cards */}
            <section className="mb-12">
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  whileHover={{ y: -4 }}
                >
                  <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Limited License
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Personal, non-commercial use only for our games and
                    services.
                  </p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                  whileHover={{ y: -4 }}
                >
                  <Gamepad2 className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Virtual Items
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Virtual currency and goods have no real-world value.
                  </p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  whileHover={{ y: -4 }}
                >
                  <AlertTriangle className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Account Safety
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    You are responsible for keeping your account secure.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Policy Sections */}
            <div className="space-y-10">
              {/* Agreement to Terms */}
              <TermsSection title="Agreement to Terms">
                <p className="mb-4">
                  Pasakasa Creations Private Limited and its affiliates
                  (&quot;Pasakasa Creations&quot;, &quot;we&quot;,
                  &quot;us&quot;, or &quot;our&quot;) operate Pasakasa Creations
                  games including Callbreak Friends, Teen Patti Friends,
                  websites, and other related services (collectively, the
                  &quot;Services&quot;). We are committed to protecting your
                  privacy and complying with applicable privacy laws.
                </p>
                <p className="mb-4">
                  These Terms of Service explain how we collect, use, store, and
                  disclose personal information you provide or that we obtain
                  through your use of our Services, helping you make informed
                  decisions before sharing your data.
                </p>
                <p className="mb-4 font-semibold text-slate-800 dark:text-white">
                  BY VISITING WEBSITE OR USING OUR SERVICES YOU AGREE TO BE
                  BOUND BY THE TERMS AND CONDITIONS OF THESE TERMS OF SERVICES
                </p>
                <p>
                  Our Terms of Service may be updated at any time without
                  notice. To stay informed, please review them before each use
                  of our Services. By using our Services, you agree to the
                  collection, use, and disclosure of your personal information
                  as described in these Terms. If you do not agree, please do
                  not access or use our Services.
                </p>
              </TermsSection>

              {/* Grant of License */}
              <TermsSection title="Grant of License">
                <p className="mb-4">
                  Subject to your acceptance and compliance with these Terms,
                  Pasakasa Creations Private Limited grants you a limited,
                  non-exclusive, non-transferable, revocable license to access
                  and use our Services solely for personal, non-commercial
                  entertainment via web browsers, mobile apps, authorized social
                  networking sites, or partner platforms.
                </p>
                <p>
                  You may not use the Services for any other purpose, nor copy,
                  distribute, or reproduce them.
                </p>
              </TermsSection>

              {/* Right to Terminate or Change Services */}
              <TermsSection title="Right to Terminate or Change Services">
                <p className="mb-4">
                  Your usage requires complete and continuing compliance. Any
                  usage of these services in breach of those conditions will be
                  handled as a breach of Pasakasa Creations&apos;s services.
                </p>
                <p className="mb-4">
                  We reserve the right to terminate your access and usage of
                  those services in the event that you violate these Conditions.
                  In this event, we reserve the right to suspend or permanently
                  stop the services without notice and without accountability.
                  In these cases, you may lose access to your Account, password,
                  username, character, and you&apos;ll forfeit all connected
                  entitlements, such as Virtual Money, Virtual Goods (such as
                  virtual vehicles, gear, points, standings, rankings,
                  evaluations, or any other electronic objects appearing in,
                  originating from or connected to the service programs).
                </p>
                <p>
                  You agree that these Terms will survive the termination of
                  your Account for any reason or the termination of these
                  services.
                </p>
              </TermsSection>

              {/* Our Right to Change or Update Services */}
              <TermsSection title="Our Right to Change or Update Services">
                <p>
                  Pasakasa Creations reserves the right to modify, remove, or
                  update any part of its Services, including game features and
                  functionalities, at any time without prior notice. By using
                  our Services, you agree that such changes may be made at our
                  discretion.
                </p>
              </TermsSection>

              {/* Our Intellectual Property Rights */}
              <TermsSection title="Our Intellectual Property Rights">
                <p className="mb-4">
                  All materials on our website and Services are protected by
                  copyright, trademark, and other intellectual property laws.
                  Any unauthorized use may result in civil or criminal
                  penalties.
                </p>
                <p className="mb-4">
                  Access to our Services grants you a limited right to use them
                  for personal, non-commercial purposes only. This does not
                  transfer any ownership or intellectual property rights to you,
                  including rights in Virtual Currency, Virtual Goods (such as
                  digital items, points, rankings, or equipment), or any other
                  attributes associated with our Services.
                </p>
                <p>
                  Without our written consent, you may not copy, redistribute,
                  publish, or exploit content from our website or Services. All
                  comments, feedback, tips, ideas, and other submissions you
                  provide to us become the property of Pasakasa Creations. We
                  may use, sell, or otherwise exploit these submissions in any
                  manner, without restriction and without compensation to you.
                </p>
              </TermsSection>

              {/* Intellectual Property Rights of Others */}
              <TermsSection title="Intellectual Property Rights of Others">
                <p className="mb-4">
                  You retain ownership of any content you create or submit on
                  our Services, including posts, messages, comments, images,
                  videos, audio, and other materials. You are solely responsible
                  for the content you submit. Pasakasa Creations does not
                  pre-screen content and is not responsible for it.
                </p>
                <p className="mb-4">
                  By submitting content, you grant Pasakasa Creations and its
                  affiliates a worldwide, royalty-free, transferable license to
                  use, copy, distribute, display, perform, edit, translate, and
                  reformat your content in connection with our Services. You
                  will not receive compensation for your content.
                </p>
                <p>
                  You agree that Pasakasa Creations may disclose your content or
                  identity to third parties if required to resolve claims,
                  including claims of intellectual property or privacy
                  violations.
                </p>
              </TermsSection>

              {/* Community Guidelines */}
              <TermsSection title="Community Guidelines" highlight={true}>
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Moderation
                </h4>
                <p className="mb-4">
                  The community is moderated. The community is intended for both
                  adults and kids and we expect all players to use language
                  appropriate for all players.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Monitoring
                </h4>
                <p>
                  Pasakasa Creations may, but is not obligated to, monitor and
                  record activity on our Services. We may review content or
                  activity we believe violates these Terms and remove or block
                  any objectionable material. We may also cooperate with law
                  enforcement authorities to investigate or prosecute users who
                  violate applicable laws.
                </p>
              </TermsSection>

              {/* Account Responsibility */}
              <TermsSection title="Account Responsibility">
                <p className="mb-4">
                  You will have the ability to use an account to access and use
                  parts of the services. In order to use the services, you may
                  need to sign in using your Facebook or Google login. Your
                  account is personal to you and you may not share your account
                  information with, or allow access to your account by, any
                  third party.
                </p>
                <p>
                  As you will be responsible for all activity that occurs under
                  your access credentials, you agree to use reasonable efforts
                  to prevent unauthorized access to or use of the services and
                  to preserve the confidentiality of your username and password
                  and any device that you use to access the services.
                </p>
              </TermsSection>

              {/* Virtual Goods and Currency */}
              <TermsSection title="Virtual Goods and Currency">
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Your Use of Virtual Money and Virtual Goods
                </h4>
                <p className="mb-4">
                  Any Virtual Money or Virtual Goods (&quot;Game Currency&quot;)
                  you purchase, earn, or receive may only be used within the
                  Services. You do not have any ownership, right, or title to
                  Virtual Money, Virtual Goods, or any associated account
                  attributes, whether earned in-game or purchased from Pasakasa
                  Creations.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  License to Pasakasa Creations
                </h4>
                <p>
                  By submitting user-generated content (UGC), you grant Pasakasa
                  Creations a perpetual, irrevocable, worldwide, non-exclusive,
                  royalty-free, transferable, and sub-licensable license to use,
                  copy, distribute, display, publish, perform, adapt, translate,
                  create derivative works from, and otherwise exploit your
                  content in any media, including for promotional or
                  redistribution purposes.
                </p>
              </TermsSection>

              {/* Data and Content Storage */}
              <TermsSection title="Data and Content Storage">
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  General Practices Regarding Use and Storage
                </h4>
                <p>
                  You agree that Pasakasa Creations has no responsibility or
                  liability for the deletion or failure to store any Content and
                  other communications maintained or transmitted through the
                  Services. You further acknowledge that you are solely
                  responsible for securing and backing up your content.
                </p>
              </TermsSection>

              {/* Third-Party Links */}
              <TermsSection title="Third-Party Links">
                <p>
                  Our Services may include links to third-party websites,
                  advertisers, services, offers, or activities that are not
                  owned or controlled by Pasakasa Creations. We do not endorse
                  or assume responsibility for any third-party content,
                  products, or services. Accessing third-party sites or content
                  is at your own risk, and Pasakasa Creations is not liable for
                  any use or consequences arising from them.
                </p>
              </TermsSection>

              {/* Termination and Support */}
              <TermsSection title="Termination and Support">
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Right to Suspend or Terminate
                </h4>
                <p className="mb-4">
                  Pasakasa Creations may, at its sole discretion and for any
                  reason or no reason, suspend or terminate your account or
                  access to the Services, and remove any content associated with
                  your account, at any time. Termination may occur without prior
                  notice, and Pasakasa Creations is not liable to you or any
                  third party for such actions.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Customer Support
                </h4>
                <p>
                  For assistance with technical or other issues relating to the
                  Services, please contact customer service by emailing us at{" "}
                  <a
                    href="mailto:contact@pasakasacreations.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    contact@pasakasacreations.com
                  </a>
                  .
                </p>
              </TermsSection>

              {/* Disclaimers and Limitations */}
              <TermsSection title="Disclaimers and Limitations">
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  No Warranty
                </h4>
                <p className="mb-4">
                  Pasakasa Creations provides the Services &quot;as is&quot;
                  without any warranties, whether express, implied, or
                  statutory. We specifically disclaim implied warranties of
                  merchantability, fitness for a particular purpose,
                  non-infringement, accuracy, interoperability, or uninterrupted
                  use. Some jurisdictions may not allow the exclusion of certain
                  implied warranties, so this disclaimer may not apply to you.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Limitation of Liability
                </h4>
                <p className="mb-4">
                  Pasakasa Creations is not liable for any indirect, incidental,
                  special, exemplary, punitive, or consequential damages,
                  including lost profits, data, personal injury, or property
                  damage, arising from or related to your use of the Services.
                  This applies regardless of the type of negligence, even if
                  Pasakasa Creations has been advised of the possibility of such
                  damages.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Indemnification
                </h4>
                <p>
                  You agree to indemnify, defend and hold Pasakasa Creations
                  harmless from all claims, causes of action, allegations,
                  costs, expenses, fees (including reasonable attorneys&apos;
                  fees), judgments, liabilities, losses, and damages arising
                  from or relating to your use of the Services.
                </p>
              </TermsSection>

              {/* Changes to these Terms */}
              <TermsSection title="Changes to these Terms of Service">
                <p>
                  We may modify these Terms of Service from time to time. When
                  changes are made, we will notify you by making the revised
                  version available on this webpage, and will indicate at the
                  top of this page the date that revisions were last made. You
                  should revisit these Terms of Service on a regular basis, as
                  revised versions will be binding on you. Any such modification
                  will be effective upon our posting of new Terms of Service.
                  You understand and agree that your continued access to or use
                  of the Services after any posted modification to the Terms of
                  Service indicates your acceptance of the modification.
                </p>
              </TermsSection>

              {/* Dispute Resolution */}
              <TermsSection title="Dispute Resolution and Arbitration">
                <p>
                  This Arbitration Agreement is part of your contract with
                  Pasakasa Creations and affects your rights. It outlines
                  procedures for mandatory, binding arbitration and includes a
                  waiver of class action rights.
                </p>
              </TermsSection>

              {/* Miscellaneous */}
              <TermsSection title="Miscellaneous">
                <p>
                  These Terms of Service are governed by the laws of Nepal. Any
                  claims, actions, or proceedings arising from these Terms or
                  your use of the Services shall be brought exclusively in the
                  competent courts of Nepal.
                </p>
              </TermsSection>

              {/* Contact */}
              <TermsSection title="Contact Us" isLast={true}>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us.
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
              </TermsSection>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TermsSection({
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
