import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ArrowRight, CheckCircle, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    budget: "",
    timeline: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone || "+00000000000",
        service_needed: formData.service || "NA",
        project_description: formData.message,
        budget_range: formData.budget || "NA",
        timeline: formData.timeline || "NA",
        source: "website"
      };

      const response = await fetch('https://sysfotech.uk/api/inquiries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
          budget: "",
          timeline: ""
        });
      } else {
        throw new Error('Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our London Office",
      details: ["50th High View", "Byron Way", "London UB5 6BL"]
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+44 74421 93577", "Available 24/7"]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@sysfotech.uk", "support@sysfotech.uk"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Weekend: Emergency Support"]
    }
  ];

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing & SEO",
    "B2B SaaS Solutions",
    "Cybersecurity",
    "Cloud Solutions",
    "IT Service & Support",
    "Consultation",
    "Other"
  ];

  const budgetRanges = [
    "Under £5,000",
    "£5,000 - £10,000",
    "£10,000 - £25,000",
    "£25,000 - £50,000",
    "£50,000 - £100,000",
    "Over £100,000"
  ];

  const timelineOptions = [
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3-6 months",
    "6+ months",
    "Flexible"
  ];

  return (
    <>
      <SEO
        title="Contact Web Development Company UK | IT Solutions London | Sysfotech"
        description="Contact Sysfotech, a leading web development company UK and website design company London. We offer custom software development UK, mobile app development, AI development, ERP software development, business automation solutions, and digital transformation services. Call +44 74421 93577"
        keywords="web development company uk, website design company london, custom software development uk, mobile app development company uk, erp software development, ai development company uk, business automation solutions, digital transformation services, it solutions company uk, contact sysfotech"
        type="website"
        url="https://sysfotech.uk/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Sysfotech - Web Development Company UK",
          "description": "Get in touch with Sysfotech, a leading web development company UK and IT solutions company UK offering custom software development, AI development, and digital transformation services.",
          "url": "https://sysfotech.uk/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Sysfotech",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "50th High View, Byron Way",
              "addressLocality": "London",
              "postalCode": "UB5 6BL",
              "addressCountry": "GB"
            },
            "telephone": "+44 74421 93577",
            "email": "info@sysfotech.uk",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+44 74421 93577",
              "contactType": "customer support",
              "availableLanguage": "En",
              "areaServed": "GB"
            }
          }
        }}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-tech-dark via-tech-dark to-orange-primary text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Web Development Company UK - Contact Sysfotech</h1>
              <p className="text-xl leading-relaxed text-gray-200 mb-6">
                Looking for a trusted web development company UK? As a leading website design company London and custom software development UK provider,
                we specialise in creating innovative digital solutions including AI development and digital transformation services.
              </p>
              <p className="text-lg text-gray-300">
                From mobile app development to ERP software development and business automation solutions, we're your partner for growth.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-tech-dark mb-4">Get in Touch with IT Solutions Company UK</h2>
              <p className="text-lg text-tech-gray max-w-3xl mx-auto">
                As a premier IT solutions company UK, we provide comprehensive ERP software development, business automation solutions,
                and digital transformation services to help your business thrive.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 text-center border-0 bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-orange-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-tech-dark mb-3">{info.title}</h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-tech-gray text-sm">
                      {detail}
                    </p>
                  ))}
                </Card>
              ))}
            </div>

            {/* Contact Form and Services Info */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-tech-dark mb-6">Request a Free Consultation</h2>
                <p className="text-tech-gray mb-8">
                  Whether you need custom software development UK, mobile app development company UK services, or AI development solutions,
                  our team is ready to help. Fill out the form and we'll respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-tech-dark mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="border-border focus:border-orange-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-tech-dark mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@company.com"
                        className="border-border focus:border-orange-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-tech-dark mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44 20 7946 0958"
                        className="border-border focus:border-orange-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-tech-dark mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="border-border focus:border-orange-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-tech-dark mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-orange-primary"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-tech-dark mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-orange-primary"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((budget, index) => (
                          <option key={index} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-tech-dark mb-2">
                        Project Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-orange-primary"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((timeline, index) => (
                          <option key={index} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-tech-dark mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      rows={6}
                      className="border-border focus:border-orange-primary"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-primary hover:bg-orange-dark">
                    Send Message <Send className="ml-2" size={16} />
                  </Button>
                </form>
              </div>

              {/* Services & London Connection */}
              <div>
                <h2 className="text-3xl font-bold text-tech-dark mb-6">Web Development Company in London</h2>
                <p className="text-tech-gray mb-8">
                  Based in London, we're a full-service web design company London businesses trust.
                  Our expertise spans website development London, digital marketing agency for startups,
                  and specialized B2B SaaS SEO services.
                </p>

                {/* Our Services */}
                <Card className="p-6 border-0 bg-orange-primary/5 mb-8">
                  <h3 className="text-xl font-semibold text-tech-dark mb-4">Our Core Services</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-tech-dark">Website Development London</h4>
                        <p className="text-sm text-tech-gray">Custom web solutions tailored to your business needs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-tech-dark">Digital Marketing for Startups</h4>
                        <p className="text-sm text-tech-gray">Growth-focused strategies for emerging businesses</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-tech-dark">B2B SaaS SEO</h4>
                        <p className="text-sm text-tech-gray">Specialized SEO strategies for SaaS companies</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-tech-dark">IT Service & Support</h4>
                        <p className="text-sm text-tech-gray">24/7 technical support and maintenance</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* London Meeting Options */}
                <Card className="p-6 border-0 bg-orange-primary/5 mb-8">
                  <h3 className="text-xl font-semibold text-tech-dark mb-4">Let's Connect in London</h3>
                  <p className="text-sm text-tech-gray mb-4">
                    Prefer a face-to-face meeting? We offer flexible consultation options across London.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-tech-dark text-sm">Virtual Meeting</h4>
                        <p className="text-xs text-tech-gray">Online consultation via video call</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-tech-dark text-sm">Coffee Meeting</h4>
                        <p className="text-xs text-tech-gray">Casual discussion at your preferred location in London</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-tech-dark text-sm">Office Visit</h4>
                        <p className="text-xs text-tech-gray">Professional meeting at our London office</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Contact */}
                <Card className="p-6 border-0 bg-orange-primary/5">
                  <h3 className="text-xl font-semibold text-tech-dark mb-4">Quick Response Guarantee</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-orange-primary flex-shrink-0" />
                      <span className="text-tech-gray text-sm">Live chat available on our website</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-orange-primary flex-shrink-0" />
                      <span className="text-tech-gray text-sm">24/7 emergency support line</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-orange-primary flex-shrink-0" />
                      <span className="text-tech-gray text-sm">Response within 2 hours during business hours</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Why Choose Our Web Development Agency in London?</h2>
              <p className="text-lg text-tech-gray max-w-3xl mx-auto">
                As a trusted website development company in London, we combine technical expertise with strategic thinking
                to deliver exceptional results for businesses of all sizes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 border-0 bg-white text-center">
                <div className="w-16 h-16 bg-orange-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-primary" />
                </div>
                <h3 className="text-xl font-semibold text-tech-dark mb-3">Proven Track Record</h3>
                <p className="text-tech-gray">
                  Years of experience delivering successful projects for IT companies in London and international clients.
                </p>
              </Card>

              <Card className="p-6 border-0 bg-white text-center">
                <div className="w-16 h-16 bg-orange-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-orange-primary" />
                </div>
                <h3 className="text-xl font-semibold text-tech-dark mb-3">Comprehensive Solutions</h3>
                <p className="text-tech-gray">
                  From web design in London to digital marketing and ongoing IT service and support.
                </p>
              </Card>

              <Card className="p-6 border-0 bg-white text-center">
                <div className="w-16 h-16 bg-orange-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-orange-primary" />
                </div>
                <h3 className="text-xl font-semibold text-tech-dark mb-3">Dedicated Support</h3>
                <p className="text-tech-gray">
                  24/7 IT service and support to ensure your business runs smoothly without interruption.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                Common questions about our web development services, IT service and support, and digital marketing solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  question: "What makes you different from other IT companies in London?",
                  answer: "As a leading web development company London, we combine cutting-edge technology with strategic business insights. Our team specializes in website development London, digital marketing agency for startups services, and B2B SaaS SEO, ensuring comprehensive solutions tailored to your unique needs."
                },
                {
                  question: "Do you provide IT service and support after project completion?",
                  answer: "Absolutely! We offer comprehensive IT service and support packages including 24/7 monitoring, regular updates, security patches, performance optimization, and dedicated technical support to ensure your digital assets remain secure and perform optimally."
                },
                {
                  question: "Can you help with digital marketing for startups?",
                  answer: "Yes! As a specialized digital marketing agency for startups, we understand the unique challenges of emerging businesses. We offer tailored strategies including B2B SaaS SEO, content marketing, social media management, and conversion optimization to accelerate your growth."
                },
                {
                  question: "What is your approach to B2B SaaS SEO?",
                  answer: "Our B2B SaaS SEO strategy focuses on technical optimization, content marketing, link building, and conversion rate optimization. We understand the SaaS business model and create SEO campaigns that drive qualified leads and sustainable growth for your platform."
                },
                {
                  question: "Where is your web design company London office located?",
                  answer: "Our web design company London office is located at 50th High View, Byron Way, London UB5 6BL. We welcome clients for in-person consultations, virtual meetings, or casual coffee discussions anywhere in London."
                },
                {
                  question: "What is your typical website development London timeline?",
                  answer: "Website development London timelines vary based on project complexity. Simple websites typically take 2-4 weeks, while complex web applications and enterprise solutions can take 3-6 months. We provide detailed project timelines during our initial consultation and maintain transparent communication throughout development."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6 border-0 bg-white hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-tech-dark mb-3">{faq.question}</h3>
                  <p className="text-tech-gray text-sm leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-tech-dark to-orange-primary text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Partner with a Leading Web Development Agency in London</h2>
            <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Ready to transform your digital presence? Contact our web development company in London today.
              Whether you need website development, digital marketing for startups, or ongoing IT service and support,
              we're here to help your business succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-tech-dark hover:bg-gray-100">
                <a href="tel:+447442193577">
                  Call Now: +44 74421 93577 <ArrowRight className="ml-2" size={20} />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-white/10 text-white border border-white hover:bg-white hover:text-tech-dark transition-colors">
                <a href="mailto:info@sysfotech.uk">
                  Email Us <Mail className="ml-2" size={20} />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;