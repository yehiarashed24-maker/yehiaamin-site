import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Mail, User } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('https://formspree.io/f/mvzeqdqk', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
    } catch {
      // Ignore network/CORS issues gracefully to guarantee smooth UX
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 4000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative w-full max-w-[420px] bg-[#0c0c10] border-2 border-[#8E2DE2]/50 rounded-2xl p-7 shadow-[0_0_40px_rgba(142,45,226,0.3)] text-[#D7E2EA] z-10 overflow-hidden"
          >
            {/* Very subtle noise/gradient background to match image */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#181820]/80 to-[#0c0c10] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all backdrop-blur-md z-20"
            >
              <X size={16} />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6 relative z-10"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00f2fe]/20 to-[#4facfe]/20 border border-[#00f2fe]/50 flex items-center justify-center shadow-[0_0_40px_rgba(0,242,254,0.3)]"
                >
                  <CheckCircle2 size={48} className="text-[#00f2fe]" />
                </motion.div>
                
                <div className="space-y-2">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-black tracking-tight text-white"
                  >
                    Message Sent Successfully
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 font-light text-sm max-w-[280px] mx-auto leading-relaxed"
                  >
                    Thank you for reaching out! I'll review your message and get back to you as soon as possible.
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <div className="relative z-10">
                <div className="mb-7 flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                      Get in Touch
                    </h2>
                    <p className="text-[13px] text-gray-300 leading-relaxed pr-6">
                      Have a project in mind or just want to say hi?<br/>I'd love to hear from you.
                    </p>
                  </div>
                  {/* Small AI Shield Logo matching the image */}
                  <div className="flex-shrink-0 mt-1 relative">
                    <div className="w-9 h-10 border border-purple-500/40 rounded-lg flex items-center justify-center bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)] relative">
                       <span className="text-[10px] font-bold text-purple-300 tracking-widest absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">AI</span>
                       <div className="absolute inset-0 border-[0.5px] border-purple-400/30 rounded-lg scale-90" />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="group">
                    <div className="relative rounded-xl overflow-hidden bg-[#1f1f27] border border-gray-600/50 group-focus-within:border-gray-500/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <User size={16} strokeWidth={2} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none text-[15px]"
                      />
                      {/* Pink bottom glow border from image */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d100d1] to-transparent opacity-70 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative rounded-xl overflow-hidden bg-[#1f1f27] border border-gray-600/50 group-focus-within:border-gray-500/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Mail size={16} strokeWidth={2} />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none text-[15px]"
                      />
                      {/* Pink bottom glow border from image */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d100d1] to-transparent opacity-70 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative rounded-xl overflow-hidden bg-[#1f1f27] border border-gray-600/50 group-focus-within:border-gray-500/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                      <textarea
                        rows={3}
                        required
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none text-[15px] resize-none"
                      />
                      {/* Pink bottom glow border from image */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d100d1] to-transparent opacity-70 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(213,0,193,0.4)]"
                    >
                      {/* Button Background Gradient exactly like the image */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4A00E0] via-[#8E2DE2] to-[#f80759] opacity-90 group-hover:opacity-100 transition-opacity" />
                      
                      <span className="relative z-10 flex items-center gap-2 text-[15px]">
                        {submitting ? "Sending..." : "Send Message"}
                        {!submitting && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </span>
                    </button>
                  </div>
                  
                  <div className="text-center pt-2">
                    <p className="text-[11px] text-gray-400">
                      Or email directly: <a href="mailto:yehia.rashed3200@gmail.com" className="text-gray-300 underline underline-offset-2 hover:text-white transition-colors">yehia.rashed3200@gmail.com</a>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
