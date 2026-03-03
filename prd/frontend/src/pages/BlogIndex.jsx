import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogs } from '../data/seoContent';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BlogIndex = () => {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg text-zinc-300">
            <Helmet>
                <title>Luxury Design Journal | Intera Studio Blog</title>
                <meta name="description" content="Insights, trends, and expert knowledge on high-end residential and commercial interior design from Intera Design Studio." />
                <link rel="canonical" href="https://intera-design-studio.netlify.app/blog" />
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <header className="mb-20 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-brand-gold-400 uppercase tracking-widest text-sm font-medium"
                    >
                        Design Journal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white mt-4 mb-6"
                    >
                        Insights & Trends
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-xl mx-auto"
                    >
                        Expert perspectives on luxury interior design, sustainable architecture, and building timeless spaces.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {blogs.map((b, i) => (
                        <motion.article
                            key={b.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-sm p-6 group hover:border-brand-gold-500/30 transition-colors"
                        >
                            <div className="flex justify-between items-center text-xs text-zinc-500 mb-4 uppercase tracking-widest">
                                <span>{b.date}</span>
                                <span>{b.read} read</span>
                            </div>
                            <Link to={`/blog/${b.slug}`}>
                                <h2 className="text-2xl font-serif text-white mb-3 group-hover:text-brand-gold-400 transition-colors">
                                    {b.title}
                                </h2>
                            </Link>
                            <Link to={`/blog/${b.slug}`} className="flex items-center text-sm text-brand-gold-500 uppercase tracking-wider font-medium mt-6 group-hover:translate-x-2 transition-transform w-fit">
                                Read Article <ArrowRight size={14} className="ml-1" />
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogIndex;
