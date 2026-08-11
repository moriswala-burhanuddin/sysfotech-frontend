import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, User, Code2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Button asChild>
                        <Link to="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const ProjectIcon = project.icon;

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Section with Image Background */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} mix-blend-overlay opacity-60 z-10`} />

                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="container px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-white text-opacity-90">
                                <ProjectIcon className="w-8 h-8" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-3"
                        >
                            {project.tags.map((tag) => (
                                <Badge key={tag} className="text-lg py-1 px-4 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                                    {tag}
                                </Badge>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container px-4 py-16 -mt-20 relative z-30">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-card/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Code2 className="text-orange-primary" /> Project Overview
                                </h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    This project demonstrates our commitment to high-quality code and user-centric design.
                                    We focused on creating a scalable architecture that can handle growth while maintaining
                                    top-tier performance.
                                </p>
                            </div>

                            {/* Mock Data for detailed view - replacing hardcoded content with something generic but plausible if real data isn't available */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-background/50 border border-white/5">
                                    <h4 className="font-semibold text-lg mb-2 text-foreground">Key Features</h4>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                        <li>Responsive Design</li>
                                        <li>High Performance</li>
                                        <li>Secure Architecture</li>
                                        <li>User Friendly Interface</li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-2xl bg-background/50 border border-white/5">
                                    <h4 className="font-semibold text-lg mb-2 text-foreground">Tech Stack</h4>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                        {project.tags.map(t => <li key={t}>{t}</li>)}
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="space-y-8">
                            <div className="p-6 rounded-2xl bg-background/50 border border-white/5 space-y-6">
                                <h3 className="text-xl font-bold">Project Info</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center gap-2"><User size={16} /> Client</span>
                                        <span className="font-medium">Confidential</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center gap-2"><Calendar size={16} /> Date</span>
                                        <span className="font-medium">2026</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center gap-2"><Globe size={16} /> Category</span>
                                        <span className="font-medium">Web Development</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                                    {project.link ? (
                                        <Button asChild className="w-full gap-2 bg-orange-primary hover:bg-orange-600 text-white">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                Visit Live Site <ExternalLink size={16} />
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button disabled className="w-full gap-2 bg-orange-primary/50 text-white cursor-not-allowed">
                                            Visit Live Site <ExternalLink size={16} />
                                        </Button>
                                    )}
                                    <Button variant="outline" className="w-full gap-2">
                                        <a href="https://github.com/Sysfotech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center">
                                            View Code <Github size={16} />
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6">
                                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-orange-primary transition-colors">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Project Gallery
                                </Link>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
