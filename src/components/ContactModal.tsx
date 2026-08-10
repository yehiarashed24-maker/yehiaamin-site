import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { ContactButton } from './ContactButton';

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 2500);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#141518] border border-[#2B2E36] rounded-[32px] p-6 sm:p-8 shadow-2xl text-[#D7E2EA] z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1E2026] text-[#D7E2EA] hover:bg-[#2B2E36] transition-colors"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <CheckCircle2 size={64} className="text-[#B600A8] mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Message Sent!</h3>
                <p className="text-gray-400 font-light text-sm">
                  Thanks for reaching out! Yehia Amin will get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-3xl font-black uppercase hero-heading tracking-tight mb-2">
                    Let's Work Together
                  </h2>
                  <p className="text-sm font-light text-gray-400 uppercase tracking-wide">
                    Reach out for security audits, full-stack projects, or collaboration.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-medium mb-1.5 text-gray-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0C0C0C] border border-[#2B2E36] rounded-xl text-[#D7E2EA] placeholder-gray-600 focus:outline-none focus:border-[#B600A8] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-medium mb-1.5 text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0C0C0C] border border-[#2B2E36] rounded-xl text-[#D7E2EA] placeholder-gray-600 focus:outline-none focus:border-[#B600A8] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-medium mb-1.5 text-gray-400">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me details about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0C0C0C] border border-[#2B2E36] rounded-xl text-[#D7E2EA] placeholder-gray-600 focus:outline-none focus:border-[#B600A8] transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <ContactButton label={submitting ? "Sending..." : "Send Message"} />
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
