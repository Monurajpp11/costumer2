import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { locations } from '../data/seoContent';
import { motion } from 'framer-motion';

const LocationPage = () => {
    const { slug } = useParams();
    const locationData = locations.find(l => l.slug === slug);

    if (!locationData) return <Navigate to="/" />;

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg text-zinc-300">
            <Helmet>
                <title>{locationData.title}</title>
                <meta name="description" content={locationData.desc} />
                <link rel="canonical" href={`https://intera-design-studio.netlify.app/locations/${slug}`} />
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-brand-gold-400 uppercase tracking-widest text-sm font-medium"
                >
                    Local Expertise: {locationData.city}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-serif text-white mt-4 mb-6"
                >
                    {locationData.title.split('|')[0]}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-zinc-400 max-w-2xl mb-12"
                >
                    {locationData.desc} We bring unparalleled dedication to crafting spaces that embody the spirit of {locationData.city} while maintaining Intera's signature luxury standard.
                </motion.p>

                <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 text-center rounded-sm my-16">
                    <h2 className="text-2xl font-serif text-white mb-4">Start Your {locationData.city} Project</h2>
                    <p className="text-zinc-500 mb-8 max-w-lg mx-auto">Get a tailored estimate for your property instantly.</p>
                    <Link to="/calculator" className="inline-block px-8 py-3 bg-brand-gold-500 text-dark-bg font-medium uppercase tracking-wider hover:bg-brand-gold-400 transition-colors">
                        Launch Cost Calculator
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LocationPage;
