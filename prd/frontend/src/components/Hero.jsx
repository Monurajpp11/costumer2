import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/images/hero.png';

const Hero = () => {
    return (
        <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-dark-bg pt-20">
            {/* Background Graphic Placeholder for 3D */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg z-10" />
            <div className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-luminosity filter blur-[1px]" style={{ backgroundImage: `url(${heroBg})` }} />

            {/* Ambient Lighting */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold-900/20 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/40 rounded-full blur-[100px] z-0" />

            <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 mb-8 border border-brand-gold-500/30 rounded-full text-xs font-semibold tracking-widest text-brand-gold-400 uppercase bg-brand-gold-500/5 backdrop-blur-sm">
                        Redefining Spaces
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-white mb-6 leading-tight"
                >
                    Luxury Interiors <br />
                    <span className="gold-gradient-text italic pr-2">That Define You</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-lg md:text-xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Transforming spaces into timeless experiences. Premium residential and commercial design meticulously tailored to your vision.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link to="/contact" className="px-8 py-4 bg-brand-gold-500 text-dark-bg font-medium uppercase tracking-wider hover:bg-brand-gold-400 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(204,153,0,0.3)]">
                        Book Free Consultation
                    </Link>
                    <Link to="/calculator" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium uppercase tracking-wider hover:border-brand-gold-500 hover:text-brand-gold-400 transition-all duration-300 flex items-center gap-2 group">
                        Check Cost Estimate
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-zinc-500 text-xs tracking-widest uppercase"
            >
                <span>Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-brand-gold-500 to-transparent"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
