import { motion } from 'framer-motion';

const services = [
    {
        title: 'Residential',
        desc: 'Bespoke designs for luxury villas, apartments, and penthouses matching your lifestyle.',
        img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop'
    },
    {
        title: 'Commercial',
        desc: 'Functional and aesthetic workspaces that inspire productivity and brand identity.',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
    },
    {
        title: 'Turnkey Projects',
        desc: 'End-to-end execution from concept to handover with absolute precision.',
        img: 'https://images.unsplash.com/photo-1541888086925-920a0f023ea0?q=80&w=2070&auto=format&fit=crop'
    },
];

const Services = () => {
    return (
        <section className="py-32 bg-dark-surface px-6 relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-gold-400 uppercase tracking-[0.2em] text-sm font-medium"
                    >
                        Our Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif mt-6 text-white"
                    >
                        Curated Services
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {services.map((srv, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="group relative h-[350px] md:h-[500px] overflow-hidden cursor-pointer rounded-sm"
                        >
                            <div className="absolute inset-0 bg-dark-bg/60 z-10 group-hover:bg-dark-bg/20 transition-all duration-700" />
                            <img
                                src={srv.img}
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out filter grayscale mb-8 group-hover:grayscale-0"
                                alt={srv.title}
                            />

                            <div className="absolute inset-0 border border-white/10 z-20 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="absolute inset-x-0 bottom-0 p-10 z-30 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-12 h-[1px] bg-brand-gold-500 mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                                <h3 className="text-3xl font-serif text-white mb-3 tracking-wide">{srv.title}</h3>
                                <p className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 font-light leading-relaxed">
                                    {srv.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
