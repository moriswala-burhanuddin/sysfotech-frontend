import { API_BASE } from "../config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  Award,
  Phone,
  MapPin,
  CheckCircle2,
  Briefcase,
  ChevronDown,
  Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import {
  whyChooseUs,
  flagshipCourseSlug,
  flagshipCourseTitle,
} from "@/data/courses";
import { CourseRegistrationForm } from "@/components/CourseRegistrationForm";

interface CurriculumPoint {
  bold: string;
  text: string;
}

interface WeekBlock {
  badge: string;
  title: string;
  points: CurriculumPoint[];
}

interface PhaseBlock {
  id: string;
  phaseLabel: string;
  title: string;
  period: string;
  weeks: WeekBlock[];
}

const curriculumPhases: PhaseBlock[] = [
  {
    id: "phase-1",
    phaseLabel: "Part 1",
    title: "Business Automation with Google Workspace & AppSheet",
    period: "Weeks 1 – 4",
    weeks: [
      {
        badge: "Week 1",
        title: "Google Workspace & Google Sheets Basics",
        points: [
          {
            bold: "Getting Started",
            text: "How to use Google Workspace and set up simple cloud spreadsheets to store business data.",
          },
          {
            bold: "Everyday Formulas",
            text: "Adding, subtracting, multiplying, and dividing figures cleanly in spreadsheets.",
          },
          {
            bold: "Finding & Matching Data",
            text: "Practical use of VLOOKUP, XLOOKUP, and INDEX/MATCH to link records across sheets.",
          },
          {
            bold: "Ready-to-Use Practice Sheet",
            text: "You will get a complete Google Sheet with working formulas, tables, and sample data to keep and use as a reference.",
          },
        ],
      },
      {
        badge: "Week 2",
        title: "Building Business Apps with AppSheet (No Coding)",
        points: [
          {
            bold: "Setting Up AppSheet",
            text: "Connecting your Google Sheet to AppSheet, creating screens, and setting staff permissions.",
          },
          {
            bold: "Project 1 — Stock Control App",
            text: "Building a working inventory app with barcode scanning and automatic stock updates.",
          },
          {
            bold: "Project 2 — Staff Leave & HR App",
            text: "Building a holiday approval app where staff only see their own records and managers can approve requests.",
          },
        ],
      },
      {
        badge: "Week 3",
        title: "Automating Tasks with Google Apps Script",
        points: [
          {
            bold: "Writing Simple Scripts",
            text: "Finding your way around the script editor, basic JavaScript, and creating custom sheet functions.",
          },
          {
            bold: "Automatic Sheet Actions",
            text: "Using onEdit, onChange, and onOpen so your sheet runs tasks automatically when someone updates a cell.",
          },
          {
            bold: "Timed Tasks",
            text: "Setting up daily or weekly timers so reports and updates run on their own.",
          },
          {
            bold: "Automated Emails",
            text: "Sending automatic emails through GmailApp and MailApp when certain conditions are met.",
          },
        ],
      },
      {
        badge: "Week 4",
        title: "Connecting Everything Together",
        points: [
          {
            bold: "AppSheet Bots",
            text: "Creating automated notifications and actions inside AppSheet.",
          },
          {
            bold: "Combining Scripts & Apps",
            text: "Linking your Google Apps Scripts directly to your AppSheet apps.",
          },
          {
            bold: "Going Live",
            text: "Finishing your HR and Inventory apps, checking security settings, and sharing them safely with users.",
          },
        ],
      },
    ],
  },
  {
    id: "phase-2",
    phaseLabel: "Part 2",
    title: "Workflow Automation with n8n",
    period: "Weeks 5 – 6",
    weeks: [
      {
        badge: "Week 5",
        title: "Getting Started with n8n",
        points: [
          {
            bold: "How n8n Works",
            text: "Understanding visual workflows, triggers, and how data moves between different tools.",
          },
          {
            bold: "Your First Workflows",
            text: "Linking Google Sheets to send automatic updates to Slack or Discord.",
          },
        ],
      },
      {
        badge: "Week 6",
        title: "Connecting APIs & AI Tools",
        points: [
          {
            bold: "Webhooks & Online Tools",
            text: "Using HTTP requests and webhooks to connect n8n with other websites and business software.",
          },
          {
            bold: "Using OpenAI in Workflows",
            text: "Adding AI steps to read, sort, and reply to incoming business data automatically.",
          },
        ],
      },
    ],
  },
  {
    id: "phase-3",
    phaseLabel: "Part 3",
    title: "Desktop Automation with Microsoft Power Automate",
    period: "Weeks 7 – 8",
    weeks: [
      {
        badge: "Week 7",
        title: "Power Automate Desktop Basics",
        points: [
          {
            bold: "Introduction to Desktop Flows",
            text: "Using the Power Automate interface, building simple desktop flows, and recording screen actions.",
          },
          {
            bold: "Working with Variables",
            text: "Storing inputs and outputs so the computer can repeat routine office tasks accurately.",
          },
        ],
      },
      {
        badge: "Week 8",
        title: "Practical Office & Web Automation",
        points: [
          {
            bold: "Collecting Data from Websites & Excel",
            text: "Automatically pulling information from web pages and updating local Excel files without manual typing.",
          },
          {
            bold: "Handling Errors Smoothly",
            text: "Setting up your flows so they recover properly if a web page or file takes longer to load.",
          },
        ],
      },
    ],
  },
  {
    id: "phase-4",
    phaseLabel: "Part 4",
    title: "Data Analysis & Reporting with Power BI",
    period: "Weeks 9 – 12",
    weeks: [
      {
        badge: "Week 9",
        title: "Preparing Data with Power Query",
        points: [
          {
            bold: "Importing Data",
            text: "Bringing data into Power BI from spreadsheets, databases, and folders.",
          },
          {
            bold: "Tidying Messy Data",
            text: "Removing duplicates, fixing column formats, and combining separate tables into clean datasets.",
          },
        ],
      },
      {
        badge: "Week 10",
        title: "Data Modelling & DAX Formulas",
        points: [
          {
            bold: "Linking Tables Properly",
            text: "Setting up clear relationships between tables (Star Schema) so reports run quickly and accurately.",
          },
          {
            bold: "Writing DAX Calculations",
            text: "Using CALCULATE, year-to-date, and month-to-date formulas to track business performance.",
          },
        ],
      },
      {
        badge: "Week 11",
        title: "Building Clear Charts & Dashboards",
        points: [
          {
            bold: "Choosing the Right Charts",
            text: "Presenting figures clearly using tables, line graphs, and bar charts.",
          },
          {
            bold: "Interactive Filters",
            text: "Adding slicers, drill-downs, and helpful tooltips so managers can explore the numbers easily.",
          },
        ],
      },
      {
        badge: "Week 12",
        title: "Sharing & Updating Reports",
        points: [
          {
            bold: "Power BI Online Service",
            text: "Publishing reports online, setting up shared workspaces, and scheduling automatic daily data refreshes.",
          },
          {
            bold: "Final Management Dashboard",
            text: "Building a complete, practical business dashboard from start to finish.",
          },
        ],
      },
    ],
  },
  {
    id: "phase-5",
    phaseLabel: "Part 5",
    title: "Live UK Internship & Job Preparation",
    period: "Months 4 – 6",
    weeks: [
      {
        badge: "Months 4 – 5",
        title: "Live Project Work & 1-to-1 Mentoring",
        points: [
          {
            bold: "Real Business Projects",
            text: "Working on complete projects that combine AppSheet, Apps Script, n8n, Power Automate, and Power BI.",
          },
          {
            bold: "Weekly Practical Tasks",
            text: "Completing weekly assignments based on real UK business requirements.",
          },
          {
            bold: "1-to-1 Tutor Support",
            text: "Regular sessions to ask questions, review your work, and improve your projects.",
          },
        ],
      },
      {
        badge: "Month 6",
        title: "CV Writing, Interviews & Certificates",
        points: [
          {
            bold: "UK CV Preparation",
            text: "Writing a clear, practical CV that highlights the apps, workflows, and dashboards you have built.",
          },
          {
            bold: "LinkedIn & Job Portals",
            text: "Setting up your LinkedIn profile properly so UK recruiters and employers can find your work.",
          },
          {
            bold: "Practice Interviews",
            text: "Mock technical and general interviews with honest feedback to help you feel confident.",
          },
          {
            bold: "Course & Internship Certificates",
            text: "Final review of your project work and award of your Course Completion Certificate and UK Internship Certificate.",
          },
        ],
      },
    ],
  },
];

const SixMonthProgram = () => {
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({
    "phase-1": true,
    "phase-2": false,
    "phase-3": false,
    "phase-4": false,
    "phase-5": false,
  });

  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      const token = localStorage.getItem("magic_link_token");
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/student/enrollments/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (
            data.enrollments &&
            data.enrollments.some(
              (e: any) => e.course.slug === flagshipCourseSlug
            )
          ) {
            setIsEnrolled(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkEnrollment();
  }, []);

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <SEO
        title="6-Month AI, Automation & Data Analytics Programme | Sysfotech UK"
        description="Practical 6-month training programme in Google Workspace, AppSheet, n8n, Power Automate, and Power BI, including a 3-month live UK internship."
        keywords="sysfotech uk programme, 6 month ai course uk, business automation course london, appsheet training uk, power bi course london, uk internship certificate"
        type="website"
        url="https://sysfotech.uk/courses"
      />

      <div className="min-h-screen bg-[#f8f9fa] text-slate-900">
        {/* Clean British Editorial Header */}
        <section className="pt-36 pb-14 bg-[#0f172a] text-white border-b border-slate-800">
          <div className="container max-w-6xl mx-auto px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-primary mb-3">
              Sysfotech UK Training &amp; Internship Programme
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              6-Month Practical AI, Automation &amp; Data Analytics Course
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10">
              A practical 6-month programme taught live online by our UK team. Spend the first 3 months learning how to build business apps, automate office workflows, and create Power BI reports, followed by a 3-month UK internship working on real projects.
            </p>

            {/* Structured Key Facts Table (Classic UK Prospectus Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-700 bg-slate-900/60 divide-y sm:divide-y-0 sm:divide-x divide-slate-700 rounded-lg overflow-hidden">
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5 text-orange-primary" />
                  Duration
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  6 Months Total
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  3 months training + 3 months internship
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5 text-orange-primary" />
                  Timetable
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  4 Days a Week
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Mon, Tue, Thu, Fri (1 hour per session)
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
                  <Laptop className="w-3.5 h-3.5 text-orange-primary" />
                  Study Mode
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  100% Live Online
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Taught live by UK-based tutors
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5 text-orange-primary" />
                  Certificates Awarded
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  2 UK Certificates
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Course Completion &amp; UK Internship
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Syllabus & Enrolment Section */}
        <section className="py-14">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column (7 cols): Full 6-Month Syllabus */}
              <div className="lg:col-span-7 space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Course Syllabus
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Below is the week-by-week plan for the 6-month programme. Click any part to read the full details.
                  </p>
                </div>

                <div className="space-y-4">
                  {curriculumPhases.map((phase) => {
                    const isOpen = !!openPhases[phase.id];
                    return (
                      <div
                        key={phase.id}
                        className="bg-white border border-slate-200 rounded-lg overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => togglePhase(phase.id)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2.5 mb-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-orange-primary">
                                {phase.phaseLabel}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-xs font-medium text-slate-500">
                                {phase.period}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {phase.title}
                            </h3>
                          </div>

                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="p-5 sm:p-6 bg-[#fcfcfd] border-t border-slate-200 divide-y divide-slate-200">
                            {phase.weeks.map((week, wIdx) => (
                              <div
                                key={wIdx}
                                className={wIdx === 0 ? "pb-5" : "py-5 last:pb-0"}
                              >
                                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                                  <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white text-xs font-semibold">
                                    {week.badge}
                                  </span>
                                  <h4 className="text-base font-bold text-slate-900">
                                    {week.title}
                                  </h4>
                                </div>

                                <ul className="space-y-2.5 pl-4 border-l-2 border-orange-primary">
                                  {week.points.map((pt, pIdx) => (
                                    <li
                                      key={pIdx}
                                      className="text-sm text-slate-700 leading-relaxed"
                                    >
                                      <strong className="font-semibold text-slate-900">
                                        {pt.bold}:
                                      </strong>{" "}
                                      {pt.text}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Certificates Explanation Box */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    What You Receive When You Finish
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                        <Award className="w-4 h-4 text-orange-primary" />
                        Course Completion Certificate
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Confirms your training across Google Workspace, AppSheet, Apps Script, n8n, Power Automate, and Power BI.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                        <Briefcase className="w-4 h-4 text-orange-primary" />
                        UK Internship Certificate
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Confirms 3 months of practical project work with Sysfotech UK, giving you real experience to show employers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Free Trial Registration Form */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
                  <div className="border-b border-slate-200 pb-4 mb-5">
                    <h2 className="text-xl font-bold text-slate-900">
                      Book a Free 1-Day Trial Class
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Fill in the form below to join a free 1-day live online trial session and speak with our course advisor.
                    </p>
                  </div>

                  {isEnrolled && (
                    <div className="mb-5">
                      <Button
                        asChild
                        className="w-full text-sm h-11 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold"
                      >
                        <Link to="/dashboard">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                          Already Enrolled — Go to Student Portal
                        </Link>
                      </Button>
                    </div>
                  )}

                  <CourseRegistrationForm
                    preSelectedCourse={flagshipCourseTitle}
                  />
                </div>

                {/* Simple UK Contact Box */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Prefer to speak to someone?
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Call or message our London office on WhatsApp.
                    </div>
                  </div>
                  <a
                    href="https://wa.me/447442193577"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Train with Sysfotech Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Why Study with Sysfotech?
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  We are a UK-registered IT company based in London. Rather than just teaching theory, we show you how to build the exact tools and reports that businesses ask for.
                </p>
                <div className="space-y-2.5 text-sm font-medium text-slate-800">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-primary" />
                    Registered UK company based in London
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-primary" />
                    Small live classes with time for questions
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-primary" />
                    3-month practical UK project placement included
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-lg bg-[#f8f9fa] border border-slate-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-4 h-4 text-orange-primary shrink-0" />
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SixMonthProgram;
