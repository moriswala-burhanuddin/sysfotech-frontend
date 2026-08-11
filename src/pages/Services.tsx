import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle, Code, Smartphone, TrendingUp, Globe, Shield, Database, Zap, Palette, BarChart3, Settings, Users, Target, Lightbulb, Cpu } from "lucide-react";
import { useNavigation } from "@/hooks/use-navigation";
import SEO from "@/components/SEO";

const Services = () => {
  const { navigateTo } = useNavigation();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mapping between internal IDs and convenient URL slugs
  const slugMap: Record<string, string> = {
    'web': 'website-development-company-uk',
    'mobile': 'mobile-app-development-uk',
    'design': 'ui-ux-design-company-uk',
    'marketing': 'digital-marketing-agency-uk',
    'server': 'it-service-and-support',
    'seo': 'seo-services-uk',
    'testing': 'software-testing-services',
    'support': 'it-support-maintenance'
  };

  // Reverse map for lookup (slug -> ID)
  const idMap = Object.entries(slugMap).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<string, string>);

  const defaultTab = 'web';
  const activeTab = slug ? (idMap[slug] || defaultTab) : defaultTab;

  const handleTabChange = (value: string) => {
    const newSlug = slugMap[value];
    if (newSlug) {
      navigate(`/services/${newSlug}`);
    } else {
      navigate('/services');
    }
  };

  const mainServices = [
    {
      id: "web",
      icon: Code,
      title: "Website Development Company in UK",
      description: "We are a leading web development company UK providing custom software development UK solutions — from affordable websites to enterprise-grade applications.",
      details: [
        "Python Backend Development",
        "AI Powered Solutions",
        "React.js Development",
        "Node.js Solutions",
        "Plain HTML/CSS + JavaScript",
        "Vue.js Applications",
        "Angular Solutions",
        "PHP Development",
        "WordPress Development",
        "Java Applications",
        "Shopify/Wix Development"
      ]
    },
    {
      id: "design",
      icon: Palette,
      title: "Website Design Companies London",
      description: "As a premier web design company london and web designing company in uk, we create intuitive user experiences.",
      details: [
        "Figma Design & Prototyping",
        "User Experience Research",
        "Interface Design",
        "Design Systems",
        "Wireframing & Mockups"
      ]
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: "Mobile App Development Company UK",
      description: "Our professional mobile app developers in UK build native and cross-platform mobile applications for iOS and Android, powered by AI development capabilities.",
      details: [
        "Native iOS (Swift)",
        "Native Android (Kotlin/Java)",
        "React Native",
        "Flutter Development",
        "App Store Optimization",
        "Mobile UI/UX Design"
      ]
    },
    {
      id: "testing",
      icon: CheckCircle,
      title: "Testing & QA",
      description: "Comprehensive quality assurance to ensure flawless software delivery.",
      details: [
        "Manual Testing",
        "Automated Testing",
        "Performance Testing",
        "Security Testing",
        "User Acceptance Testing",
        "Test Case Development"
      ]
    },
    {
      id: "server",
      icon: Cpu,
      title: "IT Service and Support",
      description: "Complete ERP software development, business automation solutions, and IT infrastructure services for SMEs.",
      details: [
        "Firewall setup and management for secure operations",
        "WiFi configuration and optimization for performance and reliability",
        "Network troubleshooting and connectivity issue resolution",
        "VoIP system setup and troubleshooting for seamless communication",
        "Security implementation: endpoint protection, data backup, and disaster recovery",
        "Network Setup",
        "Hardware Installation",
        "System Configuration",
        "Infrastructure Planning"
      ]
    },
    {
      id: "seo",
      icon: BarChart3,
      title: "SEO Services",
      description: "Boost your online visibility and drive organic traffic to your website with our expert strategies.",
      details: [
        "On-Page SEO",
        "Technical SEO",
        "Keyword Research",
        "Content Optimization",
        "Link Building",
        "Local SEO"
      ]
    },
    {
      id: "marketing",
      icon: TrendingUp,
      title: "B2B SaaS SEO & Marketing",
      description: "Comprehensive digital transformation services and marketing strategies to grow your presence. We are one of the top IT companies in London UK.",
      details: [
        "Social Media Marketing",
        "Pay-Per-Click (PPC)",
        "Email Marketing",
        "Content Marketing",
        "Brand Strategy",
        "Analytics & Reporting"
      ]
    },
    {
      id: "support",
      icon: Settings,
      title: "Support & Maintenance",
      description: "Ongoing support and maintenance to keep your systems running smoothly, one of the trusted it companies uk.",
      details: [
        "24/7 Technical Support",
        "Regular Updates",
        "Bug Fixes",
        "Performance Monitoring",
        "Security Patches",
        "Backup Management"
      ]
    }
  ];

  // Current service for SEO
  const currentService = mainServices.find(s => s.id === activeTab);

  const additionalServices = [
    {
      icon: Database,
      title: "Server Administration",
      description: "Professional server management and infrastructure solutions.",
      features: [
        "Cloud Server Setup",
        "Database Management",
        "System Monitoring",
        "Backup Solutions",
        "Performance Optimization",
        "24/7 Server Support"
      ]
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Protect your business from digital threats with our comprehensive security solutions.",
      features: ["Vulnerability Assessment", "Security Audits", "Firewall Configuration", "Data Protection"]
    },
    {
      icon: Users,
      title: "Social Media Management",
      description: "Build and maintain your brand presence across all social media platforms.",
      features: ["Content Creation", "Community Management", "Social Media Strategy", "Analytics Reporting"]
    },
    {
      icon: Lightbulb,
      title: "Training & Courses",
      description: "Upskill your team with our professional training programs covering AI development, custom software, and emerging technologies.",
      features: ["AI Development Courses", "Custom Software Training", "Cybersecurity Awareness", "Digital Transformation Workshops"]
    }
  ];

  return (
    <>
      <SEO
        title={currentService ? `${currentService.title} | Sysfotech` : "Web Development Company UK | Custom Software & IT Solutions | Sysfotech"}
        description={currentService ? currentService.description : "Leading web development company UK and website design company London offering custom software development, mobile app development, ERP software development, AI development, business automation solutions, and digital transformation services."}
        keywords={currentService ? `${currentService.title.toLowerCase()}, web development company uk, custom software development uk, it solutions company uk, sysfotech services` : "web development company uk, website design company london, custom software development uk, mobile app development company uk, erp software development, ai development company uk, business automation solutions, digital transformation services, it solutions company uk"}
        type="website"
        url={`https://sysfotech.uk/services/${slugMap[activeTab] || ''}`}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-tech-dark via-tech-dark to-orange-primary text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Leading Web Development Company UK | Custom Software & IT Solutions</h1>
              <p className="text-xl leading-relaxed text-gray-200">
                Comprehensive digital transformation services designed to transform your business and drive growth.
                From AI development and ERP software development to business automation solutions, we've got all your technology needs covered.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section id="core-services" className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Our Core Digital Transformation Services</h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                Our primary service offerings including business automation solutions that form the foundation of digital transformation.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-muted/50">
                {mainServices.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="flex flex-col items-center p-3 data-[state=active]:bg-orange-primary data-[state=active]:text-white"
                  >
                    <service.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium hidden sm:block">{service.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {mainServices.map((service) => (
                <TabsContent key={service.id} value={service.id} className="mt-8">
                  <Card className="p-8 border-0 bg-white shadow-lg">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="w-16 h-16 bg-orange-primary/10 rounded-lg flex items-center justify-center mb-6">
                          <service.icon className="w-8 h-8 text-orange-primary" />
                        </div>
                        <h3 className="text-3xl font-bold text-tech-dark mb-4">{service.title}</h3>
                        <p className="text-xl text-tech-gray mb-6">{service.description}</p>
                        <Button onClick={() => navigateTo("/contact")} className="bg-orange-primary hover:bg-orange-dark">
                          Get Started <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-tech-dark mb-4">What's Included:</h4>
                        <div className="space-y-3">
                          {service.details.map((detail, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-orange-primary flex-shrink-0" />
                              <span className="text-tech-gray">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Additional Services */}
        <section id="additional-services" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Additional Services</h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                Extended capabilities to support your complete digital transformation journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="p-6 border-0 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-orange-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-orange-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-tech-dark mb-3">{service.title}</h3>
                  <p className="text-tech-gray mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-primary rounded-full"></div>
                        <span className="text-sm text-tech-gray">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-tech-dark to-orange-primary text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Digital Transformation?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Let’s discuss your project requirements and create a custom software development solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigateTo("/contact")} size="lg" variant="secondary" className="bg-white text-tech-dark hover:bg-gray-100">
                Start Your Project <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button onClick={() => navigateTo("/about")} size="lg" variant="outline" className="bg-white text-tech-dark hover:bg-gray-100">
                Learn More About Us
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;