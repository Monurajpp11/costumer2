import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../services/api';

const sizeOrder = ['large', 'regular', 'regular', 'wide', 'tall'];

const categories = ['All', 'Residential', 'Commercial', 'Turnkey'];

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchProjects();
                // Assign size variants for visual variety
                const withSizes = data.map((p, i) => ({
                    ...p,
                    img: p.images?.[0] || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop',
                    size: sizeOrder[i % sizeOrder.length],
                }));
                setProjects(withSizes);
            } catch (err) {
                console.warn('Could not fetch projects, using fallback:', err);
                setProjects([
                    { id: '1', title: 'Lumina Penthouse', category: 'Residential', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop', size: 'large' },
                    { id: '2', title: 'Vertex HQ', category: 'Commercial', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop', size: 'regular' },
                    { id: '3', title: 'Azure Villa', category: 'Residential', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2070&auto=format&fit=crop', size: 'regular' },
                    { id: '4', title: 'The Obsidian Lounge', category: 'Commercial', img: 'https://images.unsplash.com/photo-1541888086925-920a0f023ea0?q=80&w=2070&auto=format&fit=crop', size: 'wide' },
                    { id: '5', title: 'Minimalist Haven', category: 'Turnkey', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop', size: 'tall' },
                ]);
            }
        };
        load();
    }, []);

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
                        className="text-zinc-500 max-w-xl mx-auto text-lg font-light"
                    >
                        Explore our diverse collection of premium projects, meticulously crafted with striking precision and unparalleled luxury.
                    </motion.p>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 text-sm tracking-wider uppercase transition-all border ${filter === cat
                                    ? 'bg-brand-gold-500 border-brand-gold-500 text-dark-bg'
                                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
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
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className={`group relative overflow-hidden cursor-pointer ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                        project.size === 'wide' ? 'md:col-span-2' :
                                            project.size === 'tall' ? 'md:row-span-2' : ''
                                    }`}
                            >
                                <Link to={`/portfolio/${project.id}`} className="block w-full h-full">
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out filter grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="text-brand-gold-400 text-xs uppercase tracking-widest">{project.category}</span>
                                        <h3 className="text-white text-2xl font-serif mt-2">{project.title}</h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Portfolio;
