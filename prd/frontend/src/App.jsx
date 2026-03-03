import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppBtn from './components/WhatsAppBtn';
import AIChatWidget from './components/AIChatWidget';

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

            {/* Footer */}
            <footer className="mt-24 border-t border-white/5 bg-dark-surface/30">
                <div className="container mx-auto px-6 lg:px-12 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
                        <div className="md:col-span-2">
                            <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-slate-50 mb-6 block">INTERA.</Link>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-8">
                                Crafting tailored luxury interiors that elevate everyday living and define your unique space.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand-gold-300 hover:border-brand-gold-300/50 transition-all">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand-gold-300 hover:border-brand-gold-300/50 transition-all">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand-gold-300 hover:border-brand-gold-300/50 transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-slate-50 font-medium mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                            <ul className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link to={link.path} className="text-zinc-400 hover:text-brand-gold-300 transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-slate-50 font-medium mb-6 uppercase tracking-wider text-sm">Contact</h4>
                            <ul className="flex flex-col gap-4 text-sm text-zinc-400">
                                <li>hello@interadesign.com</li>
                                <li>+1 (555) 123-4567</li>
                                <li>123 Luxury Ave, Design District<br />New York, NY 10001</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                        <p>&copy; {new Date().getFullYear()} Intera Design Studio. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link to="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                            <Link to="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>

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
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/our-story" element={<Story />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<ProjectDetail />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </MainLayout>
    )
}

export default App;
