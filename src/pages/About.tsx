import { ArrowRight, CheckCircle, Users, Award, Shield, Zap, Clock, Code, Palette, Headphones, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigation } from "@/hooks/use-navigation";
import SEO from "@/components/SEO";

const About = () => {
  const { navigateTo } = useNavigation();
  const values = [
    {
      icon: Shield,
      title: "Mission",
      description: "To empower businesses through innovative technology solutions that drive growth, efficiency, and digital transformation."
    },
    {
      icon: Shield,
      title: "Vision",
      description: "To be the leading IT services provider, recognized for excellence, innovation, and delivering exceptional value to our clients."
    },
    {
      icon: Users,
      title: "Values",
      description: "Integrity, innovation, excellence, collaboration, and customer-centricity guide everything we do at Sysfotech."
    }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Lightning Fast Development",
      description: "Our agile development process delivers digital transformation services with rapid delivery without compromising quality. We use cutting-edge technologies and proven methodologies to get your project to market faster.",
      benefit: "50% Faster Time-to-Market"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Security is built into every solution we create. From secure coding practices to comprehensive testing, we ensure your applications are protected against modern threats.",
      benefit: "100% Security Compliant"
    },
    {
      icon: Clock,
      title: "24/7 Support & Maintenance",
      description: <>We provide reliable IT services and <Link to="/services" className="text-orange-primary hover:underline">it service and support</Link> round-the-clock to ensure your systems run smoothly. We provide proactive monitoring and quick response times.</>,
      benefit: "99.9% Uptime Guarantee"
    },
    {
      icon: Code,
      title: "Custom Solutions",
      description: "We provide end-to-end IT solutions including ERP software development and business automation solutions, because every business is unique. We create tailor-made applications that perfectly fit your specific needs.",
      benefit: "100% Custom Development"
    },
    {
      icon: Palette,
      title: "Modern UI/UX Design",
      description: "We create intuitive, beautiful interfaces that enhance user experience and drive engagement. Our designs are both aesthetically pleasing and functionally superior.",
      benefit: "Enhanced User Experience"
    },
    {
      icon: Headphones,
      title: "Dedicated Project Management",
      description: "Every project is assigned a dedicated project manager who ensures clear communication, timely updates, and successful delivery according to your specifications.",
      benefit: "Transparent Communication"
    }
  ];

  const stats = [
    { number: "98%", label: "Client Satisfaction Rate" },
    { number: "15+", label: "Skills & Tools" },
    { number: "7+", label: "Technology Specializations" },
    { number: "24/7", label: "Dedicated Support Available" }
  ];

  return (
    <>
      <SEO
        title="About Sysfotech | Web Development Company UK & AI Development Company"
        description="Sysfotech is a leading web development company UK and AI development company UK. We deliver custom software development, ERP software development, mobile app development, business automation solutions, and digital transformation services. IT solutions company UK trusted by businesses."
        keywords="web development company uk, website design company london, custom software development uk, mobile app development company uk, erp software development, ai development company uk, business automation solutions, digital transformation services, it solutions company uk, about sysfotech"
        type="website"
        url="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Sysfotech",
          "image": "https://sysfotech.uk/office.jpg",
          "description": "Transforming businesses through innovative technology solutions.",
          "url": "https://sysfotech.uk/about",
          "telephone": "+44 74421 93577",
          "email": "info@sysfotech.uk",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "50th High View, Byron Way",
            "addressLocality": "London",
            "postalCode": "UB5 6BL",
            "addressCountry": "GB"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ]
        }}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-tech-dark via-tech-dark to-orange-primary text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">About Sysfotech</h1>
              <p className="text-xl leading-relaxed text-gray-200">
                At Sysfotech, we are more than just an <strong>IT solutions company UK</strong>; we are your dedicated <strong>technology partner</strong>. As a leading <strong>web development company UK</strong>, we deliver custom software development, mobile app development, and comprehensive IT solutions that fit your unique needs.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Our Foundation</h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                As a leading <strong>digital solutions company</strong>, we deliver digital transformation services and business automation solutions built on strong principles that guide our every decision.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-8 text-center border-0 bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-orange-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-orange-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-tech-dark mb-4">{value.title}</h3>
                  <p className="text-tech-gray leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-tech-dark mb-6">Our Story</h2>
                <div className="space-y-6 text-tech-gray leading-relaxed">
                  <p>
                    As a proud <strong>London-based IT company</strong>, Sysfotech was born from a simple belief: technology should empower businesses, not complicate them. We have grown into a leading <Link to="/services" className="text-orange-primary hover:underline"><strong>web development company UK</strong></Link> specialising in custom software development UK and ERP software development, committed to making IT solutions clear, accessible, and effective for companies of all sizes.
                  </p>
                  <p>
                    From day one, our focus has been on blending creativity with technical expertise as an <strong>AI development company UK</strong> and <strong>mobile app development company UK</strong>. With an <strong>experienced IT team</strong> of professionals, we’re committed to delivering reliable websites, mobile apps, and IT services tailored to each client’s needs.
                  </p>
                  <p>
                    Today, Sysfotech is driven by the same passion to help businesses navigate the digital landscape with confidence and achieve measurable success through our digital transformation services.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-tech-dark mb-6">Our Approach</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-tech-dark">Client-Focused Approach</h4>
                      <p className="text-tech-gray">We prioritize understanding your business goals above all else.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-tech-dark">Cutting-Edge Technology</h4>
                      <p className="text-tech-gray">We stay ahead of tech trends to offer the most innovative solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-tech-dark">End-to-End Solutions</h4>
                      <p className="text-tech-gray">From concept to deployment and ongoing support, we've got you covered.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-tech-dark">Transparent Communication</h4>
                      <p className="text-tech-gray">Clear, honest communication throughout every project phase.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-orange-primary mb-2">{stat.number}</div>
                  <div className="text-tech-gray font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Grid */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Why Choose Us</h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                We combine technical expertise with business acumen to deliver solutions that drive real results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="p-6 border-0 bg-white hover:shadow-lg transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <IconComponent className="w-8 h-8 text-orange-primary/20" />
                    </div>

                    <div className="mb-4">
                      <div className="flex mb-3">
                        <IconComponent className="w-6 h-6 text-orange-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-tech-dark mb-3">{feature.title}</h3>
                      <p className="text-tech-gray leading-relaxed mb-4">{feature.description}</p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block bg-orange-primary/10 text-orange-primary text-sm px-3 py-1 rounded-full font-medium">
                            {feature.benefit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Our Commitment to Excellence</h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                We measure our success by the success of our clients and the quality of our deliverables.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center border-0 bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-orange-primary" />
                </div>
                <h3 className="text-3xl font-bold text-tech-dark mb-2">250%</h3>
                <p className="text-orange-primary font-semibold mb-2">Average ROI Increase</p>
                <p className="text-tech-gray">Our clients see significant returns on their technology investments</p>
              </Card>

              <Card className="p-8 text-center border-0 bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-orange-primary" />
                </div>
                <h3 className="text-3xl font-bold text-tech-dark mb-2">95%</h3>
                <p className="text-orange-primary font-semibold mb-2">Client Retention Rate</p>
                <p className="text-tech-gray">Long-term partnerships built on trust and results</p>
              </Card>

              <Card className="p-8 text-center border-0 bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-orange-primary" />
                </div>
                <h3 className="text-3xl font-bold text-tech-dark mb-2">100%</h3>
                <p className="text-orange-primary font-semibold mb-2">Project Success Rate</p>
                <p className="text-tech-gray">Every project delivered on time and within budget</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-tech-dark mb-4">Cutting-Edge Technology Stack</h3>
              <p className="text-tech-gray">We leverage the latest technologies to build robust, scalable, and future-proof solutions</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {[
                "React", "Node.js", "Python",
                "AWS", "Docker", "LLM"
              ].map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-tech-dark/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-tech-dark">{tech}</span>
                  </div>
                  <span className="text-xs text-tech-gray font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-tech-dark to-orange-primary text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Let’s discuss how our custom software development UK expertise and digital transformation services can help elevate your business.
            </p>
            <Button onClick={() => navigateTo('/contact', { type: 'menu' })} size="lg" variant="secondary" className="bg-white text-tech-dark hover:bg-gray-100">
              Get in Touch <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;