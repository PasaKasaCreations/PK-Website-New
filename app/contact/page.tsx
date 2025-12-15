import { Metadata } from "next";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { ContactForm } from "@/components/shared/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
  MessageCircle,
  Clock,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Pasakasa Creations",
  description:
    "Get in touch with Pasakasa Creations in Kathmandu. Ask about our live game development classes, games, or collaboration opportunities.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@pasakasacreations.com",
    href: "mailto:info@pasakasacreations.com",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+977 9840000000",
    href: "tel:+9779840000000",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kathmandu, Nepal",
    href: null,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
];

const faqs = [
  {
    question: "How do I join a live class?",
    answer:
      "Check our Courses page for upcoming batches. Contact us to reserve your spot or fill the inquiry form. Classes are held physically in Kathmandu.",
  },
  {
    question: "Are the classes beginner-friendly?",
    answer:
      "Absolutely! We offer classes for complete beginners to intermediate developers. If you can use a computer, you can learn game dev with us.",
  },
  {
    question: "Where are the classes held?",
    answer:
      "All our classes are in-person, held in Kathmandu, Nepal. Small batch sizes mean personalized attention and real instructor interaction.",
  },
  {
    question: "Can I download your games for free?",
    answer:
      "Yes! Teen Patti Friends and Callbreak Multiplayer are free to download on Play Store and App Store. Give them a try!",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-600 via-blue-700 to-blue-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedWrapper>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                GET IN TOUCH
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Let's Build Something
                <br />
                Amazing Together
              </h1>

              <p className="text-xl md:text-2xl text-blue-100">
                Have questions about our courses or games? Want to collaborate?
                We'd love to hear from you!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  <span className="text-lg">24-Hour Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-lg">Friendly Support</span>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <AnimatedWrapper delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-lg text-muted-foreground">
                    Got questions about our live classes? Want to know more
                    about our games? Interested in collaboration? Just drop us a
                    message. We're gamers too, we get it—we'll get back to you
                    within 24 hours.
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                  <p className="text-muted-foreground mb-6">
                    Stay connected with us on social media for the latest
                    updates, announcements, and more.
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
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Quick answers to common questions
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
                  Ready to Start Your Journey?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you want to learn game development or have a business
                  inquiry, we're here to help. Fill out the form above and let's
                  get started!
                </p>
              </div>
            </section>
          </AnimatedWrapper>
        </div>
      </div>
    </div>
  );
}
