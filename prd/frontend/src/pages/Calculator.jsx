import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { calculateEstimate } from '../services/api';

const Calculator = () => {
    const [step, setStep] = useState(1);
    const [isCalculating, setIsCalculating] = useState(false);

    const [formData, setFormData] = useState({
        propertyType: 'Residential',
        sqFt: 1500,
        rooms: 3,
        materialGrade: 'Standard',
        location: 'Metropolitan',
    });

    const [estimate, setEstimate] = useState(null);

    const calculateCost = async () => {
        setIsCalculating(true);

        try {
            // Attempt to hit the real backend API
            const response = await calculateEstimate({
                sqFt: formData.sqFt,
                rooms: formData.rooms,
                materialGrade: formData.materialGrade,
                cityMultiplierValue: formData.location === 'Metropolitan' ? 1.2 : 1.0
            });

            setEstimate(response.estimate);

        } catch (error) {
            console.warn("Backend estimator unavailable. Falling back to local offline calculation.", error);

            // Basic mock calculation fallback for UI resilience
            const basePrices = { Residential: 2000, Commercial: 2500, Turnkey: 3000 };
            const materialMult = formData.materialGrade === 'Premium' ? 1.5 : 1.0;
            const locationMult = formData.location === 'Metropolitan' ? 1.2 : 1.0;

            const base = formData.sqFt * basePrices[formData.propertyType];
            const roomCost = formData.rooms * 1.2 * 10000;

            const total = (base + roomCost) * materialMult * locationMult;
            setEstimate(total);
        } finally {
            setIsCalculating(false);
            setStep(4);
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-bg flex flex-col items-center relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-brand-gold-900/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-3xl w-full relative z-10">
                <header className="mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="text-brand-gold-400 uppercase tracking-[0.2em] text-sm font-medium block mb-4"
                    >
                        Project Proposal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-tight"
                    >
                        Cost Estimator
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className="text-zinc-400 font-light max-w-lg mx-auto leading-relaxed"
                    >
                        Configure your ideal space parameters to receive a preliminary investment range for our premium design services.
                    </motion.p>
                </header>

                <div className="mb-8 flex justify-center gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 transition-all duration-500 rounded-full ${step >= i ? 'w-12 bg-brand-gold-500' : 'w-4 bg-white/10'}`} />
                    ))}
                </div>

                <div className="glass-panel p-8 md:p-14 relative min-h-[450px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div>
                                    <h2 className="text-2xl text-white font-serif tracking-wide mb-2">1. Property Architecture</h2>
                                    <p className="text-zinc-500 text-sm font-light">Define the foundational aspects of your project.</p>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500">Property Type</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {['Residential', 'Commercial', 'Turnkey'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setFormData({ ...formData, propertyType: type })}
                                                className={`p-4 border text-sm tracking-wider uppercase transition-all duration-300 ${formData.propertyType === type ? 'border-brand-gold-500 text-brand-gold-400 bg-brand-gold-500/10' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:bg-white/5'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6 pt-4">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-xs uppercase tracking-widest text-zinc-500">Total Area Space</label>
                                        <span className="text-brand-gold-400 font-serif text-xl">{formData.sqFt} <span className="text-sm text-zinc-500 font-sans">sq ft</span></span>
                                    </div>
                                    <input
                                        type="range"
                                        min="500" max="10000" step="100"
                                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-gold-500"
                                        value={formData.sqFt}
                                        onChange={(e) => setFormData({ ...formData, sqFt: Number(e.target.value) })}
                                        style={{ accentColor: '#cc9900' }}
                                    />
                                    <div className="flex justify-between text-xs text-zinc-600 font-light">
                                        <span>500 sq ft</span>
                                        <span>10,000+ sq ft</span>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8">
                                    <button onClick={nextStep} className="flex items-center gap-2 bg-white text-dark-bg px-8 py-3 font-medium uppercase tracking-wider text-sm hover:bg-brand-gold-500 hover:text-dark-bg transition-colors">
                                        Continue <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div>
                                    <h2 className="text-2xl text-white font-serif tracking-wide mb-2">2. Scope & Materials</h2>
                                    <p className="text-zinc-500 text-sm font-light">Determine the complexity and finish quality.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-xs uppercase tracking-widest text-zinc-500">Spatial Divisions (Rooms)</label>
                                        <span className="text-brand-gold-400 font-serif text-xl">{formData.rooms}</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="20"
                                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                        value={formData.rooms}
                                        onChange={(e) => setFormData({ ...formData, rooms: Number(e.target.value) })}
                                        style={{ accentColor: '#cc9900' }}
                                    />
                                </div>

                                <div className="space-y-4 pt-4">
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500">Material Curation</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {['Standard', 'Premium'].map(grade => (
                                            <button
                                                key={grade}
                                                onClick={() => setFormData({ ...formData, materialGrade: grade })}
                                                className={`p-6 border text-left transition-all duration-300 ${formData.materialGrade === grade ? 'border-brand-gold-500 bg-brand-gold-500/5' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                                            >
                                                <h4 className={`text-lg font-serif mb-1 ${formData.materialGrade === grade ? 'text-brand-gold-400' : 'text-zinc-300'}`}>{grade} Collection</h4>
                                                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                                                    {grade === 'Standard' ? 'High-quality foundational materials with exceptional finish.' : 'Exotic, imported, and exclusive materials tailored for ultimate luxury.'}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between pt-8 border-t border-white/5">
                                    <button onClick={prevStep} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-wider">
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                    <button onClick={nextStep} className="flex items-center gap-2 bg-white text-dark-bg px-8 py-3 font-medium uppercase tracking-wider text-sm hover:bg-brand-gold-500 hover:text-dark-bg transition-colors">
                                        Continue <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div>
                                    <h2 className="text-2xl text-white font-serif tracking-wide mb-2">3. Regional Context</h2>
                                    <p className="text-zinc-500 text-sm font-light">Location factors into logistical and sourcing requirements.</p>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-xs uppercase tracking-widest text-zinc-500">Project Location Zone</label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {['Metropolitan', 'Suburban', 'Rural'].map(loc => (
                                            <button
                                                key={loc}
                                                onClick={() => setFormData({ ...formData, location: loc })}
                                                className={`p-4 border flex items-center justify-between transition-all duration-300 ${formData.location === loc ? 'border-brand-gold-500 text-brand-gold-400 bg-brand-gold-500/10' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:bg-white/5'}`}
                                            >
                                                <span className="tracking-wider text-sm">{loc}</span>
                                                {formData.location === loc && <div className="w-2 h-2 rounded-full bg-brand-gold-500" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between pt-8 border-t border-white/5">
                                    <button onClick={prevStep} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-wider">
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                    <button
                                        onClick={calculateCost}
                                        disabled={isCalculating}
                                        className="flex items-center justify-center gap-2 bg-brand-gold-500 text-dark-bg px-8 py-3 font-medium uppercase tracking-wider text-sm hover:bg-brand-gold-400 shadow-[0_0_15px_rgba(204,153,0,0.3)] transition-all disabled:opacity-75"
                                    >
                                        {isCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Estimate'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && estimate && (
                            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10 h-full">
                                <span className="text-brand-gold-400 tracking-[0.2em] uppercase text-xs mb-6 block">Investment Overview</span>

                                <div className="relative mb-10">
                                    <div className="absolute inset-x-0 bottom-2 h-1/2 bg-brand-gold-500/10 blur-xl z-0" />
                                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white relative z-10 text-glow leading-tight">
                                        ${(estimate * 0.9).toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-xl sm:text-2xl md:text-3xl text-zinc-500 font-light mx-1 sm:mx-2">-</span> ${(estimate * 1.1).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                    </div>
                                </div>

                                <p className="text-zinc-400 mb-12 max-w-lg mx-auto leading-relaxed font-light">
                                    This represents a preliminary investment bracket based on industry standards for the specified parameters. For a comprehensive architectural quote, we invite you to consult with our design directors.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
                                    <button onClick={() => setStep(1)} className="flex-1 px-6 py-4 border border-white/20 text-white hover:border-brand-gold-500 hover:text-brand-gold-400 transition-colors uppercase tracking-widest text-xs font-medium">
                                        Recalculate
                                    </button>
                                    <Link to="/contact" className="flex-1 px-6 py-4 bg-white text-dark-bg hover:bg-brand-gold-500 font-medium tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2">
                                        Book Details <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
