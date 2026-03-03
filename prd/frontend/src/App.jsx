import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppBtn from './components/WhatsAppBtn';
import AIChatWidget from './components/AIChatWidget';
import SEOFooter from './components/SEOFooter';
import { HelmetProvider } from 'react-helmet-async';
import LocationPage from './pages/LocationPage';
import ServiceDetail from './pages/ServiceDetail';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';

// Layouts
const MainLayout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Our Story', path: '/our-story' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Cost Calculator', path: '/calculator' },
    ];

    return (
        <div className="flex flex-col min-h-screen relative">
            {/* Background Ambient Glow */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/30 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Navigation */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-header py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-slate-50 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-sm bg-gradient-to-tr from-brand-gold-400 to-amber-200 flex items-center justify-center text-dark-bg text-lg">I</span>
                        NTERA.
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm uppercase tracking-widest transition-colors duration-300 hover:text-brand-gold-300 ${location.pathname === link.path ? 'text-brand-gold-400 font-medium' : 'text-slate-300'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/contact" className="px-6 py-2.5 rounded-sm bg-transparent border border-brand-gold-500/50 text-brand-gold-300 text-sm uppercase tracking-wider hover:bg-brand-gold-500/10 transition-all duration-300 flex items-center gap-2 group">
                            Book Consultation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-300 hover:text-brand-gold-300 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl pt-24 px-6 flex flex-col"
                    >
                        <nav className="flex flex-col gap-6 items-center flex-grow justify-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-2xl font-serif tracking-widest transition-colors duration-300 ${location.pathname === link.path ? 'gold-gradient-text' : 'text-slate-300 hover:text-white'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/contact" className="mt-8 px-8 py-3 rounded-sm bg-brand-gold-500 text-dark-bg font-medium uppercase tracking-wider text-sm">
                                Book Consultation
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow pt-24">{children}</main>

            <SEOFooter />

            {/* Global Floating Widgets */}
            <WhatsAppBtn />
            <AIChatWidget />
        </div>
    );
};

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Calculator from './pages/Calculator';
import Contact from './pages/Contact';
import Story from './pages/Story';
import ProjectDetail from './pages/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <HelmetProvider>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/our-story" element={<Story />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/portfolio/:id" element={<ProjectDetail />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                    {/* Dynamic SEO Routes */}
                    <Route path="/locations/:slug" element={<LocationPage />} />
                    <Route path="/services/:slug" element={<ServiceDetail />} />
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>
            </MainLayout>
        </HelmetProvider>
    )
}

export default App;
