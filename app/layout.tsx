import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pasakasa Creations - Building Games, Shaping Developers",
  description:
    "Pasakasa Creations is a game development and education company creating engaging games and empowering developers with world-class courses.",
  keywords: [
    "game development",
    "programming courses",
    "games",
    "education",
    "pasakasa",
    "teen patti",
    "callbreak",
    "unity",
    "game design",
  ],
  authors: [{ name: "Pasakasa Creations" }],
  icons: {
    icon: "/logos/pasakasalogo.webp",
    apple: "/logos/pasakasalogo.webp",
  },
  openGraph: {
    title: "Pasakasa Creations - Building Games, Shaping Developers",
    description:
      "Creating engaging games and empowering the next generation of developers.",
    type: "website",
    images: ["/logos/pk_long_Logo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
