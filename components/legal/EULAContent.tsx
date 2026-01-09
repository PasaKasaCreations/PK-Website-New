"use client";

import { motion } from "framer-motion";
import { FileText, Mail, Shield, Ban, Scale } from "lucide-react";

export function EULAContent() {
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
              <FileText className="h-4 w-4 text-blue-500" />
              Pasakasa Creations
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              End User License Agreement
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Please Read This Agreement Carefully
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
                    License Grant
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Personal, non-commercial, non-transferable license to use
                    our products.
                  </p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
                  whileHover={{ y: -4 }}
                >
                  <Ban className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Prohibited Actions
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    No reverse engineering, cheating, or unauthorized
                    distribution.
                  </p>
                </motion.div>
                <motion.div
                  className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  whileHover={{ y: -4 }}
                >
                  <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Ownership Rights
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    All intellectual property remains with Pasakasa Creations.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Policy Sections */}
            <div className="space-y-10">
              {/* Introduction */}
              <EULASection title="Introduction">
                <p className="mb-4">
                  This End User License Agreement (&quot;EULA&quot;) sets forth
                  the terms and conditions governing your use of the video game,
                  software application, and any related updates, patches,
                  enhancements, or services (collectively, the
                  &quot;Product&quot;) that are currently, or may in the future
                  be, provided by Pasakasa Creations Private Limited, along with
                  its subsidiaries and affiliated entities (&quot;Pasakasa
                  Creations&quot;).
                </p>
                <p className="mb-4">
                  Through this EULA, Pasakasa Creations explains the basis upon
                  which the Product is made available to you (&quot;User&quot;
                  or &quot;You&quot;), as well as the terms under which You are
                  permitted to use it. The Privacy Policy of Pasakasa Creations
                  is incorporated by reference and shall be considered a part of
                  this Agreement.
                </p>
                <p className="mb-4">
                  By downloading, installing, or using the Product, You confirm
                  that You agree to and accept:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>The terms of this EULA; and</li>
                  <li>The provisions of the Privacy Policy.</li>
                </ul>
                <p className="mb-4 font-semibold text-slate-800 dark:text-white">
                  If You do not accept these terms, You must refrain from
                  installing or using the Product.
                </p>
                <p>
                  This Agreement is intended to operate in conjunction with, and
                  not in replacement of, the Terms of Service. Should any
                  conflict arise between the provisions of this EULA and the
                  Terms of Service, the Terms of Service shall prevail.
                </p>
              </EULASection>

              {/* Grant of License */}
              <EULASection title="Grant of License">
                <p className="mb-4">
                  Pasakasa Creations (or its licensors) grants You a personal,
                  non-exclusive, non-transferable, non-sublicensable, and
                  non-commercial license (the &quot;License&quot;) to install
                  and use the Product, either in full or in part, for as long as
                  this EULA remains active or until either party decides to
                  terminate it.
                </p>
                <p className="mb-4">
                  You may not use the Product for commercial purposes, nor allow
                  others to do so, without obtaining a separate commercial
                  license from Pasakasa Creations. Certain updates, patches, or
                  modifications may be necessary to ensure the Product works
                  correctly on your device.
                </p>
                <p>
                  Some parts of the Product may include features or services
                  provided by third parties, which may be subject to additional
                  terms or fees. You are responsible for following those terms.
                </p>
              </EULASection>

              {/* Prohibited Actions */}
              <EULASection title="Prohibited Actions" highlight={true}>
                <p className="mb-4">
                  You agree not to, directly or indirectly:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Sell, rent, lease, sublicense, distribute, advertise, or
                    otherwise exploit the Product or any portion of it for
                    profit.
                  </li>
                  <li>
                    Reverse engineer, decompile, disassemble, modify, copy, or
                    create derivative works from the Product (except where the
                    Product allows you to create User Generated Content through
                    an account, in line with the Terms of Service).
                  </li>
                  <li>
                    Develop, use, or distribute &quot;auto,&quot;
                    &quot;trainer,&quot; &quot;script,&quot; &quot;macro,&quot;
                    cheat, or hack programs for the Product, whether in
                    single-player, online, or LAN environments.
                  </li>
                  <li>
                    Remove, change, bypass, or disable any copyright, trademark,
                    or ownership information embedded in the Product.
                  </li>
                  <li>
                    Export or re-export the Product or any copies in violation
                    of applicable laws.
                  </li>
                </ul>
              </EULASection>

              {/* Rules of Conduct */}
              <EULASection title="Rules of Conduct">
                <p className="mb-4">
                  While using the Product, You must follow all applicable laws,
                  rules, and regulations, as well as any conduct guidelines
                  provided by Pasakasa Creations. Prohibited actions include,
                  but are not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Creating, sharing, or publishing content that infringes on
                    intellectual property, violates privacy, breaks
                    confidentiality, or promotes illegal activity
                  </li>
                  <li>
                    Interfering with the normal operation of the Product or
                    other users&apos; access
                  </li>
                  <li>
                    Distributing malware, viruses, or corrupted files
                  </li>
                  <li>
                    Using unauthorized methods to access the Product, such as
                    private server emulators
                  </li>
                  <li>Spamming chat or disrupting communications</li>
                  <li>
                    Sharing offensive, abusive, threatening, harassing,
                    defamatory, obscene, sexually explicit, or discriminatory
                    content
                  </li>
                  <li>Harassing, threatening, or misleading other users</li>
                  <li>Misusing customer support or reporting systems</li>
                  <li>
                    Falsely claiming affiliation with Pasakasa Creations or its
                    partners
                  </li>
                </ul>
              </EULASection>

              {/* Ownership */}
              <EULASection title="Ownership">
                <p className="mb-4">
                  All rights, title, and interest in and to the
                  Product—including, but not limited to, all text, graphics,
                  sounds, music, messages, data, fictional characters, names,
                  themes, objects, scenery, costumes, effects, dialogues,
                  slogans, locations, diagrams, concepts, choreographies,
                  videos, audiovisual content, domain names, and any other
                  components, whether individually or collectively—are the
                  exclusive property of Pasakasa Creations or its licensors.
                </p>
                <p className="mb-4">
                  The Product is protected under applicable national and
                  international copyright laws, treaties, conventions, and other
                  intellectual property regulations. Certain components of the
                  Product may be licensed from third parties, and such licensors
                  retain and may enforce their rights in accordance with this
                  Agreement.
                </p>
                <p>
                  Except for the limited rights expressly granted to You under
                  this License, all rights not expressly provided herein are
                  reserved by Pasakasa Creations. This License does not grant
                  You ownership, title, or any proprietary rights in the Product
                  and should not be interpreted as a sale or transfer of any
                  portion of the Product.
                </p>
              </EULASection>

              {/* Access to the Product */}
              <EULASection title="Access to the Product">
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Compatible Devices
                </h4>
                <p className="mb-4">
                  If You are using the Product on a portable device,
                  &quot;Compatible Mobile Terminal&quot; means any device that
                  can connect to the Internet to access the Product, including
                  smartphones, tablets, feature phones, and PDAs.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Network Access
                </h4>
                <p className="mb-4">
                  To use the Product, You need access to an electronic network.
                  All connection costs (e.g., mobile carrier fees) are Your
                  responsibility. Product performance, features, and response
                  times may vary depending on Your device and network. Pasakasa
                  Creations is not liable for any reduced user experience. The
                  Product may not be available on all devices or networks.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Data Collection
                </h4>
                <p className="mb-4">
                  To improve Your experience and provide support, Pasakasa
                  Creations may collect data about Your use of the Product,
                  device, and connection. Some information may be anonymized and
                  used for statistics. Personal data will only be shared with
                  third parties with Your consent or when required by law,
                  including fraud prevention or legal obligations.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Analytics and Advertising
                </h4>
                <p className="mb-4">
                  Pasakasa Creations may use third-party analytics and ad
                  technologies to track usage, performance, and ad interactions.
                  This may include device identifiers, operating system,
                  location, game metrics, ad views, and responses. These tools
                  may combine data across products and third-party sites.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Consent to Monitor
                </h4>
                <p className="mb-4">
                  While using the Product, it may scan Your device&apos;s memory
                  to detect unauthorized third-party programs prohibited under
                  Section 1. If such programs are found, the Product may send
                  the following information to Pasakasa Creations: Your account
                  name, IP address, details of the detected program, time and
                  date, and device specifications.
                </p>
                <p className="mb-4">
                  Use of unauthorized programs may result in immediate
                  termination of this License and Your access to the Product,
                  with or without notice.
                </p>
                <p>
                  Pasakasa Creations is not responsible for, and does not
                  endorse, any opinions, messages, or recommendations shared by
                  users within the Product, including in-game chats.
                </p>
              </EULASection>

              {/* Warranty Disclaimer and Limitation of Liability */}
              <EULASection title="Warranty Disclaimer and Limitation of Liability">
                <p className="mb-4">
                  You acknowledge that using the Product is entirely at Your own
                  risk. The Product is provided &quot;as is&quot; and &quot;as
                  available,&quot; without any warranties or guarantees, whether
                  express, implied, or statutory, including but not limited to:
                  accuracy, reliability, security, fitness for a particular
                  purpose, non-infringement, market value, or satisfaction.
                </p>
                <p className="mb-4">
                  Pasakasa Creations does not guarantee that the Product will be
                  uninterrupted, error-free, or free from viruses or other
                  harmful components. You are responsible for choosing and using
                  the Product to achieve your intended results.
                </p>
                <p>
                  To the maximum extent allowed by law, neither Pasakasa
                  Creations nor its licensors, partners, or service providers
                  will be liable for any losses or damages arising from Your use
                  of the Product, including direct, indirect, incidental,
                  consequential, or accidental losses, regardless of the legal
                  theory (tort, contract, negligence, or otherwise).
                </p>
              </EULASection>

              {/* Indemnity */}
              <EULASection title="Indemnity">
                <p className="mb-4">
                  You are responsible for any harm or damages caused to Pasakasa
                  Creations, its affiliates, licensors, partners, service
                  providers, subcontractors, other users, or any third party
                  resulting from Your breach of this EULA.
                </p>
                <p className="mb-4">
                  You agree to defend, indemnify, and hold harmless Pasakasa
                  Creations and its affiliates, licensors, partners, service
                  providers, and subcontractors from any claims, liabilities,
                  losses, damages, or costs (including legal fees) arising from:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Your violation of this EULA, or</li>
                  <li>Your use or misuse of the Product.</li>
                </ul>
                <p>
                  Pasakasa Creations may choose, at its own discretion and
                  expense, to handle the defense of any claim covered by this
                  indemnity. This obligation survives the termination of this
                  EULA.
                </p>
              </EULASection>

              {/* Termination */}
              <EULASection title="Termination">
                <p className="mb-4">
                  This EULA starts when You first purchase, download, or use the
                  Product and remains in effect until terminated. Either You or
                  Pasakasa Creations may terminate this EULA at any time, for
                  any reason. Termination by Pasakasa Creations may occur upon
                  notice, closure of Your account, or discontinuation of the
                  Product.
                </p>
                <p>
                  The EULA will also end automatically if You fail to follow its
                  terms. Upon termination, You must uninstall the Product and
                  delete all copies in Your possession.
                </p>
              </EULASection>

              {/* Changes to This EULA or to the Product */}
              <EULASection title="Changes to This EULA or to the Product">
                <p className="mb-4">
                  Pasakasa Creations may update, revise, or modify this EULA at
                  any time for legal, security, regulatory, or technical
                  reasons, with or without notice. The latest version can be
                  viewed via the &quot;EULA&quot; link in the Product or on our
                  website. It is Your responsibility to check for updates.
                  Continued use of the Product constitutes acceptance of any
                  changes.
                </p>
                <p>
                  The Product may also be updated, modified, or optimized
                  automatically, and previous versions may no longer be
                  supported. Channel partners and service providers are not
                  obligated to provide maintenance or support. Pasakasa
                  Creations may also update the Rules of Conduct to set limits
                  on Product use.
                </p>
              </EULASection>

              {/* Miscellaneous */}
              <EULASection title="Miscellaneous">
                <h4 className="font-semibold text-slate-800 dark:text-white mt-4 mb-2">
                  Severance
                </h4>
                <p className="mb-4">
                  If any court of competent jurisdiction or competent authority
                  finds that any provision of this EULA is invalid, illegal or
                  unenforceable, that provision or part-provision shall, to the
                  extent required, be deemed to be deleted, and the validity and
                  enforceability of the other provisions of this EULA shall not
                  be affected.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  No Waiver
                </h4>
                <p className="mb-4">
                  No failure or delay by Pasakasa Creations (or its licensors)
                  to exercise any right or remedy provided under this EULA or by
                  law shall constitute a waiver of that or any other right or
                  remedy, nor shall it preclude or restrict the further exercise
                  of that or any other right or remedy.
                </p>

                <h4 className="font-semibold text-slate-800 dark:text-white mt-6 mb-2">
                  Law and Jurisdiction
                </h4>
                <p>
                  To the extent permitted by applicable law, this EULA and any
                  disputes or claims arising out of or in connection with it or
                  its subject matter or formation (including non-contractual
                  disputes or claims) are governed by and construed in
                  accordance with the laws of Nepal. You irrevocably agree that
                  the courts of Nepal have exclusive jurisdiction to settle any
                  dispute or claim that arises out of or in connection with the
                  EULA.
                </p>
              </EULASection>

              {/* Contact */}
              <EULASection title="Contact Us" isLast={true}>
                <p className="mb-4">
                  For any question concerning this EULA, you may contact
                  Pasakasa Creations Private Limited at:
                </p>
                <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <a
                    href="mailto:contact@pasakasacreations.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    contact@pasakasacreations.com
                  </a>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase font-medium">
                  This EULA is applicable only to the extent authorized by law
                </p>
              </EULASection>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function EULASection({
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
