import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
    const { id } = useParams();

    // Mock data based on ID
    const project = {
        title: 'Lumina Penthouse',
        category: 'Residential',
        location: 'Beverly Hills, CA',
        budget: '$500K - $1M',
        desc: 'A breathtaking redesign of a 4,000 sq ft penthouse overlooking the city. The objective was to bring natural light into every corner while maintaining a mood of understated luxury. We utilized extensive custom millwork, imported vein-cut travertine, and a restrained color palette to let the panoramic views serve as the true artwork.',
        heroImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2069&auto=format&fit=crop'
        ]
    };

    return (
        <div className="min-h-screen bg-dark-bg text-white pb-24">

            {/* Hero Image Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-[70vh] relative group overflow-hidden"
            >
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={project.heroImg}
                    className="w-full h-full object-cover filter brightness-[0.6]"
                    alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark-bg/80 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 inset-x-0 p-8 md:p-16 max-w-7xl mx-auto z-10">
                    <Link to="/portfolio" className="group/link flex items-center gap-2 text-brand-gold-500 text-xs tracking-widest uppercase mb-6 hover:text-brand-gold-400 transition-colors w-max">
                        <ArrowLeft size={14} className="group-hover/link:-translate-x-1 transition-transform" /> Back to Portfolio
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
                        <span className="text-zinc-500 tracking-[0.2em] uppercase text-sm block mb-3">{project.category}</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight">{project.title}</h1>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

                {/* Details Sidebar */}
                <div className="lg:col-span-4 space-y-10 lg:order-2">
                    <div className="glass-panel p-10 space-y-8 sticky top-32">
                        <div className="space-y-2 border-b border-light-divider pb-6">
                            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em]">Category</p>
                            <p className="text-xl font-serif text-white">{project.category}</p>
                        </div>
                        <div className="space-y-2 border-b border-light-divider pb-6">
                            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em]">Location</p>
                            <p className="text-xl font-serif text-white">{project.location}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-zinc-500 text-xs uppercase tracking-[0.2em]">Investment</p>
                            <p className="text-xl font-serif text-brand-gold-400">{project.budget}</p>
                        </div>

                        <Link to="/contact" className="block w-full text-center bg-transparent border border-brand-gold-500 text-brand-gold-500 py-4 font-medium tracking-widest uppercase text-xs hover:bg-brand-gold-500 hover:text-dark-bg transition-colors mt-12">
                            Inquire Similar Project
                        </Link>
                    </div>
                </div>

                {/* Description & Gallery */}
                <div className="lg:col-span-8 lg:order-1 space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-serif text-white mb-6">About the Project</h3>
                        <p className="text-zinc-400 leading-relaxed font-light text-lg md:text-xl">
                            {project.desc}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-light-divider">
                        {project.gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`overflow-hidden group ${i === 2 ? 'md:col-span-2' : ''}`}
                            >
                                <img
                                    src={img}
                                    className="w-full h-[250px] md:h-[400px] object-cover filter grayscale hover:grayscale-0 transform hover:scale-105 transition-all duration-1000 ease-out"
                                    alt={`Gallery image ${i + 1}`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectDetail;
