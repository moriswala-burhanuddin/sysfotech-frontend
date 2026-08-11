import { ArrowRight, CheckCircle, Code2, Globe, Laptop, Layout, Smartphone, Cloud, Database, BarChart, ShoppingBag, Terminal, Users, Award, Shield, ExternalLink, Speaker, Activity, ShoppingCart, Wrench, Quote, Star, TrendingUp, Zap, Clock, Code, Palette, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigation } from "@/hooks/use-navigation";
import SEO from "@/components/SEO";
import { blogs } from "@/data/blogs";
import BentoProjects from "@/components/Projects/BentoProjects";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-image.jpg";
import CapsuleCTA from "@/components/CTA/CapsuleCTA";



const HeroSection = () => {
  const { navigateTo } = useNavigation();
  const { scrollY } = useScroll();

  // MOUSE TILT EFFECT
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]); // Reduced tilt for smoothness
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = (mouseX / width - 0.5) * 200;
      const yPct = (mouseY / height - 0.5) * 200;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  }

  return (
    <section
      className="relative min-h-[130vh] flex flex-col justify-center overflow-hidden bg-[#050505] pt-40 pb-32 perspective-2000"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      {/* SOLID BACKGROUND - NO PARTICLES/WARP FOR MAX PERFORMANCE */}

      <div className="container relative z-10 mx-auto px-6 h-full flex items-center justify-center">

        {/* GLOBAL 3D TILT CONTAINER */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 gap-6 w-full max-w-7xl h-auto lg:h-[800px] transform-style-3d"
        >

          {/* 1. TITLE BLOCK: SOLID DARK ZINC */}
          <motion.div
            className="lg:col-span-3 lg:row-span-2 relative bg-zinc-900 border border-white/10 rounded-[2rem] p-8 lg:p-12 flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-colors duration-300"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono tracking-widest uppercase">
                  System Online
                </div>
                <div className="h-px w-20 bg-orange-500/30"></div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-4">
                FUTURE <br />
                <span className="text-gray-500">READY.</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-400 max-w-lg font-light leading-relaxed">
                Precision engineering for the digital age. As a leading <strong>web development company in the UK</strong> and <strong>website design company in London</strong>, we build the systems that define tomorrow.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 mt-8">
              <Button asChild className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all font-bold tracking-tight">
                <Link to="/contact">Initialize Project</Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-8 text-lg rounded-full border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white hover:scale-105 transition-all font-bold tracking-tight">
                <Link to="/courses">1 Week FREE Demo</Link>
              </Button>
            </div>
          </motion.div>


          {/* 2. STACK BLOCK: SOLID ZINC */}
          <motion.div
            className="lg:col-span-1 lg:row-span-2 relative bg-zinc-900 border border-white/5 rounded-[2rem] flex items-center justify-center overflow-hidden grouped-hover:border-white/10 transition-colors"
            style={{ transform: "translateZ(50px)" }}
          >
            {/* 3D Stack Container */}
            <div className="relative w-40 h-40 transform-style-3d rotate-x-60 rotate-z-[-45deg] group hover:scale-110 transition-transform duration-500">

              {/* Layer 1 */}
              <motion.div
                animate={{ z: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-neutral-800 border border-white/10 rounded-xl flex items-center justify-center shadow-2xl"
                style={{ transform: "translateZ(0px)" }}
              >
                <div className="w-8 h-8 rounded-full bg-neutral-700"></div>
              </motion.div>

              {/* Layer 2 */}
              <motion.div
                animate={{ z: [20, 35, 20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 bg-neutral-700 border border-white/10 rounded-xl flex items-center justify-center shadow-2xl"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="w-16 h-2 bg-neutral-600 rounded-full"></div>
              </motion.div>

              {/* Layer 3 */}
              <motion.div
                animate={{ z: [40, 60, 40] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute inset-0 bg-orange-600 border border-orange-400/50 rounded-xl flex items-center justify-center shadow-2xl"
                style={{ transform: "translateZ(40px)" }}
              >
                <span className="font-bold text-white text-xs">SYS</span>
              </motion.div>
            </div>
          </motion.div>


          {/* 3. METRICS: SOLID ORANGE */}
          <motion.div
            className="lg:col-span-2 relative bg-[#ea580c] border border-orange-600 rounded-[2rem] p-8 flex items-center justify-between group overflow-hidden hover:scale-[1.01] transition-transform duration-300"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="relative z-10">
              <div className="text-orange-900 text-sm font-bold uppercase tracking-widest mb-1">Global Scale</div>
              <div className="text-5xl font-black text-white tracking-tight flex items-baseline gap-2">
                150+ <span className="text-lg font-normal text-orange-100">Deployments</span>
              </div>
            </div>
            <div className="relative z-10 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="text-white w-8 h-8" />
            </div>
          </motion.div>


          {/* 4. TECH STACK: SOLID NEUTRAL */}
          <motion.div
            className="lg:col-span-2 relative bg-neutral-900 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center overflow-hidden hover:border-white/10 transition-colors"
            style={{ transform: "translateZ(10px)" }}
          >
            <div className="text-gray-500 text-xs font-mono mb-4 uppercase">Core Matrix</div>
            <div className="flex gap-6 items-center">
              <Code className="w-8 h-8 text-white" />
              <div className="h-8 w-px bg-white/10"></div>
              <span className="text-xl font-bold text-gray-300">React</span>
              <span className="text-xl font-bold text-gray-300">Node</span>
              <span className="text-xl font-bold text-gray-300">AWS</span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* VELOCITY MARQUEE CAROUSEL - OPTIMIZED: FASTER & SMALLER */}
      <div className="absolute bottom-0 w-full overflow-hidden bg-white/5 backdrop-blur-[2px] border-t border-white/5 py-8 z-20">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }} // FASTER: 15s instead of 40s
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8">
              {["WEB DEVELOPMENT", "CUSTOM SOFTWARE", "MOBILE APPS", "AI SOLUTIONS", "ERP SOFTWARE", "BUSINESS AUTOMATION", "DIGITAL TRANSFORMATION"].map((item) => (
                <div key={item} className="flex items-center gap-6">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 tracking-tight select-none"> {/* Smaller Text: 5xl */}
                    {item}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => {
  const { navigateTo } = useNavigation();
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "As a top web development company UK, we build custom software development UK solutions with modern technologies like React, Vue, and Angular."
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Leading mobile app development company UK delivering native iOS & Android apps plus cross-platform solutions with React Native & Flutter."
    },
    {
      icon: Shield,
      title: "IT Solutions & Automation",
      description: "Complete business automation solutions and IT solutions company UK services — from network infrastructure to ERP software development."
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "SEO, social media management, and digital transformation services to grow your online presence and drive measurable results."
    }
  ];

  const stats = [
    { number: "10+", label: "Projects Successfully Delivered" },
    { number: "7+", label: "Happy Clients Across Industries" },
    // { number: "2+", label: "Years Of Experience" },
    { number: "24/7", label: "Dedicated Support Available" }
  ];

  const features = [
    "Expert team of developers and designers",
    "Cutting-edge technology solutions",
    "24/7 customer support and maintenance",
    "Competitive pricing and timely delivery",
    "Proven track record of successful projects",
    "Comprehensive testing and quality assurance"
  ];

  const processSteps = [
    { icon: Activity, title: "Discovery", description: "We analyze your requirements and business goals." },
    { icon: Layout, title: "Design", description: "Creating intuitive and engaging user interfaces." },
    { icon: Terminal, title: "Development", description: "Building robust solutions with clean code." },
    { icon: CheckCircle, title: "Launch", description: "Deploying your solution and ensuring smooth operation." }
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Lightning Fast Development",
      description: "As a trusted web development company UK, our agile development process ensures rapid delivery without compromising quality. We use cutting-edge technologies and proven methodologies to get your project to market faster.",
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
      description: "Our dedicated support team is available round-the-clock to ensure your systems run smoothly. We provide proactive monitoring and quick response times.",
      benefit: "99.9% Uptime Guarantee"
    },
    {
      icon: Code,
      title: "Custom Solutions",
      description: "Every business is unique. From custom software development UK to ERP software development, we create tailor-made applications including business automation solutions that perfectly fit your specific needs.",
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

  const faqs = [
    { question: "How long does it take to build a website?", answer: "As a leading website design company London, the timeline depends on complexity. A simple website might take 2-4 weeks, while custom software development UK projects could take 2-3 months." },
    { question: "Do you provide maintenance after launch?", answer: "Yes, we offer ongoing maintenance and support packages to ensure your digital product remains up-to-date and secure as part of our IT solutions company UK services." },
    { question: "What technologies do you use?", answer: "We specialise in custom software development and AI development using React, Node.js, Python, AWS, and more — choosing the best fit for your specific needs." },
    { question: "Can you help with digital transformation?", answer: "Absolutely. We deliver comprehensive digital transformation services, business automation solutions, and ERP software development to modernise your operations and drive growth." }
  ];

  const latestBlogs = blogs.slice(0, 3);

  return (
    <>
      <SEO
        title="Web Development Company UK | IT Solutions Company London"
        description="Sysfotech is a leading web development company in the UK and website design company in London. We specialise in custom software development UK, mobile app development, AI development, ERP software development, business automation solutions, and digital transformation services."
        keywords="web development company uk, website design company london, custom software development uk, mobile app development company uk, erp software development, ai development company uk, business automation solutions, digital transformation services, it solutions company uk"
        type="website"
        url="https://sysfotech.uk/"
        image="https://sysfotech.uk/og-image.jpg"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sysfotech",
            "url": "https://sysfotech.uk/",
            "logo": "https://sysfotech.uk/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+44 74421 93577",
              "contactType": "customer service",
              "email": "info@sysfotech.uk",
              "areaServed": "GB",
              "availableLanguage": "en"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "50th High View, Byron Way",
              "addressLocality": "London",
              "postalCode": "UB5 6BL",
              "addressCountry": "GB"
            },
            "sameAs": [
              "https://www.facebook.com/sysfotech",
              "https://www.linkedin.com/company/sysfotech",
              "https://twitter.com/sysfotech"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Sysfotech",
            "url": "https://sysfotech.uk/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://sysfotech.uk/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      <div className="min-h-screen">
        {/* Hero Section (NEW 3D TEXT DESIGN) */}
        {/* Hero Section (ADVANCED INTERACTIVE 3D) */}
        <HeroSection />

        {/* Dedicated Courses CTA Banner */}
        <section className="py-12 bg-orange-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/30 text-white text-xs font-bold tracking-wider uppercase mb-3 border border-orange-400/50">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live Training Available
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                Master IT & Accelerate Your Career
              </h2>
              <p className="text-orange-100 text-lg">
                Join our professional certification courses in London. 
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg h-14 px-8 rounded-full shadow-xl w-full sm:w-auto hover:scale-105 transition-transform">
                <Link to="/courses">1 Week FREE Demo</Link>
              </Button>
            </div>
          </div>
        </section>        {/* About Preview Section (ENHANCED) */}
        <section className="py-24 bg-background overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-primary/5 -skew-x-12 translate-x-1/4"></div>
          <div className="container grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 lg:order-1 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-orange-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  loading="lazy"
                  width="600"
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Floating Glass Card */}
              <div className="absolute -bottom-8 -right-8 w-64 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 hidden md:block z-20 animate-in slide-in-from-bottom-10 duration-1000">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-orange-primary text-white flex items-center justify-center font-bold text-xl">10+</div>
                  <div className="text-sm font-semibold text-tech-dark leading-tight">Years Combined Experience</div>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-primary w-3/4 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-primary/10 rounded-full blur-3xl -z-10"></div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-primary/10 text-orange-primary text-sm font-bold tracking-wide mb-6">WHO WE ARE</div>
              <h2 className="text-4xl md:text-5xl font-bold text-tech-dark mb-6 leading-tight">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-primary to-orange-dark">Digital Transformation</span>
              </h2>
              <p className="text-lg text-tech-gray mb-8 leading-relaxed">
                Sysfotech is more than just a web development company UK; we are your strategic growth partners. As a leading AI development company UK and custom software development provider, we fuse creative curiosity with engineering precision to deliver digital transformation services that define categories.
              </p>

              <div className="grid grid-cols-1 gap-4 mb-10">
                {[
                  { title: "Innovation First", desc: "Pushing boundaries with emerging tech." },
                  { title: "Client Obsessed", desc: "Your growth is our north star." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-border hover:border-orange-primary/30 transition-colors shadow-sm">
                    <div className="mt-1"><CheckCircle className="text-orange-primary w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-tech-dark">{item.title}</h4>
                      <p className="text-sm text-tech-gray">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-tech-dark text-white hover:bg-orange-primary transition-colors shadow-lg shadow-tech-dark/20">
                <Link to="/about">Discover Our Story <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section (EXISTING - UNCHANGED GRID, SLIGHT VISUAL LIFT) */}
        <section className="py-24 bg-slate-50 relative">
          <div className="container relative z-10">
            <div className="text-center mb-16 px-4">
              <span className="text-orange-primary font-bold tracking-widest text-xs uppercase mb-2 block">WHAT WE DO</span>
              <h2 className="text-4xl font-bold text-tech-dark mb-4">Core Services</h2>
              <p className="text-xl text-tech-gray max-w-2xl mx-auto">
                Comprehensive digital transformation services and business automation solutions tailored to your growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="p-8 hover:shadow-2xl hover:shadow-orange-primary/10 transition-all duration-500 border-0 bg-white hover:-translate-y-2 group rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-orange-primary group-hover:h-full transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-primary transition-colors duration-500 shadow-sm">
                      <service.icon className="w-7 h-7 text-tech-dark group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-bold text-tech-dark mb-3">{service.title}</h3>
                    <p className="text-tech-gray leading-relaxed mb-6">{service.description}</p>
                    <div className="flex items-center text-sm font-semibold text-orange-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                className="bg-orange-primary hover:bg-orange-dark shadow-lg shadow-orange-primary/20 rounded-full px-8"
                onClick={() => navigateTo('/services', { type: 'section', sectionId: 'core-services' })}
              >
                View All Services
              </Button>
            </div>
          </div>
        </section>

        {/* Bento Grid Projects Section */}
        <BentoProjects />

        {/* Process Section (ENHANCED - VISUAL TIMELINE) */}
        <section className="py-24 bg-tech-dark text-white relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="container relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Workflow</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">A streamlined path from concept to completion.</p>
            </div>

            <div className="relative grid md:grid-cols-4 gap-8">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/10"></div>

              {processSteps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-tech-dark border-4 border-tech-dark rounded-full flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:scale-110">
                      {/* Inner Circle with Gradient Border */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent border border-white/20 group-hover:border-orange-primary transition-colors duration-500"></div>
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-orange-primary/20 transition-colors">
                        <step.icon className="w-8 h-8 text-white group-hover:text-orange-primary transition-colors" />
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-primary rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-orange-primary transition-colors">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed px-4">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section (Updated to match About Us) */}
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

        {/* Testimonials Section (ENHANCED PRESENATION, SAME CARD CONTENT) */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <span className="text-orange-primary font-bold tracking-widest text-xs uppercase mb-2 block">SUCCESS STORIES</span>
                <h2 className="text-4xl font-bold text-tech-dark mb-4">Trusted by Market Leaders</h2>
                <p className="text-lg text-tech-gray">See how we've helped diverse businesses transform their digital presence and achieve scalable growth.</p>
              </div>
              <Button asChild variant="ghost" className="text-orange-primary hover:bg-orange-primary/5 group">
                <Link to="/testimonials">View All Case Studies <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {[
                {
                  title: "Trinox Abrasives",
                  category: "Industrial Tools & Equipment",
                  icon: Wrench,
                  quote: "Sysfotech transformed our business with a professional website that showcases our industrial grinding wheels and cutting tools. The instant quote system and product catalog have significantly improved our customer engagement and sales process.",
                  features: ["Product Catalog", "Instant Quotes", "Contact Integration", "ISO Certified Showcase", "Bulk Pricing", "Map Integration"],
                  type: "B2B Industrial Website",
                  link: "https://trinoxabrasives.com"
                },
                {
                  title: "Elegance E-commerce",
                  category: "Fashion & Retail Platform",
                  icon: ShoppingCart,
                  quote: "The Elegance e-commerce platform has revolutionized our traditional clothing business. With seamless shopping cart functionality, user authentication, and beautiful product collections, we've seen a remarkable increase in online sales.",
                  features: ["E-commerce Platform", "User Authentication", "Shopping Cart", "Product Collections", "Testimonials Section", "Modern UI/UX"],
                  type: "E-commerce Platform",
                  link: "https://elegance-ecommerce-site.netlify.app"
                },
                {
                  title: "Nebula AI Chat",
                  category: "AI Technology",
                  icon: Zap, // Using Zap as simplified Cpu replacement or import Cpu if available
                  quote: "Nebula has completely transformed how we interact with our data. The voice synthesis is incredibly natural, and the multi-modal capabilities have opened up new avenues for our customer support automation.",
                  features: ["Voice Synthesis", "Multi-modal AI", "Real-time Processing", "Context Awareness"],
                  type: "SaaS Product",
                  link: "#"
                },
                {
                  title: "Decent Institute",
                  category: "Education Management",
                  icon: Award, // Using Award as proxy for GraduationCap or import needed
                  quote: "Our student inquiries have doubled since launching the new website. Parents love the easy navigation and the transparent fee structure display. It's made our administrative work much easier.",
                  features: ["Course Management", "Student Portal", "Online Inquiries", "Event Calendar"],
                  type: "Educational Platform",
                  link: "https://decentinstitute.in/"
                },
                {
                  title: "CRM Pro Dashboard",
                  category: "Business Intelligence",
                  icon: TrendingUp,
                  quote: "The real-time analytics have given us insights we never had before. A game-changer for our sales team, allowing us to track performance and forecast with much greater accuracy.",
                  features: ["Real-time Analytics", "Sales Tracking", "Team Management", "Custom Reports"],
                  type: "B2B Dashboard",
                  link: "https://sysfotech.github.io/crm/"
                },
                {
                  title: "Lumière Restaurant",
                  category: "Hospitality",
                  icon: ExternalLink, // Using generic icon
                  quote: "Reservations are up 40%. The dark-themed design perfectly captures our restaurant's ambiance and the seamless booking system has reduced no-shows significantly.",
                  features: ["Table Reservation", "Menu Management", "Event Booking", "Staff Portal"],
                  type: "Hospitality Website",
                  link: "https://lumiere-restaurant-website.netlify.app/"
                },
                {
                  title: "Dental Care Platform",
                  category: "Healthcare",
                  icon: Shield, // Using Shield as proxy for Stethoscope
                  quote: "Patients love the AI scheduling. It's like having a receptionist available 24/7. The platform has streamlined our appointments and reduced administrative overhead.",
                  features: ["AI Scheduling", "Patient Records", "Prescription Management", "Tele-health"],
                  type: "Healthcare Platform",
                  link: "https://dental-clinics-website.netlify.app/"
                }
              ].map((project, index) => (
                <Card key={index} className="p-8 border-0 bg-white hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-primary/5 rounded-full -mr-16 -mt-16"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-orange-primary/10 rounded-lg flex items-center justify-center">
                        <project.icon className="w-6 h-6 text-orange-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-tech-dark">{project.title}</h3>
                        <p className="text-tech-gray text-sm">{project.category}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 fill-orange-primary text-orange-primary" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-orange-primary/20 mb-3" />
                      <p className="text-tech-gray leading-relaxed italic mb-4">
                        "{project.quote}"
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-tech-dark mb-2">Key Features Delivered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-orange-primary/10 text-orange-primary text-sm rounded-full">{feature}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-tech-gray">Project Type</p>
                        <p className="font-semibold text-tech-dark">{project.type}</p>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-orange-primary hover:opacity-80 transition-colors"
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

        {/* Blog Preview Section (ENHANCED - GLASSMORPHISM) */}
        <section className="py-24 bg-tech-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-tech-dark to-black opacity-50"></div>
          <div className="container relative z-10">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-orange-primary font-bold tracking-widest text-xs uppercase mb-2 block">LATEST INSIGHTS</span>
                <h2 className="text-4xl font-bold text-white mt-2">News & Articles</h2>
              </div>
              <Button asChild variant="outline" className="hidden md:flex border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                <Link to="/blog">View All Posts <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestBlogs.map((blog) => (
                <Link key={blog.id} to={`/blog/${blog.id}`} className="group block">
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-orange-primary/50 hover:bg-white/10 transition-all duration-500 h-full flex flex-col">
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        width="400"
                        height="225"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex gap-2 mb-4">
                        {blog.tags.slice(0, 1).map(t => (
                          <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-orange-primary bg-orange-primary/10 px-2 py-1 rounded">{t}</span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-orange-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-white/80 group-hover:text-orange-primary transition-colors mt-auto">
                        Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Button asChild variant="outline" className="border-white/20 text-white">
                <Link to="/blog">View All Posts <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section (ENHANCED - MODERN ACCORDION) */}
        <section className="py-24 bg-white">
          <div className="container max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="text-orange-primary font-bold tracking-widest text-xs uppercase mb-2 block">FAQ</span>
                <h2 className="text-4xl font-bold text-tech-dark mb-6">Common Questions</h2>
                <p className="text-tech-gray mb-8 leading-relaxed">
                  Have a different question? Contact our support team for personal assistance.
                </p>
                <Button asChild className="bg-tech-dark hover:bg-black text-white">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>

              <div className="lg:col-span-8">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-slate-50 border-0 rounded-2xl px-6 data-[state=open]:bg-white data-[state=open]:shadow-lg transition-all duration-300">
                      <AccordionTrigger className="text-lg font-bold text-tech-dark hover:text-orange-primary hover:no-underline py-6 [&[data-state=open]]:text-orange-primary">
                        <span className="text-left">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-tech-gray leading-relaxed pb-6 text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* New Capsule CTA Section */}
        <CapsuleCTA />
      </div >
    </>
  );
};

export default Home;