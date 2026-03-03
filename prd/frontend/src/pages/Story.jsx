import { motion } from 'framer-motion';

const Story = () => {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-1/4 -right-1/4 w-[50%] h-[50%] bg-brand-gold-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-32">

                <header className="text-center max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="text-brand-gold-400 uppercase tracking-[0.2em] text-sm font-medium block mb-6"
                    >
                        Our Heritage
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-tight"
                    >
                        Crafting Legacy.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                        className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed"
                    >
                        Since 2012, Intera Studio has redefined luxury living through structural purity, meticulous material selection, and an uncompromising commitment to spatial poetry.
                    </motion.p>
                </header>

                {/* Timeline / Vision Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative h-[600px] w-full"
                    >
                        <div className="absolute inset-0 bg-brand-gold-500/10 transform -translate-x-4 translate-y-4" />
                        <img
                            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2069&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 z-10"
                            alt="The Founder at work"
                        />
                        <div className="absolute bottom-6 right-6 z-20 bg-dark-bg/90 backdrop-blur-md p-6 border border-white/10">
                            <span className="text-brand-gold-500 font-serif text-4xl block mb-1">10+</span>
                            <span className="text-zinc-400 text-xs uppercase tracking-widest">Years of Excellence</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[1px] bg-brand-gold-500" />
                            <span className="text-brand-gold-400 uppercase tracking-widest text-xs">The Vision</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-snug">The Architecture <br /><span className="italic text-zinc-400 font-light">of Living</span></h2>
                        <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg">
                            <p>
                                "We believe that a space is not merely composed of walls and furniture, but serves as the silent, profound canvas to a life well-lived."
                            </p>
                            <p>
                                "Our approach strips away the ephemeral trends, leaving only what is structurally essential, enduringly comfortable, and profoundly beautiful."
                            </p>
                        </div>
                        <div className="pt-8 border-t border-white/10 mt-8">
                            <p className="text-brand-gold-500 font-serif text-2xl italic mb-2">Alexander Wright</p>
                            <p className="text-zinc-500 text-sm tracking-widest uppercase">Founder & Principal Designer</p>
                        </div>
                    </motion.div>
                </section>

                {/* Values Section */}
                <section className="pt-16 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { title: 'Excellence', text: 'Uncompromising quality in every material selected and every line drawn.' },
                            { title: 'Innovation', text: 'Pushing boundaries while respecting timeless architectural principles.' },
                            { title: 'Harmony', text: 'Creating spaces that foster peace, productivity, and personal connection.' }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.8 }}
                                className="p-8 group"
                            >
                                <div className="text-brand-gold-500 font-serif text-3xl mb-4 italic group-hover:scale-110 transition-transform duration-500">
                                    0{idx + 1}
                                </div>
                                <h3 className="text-white font-serif text-2xl mb-4">{value.title}</h3>
                                <p className="text-zinc-500 font-light leading-relaxed">{value.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Story;
