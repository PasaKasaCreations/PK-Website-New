import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { AboutHero } from "@/components/about/AboutHeroV1";
import { JourneySwitcher } from "@/components/about/JourneySwitcher";
import {
  Gamepad2,
  Users,
  GraduationCap,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Pasakasa Creations",
  description:
    "Nepal-based game studio creating strategic multiplayer games and teaching live game development classes in Kathmandu. Learn from real developers who've shipped games.",
};

const highlights = [
  {
    icon: Gamepad2,
    title: "Real Games, Real Results",
    description:
      "Our games are live on Play Store and App Store with thousands of active players. We teach what we actually do.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: GraduationCap,
    title: "Live In-Person Classes",
    description:
      "Physical classes in Kathmandu. No recordings, no shortcuts—just hands-on learning with real instructor interaction.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description:
      "Limited students per batch means personalized attention, mentorship, and a tight-knit learning community.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: MapPin,
    title: "Made in Nepal",
    description:
      "Based in Kathmandu, reaching players worldwide. We're building Nepal's game development community.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
];

const reasons = [
  "Learn from developers who've shipped real games to thousands of players",
  "Physical classes in Kathmandu—no online-only shortcuts",
  "Small batch sizes for personalized mentorship and guidance",
  "Build actual projects, not just tutorials—publish your own game",
  "Join a growing community of game developers in Nepal",
  "Industry-relevant curriculum updated based on real production experience",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Main Content */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Who We Are Section */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Text Content */}
              <AnimatedWrapper delay={0.2}>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Who We Are</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Pasakasa Creations is a game development studio based in
                    Kathmandu, Nepal. We build strategic multiplayer card games
                    that are loved by thousands of players worldwide.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We're not just building games—we're building the next
                    generation of game developers in Nepal. Our classes are
                    taught by the same developers who built and maintain our
                    live games. When we teach Unity, C#, or multiplayer
                    networking, we're teaching from real production experience,
                    not just theory.
                  </p>
                </div>
              </AnimatedWrapper>

              {/* Image Placeholder */}
              <AnimatedWrapper delay={0.3}>
                <div className="relative h-[400px] rounded-2xl overflow-hidden border-2 border-orange-200 dark:border-orange-800 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-blue-50 to-blue-100 dark:from-orange-950 dark:via-blue-950 dark:to-blue-950">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-4">
                        <Gamepad2 className="h-24 w-24 mx-auto text-orange-600 dark:text-orange-400" />
                        <p className="text-lg font-semibold text-muted-foreground">
                          Company Image / Game Screenshot
                        </p>
                        <p className="text-sm text-muted-foreground px-4">
                          [Image placeholder - Add your company or game image
                          here]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="mb-20">
            <AnimatedWrapper delay={0.4}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Makes Us Different
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We combine real-world game development with hands-on education
                </p>
              </div>
            </AnimatedWrapper>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <AnimatedWrapper key={index} delay={0.5 + index * 0.1}>
                    <Card className="h-full border-2 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`h-16 w-16 rounded-full ${highlight.bgColor} flex items-center justify-center mx-auto mb-4`}
                        >
                          <Icon className={`h-8 w-8 ${highlight.color}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {highlight.description}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedWrapper>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Journey Timeline - Switcher with 3 variants */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-gray-900">
        <JourneySwitcher />
      </div>

      {/* Why Learn With Us */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section>
            <AnimatedWrapper delay={0.2}>
              <Card className="max-w-4xl mx-auto bg-gradient-to-br from-orange-500/5 via-blue-500/5 to-orange-500/5 border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-8 text-center">
                    Why Learn With Us
                  </h2>
                  <ul className="space-y-4">
                    {reasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              index % 2 === 0
                                ? "bg-blue-100 dark:bg-blue-900/20"
                                : "bg-orange-100 dark:bg-orange-900/20"
                            }`}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 ${
                                index % 2 === 0
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-orange-600 dark:text-orange-400"
                              }`}
                            />
                          </div>
                        </div>
                        <span className="text-muted-foreground leading-relaxed">
                          {reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedWrapper>
          </section>
        </div>
      </div>
    </div>
  );
}
