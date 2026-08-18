import { API_BASE } from '../config';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  BookOpen,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { getCourseBySlug, courses } from "@/data/courses";
import { motion } from "framer-motion";
import NotFound from "./NotFound";
import { CourseRegistrationForm } from "@/components/CourseRegistrationForm";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;
  const otherCourses = courses.filter((c) => c.slug !== course.slug);
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      const token = localStorage.getItem("magic_link_token");
      if (!token || !course) {
        setIsLoadingStatus(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/student/enrollments/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.enrollments && data.enrollments.some((e: any) => e.course.slug === course.slug)) {
            setIsEnrolled(true);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingStatus(false);
      }
    };
    checkEnrollment();
  }, [course]);

  if (!course) return <NotFound />;

  return (
    <>
      <SEO
        title={course.metaTitle}
        description={course.metaDescription}
        keywords={course.metaKeywords}
        type="website"
        url={`https://sysfotech.uk/courses/${course.slug}`}
      />

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-primary/20">
        {/* Brand Styled Hero Section */}
        <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-br from-tech-dark via-tech-dark to-orange-primary text-white">
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-slate-300 mb-6">
                <Link to="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
                <div>/</div>
                <div className="text-white font-medium">{course.shortTitle}</div>
              </div>

              <div className="flex items-start gap-6 mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-sm"
                >
                  <course.icon
                    className="w-10 h-10 text-white"
                  />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-white leading-tight">
                    {course.title}
                  </h1>
                  <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">
                    {course.shortDescription}
                  </p>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="flex flex-wrap gap-4 mt-8 text-sm font-medium">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <BookOpen className="w-4 h-4 text-orange-primary" />
                  {course.level}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-orange-primary" />
                  {course.schedule}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-orange-primary" />
                  London Classroom / Online
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Two Column Layout: Details on Left, Enrolment Form on Right */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-start">
              {/* Left Column: Course Details & Syllabus */}
              <div className="lg:col-span-7 space-y-12">
                {/* About this course */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    About This Course
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed">
                    {course.fullDescription}
                  </p>
                </motion.div>

                {/* What You'll Learn */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    What You Will Learn
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <CheckCircle2 className="w-5 h-5 text-orange-primary flex-shrink-0 mt-0.5" />
                        <div className="text-slate-700 text-sm font-medium">
                          {highlight}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Curriculum modules */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900">
                    Course Curriculum
                  </h2>
                  <div className="space-y-4">
                    {course.curriculum.map((module, idx) => (
                      <Card
                        key={idx}
                        className="border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <div className="flex items-center gap-4 p-5 bg-slate-50 border-b border-slate-150">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0 bg-orange-primary"
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <h3 className="text-lg font-bold text-slate-800">
                            {module.title}
                          </h3>
                        </div>
                        <div className="p-5 bg-white">
                          <div className="grid sm:grid-cols-2 gap-3">
                            {module.topics.map((topic, tIdx) => (
                              <div
                                key={tIdx}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-primary mt-2 flex-shrink-0" />
                                <div className="text-sm text-slate-600">
                                  {topic}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Enrolment Form directly visible beside details */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                <Card className="border border-slate-200 bg-white rounded-2xl shadow-md p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-primary/10 text-orange-primary text-xs font-semibold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Class Seat Registration
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">
                      Register For This Course
                    </h2>
                    <p className="text-sm text-slate-500">
                      Submit details below and our advisors will verify your admission.
                    </p>
                  </div>

                  <div className="mb-6">
                    {isEnrolled ? (
                      <Button asChild className="w-full text-lg h-14 bg-slate-200 hover:bg-slate-300 text-slate-700 shadow-sm group rounded-xl">
                        <Link to="/dashboard">
                          <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                          Already Enrolled - Go to Dashboard
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild className="w-full text-lg h-14 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 group rounded-xl">
                        <Link to={`/checkout/${course.slug}`}>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Buy Course Securely
                        </Link>
                      </Button>
                    )}
                    <p className="text-xs text-center text-slate-500 mt-2">
                      Secured by Stripe & PayPal. Lifetime access included.
                    </p>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500 font-medium">Or</span>
                    </div>
                  </div>

                  <CourseRegistrationForm preSelectedCourse={course.title} />
                </Card>

                {/* Other Available Courses */}
                <Card className="border border-slate-200 bg-white rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 mb-4">
                    Other Courses
                  </h3>
                  <div className="space-y-3">
                    {otherCourses.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/courses/${c.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${c.color}15`,
                          }}
                        >
                          <c.icon
                            className="w-5 h-5"
                            style={{ color: c.color }}
                          />
                        </div>
                        <div className="text-sm font-medium text-slate-700 group-hover:text-orange-primary transition-colors">
                          {c.shortTitle}
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* admissions CTA footer */}
        <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="container text-center max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-lg mb-8 text-slate-400 max-w-xl mx-auto">
              Our training advisors are available to answer your course pathway queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-50 font-bold rounded-full h-14 px-8"
              >
                <a
                  href="https://wa.me/447442193577"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 w-5 h-5 text-orange-primary" />
                  WhatsApp Advisor
                </a>
              </Button>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center border border-slate-700 text-white hover:bg-white/10 font-bold rounded-full h-14 px-8 transition-colors"
              >
                All Courses
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseDetail;
