import { Wrench, Cpu, ShoppingCart, GraduationCap, TrendingUp, Utensils, Stethoscope, Layers, Activity, Scan, Factory, Car, Camera } from "lucide-react";

export interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
    icon: any;
    colSpan: string;
    bgGradient: string;
    link?: string;
    slug: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Burhani Traders",
        description: "B2B Industrial Website delivering a complete digital catalog with instant quotes, bulk pricing, and map integration for seamless customer access.",
        tags: ["Product Catalog", "Instant Quotes", "B2B"],
        image: "/projects/IT-SERVICES-LONDON-B2B-Industrial-Website.png",
        icon: Wrench,
        colSpan: "md:col-span-2 md:row-span-2",
        bgGradient: "from-orange-500/20 to-amber-900/20",
        link: "https://trinoxabrasives.com/",
        slug: "burhani-traders"
    },
    {
        id: 2,
        title: "Nebula AI Chat",
        description: "Next-gen conversational AI interface with voice synthesis and multimodal capabilities.",
        tags: ["Next.js", "OpenAI API", "Tailwind"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
        icon: Cpu,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-purple-500/20 to-indigo-900/20",
        slug: "nebula-ai-chat"
    },
    {
        id: 3,
        title: "Elegance E-commerce",
        description: "Fashion & Retail Platform revolutionizing traditional clothing business with seamless shopping cart and user authentication.",
        tags: ["E-commerce", "React", "Authentication"],
        image: "/projects/IT-SERVICES-LONDON-Elegance E-commerce.png",
        icon: ShoppingCart,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-pink-500/20 to-rose-900/20",
        link: "https://elegance-ecommerce-site.netlify.app/",
        slug: "elegance-ecommerce"
    },
    {
        id: 4,
        title: "Decent Institute",
        description: "A modern, responsive institute website designed to build trust, showcase courses, and manage student inquiries.",
        tags: ["Education", "Web Design", "Management"],
        image: "/projects/decent-institute.jpg",
        icon: GraduationCap,
        colSpan: "md:col-span-1 md:row-span-2",
        bgGradient: "from-green-500/20 to-teal-900/20",
        link: "https://decentinstitute.in/",
        slug: "decent-institute"
    },
    {
        id: 5,
        title: "CRM Pro Dashboard",
        description: "Modern sales management platform featuring advanced data visualization, real-time analytics, and intuitive UI.",
        tags: ["Dashboard", "Analytics", "CRM"],
        image: "/projects/IT-SERVICES-LONDON-CRM Pro Dashboard.png",
        icon: TrendingUp,
        colSpan: "md:col-span-2 md:row-span-1",
        bgGradient: "from-blue-500/20 to-indigo-900/20",
        link: "https://sysfotech.github.io/crm/",
        slug: "crm-pro-dashboard"
    },
    {
        id: 6,
        title: "Lumière Restaurant",
        description: "A culinary excellence experience featuring an elegant dark-themed design and seamless reservation system.",
        tags: ["Restaurant", "UI/UX", "Hospitality"],
        image: "/projects/lumiere-restaurant.png",
        icon: Utensils,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-yellow-500/20 to-amber-900/20",
        link: "https://lumiere-restaurant-website.netlify.app/",
        slug: "lumiere-restaurant"
    },
    {
        id: 7,
        title: "Dental Care Platform",
        description: "Premium dental clinic website featuring an intelligent AI chatbot for 24/7 appointment scheduling and patient support.",
        tags: ["Healthcare", "Booking System", "AI Chatbot"],
        image: "/projects/it-services-dental-booking-system.png",
        icon: Stethoscope,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-cyan-500/20 to-blue-900/20",
        link: "https://dental-clinics-website.netlify.app/",
        slug: "dental-care-platform"
    },
    {
        id: 8,
        title: "Interior Designer Portfolio",
        description: "Luxury Design interior portfolio showcasing high-end residential and commercial projects.",
        tags: ["Interior Design", "Luxury", "Portfolio"],
        image: "/projects/web-development-agency-in-londonInterior Designer Portfolio _ Luxury Design.png",
        icon: Layers,
        colSpan: "md:col-span-2 md:row-span-1",
        bgGradient: "from-stone-500/20 to-neutral-900/20",
        link: "https://interior-designer-websites.netlify.app/",
        slug: "interior-designer-portfolio"
    },
    {
        id: 9,
        title: "THE GYM",
        description: "Transform your body and mind with elite training, cutting-edge equipment, and a community that pushes limits.",
        tags: ["Fitness", "Health", "Gym"],
        image: "/projects/the-gym.png",
        icon: Activity,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-red-500/20 to-red-900/20",
        link: "https://the-gym-website-by-sysfotech.netlify.app/",
        slug: "the-gym"
    },
    {
        id: 10,
        title: "Face Recognition Attendance",
        description: "Advanced biometric system for gym attendance using real-time face recognition and secure data logging.",
        tags: ["Biometrics", "Face Recognition", "Gym Management"],
        image: "/projects/face-recognition.png",
        icon: Scan,
        colSpan: "md:col-span-3 md:row-span-1",
        bgGradient: "from-blue-600/20 to-indigo-900/20",
        link: "https://face-recognition-attendance-system-sy.netlify.app/",
        slug: "face-recognition-attendance"
    },
    {
        id: 11,
        title: "TMR Industrial",
        description: "Leading industrial tools and equipment supplier delivering quality machinery and engineering solutions.",
        tags: ["Industrial", "B2B", "Tools"],
        image: "/projects/tmr-tools-web-development-company-london.png",
        icon: Factory,
        colSpan: "md:col-span-2 md:row-span-1",
        bgGradient: "from-slate-500/20 to-zinc-900/20",
        link: "https://tmr-tools.com/",
        slug: "tmr-industrial"
    },
    {
        id: 12,
        title: "Bharat Motors",
        description: "Premium automotive showcase website featuring the latest car models and interactive booking.",
        tags: ["Automotive", "Showcase", "React"],
        image: "/projects/bharat-motors.jpeg",
        icon: Car,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-orange-500/20 to-neutral-900/20",
        link: "https://bharat-motors.netlify.app/",
        slug: "bharat-motors"
    },
    {
        id: 13,
        title: "Showtime Photo Booth _ New York City",
        description: "Premium photo booth rental service in NYC, offering high-quality prints and digital experiences for events.",
        tags: ["Event Services", "NYC", "Photo Booth"],
        image: "/projects/Showtime Photo Booth _ New York City .png",
        icon: Camera,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-purple-500/20 to-pink-900/20",
        link: "https://showtime-sysfotech.netlify.app/",
        slug: "showtime-photo-booth"
    },
    {
        id: 14,
        title: "BOSTON SERVICES GRP LTD",
        description: "Built to UK standards All services under one umbrella including Electrician, Plumbing, Painting, Carpenter, Gardens, Remover, Cleaning, and Kitchen fittings.",
        tags: ["Home Services", "UK Standards", "Maintenance"],
        image: "/projects/boston-services.co.uk.png",
        icon: Wrench,
        colSpan: "md:col-span-2 md:row-span-1",
        bgGradient: "from-blue-500/20 to-teal-900/20",
        link: "https://bostonservicesgrp.co.uk/",
        slug: "boston-services-grp"
    },
    {
        id: 15,
        title: "Al Jazeera Al Safa Building",
        description: "Built a modern website for a hardware business based in Dubai, UAE 🇦🇪 Focused on clean UI, smooth navigation, and a strong product showcase.",
        tags: ["Hardware", "Showcase", "Dubai"],
        image: "/projects/zohra-no.1.png",
        icon: Layers,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-amber-500/20 to-orange-900/20",
        link: "https://aljazeeraalsafabuilding.com/",
        slug: "aljazeeraalsafabuilding"
    },
    {
        id: 16,
        title: "Al Naseem Al Zahra",
        description: "Modern product showcase website based in Dubai, UAE 🇦🇪. Focused on clean UI, smooth navigation, and an intuitive user experience.",
        tags: ["E-commerce", "UI/UX", "Dubai"],
        image: "/projects/alnaseem-al-zahra.png",
        icon: ShoppingCart,
        colSpan: "md:col-span-1 md:row-span-1",
        bgGradient: "from-teal-500/20 to-green-900/20",
        link: "https://anazstore.com/",
        slug: "alnaseem-al-zahra"
    }
];
