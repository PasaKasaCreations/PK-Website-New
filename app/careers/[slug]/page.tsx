import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { JobContact } from "@/components/shared/JobContact";
import { Job } from "@/types/job.interface";
import { MapPin, Briefcase, Clock, DollarSign, FileText } from "lucide-react";

// Mock data - Replace with actual database fetch
const jobs: Job[] = [
  {
    id: "1",
    slug: "unity-game-developer",
    title: "Unity Game Developer",
    department: "Game Development",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    description:
      "We're looking for an experienced Unity developer to create engaging 2D and 3D games. You'll work on exciting projects and collaborate with a passionate team.",
    company: {
      name: "Pasakasa Creations",
      description:
        "At Pasakasa Creations, we're building the future of games and education. Our team is passionate about creating experiences that inspire, educate, and entertain. We combine cutting-edge technology with creative storytelling to deliver products that make a real impact.",
    },
    responsibilities: [
      "Design and implement engaging 2D and 3D game mechanics",
      "Collaborate with designers and artists to bring game concepts to life",
      "Optimize game performance across multiple platforms",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Stay updated with latest Unity features and game development trends",
    ],
    requirements: [
      "3+ years of professional Unity game development experience",
      "Strong proficiency in C# programming",
      "Experience with 2D and 3D game development",
      "Portfolio of published games (mobile or PC)",
      "Understanding of game design principles and player psychology",
      "Strong problem-solving and debugging skills",
      "Excellent communication and teamwork abilities",
    ],
    benefits: [
      "Competitive base salary with performance bonuses",
      "Comprehensive health, dental, and vision insurance",
      "Flexible remote work options",
      "Annual learning and development budget",
      "Latest hardware and software tools",
      "Generous vacation and parental leave",
      "Stock options in a growing company",
      "Regular team events and game jams",
    ],
    contact: {
      name: "Sarah Mitchell",
      title: "Senior Talent Acquisition Manager",
      email: "careers@pasakasa.com",
      photo: "/images/team/sarah.jpg", // Optional: Add actual image
      linkedin: "https://linkedin.com/in/sarahmitchell",
    },
    similarJobs: [
      {
        id: "2",
        title: "Backend Engineer",
        location: "Remote",
        salary: "$90,000 - $130,000",
      },
      {
        id: "3",
        title: "UI/UX Designer",
        location: "Hybrid",
        salary: "$70,000 - $100,000",
      },
      {
        id: "4",
        title: "Game Design Intern",
        location: "Remote",
      },
    ],
  },
  {
    id: "2",
    slug: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    description:
      "Join us to build scalable backend systems for our games and learning platform. Experience with Node.js and cloud services required.",
    company: {
      name: "Pasakasa Creations",
      description:
        "At Pasakasa Creations, we're building the future of games and education. Our team is passionate about creating experiences that inspire, educate, and entertain. We combine cutting-edge technology with creative storytelling to deliver products that make a real impact.",
    },
    responsibilities: [
      "Design and implement scalable backend services",
      "Build RESTful APIs and microservices architecture",
      "Optimize database performance and queries",
      "Implement security best practices",
      "Monitor and troubleshoot production systems",
      "Collaborate with frontend and game developers",
    ],
    requirements: [
      "4+ years of backend development experience",
      "Strong proficiency in Node.js and TypeScript",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Database design expertise (PostgreSQL, MongoDB)",
      "Understanding of microservices architecture",
      "Experience with CI/CD pipelines",
      "Strong problem-solving skills",
    ],
    benefits: [
      "Competitive base salary with performance bonuses",
      "Comprehensive health, dental, and vision insurance",
      "Flexible remote work options",
      "Annual learning and development budget",
      "Latest hardware and software tools",
      "Generous vacation and parental leave",
      "Stock options in a growing company",
      "Conference and workshop attendance",
    ],
    contact: {
      name: "Sarah Mitchell",
      title: "Senior Talent Acquisition Manager",
      email: "careers@pasakasa.com",
      linkedin: "https://linkedin.com/in/sarahmitchell",
    },
    similarJobs: [
      {
        id: "1",
        title: "Unity Game Developer",
        location: "Remote",
        salary: "$80,000 - $120,000",
      },
      {
        id: "3",
        title: "UI/UX Designer",
        location: "Hybrid",
        salary: "$70,000 - $100,000",
      },
    ],
  },
  {
    id: "3",
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Hybrid",
    type: "Full-time",
    salary: "$70,000 - $100,000",
    description:
      "Create beautiful and intuitive user interfaces for our games and educational products. Must have a strong portfolio and eye for detail.",
    company: {
      name: "Pasakasa Creations",
      description:
        "At Pasakasa Creations, we're building the future of games and education. Our team is passionate about creating experiences that inspire, educate, and entertain. We combine cutting-edge technology with creative storytelling to deliver products that make a real impact.",
    },
    responsibilities: [
      "Design intuitive user interfaces for games and web applications",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Develop and maintain design systems",
      "Collaborate with developers to ensure design implementation",
      "Stay current with UI/UX trends and best practices",
    ],
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Strong portfolio demonstrating game UI design",
      "Understanding of design principles and typography",
      "Experience with responsive and mobile-first design",
      "Knowledge of HTML/CSS is a plus",
      "Excellent communication skills",
    ],
    benefits: [
      "Competitive base salary with performance bonuses",
      "Comprehensive health, dental, and vision insurance",
      "Hybrid work model with flexible hours",
      "Annual learning and development budget",
      "Latest design tools and software",
      "Generous vacation and parental leave",
      "Stock options in a growing company",
      "Creative workspace and design library",
    ],
    contact: {
      name: "Sarah Mitchell",
      title: "Senior Talent Acquisition Manager",
      email: "careers@pasakasa.com",
      linkedin: "https://linkedin.com/in/sarahmitchell",
    },
    similarJobs: [
      {
        id: "1",
        title: "Unity Game Developer",
        location: "Remote",
        salary: "$80,000 - $120,000",
      },
      {
        id: "2",
        title: "Backend Engineer",
        location: "Remote",
        salary: "$90,000 - $130,000",
      },
    ],
  },
  {
    id: "4",
    slug: "game-design-intern",
    title: "Game Design Intern",
    department: "Game Development",
    location: "Remote",
    type: "Internship",
    description:
      "Learn game development from industry professionals. Work on real projects and gain hands-on experience in a supportive environment.",
    company: {
      name: "Pasakasa Creations",
      description:
        "At Pasakasa Creations, we're building the future of games and education. Our team is passionate about creating experiences that inspire, educate, and entertain. We combine cutting-edge technology with creative storytelling to deliver products that make a real impact.",
    },
    responsibilities: [
      "Assist in designing game mechanics and systems",
      "Create game design documents and prototypes",
      "Participate in playtesting and iteration",
      "Learn from senior game designers",
      "Contribute to brainstorming sessions",
      "Document design decisions and feedback",
    ],
    requirements: [
      "Passion for game development and design",
      "Basic knowledge of Unity or Unreal Engine",
      "Strong creative thinking and problem-solving",
      "Currently pursuing degree in game design, CS, or related field",
      "Excellent communication skills",
      "Self-motivated and eager to learn",
    ],
    benefits: [
      "Monthly stipend",
      "Mentorship from industry professionals",
      "Real-world project experience",
      "Flexible remote work",
      "Learning resources and courses",
      "Potential for full-time conversion",
      "Portfolio-building opportunities",
      "Team events and networking",
    ],
    contact: {
      name: "Sarah Mitchell",
      title: "Senior Talent Acquisition Manager",
      email: "careers@pasakasa.com",
      linkedin: "https://linkedin.com/in/sarahmitchell",
    },
    similarJobs: [
      {
        id: "1",
        title: "Unity Game Developer",
        location: "Remote",
        salary: "$80,000 - $120,000",
      },
      {
        id: "3",
        title: "UI/UX Designer",
        location: "Hybrid",
        salary: "$70,000 - $100,000",
      },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return {
      title: "Job Not Found - Pasakasa Creations",
    };
  }

  return {
    title: `${job.title} - Careers at Pasakasa Creations`,
    description: job.description,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <AnimatedWrapper>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">{job.title}</h1>

                {/* Job Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  {job.visaRequirements && (
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>{job.visaRequirements}</span>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedWrapper>

            {/* The Company */}
            <AnimatedWrapper delay={0.1}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">The Company</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.company.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedWrapper>

            {/* Role and Responsibilities */}
            <AnimatedWrapper delay={0.2}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Role and Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedWrapper>

            {/* Job Requirements */}
            <AnimatedWrapper delay={0.3}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Job Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedWrapper>

            {/* Benefits */}
            <AnimatedWrapper delay={0.4}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                  <ul className="space-y-3">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedWrapper>

            {/* Apply Button */}
            <AnimatedWrapper delay={0.5}>
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 sm:flex-initial">
                  Apply Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                >
                  Save Job
                </Button>
              </div>
            </AnimatedWrapper>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <AnimatedWrapper delay={0.2}>
              <JobContact contact={job.contact} />
            </AnimatedWrapper>

            {/* Similar Jobs */}
            {job.similarJobs && job.similarJobs.length > 0 && (
              <AnimatedWrapper delay={0.3}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Similar Jobs</h3>
                    <div className="space-y-4">
                      {job.similarJobs.map((similarJob) => (
                        <a
                          key={similarJob.id}
                          href={`/careers/${jobs.find((j) => j.id === similarJob.id)?.slug}`}
                          className="block p-4 border rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-all"
                        >
                          <h4 className="font-semibold mb-1 hover:text-primary">
                            {similarJob.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{similarJob.location}</span>
                          </div>
                          {similarJob.salary && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <DollarSign className="h-3 w-3" />
                              <span>{similarJob.salary}</span>
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
