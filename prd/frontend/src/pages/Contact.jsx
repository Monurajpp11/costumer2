import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitLead } from '../services/api';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        projectType: 'Residential',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const leadPayload = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: '', // Optional in our form currently
            projectType: formData.projectType,
            message: formData.message
        };

        try {
            await submitLead(leadPayload);
            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', projectType: 'Residential', message: '' });
        } catch (error) {
            setStatus('error');
            const msg = typeof error === 'string'
                ? error
                : error?.message || 'Failed to submit inquiry. Please try again.';
            setErrorMsg(msg);
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg flex justify-center items-center relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-gold-900/5 to-transparent pointer-events-none" />
            <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-zinc-800/20 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div>
                        <span className="text-brand-gold-400 uppercase tracking-[0.2em] text-sm font-medium block mb-4">
                            Get in Touch
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-tight">
                            Let's Design <br />
                            <span className="italic gold-gradient-text">Your Future.</span>
                        </h1>
                        <p className="text-zinc-400 text-lg mt-6 leading-relaxed font-light max-w-md">
                            Ready to transform your space? Our team of visionary designers and architects are here to bring your concept to life with uncompromising luxury.
                        </p>
                    </div>

                    <div className="pt-8 space-y-8 text-zinc-300 border-t border-white/5">
                        <div className="flex items-start gap-6 group">
                            <span className="w-12 h-12 flex-shrink-0 bg-dark-surface border border-white/5 flex items-center justify-center text-brand-gold-500 group-hover:bg-brand-gold-500/10 transition-colors">
                                <MapPin strokeWidth={1.5} />
                            </span>
                            <div>
                                <p className="font-serif text-white text-xl mb-1">Studio Headquarters</p>
                                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                                    123 Luxury Ave, Design District<br />
                                    Beverly Hills, CA 90210
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 group">
                            <span className="w-12 h-12 flex-shrink-0 bg-dark-surface border border-white/5 flex items-center justify-center text-brand-gold-500 group-hover:bg-brand-gold-500/10 transition-colors">
                                <Mail strokeWidth={1.5} />
                            </span>
                            <div>
                                <p className="font-serif text-white text-xl mb-1">Direct Inquiry</p>
                                <p className="text-sm text-zinc-500 font-light tracking-wide">hello@interastudio.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 group">
                            <span className="w-12 h-12 flex-shrink-0 bg-dark-surface border border-white/5 flex items-center justify-center text-brand-gold-500 group-hover:bg-brand-gold-500/10 transition-colors">
                                <Phone strokeWidth={1.5} />
                            </span>
                            <div>
                                <p className="font-serif text-white text-xl mb-1">Call Us</p>
                                <p className="text-sm text-zinc-500 font-light tracking-wide">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-panel p-10 md:p-14"
                >
                    {status === 'success' ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                            <div className="w-24 h-24 rounded-full bg-brand-gold-500/10 text-brand-gold-400 flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-12 h-12" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-3xl text-white font-serif">Inquiry Received</h3>
                            <p className="text-zinc-400 font-light max-w-sm leading-relaxed">Our design directors are reviewing your request and will contact you within 24 hours.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-8 px-8 py-3 border border-white/20 text-white font-medium tracking-widest uppercase text-xs hover:border-brand-gold-500 hover:text-brand-gold-400 transition-colors"
                            >
                                Send Another
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {status === 'error' && (
                                <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-sm flex items-start gap-3 text-red-400 text-sm">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>{errorMsg}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-dark-surface/50 border-b border-white/10 p-3 text-white focus:bg-dark-surface focus:border-brand-gold-500 outline-none transition-all font-light"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500">Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-dark-surface/50 border-b border-white/10 p-3 text-white focus:bg-dark-surface focus:border-brand-gold-500 outline-none transition-all font-light"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-widest text-zinc-500">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-dark-surface/50 border-b border-white/10 p-3 text-white focus:bg-dark-surface focus:border-brand-gold-500 outline-none transition-all font-light"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-widest text-zinc-500">Project Type</label>
                                <div className="relative">
                                    <select
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="w-full bg-dark-surface/50 border-b border-white/10 p-3 pr-10 text-zinc-300 focus:bg-dark-surface focus:border-brand-gold-500 outline-none transition-all font-light appearance-none [&>option]:bg-dark-surface [&>option]:text-zinc-300"
                                    >
                                        <option>Residential</option>
                                        <option>Commercial</option>
                                        <option>Turnkey</option>
                                        <option>Other</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-widest text-zinc-500">Project Details</label>
                                <textarea
                                    required
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-dark-surface/50 border-b border-white/10 p-3 text-white focus:bg-dark-surface focus:border-brand-gold-500 outline-none transition-all font-light resize-none"
                                    placeholder="Tell us about your vision..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-brand-gold-500 text-dark-bg py-4 font-medium tracking-widest uppercase text-sm hover:bg-brand-gold-400 disabled:opacity-50 transition-colors shadow-[0_0_15px_rgba(204,153,0,0.2)] mt-4 flex justify-center items-center"
                            >
                                {status === 'loading' ? (
                                    <svg className="animate-spin h-5 w-5 text-dark-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Submit Inquiry'}
                            </button>
                        </form>
                    )}
                </motion.div>

            </div>
        </div>
    );
};

export default Contact;
