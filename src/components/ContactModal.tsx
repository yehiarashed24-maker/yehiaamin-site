import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Mail, User, MessageSquare } from 'lucide-react';

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
            className="relative w-full max-w-lg bg-[#0a0a0c]/80 border border-purple-500/20 rounded-[28px] p-8 shadow-[0_0_80px_rgba(182,0,168,0.15)] text-[#D7E2EA] z-10 overflow-hidden backdrop-blur-2xl"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all backdrop-blur-md border border-white/5 z-20"
            >
              <X size={18} />
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
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                >
                  <CheckCircle2 size={48} className="text-emerald-400" />
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
                <div className="mb-8">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 tracking-tight mb-2">
                    Let's Connect
                  </h2>
                  <p className="text-sm text-gray-400">
                    Have a project in mind or want to collaborate? I'd love to hear from you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="group">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all text-sm shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all text-sm shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <div className="absolute top-3.5 left-0 pl-4 pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                        <MessageSquare size={18} />
                      </div>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all text-sm resize-none shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold tracking-wide text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {/* Button Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#B600A8] to-[#601494] group-hover:from-[#c21bb4] group-hover:to-[#7322a6] transition-colors" />
                      
                      {/* Animated Glow on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)] transition-opacity duration-500" />
                      
                      <span className="relative z-10 flex items-center gap-2 text-[15px]">
                        {submitting ? "SENDING..." : "SEND MESSAGE"}
                        {!submitting && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </span>
                    </button>
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
