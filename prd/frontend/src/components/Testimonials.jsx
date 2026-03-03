import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Eleanor Vance',
        role: 'Homeowner, Beverly Hills',
        text: '"Intera transformed our estate into a modern masterpiece. The attention to detail, the curated materials, and the premium finish is simply unmatched."',
    },
    {
        name: 'Marcus Chen',
        role: 'CEO, Nexus Tech',
        text: '"Our corporate office redesign increased productivity and perfectly encapsulated our brand ethos. The turnkey execution was flawless. Highly recommended."',
    },
];

const Testimonials = () => {
    return (
        <section className="py-32 bg-dark-bg px-6 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900/40 to-transparent z-0 pointer-events-none" />
            <div className="absolute -left-[20%] top-[20%] w-[40%] h-[60%] bg-brand-gold-900/5 rounded-full blur-[120px] z-0 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-brand-gold-400 uppercase tracking-[0.2em] text-sm font-medium"
                        >
                            Client Stories
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif mt-6 text-white"
                        >
                            Words of Trust
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 max-w-sm text-sm leading-relaxed"
                    >
                        We measure our success by the satisfaction of our clients and the enduring beauty of the spaces we create.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {testimonials.map((test, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="relative p-10 md:p-14 glass-panel group transition-colors duration-500 hover:bg-dark-surface"
                        >
                            <Quote className="absolute top-10 right-10 w-16 h-16 text-white/5 transform -rotate-12 group-hover:text-brand-gold-500/10 transition-colors duration-500" />

                            <div className="flex text-brand-gold-500 mb-8 gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-zinc-300 text-lg md:text-xl font-light italic mb-10 leading-relaxed relative z-10">
                                {test.text}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-brand-gold-500" />
                                <div>
                                    <h4 className="text-white font-serif tracking-wide text-lg">{test.name}</h4>
                                    <p className="text-zinc-500 text-sm font-light mt-1">{test.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
