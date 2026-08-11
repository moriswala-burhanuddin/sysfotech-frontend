import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Code2, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const BentoProjects = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden" id="projects">
            {/* Geometric Background Patterns */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,100,0,0.05),transparent_40%)]"></div>

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Layers className="w-5 h-5 text-orange-primary" />
                            <span className="text-orange-primary font-bold tracking-widest text-xs uppercase">
                                PORTFOLIO
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Selected Works
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Deep dive into our featured projects. Functionality meets specific design in our bento grid showcase.
                        </p>
                    </div>
                    <Button asChild variant="ghost" className="hidden md:flex gap-2 cursor-pointer hover:bg-orange-primary/10 hover:text-orange-primary transition-colors">
                        <a href="https://github.com/Sysfotech" target="_blank" rel="noopener noreferrer">
                            View Github <Github className="w-4 h-4" />
                        </a>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {projects.map((project, index) => {
                        const Icon = project.icon;
                        // Determine if it's a wide or tall card for specific layout adjustments
                        const isWide = project.colSpan.includes("col-span-2");
                        const isTall = project.colSpan.includes("row-span-2");

                        return (
                            <div
                                key={project.id}
                                className={`group relative rounded-[2rem] p-3 bg-orange-primary border border-orange-600/20 shadow-lg flex flex-col ${project.colSpan}`}
                            >
                                <div className="flex flex-col h-full w-full">
                                    {/* Image Container - The "Window" */}
                                    <div className={`relative overflow-hidden rounded-[1.5rem] bg-background w-full ${isTall && !isWide ? 'h-[60%]' : 'h-[65%]'}`}>
                                        <Link to={`/projects/${project.slug}`} className="block w-full h-full">
                                            <div className="w-full h-full">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    width="400"
                                                    height="300"
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Gradient Overlay on Image Only */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                            </div>
                                        </Link>

                                        {/* Floating Icon Badge on Image */}
                                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg z-10 pointer-events-none">
                                            <Icon className="w-5 h-5 text-foreground" />
                                        </div>

                                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {project.link ? (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-orange-primary text-white flex items-center justify-center shadow-lg cursor-pointer"
                                                >
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </a>
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-orange-primary text-white flex items-center justify-center shadow-lg pointer-events-none">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Section - The "Card Body" */}
                                    <Link to={`/projects/${project.slug}`} className="flex-1 flex flex-col justify-between pt-4 pb-2 px-2">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.slice(0, 3).map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="bg-white/10 border-white/20 text-white text-[10px] py-1 px-2.5 backdrop-blur-sm"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div>
                                                <h3 className="text-2xl font-bold text-white">
                                                    {project.title}
                                                </h3>
                                                {/* Description is now always visible but truncated differently based on size */}
                                                <p className="mt-2 text-white/90 text-sm line-clamp-2 leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                                            <Code2 className="w-3.5 h-3.5 mr-1.5" />
                                            <span>View Case Study</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" className="w-full gap-2">
                        View All Projects <ExternalLink className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BentoProjects;
