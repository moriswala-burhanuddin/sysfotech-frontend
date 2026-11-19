import { Brain, Database, Shield, Cpu, BarChart3, Globe, PlayCircle, Briefcase, GraduationCap, Award, Compass, Target, Workflow, PieChart, MonitorCheck, type LucideIcon } from "lucide-react";

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  color: string;
  highlights: string[];
  curriculum: CourseModule[];
  duration: string[];
  schedule: string;
  level: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  price?: number;
}

export const courses: Course[] = [
  /* {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence (AI)",
    shortTitle: "Artificial Intelligence",
    shortDescription:
      "Master the fundamentals and advanced concepts of Artificial Intelligence. Learn to build intelligent systems that can reason, learn, and adapt.",
    fullDescription:
      "Dive deep into the world of Artificial Intelligence with our industry-focused certification programme. This comprehensive course covers everything from foundational AI concepts to advanced neural networks, natural language processing, and computer vision. Designed for professionals and aspiring technologists in the UK, you'll gain hands-on experience building real AI solutions using Python, TensorFlow, and PyTorch. Our expert trainers, based in London, guide you through practical projects that mirror real-world industry challenges.",
    icon: Brain,
    color: "#F97316",
    highlights: [
      "Hands-on AI Model Building",
      "Neural Networks & Deep Learning",
      "Natural Language Processing (NLP)",
      "Computer Vision Fundamentals",
      "Python for AI Development",
      "Real-World Industry Projects",
      "TensorFlow & PyTorch Frameworks",
      "AI Ethics & Responsible AI",
    ],
    curriculum: [
      {
        title: "Module 1: Introduction to AI",
        topics: [
          "What is Artificial Intelligence?",
          "History & Evolution of AI",
          "Types of AI: Narrow, General, Super",
          "AI Applications in Industry",
          "Setting Up Your Development Environment",
        ],
      },
      {
        title: "Module 2: Python for AI",
        topics: [
          "Python Programming Essentials",
          "NumPy & Pandas for Data Handling",
          "Data Visualisation with Matplotlib",
          "Working with APIs and Datasets",
        ],
      },
      {
        title: "Module 3: Machine Learning Foundations",
        topics: [
          "Supervised vs Unsupervised Learning",
          "Regression & Classification",
          "Decision Trees & Random Forests",
          "Model Evaluation & Optimisation",
        ],
      },
      {
        title: "Module 4: Deep Learning & Neural Networks",
        topics: [
          "Artificial Neural Networks (ANN)",
          "Convolutional Neural Networks (CNN)",
          "Recurrent Neural Networks (RNN)",
          "Transfer Learning Techniques",
        ],
      },
      {
        title: "Module 5: NLP & Computer Vision",
        topics: [
          "Text Processing & Sentiment Analysis",
          "Chatbot Development",
          "Image Recognition & Object Detection",
          "Generative AI & Large Language Models",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        topics: [
          "End-to-End AI Project",
          "Model Deployment & API Integration",
          "Portfolio Building & Presentation",
          "Industry Best Practices",
        ],
      },
    ],
    duration: ["3-Month Certificate Programme", "6-Month Advanced Certificate"],
    schedule: "Mon, Tue, Thu, Fri — 1 Hour Per Session",
    level: "Beginner to Advanced",
    metaTitle:
      "Artificial Intelligence Course UK | AI Certification London | Sysfotech",
    metaDescription:
      "Enrol in our Professional AI Certification Course in London, UK. Live online & classroom sessions. Practical training from beginner to advanced level. 1-Day Free Demo available.",
    metaKeywords:
      "artificial intelligence course uk, ai certification london, ai training programme, learn ai uk, ai course online, sysfotech ai",
  },
  {
    slug: "data-science",
    title: "Data Science",
    shortTitle: "Data Science",
    shortDescription:
      "Transform raw data into actionable insights. Learn data analysis, visualisation, statistical modelling, and predictive analytics.",
    fullDescription:
      "Our Data Science certification programme equips you with the skills to extract meaningful insights from complex datasets. From data wrangling and exploratory analysis to advanced statistical modelling and predictive analytics, this course covers the full data science lifecycle. You'll work with industry-standard tools including Python, SQL, Tableau, and cloud platforms. Our London-based expert trainers provide live, practical sessions with real-world UK industry datasets.",
    icon: Database,
    color: "#3B82F6",
    highlights: [
      "Data Analysis & Visualisation",
      "Statistical Modelling",
      "Predictive Analytics",
      "Python, SQL & Tableau",
      "Big Data Fundamentals",
      "Cloud Data Platforms",
      "Real-World UK Datasets",
      "Portfolio-Ready Projects",
    ],
    curriculum: [
      {
        title: "Module 1: Data Science Fundamentals",
        topics: [
          "What is Data Science?",
          "Data Science Lifecycle",
          "Tools & Technologies Overview",
          "Setting Up Your Environment",
          "Introduction to Statistics",
        ],
      },
      {
        title: "Module 2: Data Wrangling with Python",
        topics: [
          "Python for Data Science",
          "Pandas & NumPy Mastery",
          "Data Cleaning & Preprocessing",
          "Working with APIs & Web Scraping",
        ],
      },
      {
        title: "Module 3: Data Visualisation",
        topics: [
          "Matplotlib & Seaborn",
          "Interactive Dashboards with Plotly",
          "Tableau for Business Intelligence",
          "Storytelling with Data",
        ],
      },
      {
        title: "Module 4: Statistical Analysis",
        topics: [
          "Descriptive & Inferential Statistics",
          "Hypothesis Testing",
          "Regression Analysis",
          "A/B Testing & Experimentation",
        ],
      },
      {
        title: "Module 5: Machine Learning for Data Science",
        topics: [
          "Supervised & Unsupervised Learning",
          "Feature Engineering",
          "Model Selection & Evaluation",
          "Time Series Forecasting",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        topics: [
          "End-to-End Data Science Project",
          "Data Pipeline Development",
          "Insights Presentation & Reporting",
          "Career Preparation & Portfolio",
        ],
      },
    ],
    duration: ["3-Month Certificate Programme", "6-Month Advanced Certificate"],
    schedule: "Mon, Tue, Thu, Fri — 1 Hour Per Session",
    level: "Beginner to Advanced",
    metaTitle:
      "Data Science Course UK | Data Analytics Certification London | Sysfotech",
    metaDescription:
      "Professional Data Science Certification in London, UK. Learn Python, SQL, Tableau & Machine Learning with live practical sessions. FREE 1-day demo available.",
    metaKeywords:
      "data science course uk, data analytics certification london, learn data science, python data science, sysfotech data science",
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    shortTitle: "Cyber Security",
    shortDescription:
      "Protect digital assets and infrastructure. Learn ethical hacking, network security, threat analysis, and incident response.",
    fullDescription:
      "Our Cyber Security certification programme prepares you to defend organisations against evolving digital threats. You'll master ethical hacking, penetration testing, network security, and incident response. This programme covers industry frameworks including NIST, ISO 27001, and GDPR compliance — essential for UK-based organisations. With live practical sessions and simulated attack scenarios, you'll build real defensive capabilities that employers demand.",
    icon: Shield,
    color: "#EF4444",
    highlights: [
      "Ethical Hacking & Penetration Testing",
      "Network Security Architecture",
      "GDPR & UK Compliance Frameworks",
      "Incident Response & Forensics",
      "Security Operations Centre (SOC)",
      "Cloud Security Fundamentals",
      "Vulnerability Assessment",
      "Hands-On Lab Environments",
    ],
    curriculum: [
      {
        title: "Module 1: Cyber Security Fundamentals",
        topics: [
          "Introduction to Cyber Security",
          "Threat Landscape & Attack Vectors",
          "Security Frameworks (NIST, ISO 27001)",
          "GDPR & UK Data Protection",
          "Security Tools & Environments",
        ],
      },
      {
        title: "Module 2: Network Security",
        topics: [
          "Network Protocols & Architecture",
          "Firewalls & IDS/IPS Systems",
          "VPN & Secure Communications",
          "Wireless Network Security",
        ],
      },
      {
        title: "Module 3: Ethical Hacking",
        topics: [
          "Penetration Testing Methodology",
          "Web Application Security Testing",
          "Social Engineering Techniques",
          "Exploit Development Basics",
        ],
      },
      {
        title: "Module 4: Security Operations",
        topics: [
          "Security Information & Event Management (SIEM)",
          "Log Analysis & Monitoring",
          "Incident Detection & Response",
          "Digital Forensics Fundamentals",
        ],
      },
      {
        title: "Module 5: Cloud & Application Security",
        topics: [
          "Cloud Security (AWS, Azure)",
          "Secure Software Development",
          "API Security & Testing",
          "Container & DevSecOps",
        ],
      },
      {
        title: "Module 6: Capstone Project",
        topics: [
          "Full Security Assessment",
          "Red Team vs Blue Team Exercise",
          "Security Report Writing",
          "Certification Preparation",
        ],
      },
    ],
    duration: ["3-Month Certificate Programme", "6-Month Advanced Certificate"],
    schedule: "Mon, Tue, Thu, Fri — 1 Hour Per Session",
    level: "Beginner to Advanced",
    metaTitle:
      "Cyber Security Course UK | Ethical Hacking Certification London | Sysfotech",
    metaDescription:
      "Professional Cyber Security Certification in London, UK. Learn ethical hacking, network security & GDPR compliance. Live practical sessions with FREE 1-day demo.",
    metaKeywords:
      "cyber security course uk, ethical hacking london, cyber security certification, network security training, sysfotech cyber security",
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    shortTitle: "Machine Learning",
    shortDescription:
      "Build intelligent systems that learn from data. Master algorithms, model training, evaluation, and deployment techniques.",
    fullDescription:
      "Our Machine Learning certification programme takes you from foundational concepts to advanced model development and deployment. You'll master supervised and unsupervised learning, ensemble methods, neural networks, and MLOps practices. Using Python, scikit-learn, TensorFlow, and cloud ML services, you'll build production-ready models. Our London-based trainers guide you through hands-on projects using real UK industry data.",
    icon: Cpu,
    color: "#8B5CF6",
    highlights: [
      "Supervised & Unsupervised Learning",
      "Ensemble Methods & Boosting",
      "Feature Engineering & Selection",
      "Model Deployment & MLOps",
      "scikit-learn & TensorFlow",
      "Cloud ML Platforms (AWS, GCP)",
      "Time Series & Forecasting",
      "Industry-Grade Projects",
    ],
    curriculum: [
      {
        title: "Module 1: ML Foundations",
        topics: [
          "What is Machine Learning?",
          "Types of ML: Supervised, Unsupervised, Reinforcement",
          "Mathematics for ML (Linear Algebra, Calculus, Probability)",
          "Python Libraries for ML",
          "Data Preprocessing Techniques",
        ],
      },
      {
        title: "Module 2: Supervised Learning",
        topics: [
          "Linear & Logistic Regression",
          "Support Vector Machines (SVM)",
          "Decision Trees & Random Forests",
          "K-Nearest Neighbours (KNN)",
        ],
      },
      {
        title: "Module 3: Unsupervised Learning",
        topics: [
          "K-Means & Hierarchical Clustering",
          "Principal Component Analysis (PCA)",
          "Anomaly Detection",
          "Association Rule Mining",
        ],
      },
      {
        title: "Module 4: Advanced ML Techniques",
        topics: [
          "Ensemble Methods (Bagging, Boosting)",
          "XGBoost & LightGBM",
          "Hyperparameter Tuning",
          "Cross-Validation Strategies",
        ],
      },
      {
        title: "Module 5: Deep Learning & Neural Networks",
        topics: [
          "Neural Network Architecture",
          "CNNs for Image Tasks",
          "RNNs & LSTMs for Sequential Data",
          "Transfer Learning & Fine-Tuning",
        ],
      },
      {
        title: "Module 6: MLOps & Deployment",
        topics: [
          "Model Serialisation & APIs",
          "ML Pipeline Development",
          "Cloud Deployment (AWS SageMaker, GCP AI)",
          "Monitoring & Model Retraining",
        ],
      },
    ],
    duration: ["3-Month Certificate Programme", "6-Month Advanced Certificate"],
    schedule: "Mon, Tue, Thu, Fri — 1 Hour Per Session",
    level: "Beginner to Advanced",
    metaTitle:
      "Machine Learning Course UK | ML Certification London | Sysfotech",
    metaDescription:
      "Professional Machine Learning Certification in London, UK. Learn ML algorithms, model building & deployment with live practical sessions. FREE 1-day demo.",
    metaKeywords:
      "machine learning course uk, ml certification london, learn machine learning, python ml course, sysfotech machine learning",
  },
  {
    slug: "microsoft-power-bi",
    title: "Microsoft Power BI",
    shortTitle: "Power BI",
    shortDescription:
      "Master data visualisation and business intelligence with Microsoft Power BI. Create stunning dashboards and insightful reports.",
    fullDescription:
      "Our Microsoft Power BI certification programme teaches you to transform raw business data into compelling visual stories. From DAX formulas and Power Query to advanced dashboard design and data modelling, this course covers everything you need to become a Power BI expert. Ideal for business analysts, data professionals, and managers across the UK. Our London trainers deliver live, practical sessions focused on real business scenarios.",
    icon: BarChart3,
    color: "#F59E0B",
    highlights: [
      "Interactive Dashboard Design",
      "DAX Formulas & Measures",
      "Power Query Data Transformation",
      "Data Modelling & Relationships",
      "Row-Level Security (RLS)",
      "Power BI Service & Cloud Publishing",
      "Real Business Case Studies",
      "Report Sharing & Collaboration",
    ],
    curriculum: [
      {
        title: "Module 1: Power BI Fundamentals",
        topics: [
          "Introduction to Business Intelligence",
          "Power BI Desktop Overview",
          "Connecting to Data Sources",
          "Data Import & Transformation Basics",
          "Your First Dashboard",
        ],
      },
      {
        title: "Module 2: Power Query & Data Transformation",
        topics: [
          "Power Query Editor Mastery",
          "Data Cleaning & Shaping",
          "Merging & Appending Queries",
          "Custom Columns & Transformations",
        ],
      },
      {
        title: "Module 3: Data Modelling",
        topics: [
          "Star Schema & Data Models",
          "Table Relationships",
          "Calculated Columns & Measures",
          "Date Tables & Time Intelligence",
        ],
      },
      {
        title: "Module 4: DAX Mastery",
        topics: [
          "DAX Syntax & Functions",
          "CALCULATE, FILTER & Context",
          "Time Intelligence Functions",
          "Advanced DAX Patterns",
        ],
      },
      {
        title: "Module 5: Advanced Visualisations",
        topics: [
          "Custom Visuals & Marketplace",
          "Bookmarks, Drillthrough & Tooltips",
          "Conditional Formatting",
          "Mobile-Optimised Reports",
        ],
      },
      {
        title: "Module 6: Publishing & Administration",
        topics: [
          "Power BI Service & Workspaces",
          "Row-Level Security (RLS)",
          "Scheduled Refresh & Gateways",
          "Real-World Business Project",
        ],
      },
    ],
    duration: ["3-Month Certificate Programme", "6-Month Advanced Certificate"],
    schedule: "Mon, Tue, Thu, Fri — 1 Hour Per Session",
    level: "Beginner to Advanced",
    metaTitle:
      "Microsoft Power BI Course UK | Power BI Certification London | Sysfotech",
    metaDescription:
      "Professional Power BI Certification in London, UK. Learn DAX, data modelling & dashboard design with live practical sessions. FREE 1-day demo available.",
    metaKeywords:
      "power bi course uk, power bi certification london, learn power bi, microsoft power bi training, sysfotech power bi",
  }, */
  {
    slug: "sysfotech-6-month-ai-program",
    title: "Sysfotech UK 6-Month AI & Automation Program",
    shortTitle: "6-Month AI & Automation Program",
    shortDescription:
      "Complete 6-Month Intensive Curriculum Roadmap covering AI-Powered Business Automation, n8n, RPA, Power BI Data Analytics, and a 3-Month Live UK Internship.",
    fullDescription:
      "The flagship Sysfotech UK 6-Month Intensive Curriculum Roadmap transforms learners into industry-ready AI, Automation, and Data Analytics professionals. Across 5 comprehensive phases, you will master Google Workspace, AppSheet, Google Apps Script, n8n Workflow Automation, Microsoft Power Automate Desktop (RPA), and Next-Gen Data Analytics with Power BI & DAX, followed by a 3-Month Live UK Internship with 1-on-1 mentorship and dual certification.",
    icon: Brain,
    color: "#F26522",
    highlights: [
      "Phase 1: AI-Powered Business Automation (Google Workspace, AppSheet & Apps Script)",
      "Phase 2: n8n Visual Workflow Automation & OpenAI Agents",
      "Phase 3: Robotic Process Automation (Power Automate Desktop)",
      "Phase 4: Next-Gen Data Analytics (Power Query, Star Schema, DAX & Power BI)",
      "Phase 5: 3-Month Live UK Internship, 1-on-1 Mentorship & Career Acceleration",
      "Dual Certification: Course Completion + UK Internship Certificate",
    ],
    curriculum: [
      {
        title: "Phase 1: AI-Powered Business Automation (Weeks 1-4)",
        topics: [
          "Week 1: Google Workspace & Sheets Foundation (VLOOKUP, XLOOKUP, INDEX/MATCH, Pre-Defined Master Sheet)",
          "Week 2: AppSheet & Low-Code Architecture (Inventory Master App & HR Leave-Approval Portal with RLS)",
          "Week 3: Google Apps Script & Autonomous Agents (Event-Driven & Scheduled Triggers, GmailApp vs MailApp)",
          "Week 4: Integration & Phase Conclusion (AppSheet Bots, Platform Merging & Security Deployment)",
        ],
      },
      {
        title: "Phase 2: n8n Workflow Automation (Weeks 5-6)",
        topics: [
          "Week 5: n8n Zero to One (Node-based visual workflow engines, Triggers, JSON data flow, Slack/Discord automation)",
          "Week 6: Advanced Logic & APIs (Webhooks, HTTP Request Node & OpenAI Agent integrations)",
        ],
      },
      {
        title: "Phase 3: Robotic Process Automation (Weeks 7-8)",
        topics: [
          "Week 7: Power Automate Desktop Basics (UI navigation, desktop flows, recorder & variable management)",
          "Week 8: Advanced RPA Workflows (Live Web & Excel scraping, error handling & resilient UI flows)",
        ],
      },
      {
        title: "Phase 4: Next-Gen Data Analytics (Weeks 9-12)",
        topics: [
          "Week 9: Data Ingestion & Power Query (ETL Fundamentals & Data Cleaning)",
          "Week 10: Data Modeling & DAX (Star Schema, Fact vs Dimension tables, CALCULATE & Time Intelligence)",
          "Week 11: Visualizations & UX (Matrix, Scatter, Line charts, Slicers, drill-downs & custom tooltips)",
          "Week 12: Publishing & Administration (Power BI Service, scheduled refreshes & Executive Dashboard)",
        ],
      },
      {
        title: "Phase 5: Live Internship & Career Acceleration (Months 4-6)",
        topics: [
          "Months 4-5: Live Project Building & Mentorship (Integrated corporate projects, weekly UK business assignments & 1-on-1 code reviews)",
          "Month 6: Professional Branding & Placement Prep (ATS Resume building, LinkedIn/Naukri optimization, Mock Interviews & Dual Certification)",
        ],
      },
    ],
    duration: ["6-Month Intensive Program (3 Months Training + 3 Months UK Internship)"],
    schedule: "Mon, Tue, Thu, Fri — 1 Hour Per Session",
    level: "Beginner to Advanced",
    metaTitle: "Sysfotech UK 6-Month AI & Automation Program | Course & UK Internship",
    metaDescription:
      "Enrol in the Sysfotech UK 6-Month Intensive AI, Workflow Automation, RPA & Data Analytics Program with a 3-Month Live UK Internship and Dual Certification.",
    metaKeywords:
      "sysfotech uk program, 6 month ai course uk, ai business automation, n8n course, power automate rpa, power bi course london, uk internship certificate",
    price: 429,
  },
  {
    slug: "ai-powered-business-automation",
    title: "AI-Powered Business Automation (Google Workspace, AppSheet, Apps Script)",
    shortTitle: "AI Business Automation",
    shortDescription:
      "Transform complete beginners into employable automation developers who can build internal business apps and workflows in days, not months.",
    fullDescription:
      "The Citizen Developer Bootcamp. Aspiring automation specialists, IT generalists, and operations executives will learn to automate workflows, visualize data, and leverage AI to increase productivity without the overhead of a full software engineering team. Upon enrollment, students can be registered as 'Unpaid Interns' building complete production-ready apps.",
    icon: Workflow,
    color: "#10B981",
    highlights: [
      "Advanced Data Architecture & Sheets",
      "Google Apps Script & AI Pair Programming",
      "Building UIs with AppSheet",
      "Advanced AI API Integrations",
      "Agency Internship Capstone & Portfolio",
    ],
    curriculum: [
      {
        title: "Week 1-2: Advanced Data Architecture & Sheets",
        topics: [
          "Structuring Google Sheets as a relational database.",
          "Advanced functions (QUERY, FILTER, ARRAYFORMULA).",
          "Prompt Engineering 101: Using ChatGPT/Gemini to write complex sheet formulas instantly.",
        ],
      },
      {
        title: "Week 3-4: Google Apps Script & AI Pair Programming",
        topics: [
          "Introduction to Apps Script (Macros, Triggers, Custom Functions).",
          "AI Integration: Teaching students how to prompt AI to generate JavaScript code for Apps Script.",
        ],
      },
      {
        title: "Week 5-6: Building UIs with AppSheet",
        topics: [
          "Connecting data sources and generating no-code mobile/web interfaces.",
          "UX design, data slicing, and row-level security.",
          "Creating automated Bots and webhooks within AppSheet.",
        ],
      },
      {
        title: "Week 7-8: Advanced AI API Integrations",
        topics: [
          "Using Apps Script to connect to external APIs (WhatsApp, Slack).",
          "Integrating OpenAI/Gemini APIs directly into AppSheet tools.",
        ],
      },
      {
        title: "Week 9-10: Agency Internship Capstone & Portfolio",
        topics: [
          "Students build 2 complete, production-ready apps for the consultancy's mock/real clients.",
          "Recording Loom video demos for their portfolios.",
          "Resume optimization targeting 'Low-Code Developer' roles.",
        ],
      },
    ],
    duration: ["10-Week Bootcamp"],
    schedule: "Flexible / 10 Weeks",
    level: "Beginner to Intermediate",
    metaTitle: "AI-Powered Business Automation Course UK | Sysfotech",
    metaDescription:
      "10-Week Market-Ready AI & Automation Bootcamp focusing on Google Workspace, AppSheet, and Apps Script.",
    metaKeywords:
      "ai business automation, appsheet course, google workspace automation, sysfotech ai bootcamp",
  },
  {
    slug: "next-gen-data-analytics",
    title: "Next-Gen Data Analytics (Power BI & AI)",
    shortTitle: "Next-Gen Data Analytics",
    shortDescription:
      "Market-Ready Business Intelligence Bootcamp. Process massive datasets, build dashboards, and uncover insights using AI.",
    fullDescription:
      "Market-Ready Business Intelligence Bootcamp designed for aspiring data analysts, business analysts, and finance professionals. Teach students how to process massive datasets, build interactive dashboards, and use AI to uncover business insights and write complex DAX code.",
    icon: PieChart,
    color: "#3B82F6",
    highlights: [
      "Data Preparation & Power Query",
      "Data Modeling & Relationships",
      "DAX Mastery with AI Assistance",
      "Visualizations & AI Features in Power BI",
      "Capstone Dashboard & Employability",
    ],
    curriculum: [
      {
        title: "Week 1-2: Data Preparation & Power Query",
        topics: [
          "Extract, Transform, Load (ETL) principles.",
          "Cleaning messy data in Power Query.",
          "AI Integration: Using AI to generate custom 'M' code for complex data transformations.",
        ],
      },
      {
        title: "Week 3-4: Data Modeling & Relationships",
        topics: [
          "Star schema, fact vs. dimension tables, and relationship cardinality.",
          "Building robust data models optimized for reporting.",
        ],
      },
      {
        title: "Week 5-6: DAX Mastery with AI Assistance",
        topics: [
          "Introduction to Data Analysis Expressions (Calculated columns vs. measures).",
          "Time intelligence functions.",
          "AI Integration: Prompting ChatGPT/Copilot to write, debug, and explain complex DAX measures.",
        ],
      },
      {
        title: "Week 7-8: Visualizations & AI Features in Power BI",
        topics: [
          "UX/UI best practices for dashboards.",
          "Utilizing Power BI's native AI visuals (Key Influencers, Decomposition Tree, Q&A).",
          "Integrating Python/R scripts via AI generation for predictive analytics.",
        ],
      },
      {
        title: "Week 9-10: Capstone Dashboard & Employability",
        topics: [
          "End-to-end project: From raw client data to published Power BI Service dashboard.",
          "Creating a public portfolio via NovyPro or GitHub.",
          "Freelance bidding strategies for BI projects on Upwork.",
        ],
      },
    ],
    duration: ["10-Week Bootcamp"],
    schedule: "Flexible / 10 Weeks",
    level: "Beginner to Intermediate",
    metaTitle: "Next-Gen Data Analytics Course UK | Sysfotech",
    metaDescription:
      "10-Week Next-Gen Data Analytics Bootcamp. Power BI + AI Integration.",
    metaKeywords:
      "data analytics course, power bi ai course, business intelligence bootcamp, sysfotech data",
  },
  {
    slug: "ai-for-office-productivity",
    title: "AI for Office Productivity",
    shortTitle: "AI Office Productivity",
    shortDescription:
      "The Mid-Career Master Bootcamp. Automate daily tasks, save 10+ hours a week. Zero coding required.",
    fullDescription:
      "The Mid-Career Master Bootcamp for mid-age employees, managers, and non-technical office workers looking to future-proof their careers. Eliminate the fear of AI replacing you by learning how to use AI to automate daily tasks, saving 10+ hours a week and increasing your value to employers.",
    icon: MonitorCheck,
    color: "#8B5CF6",
    highlights: [
      "AI Demystified & Prompt Engineering",
      "Automating Communications",
      "Supercharging Excel & Word without Code",
      "AI for Presentations & Research",
      "Building Custom AI Assistants",
    ],
    curriculum: [
      {
        title: "Week 1-2: AI Demystified & Prompt Engineering",
        topics: [
          "Overcoming AI anxiety: What LLMs actually are and how they work.",
          "The anatomy of a perfect prompt (Context, Task, Format, Persona).",
          "Daily ideation and problem-solving with ChatGPT/Claude.",
        ],
      },
      {
        title: "Week 3-4: Automating Communications",
        topics: [
          "Using AI to draft, summarize, and manage high-volume emails.",
          "Meeting automation: Transcribing, summarizing, and generating action items automatically.",
          "Tone matching and professional communication scaling.",
        ],
      },
      {
        title: "Week 5-6: Supercharging Excel & Word without Code",
        topics: [
          "Using AI to explain and generate complex Excel formulas instantly.",
          "Analyzing data trends and creating charts simply by chatting with data.",
          "Drafting reports, memos, and SOPs in a fraction of the time.",
        ],
      },
      {
        title: "Week 7-8: AI for Presentations & Research",
        topics: [
          "Rapid research: Summarizing 100-page PDFs and industry reports in minutes.",
          "Using AI tools (Gamma, Copilot) to generate presentation outlines and slide decks.",
        ],
      },
      {
        title: "Week 9-10: Building Custom AI Assistants & Final Project",
        topics: [
          "Creating Custom GPTs tailored to their specific job roles.",
          "Final Project: Students present a workflow they have fully automated, demonstrating clear ROI.",
        ],
      },
    ],
    duration: ["10-Week Bootcamp"],
    schedule: "Flexible / 10 Weeks",
    level: "Beginner to Intermediate",
    metaTitle: "AI for Office Productivity Course UK | Sysfotech",
    metaDescription:
      "The Mid-Career Master Bootcamp. Automate your daily tasks and future-proof your career with AI. Zero coding required.",
    metaKeywords:
      "ai office productivity, chatgpt course, automate tasks ai, sysfotech office ai",
  },
];

export const flagshipCourseSlug = "sysfotech-6-month-ai-program";
export const flagshipCourseTitle = "Sysfotech UK 6-Month AI & Automation Programme";

// Active registration options for the new 6-Month AI Programme (previous multi-course list preserved below)
export const allCourseOptions = [flagshipCourseTitle];
// export const legacyAllCourseOptions = courses.map(c => c.title);

export const whyChooseUs = [
  {
    title: "UK Based Company",
    description: "Registered and operated from London, United Kingdom",
    icon: Globe,
  },
  {
    title: "Live Practical Sessions",
    description: "Interactive live online sessions with practical projects",
    icon: PlayCircle,
  },
  {
    title: "Industry Projects",
    description: "Work on real-world projects during the programme",
    icon: Briefcase,
  },
  {
    title: "Expert Trainers",
    description: "Learn from industry professionals with years of experience",
    icon: GraduationCap,
  },
  {
    title: "Certificate on Completion",
    description: "Receive a professional certification upon completing the course",
    icon: Award,
  },
  {
    title: "Career Guidance",
    description: "Get personalised career advice and job placement support",
    icon: Compass,
  },
  {
    title: "Interview Preparation",
    description: "Mock interviews and CV building to land your dream role",
    icon: Target,
  },
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find((course) => course.slug === slug);
};
