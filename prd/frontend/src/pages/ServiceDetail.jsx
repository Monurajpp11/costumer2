import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { services } from '../data/seoContent';
import { motion } from 'framer-motion';

const ServiceDetail = () => {
    const { slug } = useParams();
    const serviceData = services.find(s => s.slug === slug);

    if (!serviceData) return <Navigate to="/portfolio" />;

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg text-zinc-300">
            <Helmet>
                <title>{serviceData.title} | Intera Design Studio</title>
                <meta name="description" content={serviceData.desc} />
                <link rel="canonical" href={`https://intera-design-studio.netlify.app/services/${slug}`} />
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-brand-gold-400 uppercase tracking-widest text-sm font-medium"
                >
                    Specialized Service: {serviceData.category}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-serif text-white mt-4 mb-6"
                >
                    {serviceData.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-zinc-400 max-w-2xl mb-12"
                >
                    {serviceData.desc} Intera Design Studio marries aesthetic brilliance with complete functional execution, ensuring your specialized project meets the absolute highest standards of international luxury.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8 my-16">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm">
                        <h3 className="text-xl text-white font-serif mb-4">Why Choose Intera for this?</h3>
                        <ul className="space-y-3 text-zinc-400 text-sm">
                            <li><span className="text-brand-gold-500 mr-2">✓</span> Uncompromising material selection</li>
                            <li><span className="text-brand-gold-500 mr-2">✓</span> End-to-end project management</li>
                            <li><span className="text-brand-gold-500 mr-2">✓</span> Global network of master artisans</li>
                        </ul>
                    </div>
                    <div className="bg-brand-gold-900/10 border border-brand-gold-500/20 p-8 rounded-sm flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl text-brand-gold-400 font-serif mb-3">Discuss Your Requirements</h3>
                        <p className="text-zinc-500 text-sm mb-6">Our senior designers are available for a private consultation.</p>
                        <Link to="/contact" className="px-6 py-2 bg-transparent border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500 hover:text-dark-bg transition-colors font-medium text-sm tracking-wider uppercase">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
