import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogs, services } from '../data/seoContent';
import { motion } from 'framer-motion';

const BlogPost = () => {
    const { slug } = useParams();
    const blogData = blogs.find(b => b.slug === slug);

    if (!blogData) return <Navigate to="/blog" />;

    // Pick 3 random services as related readings for deep internal linking
    const randomServices = [...services].sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg text-zinc-300">
            <Helmet>
                <title>{blogData.title} | Intera Journal</title>
                <meta name="description" content={`Read about ${blogData.title} by the expert designers at Intera Design Studio.`} />
                <link rel="canonical" href={`https://intera-design-studio.netlify.app/blog/${slug}`} />
            </Helmet>

            <article className="max-w-3xl mx-auto">
                <motion.header
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 border-b border-zinc-800 pb-10"
                >
                    <div className="flex items-center text-xs text-brand-gold-500 mb-6 uppercase tracking-widest gap-4">
                        <span>{blogData.date}</span>
                        <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                        <span>{blogData.read} read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
                        {blogData.title}
                    </h1>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-zinc max-w-none font-light leading-relaxed text-zinc-300"
                >
                    <p className="text-xl text-white font-serif italic mb-10">
                        In the fast evolving world of luxury design, staying ahead of the curve is imperative. {blogData.title} explores the intersection of high-end aesthetics and functional reality.
                    </p>

                    <p className="mb-6">
                        The true essence of premium design lies not just in the materials selected, but in the meticulous execution of a cohesive vision. To achieve the standards discussed in this article, one must understand that luxury is synonymous with personalization and longevity.
                    </p>

                    <h2 className="text-2xl font-serif text-white mt-12 mb-6">The Importance of Expert Execution</h2>
                    <p className="mb-6">
                        Whether it is a penthouse in New York or a sprawling estate in Dubai, the foundational rules of spatial harmony remain constant. Cutting corners in the planning phase inevitably leads to compromises in the final build.
                    </p>

                    {/* Inline Lead Magnet Funnel CTA */}
                    <div className="my-12 p-8 border-l-4 border-brand-gold-500 bg-zinc-900 rounded-r-md">
                        <h3 className="text-brand-gold-400 text-lg font-serif mb-2">Planning a high-end project?</h3>
                        <p className="text-sm mb-4">Our online <strong>Cost Calculator</strong> can give you an instant baseline estimate based on prevailing premium market rates.</p>
                        <Link to="/calculator" className="text-brand-gold-500 text-sm uppercase tracking-widest font-medium hover:text-white transition-colors">
                            Calculate Estimate →
                        </Link>
                    </div>

                    <p>
                        Ultimately, working with a seasoned design studio bypasses the costly mistakes of trial and error. As we've detailed here, understanding the nuanced balance of texture, light, and massing is what separates a good room from a breathtaking one.
                    </p>
                </motion.div>

                {/* Related SEO Links */}
                <aside className="mt-20 pt-10 border-t border-zinc-800">
                    <h3 className="text-lg font-serif text-white mb-6">Explore Our Specialized Services</h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {randomServices.map(s => (
                            <Link key={s.slug} to={`/services/${s.slug}`} className="block p-4 bg-zinc-900 border border-zinc-800 hover:border-brand-gold-500/30 transition-colors rounded-sm">
                                <h4 className="text-brand-gold-400 text-sm mb-1">{s.title}</h4>
                                <span className="text-xs text-zinc-500 uppercase">{s.category}</span>
                            </Link>
                        ))}
                    </div>
                </aside>
            </article>
        </div>
    );
};

export default BlogPost;
