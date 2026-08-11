import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { blogs } from "@/data/blogs";
import { toast } from "sonner";

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const blog = blogs.find((b) => b.id === id);

    if (!blog) {
        return <Navigate to="/blog" replace />;
    }

    // Create formatted date string
    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calculate read time (approximate)
    const wordCount = blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Share Functionality
    const handleShare = async () => {
        const shareData = {
            title: blog.title,
            text: blog.excerpt,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                toast.success("Shared successfully!");
            } catch (err) {
                console.error("Error capturing share release:", err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!", {
                description: "You can now share it with your friends."
            });
        }
    };

    // Construct structured data for the article
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "image": blog.image,
        "author": {
            "@type": "Person",
            "name": blog.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sysfotech",
            "logo": {
                "@type": "ImageObject",
                "url": "https://sysfotech.uk/logo.png"
            }
        },
        "datePublished": blog.date,
        "description": blog.excerpt
    };

    return (
        <>
            <SEO
                title={blog.seo?.title || blog.title}
                description={blog.seo?.description || blog.excerpt}
                keywords={blog.seo?.keywords}
                type="article"
                url={`/blog/${blog.id}`}
                image={blog.image}
                schema={articleSchema}
            />

            {/* Main Container - High Contrast, Sans-Serif */}
            <div className="min-h-screen bg-background text-foreground pb-20 pt-32 font-sans antialiased">
                <article className="container max-w-3xl mx-auto px-6 md:px-8">

                    {/* Navigation */}
                    <div className="mb-10">
                        <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center text-sm font-semibold group">
                            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>
                    </div>

                    {/* Article Header */}
                    <header className="mb-12">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-xs font-bold tracking-wide uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
                            {blog.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                            {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                                    {blog.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-foreground text-sm">{blog.author}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                                        <span>{formattedDate}</span>
                                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                                        <span>{readTime} min read</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" onClick={handleShare}>
                                <Share2 className="w-5 h-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </header>

                    {/* Feature Image */}
                    <div className="mb-16 -mx-6 md:-mx-8 lg:mx-0">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            width="800"
                            height="450"
                            fetchPriority="high"
                            className="w-full h-auto md:rounded-2xl shadow-sm border border-border/40"
                        />
                        <div className="text-center text-xs text-muted-foreground/60 mt-3 italic">
                            Image: Sysfotech Digital Assets
                        </div>
                    </div>

                    {/* Article Content - Clean & Readable */}
                    {/* prose-slate provides optimal contrast. prose-lg increases font size relative to container width. */}
                    <div className="prose prose-slate prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mb-4 prose-headings:mt-12
                        prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8 prose-p:mb-6
                        prose-strong:text-foreground prose-strong:font-bold
                        prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-md prose-img:border prose-img:border-border/50 prose-img:my-10
                        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-secondary/20 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground
                        prose-li:marker:text-primary prose-li:text-slate-600 dark:prose-li:text-slate-300">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    {/* Footer / Interaction */}
                    <div className="mt-20 pt-10 border-t border-border">
                        <div className="bg-secondary/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold mb-2">Enjoyed this article?</h3>
                                <p className="text-muted-foreground text-sm">Share it with your network or check out more insights.</p>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" className="gap-2" asChild>
                                    <Link to="/blog">
                                        <ArrowLeft className="w-4 h-4" /> All Articles
                                    </Link>
                                </Button>
                                <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90" onClick={handleShare}>
                                    <Share2 className="w-4 h-4" /> Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
};

export default BlogPost;
