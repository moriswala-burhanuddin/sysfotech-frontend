import {
  ArrowRight,
  Star,
  Quote,
  Shield,
  ExternalLink,
  ShoppingCart,
  Wrench,
  Zap,
  Award,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigation } from "@/hooks/use-navigation";
import SEO from "@/components/SEO";

const Testimonials = () => {
  const { navigateTo } = useNavigation();

  return (
    <>
      <SEO
        title="Testimonials | Web Development Company UK Reviews - Sysfotech"
        description="See what clients say about Sysfotech, a leading web development company UK. Discover how our custom software development UK, mobile app development, AI development, and digital transformation services help businesses grow."
        keywords="web development company uk, website design company london, custom software development uk, mobile app development company uk, erp software development, ai development company uk, business automation solutions, digital transformation services, it solutions company uk, sysfotech reviews"
        type="website"
        url="/testimonials"
        schema={{
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "Organization",
            "name": "Sysfotech"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Trinox Abrasives"
          }
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-tech-dark via-tech-dark to-orange-primary text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Client Testimonials</h1>
              <p className="text-xl leading-relaxed text-gray-200">
                Read success stories from our clients and see how our web development company UK and custom software development services
                have helped businesses achieve real results with digital transformation.
              </p>
            </div>
          </div>
        </section>

        {/* Project Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">
                Our Success Stories
              </h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                Discover how Sysfotech’s IT solutions company UK services and digital transformation expertise help
                businesses across London and globally achieve measurable growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Trinox Abrasives",
                  category: "Industrial Tools & Equipment",
                  icon: Wrench,
                  quote:
                    "Sysfotech transformed our business with a professional website that showcases our industrial grinding wheels and cutting tools. The instant quote system and product catalog have significantly improved our customer engagement and sales process.",
                  features: [
                    "Product Catalog",
                    "Instant Quotes",
                    "Contact Integration",
                    "ISO Certified Showcase",
                    "Bulk Pricing",
                    "Map Integration"
                  ],
                  type: "B2B Industrial Website",
                  link: "https://trinoxabrasives.com"
                },
                {
                  title: "Elegance E-commerce",
                  category: "Fashion & Retail Platform",
                  icon: ShoppingCart,
                  quote:
                    "The Elegance e-commerce platform has revolutionized our traditional clothing business. With seamless shopping cart functionality and beautiful product collections, we've seen a remarkable increase in online sales.",
                  features: [
                    "E-commerce Platform",
                    "User Authentication",
                    "Shopping Cart",
                    "Product Collections",
                    "Modern UI/UX"
                  ],
                  type: "E-commerce Platform",
                  link: "https://elegance-ecommerce-site.netlify.app"
                },
                {
                  title: "Nebula AI Chat",
                  category: "AI Technology",
                  icon: Zap,
                  quote:
                    "Nebula has transformed how we interact with our data. The voice synthesis is natural, and the multi-modal AI capabilities have opened new opportunities.",
                  features: [
                    "Voice Synthesis",
                    "Multi-modal AI",
                    "Real-time Processing",
                    "Context Awareness"
                  ],
                  type: "SaaS Product",
                  link: "#"
                },
                {
                  title: "Decent Institute",
                  category: "Education Management",
                  icon: Award,
                  quote:
                    "Our student inquiries doubled after launching the new website. Parents love the clear structure and smooth navigation.",
                  features: [
                    "Course Management",
                    "Student Portal",
                    "Online Inquiries",
                    "Event Calendar"
                  ],
                  type: "Educational Platform",
                  link: "https://decentinstitute.in/"
                },
                {
                  title: "CRM Pro Dashboard",
                  category: "Business Intelligence",
                  icon: TrendingUp,
                  quote:
                    "The real-time analytics have been a game-changer for our sales team, allowing us to track performance and forecast accurately.",
                  features: [
                    "Real-time Analytics",
                    "Sales Tracking",
                    "Team Management",
                    "Custom Reports"
                  ],
                  type: "B2B Dashboard",
                  link: "https://sysfotech.github.io/crm/"
                },
                {
                  title: "Lumière Restaurant",
                  category: "Hospitality",
                  icon: ExternalLink,
                  quote:
                    "Reservations increased by 40%. The dark-themed design perfectly matches our restaurant's ambiance.",
                  features: [
                    "Table Reservation",
                    "Menu Management",
                    "Event Booking",
                    "Staff Portal"
                  ],
                  type: "Hospitality Website",
                  link: "https://lumiere-restaurant-website.netlify.app/"
                },
                {
                  title: "Dental Care Platform",
                  category: "Healthcare",
                  icon: Shield,
                  quote:
                    "Patients love the AI scheduling. It feels like having a receptionist available 24/7.",
                  features: [
                    "AI Scheduling",
                    "Patient Records",
                    "Prescription Management",
                    "Tele-health"
                  ],
                  type: "Healthcare Platform",
                  link: "https://dental-clinics-website.netlify.app/"
                }
              ].map((project, index) => (
                <Card
                  key={index}
                  className="p-8 border-0 bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-primary/5 rounded-full -mr-16 -mt-16" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-orange-primary/10 rounded-lg flex items-center justify-center">
                        <project.icon className="w-6 h-6 text-orange-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-tech-dark">
                          {project.title}
                        </h3>
                        <p className="text-tech-gray text-sm">
                          {project.category}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-5 h-5 fill-orange-primary text-orange-primary"
                          />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-orange-primary/20 mb-3" />
                      <p className="text-tech-gray leading-relaxed italic">
                        "{project.quote}"
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-orange-primary/10 text-orange-primary text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-tech-gray">Project Type</p>
                        <p className="font-semibold text-tech-dark">
                          {project.type}
                        </p>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-orange-primary hover:opacity-80"
                      >
                        <span className="text-sm font-medium">Visit Site</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-tech-dark to-orange-primary text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Work with a London IT Partner?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Partner with Sysfotech — a London-based IT services company trusted
              by businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigateTo("/contact")}
                size="lg"
                variant="secondary"
                className="bg-white text-tech-dark hover:bg-gray-100"
              >
                Start Your Project <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() =>
                  navigateTo("/services", {
                    type: "section",
                    sectionId: "core-services"
                  })
                }
                size="lg"
                variant="outline"
                className="bg-white text-tech-dark hover:bg-gray-100"
              >
                View Our Services
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonials;
