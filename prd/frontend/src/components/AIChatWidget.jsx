import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Intera AI. How can I help you design your dream space today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const getAIResponse = (msg) => {
        const text = msg.toLowerCase();
        if (text.includes('price') || text.includes('cost') || text.includes('estimate')) {
            return "For pricing, I recommend trying our interactive Cost Calculator from the menu, or booking a free consultation for a detailed quote.";
        }
        if (text.includes('service') || text.includes('what do you do') || text.includes('offer')) {
            return "We specialize in ultra-premium Residential, Commercial, and Turnkey interior design. Every project is meticulously tailored to your vision.";
        }
        if (text.includes('contact') || text.includes('phone') || text.includes('call')) {
            return "You can reach us directly at +1 (555) 123-4567 or hello@interastudio.com. You can also use the WhatsApp button on the bottom left!";
        }
        if (text.includes('portfolio') || text.includes('past work') || text.includes('examples')) {
            return "We have an extensive portfolio showcasing our luxury apartments, corporate HQs, and turnkey villas. Click 'Portfolio' in the top menu to view them.";
        }
        return "That's an excellent question. For specific details regarding your project, I'd suggest booking a consultation directly with our lead designers.";
    };

    const handleSend = (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const aiMsg = { id: Date.now() + 1, text: getAIResponse(userMsg.text), sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000); // Simulate typing delay
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Icon Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`w-14 h-14 bg-brand-gold-500 rounded-full flex flex-col items-center justify-center text-dark-bg shadow-lg shadow-brand-gold-500/30 hover:bg-brand-gold-400 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
            >
                <MessageSquare size={24} />
                <span className="text-[9px] font-bold mt-0.5 tracking-wider">AI CHAT</span>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "tween", duration: 0.2 }}
                        className="absolute bottom-0 right-0 w-[350px] h-[500px] bg-zinc-950 border border-zinc-800 shadow-2xl rounded-lg flex flex-col overflow-hidden max-w-[calc(100vw-48px)] max-h-[calc(100vh-100px)]"
                    >
                        {/* Header */}
                        <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-gold-500/20 flex items-center justify-center text-brand-gold-500">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">Intera AI Assistant</h3>
                                    <p className="text-brand-gold-500 mb-0 leading-none text-xs flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-500 animate-pulse block"></span> Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-bg/50">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${msg.sender === 'user'
                                            ? 'bg-zinc-800 text-white rounded-tr-sm'
                                            : 'bg-brand-gold-500/10 text-brand-gold-100 border border-brand-gold-500/20 rounded-tl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl rounded-tl-sm px-4 py-3 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-brand-gold-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="w-10 h-10 rounded-full bg-brand-gold-500 text-dark-bg flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold-400 transition-colors"
                            >
                                <Send size={16} className="ml-0.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChatWidget;
