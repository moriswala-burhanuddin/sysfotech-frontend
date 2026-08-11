import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Phone,
  Sparkles,
  CheckCircle2,
  Users,
  GraduationCap,
  Briefcase,
  Globe,
  Compass,
  Target,
  Send,
  MapPin,
  CheckCircle,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { courses, whyChooseUs, allCourseOptions } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";
import { CourseRegistrationForm } from "@/components/CourseRegistrationForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Courses = () => {
  const aiCourseSlugs = [
    "ai-powered-business-automation",
    "next-gen-data-analytics",
    "ai-for-office-productivity",
    "ai-for-business-professionals",
  ];
  const coreCourses = courses.filter((c) => !aiCourseSlugs.includes(c.slug));

  return (
    <>
      <SEO
        title="Professional IT Certification Courses UK | Sysfotech"
        description="Enrol in professional IT certification courses in London, UK. AI development company UK training in Data Science, Cyber Security, Machine Learning & Power BI. Live online & classroom sessions for digital transformation."
        keywords="it courses uk, professional certification london, ai development company uk, custom software development uk, digital transformation services, ai course, data science course, cyber security course, machine learning course, power bi course, sysfotech courses, web development company uk"
        type="website"
        url="/courses"
        schema={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Professional IT Certification Courses",
          "description": "Professional IT certification courses in Data Science, Cyber Security, Machine Learning & Power BI.",
          "provider": {
            "@type": "Organization",
            "name": "Sysfotech",
            "sameAs": "https://sysfotech.uk"
          }
        }}
      />

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-primary/20">
        {/* Brand Aligned Hero Section */}
        <section className="relative pt-40 pb-28 overflow-hidden bg-gradient-to-br from-tech-dark via-tech-dark to-orange-primary text-white">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-8 backdrop-blur-sm">
                <Award className="w-4 h-4 text-orange-primary" />
                Accredited Professional Training Courses
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
                Advance Your IT Career with Professional Training Courses
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed">
                Gain industry-recognised qualifications in Artificial Intelligence, Data Science, Cyber Security, Machine Learning and Power BI. Study live online or in our classroom in London.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live Online & London Classroom
                </div>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-orange-primary" />
                  Flexible Study Schedules
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Course Bento Grid */}
        {coreCourses.length > 0 && (
          <section className="py-24 relative z-20">
            <div className="container">
              <div className="mb-12 text-center md:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                  Our Courses
                </h2>
                <p className="text-lg text-slate-600">
                  Explore our certification programmes and find the right path for your career goals.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto"
              >
                {coreCourses.map((course, index) => {
                // Bento layout settings: First card is large, rest are standard
                const isLargeCard = index === 0;
                const colSpanClass = isLargeCard ? "md:col-span-4" : "md:col-span-2";

                return (
                  <motion.div key={course.slug} variants={itemVariants} className={colSpanClass}>
                    <Link to={`/courses/${course.slug}`} className="block h-full group">
                      <Card className="h-full bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-primary transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col">
                        <div className="p-8 flex flex-col flex-grow">
                          {/* Course Icon Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                              style={{ backgroundColor: `${course.color}15` }}
                            >
                              <course.icon
                                className="w-7 h-7"
                                style={{ color: course.color }}
                              />
                            </div>
                            <div className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                              {course.level}
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-primary transition-colors">
                            {course.shortTitle}
                          </h3>
                          <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                            {course.shortDescription}
                          </p>

                          {/* Highlights details (Only visible on large card or details list) */}
                          {isLargeCard && (
                            <div className="grid sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-slate-100">
                              {course.highlights.slice(0, 4).map((highlight, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {!isLargeCard && (
                            <ul className="space-y-2 mb-8">
                              {course.highlights.slice(0, 2).map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Bottom Info & CTA */}
                          <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                              <Clock className="w-4 h-4 text-orange-primary" />
                              3-6 Months
                            </div>
                            <div className="flex items-center gap-1 font-semibold text-orange-primary group-hover:gap-2 transition-all">
                              View Syllabus <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
        )}

        {/* AI Courses Section */}
        <section id="ai-courses" className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="container">
            <div className="mb-12 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-primary/10 text-orange-primary text-sm font-semibold mb-4 border border-orange-primary/20">
                <Brain className="w-4 h-4" />
                AI-Powered Courses
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                Master the Future of Work
              </h2>
              <p className="text-lg text-slate-600">
                Specialised AI training to boost your productivity, automate business processes, and unlock new data insights.
              </p>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto"
            >
              {[
                courses.find(c => c.slug === "ai-powered-business-automation"),
                courses.find(c => c.slug === "next-gen-data-analytics"),
                courses.find(c => c.slug === "ai-for-office-productivity"),
                courses.find(c => c.slug === "ai-for-business-professionals")
              ].filter(Boolean).map((course, index) => {
                if (!course) return null;
                const isLargeCard = index === 0;
                const colSpanClass = isLargeCard ? "md:col-span-4" : "md:col-span-2";

                return (
                  <motion.div key={course.slug} variants={itemVariants} className={colSpanClass}>
                    <Link to={`/courses/${course.slug}`} className="block h-full group">
                      <Card className="h-full bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-primary transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col">
                        <div className="p-8 flex flex-col flex-grow">
                          {/* Course Icon Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                              style={{ backgroundColor: `${course.color}15` }}
                            >
                              <course.icon
                                className="w-7 h-7"
                                style={{ color: course.color }}
                              />
                            </div>
                            <div className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                              {course.level}
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-primary transition-colors">
                            {course.shortTitle}
                          </h3>
                          <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                            {course.shortDescription}
                          </p>

                          {/* Highlights details */}
                          {isLargeCard && (
                            <div className="grid sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-slate-100">
                              {course.highlights.slice(0, 4).map((highlight, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {!isLargeCard && (
                            <ul className="space-y-2 mb-8">
                              {course.highlights.slice(0, 2).map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Bottom Info & CTA */}
                          <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                              <Clock className="w-4 h-4 text-orange-primary" />
                              3-6 Months
                            </div>
                            <div className="flex items-center gap-1 font-semibold text-orange-primary group-hover:gap-2 transition-all">
                              View Syllabus <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Why Train with Sysfotech Section */}
        <section className="py-24 bg-white border-y border-slate-200">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-7xl mx-auto items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                  Why Train with Sysfotech?
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  We supply UK accredited certification programmes structured around real-world expertise. Our classes prepare you thoroughly for career advancement in the IT field.
                </p>
                <div className="flex flex-col gap-4 text-sm font-semibold text-slate-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-primary" />
                    UK Registered Company
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-primary" />
                    Experienced Admissions Advisors
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 text-orange-primary border border-slate-100">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Course Duration & Schedule Info (Brand Styled) */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <div className="flex flex-col items-center text-center px-6 pt-6 md:pt-0">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-orange-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Flexible Course Pathways</h3>
                <p className="text-slate-400 text-sm">Attend our fast-track 3-month certificate programme or the detailed 6-month advanced training syllabus.</p>
              </div>

              <div className="flex flex-col items-center text-center px-6 pt-8 md:pt-0">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Flexible Weekly Schedules</h3>
                <p className="text-slate-400 text-sm">Interactive training classes run 4 days a week on Monday, Tuesday, Thursday, and Friday for 1 hour per session.</p>
              </div>

              <div className="flex flex-col items-center text-center px-6 pt-8 md:pt-0">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Recognised Certification</h3>
                <p className="text-slate-400 text-sm">Students receive a professional course certification upon completion to showcase validation to IT recruiters.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Embedded Enrolment Form Section */}
        <section id="enrolment-form" className="py-24 bg-slate-100">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-primary/10 text-orange-primary text-sm font-semibold mb-4">
                  <Sparkles className="w-4 h-4" />
                  Reserve Your Class Seat
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                  Sysfotech Course Registration
                </h2>
                <p className="text-slate-600 text-lg">
                  Submit the student details form below and our advisors will verify your admission inquiry.
                </p>
              </div>

              <CourseRegistrationForm />
            </div>
          </div>
        </section>

        {/* Free Demo Callout (UK English) */}
        <section className="py-24 bg-orange-primary relative overflow-hidden text-center text-white">
          <div className="container relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-6">
              Claim Your Free 1-Week Demo Class
            </h2>
            <p className="text-orange-50 text-xl mb-10 max-w-2xl mx-auto">
              Register now to trial our live classroom training syllabus. There is no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-primary hover:bg-slate-50 font-bold h-14 px-10 rounded-full shadow-lg"
              >
                <a href="#enrolment-form">
                  Enrol Online Now
                </a>
              </Button>
              <a
                href="https://wa.me/447442193577"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 font-bold h-14 px-10 rounded-full transition-colors"
              >
                <Phone className="mr-2 w-5 h-5" />
                WhatsApp Advisor
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Courses;
