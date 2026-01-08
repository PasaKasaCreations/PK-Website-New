import { Metadata } from "next";
import Link from "next/link";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Clock,
  Users,
  Heart,
  Zap,
  GraduationCap,
  Coffee,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";
import { getAllJobs } from "@/lib/api/jobs";
import { formatEmploymentType } from "@/lib/utils";
import { CareersHero } from "@/components/shared/CareersHero";

export const metadata: Metadata = {
  title: "Careers - Pasakasa Creations",
  description:
    "Work with us in Kathmandu. We build card games, teach coding, and ship real software.",
};

// Mock data - COMMENTED OUT - Now using Supabase
// const openPositions = [
//   {
//     id: "1",
//     slug: "unity-game-developer",
//     title: "Unity Game Developer",
//     department: "Game Development",
//     location: "Remote",
//     type: "Full-time",
//     description:
//       "We're looking for an experienced Unity developer to create engaging 2D and 3D games. You'll work on exciting projects and collaborate with a passionate team.",
//     requirements: [
//       "3+ years of Unity experience",
//       "Strong C# programming skills",
//       "Portfolio of published games",
//       "Team player with good communication",
//     ],
//   },
//   {
//     id: "2",
//     slug: "backend-engineer",
//     title: "Backend Engineer",
//     department: "Engineering",
//     location: "Remote",
//     type: "Full-time",
//     description:
//       "Join us to build scalable backend systems for our games and learning platform. Experience with Node.js and cloud services required.",
//     requirements: [
//       "4+ years backend development",
//       "Experience with Node.js, TypeScript",
//       "Cloud platforms (AWS/GCP)",
//       "Database design expertise",
//     ],
//   },
//   {
//     id: "3",
//     slug: "ui-ux-designer",
//     title: "UI/UX Designer",
//     department: "Design",
//     location: "Hybrid",
//     type: "Full-time",
//     description:
//       "Create beautiful and intuitive user interfaces for our games and educational products. Must have a strong portfolio and eye for detail.",
//     requirements: [
//       "3+ years UI/UX design experience",
//       "Proficiency in Figma/Adobe XD",
//       "Game UI design experience",
//       "Strong portfolio",
//     ],
//   },
//   {
//     id: "4",
//     slug: "game-design-intern",
//     title: "Game Design Intern",
//     department: "Game Development",
//     location: "Remote",
//     type: "Internship",
//     description:
//       "Learn game development from industry professionals. Work on real projects and gain hands-on experience in a supportive environment.",
//     requirements: [
//       "Passion for game development",
//       "Basic Unity or Unreal knowledge",
//       "Strong creative thinking",
//       "Currently pursuing relevant degree",
//     ],
//   },
// ];

const benefits = [
  {
    icon: Zap,
    title: "Flexible Work",
    description:
      "Work from home or the office—your choice. Just be available for team calls.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description:
      "We'll pay for courses, books, or conference tickets if they help you grow.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Health insurance for you. We handle the paperwork.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: Target,
    title: "Creative Freedom",
    description:
      "Pick how you solve problems. We care about results, not micromanaging.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Coffee,
    title: "Team Events",
    description: "Team lunches, occasional outings. Nothing forced.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description:
      "We'll help you figure out what's next—whether that's here or elsewhere.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
];

export default async function CareersPage() {
  // Fetch all job postings from Supabase
  const openPositions = await getAllJobs();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <CareersHero />

      {/* Company Culture Section with Image Placeholder */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper delay={0.2}>
            <section className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Why Join Our Team?
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    We're small on purpose. Everyone here writes code, talks to
                    customers, and ships features. No layers of management, no
                    endless meetings. Just building stuff.
                  </p>
                  <p className="text-muted-foreground">
                    We're based in Kathmandu, but we work flexibly. What matters
                    is that you do good work and communicate clearly. If
                    something breaks, we fix it together.
                  </p>

                  <div className="space-y-3 pt-4">
                    <h3 className="text-xl font-bold">How We Work</h3>
                    {[
                      "Ship code, not slide decks",
                      "Learn by building real things",
                      "Say what you mean",
                      "Help each other out",
                      "Take breaks when you need them",
                    ].map((value, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-blue-500" />
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-orange-100 dark:from-blue-950 dark:via-purple-950 dark:to-orange-950">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-4">
                        <Users className="h-24 w-24 mx-auto text-blue-600 dark:text-blue-400" />
                        <p className="text-lg font-semibold text-muted-foreground">
                          Team Photo / Office Culture Image
                        </p>
                        <p className="text-sm text-muted-foreground">
                          [Image placeholder - Add your team photo here]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedWrapper>

          {/* Benefits & Perks */}
          <AnimatedWrapper delay={0.3}>
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Benefits & Perks
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Here's what you get when you work with us
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card
                      key={index}
                      className="border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${benefit.bgColor} mb-4`}
                        >
                          <Icon className={`h-6 w-6 ${benefit.color}`} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </AnimatedWrapper>

          {/* Open Positions */}
          <section>
            <AnimatedWrapper delay={0.4}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Open Positions
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See if anything fits. If not, scroll down.
                </p>
              </div>
            </AnimatedWrapper>
            <div className="space-y-6 max-w-4xl mx-auto">
              {openPositions.map((position, index) => (
                <AnimatedWrapper key={position.id} delay={0.5 + index * 0.1}>
                  <Card className="border-2 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                              <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <span className="font-medium">
                                {position.department}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                              <MapPin className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                              <span className="font-medium">
                                {position.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <span className="font-medium">
                                {formatEmploymentType(position.employment_type)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {position.description}
                      </p>

                      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          Requirements:
                        </h4>
                        <ul className="space-y-2">
                          {position.requirements.map(
                            (req: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 mt-2 flex-shrink-0" />
                                <span className="text-sm">{req}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <Link href={`/careers/${position.slug}`}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white"
                        >
                          View Details & Apply
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedWrapper>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <AnimatedWrapper delay={0.8}>
            <section className="mt-20">
              <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-orange-500/10 border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Don't See a Position for You?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Send us your resume anyway. Tell us what you're good at and
                  what you want to work on. We'll reach out if something opens
                  up.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white"
                >
                  Send Your Resume
                </Button>
              </div>
            </section>
          </AnimatedWrapper>
        </div>
      </div>
    </div>
  );
}
