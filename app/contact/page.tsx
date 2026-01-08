import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ContactForm } from "@/components/shared/ContactForm";
import { ContactHero } from "@/components/contact";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Pasakasa Creations - Game Development Studio in Nepal",
  description:
    "Reach out to Pasakasa Creations in Kathmandu, Nepal. Questions about game development courses, our mobile games, or partnership opportunities? We respond within 24 hours.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@pasakasacreations.com",
    subtitle: "Best for detailed inquiries",
    href: "mailto:contact@pasakasacreations.com",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+977 9840000000",
    subtitle: "Mon-Fri, 10am-6pm NPT",
    href: "tel:+9779840000000",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kathmandu, Nepal",
    subtitle: "Visits by appointment",
    href: null,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
];

const faqs = [
  {
    question: "How do I join a live class?",
    answer:
      "Head over to our Courses page to see upcoming batches, then reach out to reserve your spot. All our classes are in-person right here in Kathmandu — no Zoom calls, just real face-to-face learning.",
  },
  {
    question: "Are the classes beginner-friendly?",
    answer:
      "Absolutely! Whether you're just starting out or have some coding experience, we've got you covered. If you can use a computer and have a genuine interest in games, you're ready to learn with us.",
  },
  {
    question: "Where are the classes held?",
    answer:
      "We teach in-person at our location in Kathmandu, Nepal. We keep our classes small intentionally — this means you get personalized attention, direct feedback, and genuine connections with your instructors and fellow learners.",
  },
  {
    question: "Can I download your games for free?",
    answer:
      "Yes — our games Teen Patti Friends and Callbreak Multiplayer are completely free to play! Download them from the Play Store or App Store and see what we've been building.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <AnimatedWrapper delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
                  <p className="text-lg text-muted-foreground">
                    Have questions about our in-person game development classes?
                    Curious about our mobile games? Thinking about a
                    collaboration? We'd love to hear from you. As fellow gamers,
                    we understand how important quick responses are — expect to
                    hear back from us within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card
                        key={index}
                        className="border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`h-12 w-12 rounded-full ${info.bgColor} flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className={`h-6 w-6 ${info.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                {info.title}
                              </h3>
                              {info.href ? (
                                <a
                                  href={info.href}
                                  className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <p className="text-muted-foreground font-medium">
                                  {info.value}
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground/70 mt-1">
                                {info.subtitle}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-lg mb-4">Stay in the Loop</h3>
                  <p className="text-muted-foreground mb-6">
                    Follow along for game updates, behind-the-scenes peeks,
                    course announcements, and more from our team.
                  </p>
                  <div className="flex gap-4">
                    {[
                      { name: "Twitter", initial: "T" },
                      { name: "LinkedIn", initial: "L" },
                      { name: "GitHub", initial: "G" },
                      { name: "Instagram", initial: "I" },
                    ].map((social, index) => (
                      <a
                        key={social.name}
                        href="#"
                        className={`h-12 w-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                          index % 2 === 0
                            ? "border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white"
                            : "border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white"
                        }`}
                      >
                        {social.initial}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedWrapper>

            {/* Contact Form */}
            <AnimatedWrapper delay={0.3}>
              <ContactForm />
            </AnimatedWrapper>
          </div>

          {/* FAQ Section */}
          <AnimatedWrapper delay={0.4}>
            <section className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Questions? We've Got Answers
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Here are some things people often ask us
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="border-2 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            ?
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 text-lg">
                            {faq.question}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </AnimatedWrapper>

          {/* CTA Section */}
          <AnimatedWrapper delay={0.5}>
            <section className="mt-20 max-w-4xl mx-auto">
              <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-orange-500/10 via-blue-500/10 to-orange-500/10 border-2 border-dashed border-orange-300 dark:border-orange-700">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
                  <Send className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Take the Next Step?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you're looking to master game development, explore
                  partnership opportunities, or simply have a question — we're
                  here for you. Scroll up, fill out the form, and let's start a
                  conversation.
                </p>
              </div>
            </section>
          </AnimatedWrapper>
        </div>
      </div>
    </div>
  );
}
