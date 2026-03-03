import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppBtn = () => {
    // Replace with the actual WhatsApp number
    const phoneNumber = "15551234567";
    const message = encodeURIComponent("Hello! I'm interested in discussing a design project with Intera Design Studio.");

    // WhatsApp URL scheme works on both mobile and desktop
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full text-white shadow-lg shadow-green-500/30 hover:bg-green-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: "spring" }}
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            <MessageCircle size={28} className="relative z-10" />
        </motion.a>
    );
};

export default WhatsAppBtn;
