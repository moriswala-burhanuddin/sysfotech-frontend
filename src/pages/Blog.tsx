import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { blogs } from "@/data/blogs";

const Blog = () => {
    const featuredBlog = blogs[0];
    const regularBlogs = blogs.slice(1);

    return (
        <>
            <SEO
                title="Blog | Web Development Company UK Insights & News - Sysfotech"
                description="Stay updated with the latest trends in custom software development UK, AI development, digital transformation services, and business automation solutions. Expert articles from a leading web development company UK."
                keywords="web development company uk, website design company london, custom software development uk, mobile app development company uk, erp software development, ai development company uk, business automation solutions, digital transformation services, it solutions company uk, sysfotech blog"
                url="/blog"
            />
            <div className="min-h-screen bg-background relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-tech-dark/5 rounded-full blur-3xl -z-10"></div>

                {/* Hero Section */}
                <section className="relative pt-24 pb-16 overflow-hidden">
                    <div className="container relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">

                            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">
                                Sysfotech <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-primary to-orange-light">Insights</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Exploring the frontiers of technology, design, and business innovation.
                                Deep dives into the trends shaping our digital future.
                            </p>
                        </div>

                        {/* Featured Post */}
                        <div className="mb-20">
                            <Link to={`/blog/${featuredBlog.id}`} className="group block">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-orange/50 hover:-translate-y-1">
                                    <div className="grid lg:grid-cols-2 min-h-[500px]">
                                        <div className="relative h-full min-h-[300px] lg:min-h-full overflow-hidden">
                                            <img
                                                src={featuredBlog.image}
                                                alt={featuredBlog.title}
                                                width="800"
                                                height="500"
                                                fetchPriority="high"
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r"></div>
                                        </div>
                                        <div className="bg-card/95 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center border-l border-border/50">
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {featuredBlog.tags.map(tag => (
                                                    <span key={tag} className="bg-orange-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight group-hover:text-orange-primary transition-colors">
                                                {featuredBlog.title}
                                            </h2>
                                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                                                {featuredBlog.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-border">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-orange-primary/20 flex items-center justify-center text-orange-primary font-bold text-lg">
                                                        {featuredBlog.author.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-foreground">{featuredBlog.author}</div>
                                                        <div className="text-xs text-muted-foreground">{new Date(featuredBlog.date).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                                <span className="flex items-center text-orange-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                                    Read Article <ArrowRight className="ml-2 w-5 h-5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Regular Blog Grid */}
                <section className="pb-24 container">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold text-foreground">Recent Articles</h2>
                        <div className="h-px bg-border flex-1 ml-8"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularBlogs.map((blog) => (
                            <Card key={blog.id} className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-white/20 hover:border-orange-primary/50 hover:shadow-xl hover:shadow-orange-primary/10 transition-all duration-300 group overflow-hidden rounded-2xl">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        loading="lazy"
                                        width="400"
                                        height="225"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {blog.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <CardHeader className="pb-3 pt-6 px-6">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                        <span className="flex items-center bg-secondary/50 px-2 py-1 rounded-md">
                                            <Calendar className="w-3 h-3 mr-1.5" />
                                            {new Date(blog.date).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <span className="flex items-center">
                                            <User className="w-3 h-3 mr-1.5" />
                                            {blog.author}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground line-clamp-2 leading-tight group-hover:text-orange-primary transition-colors">
                                        <Link to={`/blog/${blog.id}`} className="block">
                                            {blog.title}
                                        </Link>
                                    </h3>
                                </CardHeader>

                                <CardContent className="flex-grow px-6">
                                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                        {blog.excerpt}
                                    </p>
                                </CardContent>

                                <CardFooter className="pt-0 px-6 pb-6">
                                    <Button asChild variant="ghost" className="w-full justify-between hover:bg-orange-primary/5 hover:text-orange-primary group/btn p-0 h-auto font-semibold">
                                        <Link to={`/blog/${blog.id}`} className="flex items-center w-full">
                                            Read More
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover/btn:bg-orange-primary group-hover/btn:text-white transition-colors">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Blog;
