import { Link } from 'react-router-dom';
import { locations, services, blogs } from '../data/seoContent';

const SEOFooter = () => {
    // Take a subset for the footer so it's not overwhelmingly tall, 
    // but still provides massive crawler value.
    const topLocations = locations.slice(0, 8);
    const topServices = services.slice(0, 8);
    const topBlogs = blogs.slice(0, 6);

    return (
        <div className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 px-6 text-zinc-500 text-sm font-light mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                {/* Brand / Contact */}
                <div>
                    <h4 className="text-white font-serif text-lg mb-6">Intera.</h4>
                    <p className="mb-4 text-zinc-400">Transforming spaces into timeless experiences. Premium residential and commercial design.</p>
                    <ul className="space-y-2">
                        <li>hello@interastudio.com</li>
                        <li>+1 (555) 123-4567</li>
                        <li>123 Luxury Ave, Design District, NY</li>
                    </ul>
                </div>

                {/* Services Silo */}
                <div>
                    <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Specialized Services</h4>
                    <ul className="space-y-3">
                        {topServices.map(s => (
                            <li key={s.slug}>
                                <Link to={`/services/${s.slug}`} className="hover:text-brand-gold-400 transition-colors">
                                    {s.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Locations Silo */}
                <div>
                    <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Service Areas</h4>
                    <ul className="space-y-3">
                        {topLocations.map(l => (
                            <li key={l.slug}>
                                <Link to={`/locations/${l.slug}`} className="hover:text-brand-gold-400 transition-colors">
                                    {l.city} Interior Design
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Knowledge Silo */}
                <div>
                    <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Design Journal</h4>
                    <ul className="space-y-3">
                        {topBlogs.map(b => (
                            <li key={b.slug}>
                                <Link to={`/blog/${b.slug}`} className="hover:text-brand-gold-400 transition-colors line-clamp-2">
                                    {b.title}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-2">
                            <Link to="/blog" className="text-brand-gold-500 hover:text-white transition-colors flex items-center gap-1">
                                View all articles &rarr;
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>&copy; {new Date().getFullYear()} Intera Design Studio. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link to="/contact" className="hover:text-white">Privacy Policy</Link>
                    <Link to="/contact" className="hover:text-white">Terms of Service</Link>
                    <Link to="/admin" className="hover:text-white">Admin Portal</Link>
                </div>
            </div>
        </div>
    );
};

export default SEOFooter;
