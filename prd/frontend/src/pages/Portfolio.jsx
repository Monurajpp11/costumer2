import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
    { id: 1, title: 'Lumina Penthouse', category: 'Residential', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop', size: 'large' },
    { id: 2, title: 'Vertex HQ', category: 'Commercial', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop', size: 'regular' },
    { id: 3, title: 'Azure Villa', category: 'Residential', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2070&auto=format&fit=crop', size: 'regular' },
    { id: 4, title: 'The Obsidian Lounge', category: 'Commercial', img: 'https://images.unsplash.com/photo-1541888086925-920a0f023ea0?q=80&w=2070&auto=format&fit=crop', size: 'wide' },
    { id: 5, title: 'Minimalist Haven', category: 'Turnkey', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop', size: 'tall' },
];

const categories = ['All', 'Residential', 'Commercial', 'Turnkey'];

const Portfolio = () => {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg relative">
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-gold-900/10 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-brand-gold-400 uppercase tracking-[0.2em] text-sm font-medium"
                    >
                        Selected Works
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white mt-6 mb-6 tracking-tight"
                    >
                        Our Portfolio
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Explore our diverse collection of premium projects, meticulously crafted with striking precision and unparalleled luxury.
                    </motion.p>
                </header>

                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-3 rounded-sm text-sm tracking-widest uppercase transition-all duration-300 ${filter === cat
                                ? 'bg-brand-gold-500 text-dark-bg font-medium shadow-[0_0_15px_rgba(204,153,0,0.3)]'
                                : 'border border-white/10 text-zinc-400 hover:border-brand-gold-500/50 hover:text-brand-gold-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Using a pseudo-masonry with CSS Grid capabilities */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                key={project.id}
                                className={`group relative overflow-hidden cursor-pointer bg-dark-surface rounded-sm block ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                    project.size === 'wide' ? 'md:col-span-2' :
                                        project.size === 'tall' ? 'md:row-span-2' : ''
                                    }`}
                            >
                                <Link to={`/portfolio/${project.id}`} className="absolute inset-0 z-30" />

                                <div className="absolute inset-0 bg-dark-bg/60 z-10 group-hover:bg-dark-bg/20 transition-all duration-700" />
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-out filter grayscale mb-8 group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 border border-white/10 z-20 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-brand-gold-500 text-xs tracking-[0.2em] uppercase mb-2 block transform origin-left">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">{project.title}</h3>

                                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <span className="text-xs text-white uppercase tracking-widest">View Project</span>
                                        <div className="w-8 h-[1px] bg-brand-gold-500" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Portfolio;
