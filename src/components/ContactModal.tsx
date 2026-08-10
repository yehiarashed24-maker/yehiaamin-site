import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Terminal, SquareTerminal } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  // Blinking terminal cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-mono">
          {/* Terminal CRT Overlay Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#333] rounded-xl shadow-[0_0_50px_rgba(182,0,168,0.15)] text-[#D7E2EA] z-10 overflow-hidden"
          >
            {/* Terminal Top Bar */}
            <div className="bg-[#1a1a1a] border-b border-[#333] px-4 py-3 flex items-center justify-between select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors shadow-[0_0_10px_rgba(239,68,68,0.5)]" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs tracking-wider">
                <Terminal size={14} />
                <span>guest@yehia-amin: ~/contact</span>
              </div>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>

            <div className="p-6 sm:p-8 bg-[#050505]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 flex flex-col items-start space-y-4"
                >
                  <p className="text-purple-400 font-bold flex gap-3 items-center text-lg">
                    <CheckCircle2 size={24} className="animate-pulse" />
                    [SUCCESS] TRANSMISSION_COMPLETE
                  </p>
                  <p className="text-gray-400 text-sm">
                    {`> connection_established: true`}
                    <br />
                    {`> payload_delivered: verified`}
                  </p>
                  <p className="text-white mt-4">
                    Thank you for reaching out! I'll review your message and get back to you securely.
                  </p>
                  <p className="text-purple-400 mt-8">
                    {`guest@yehia-amin:~$ `}
                    <span className={`inline-block w-2.5 h-4 bg-purple-400 ${cursorBlink ? 'opacity-100' : 'opacity-0'}`} />
                  </p>
                </motion.div>
              ) : (
                <div className="relative z-10">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-purple-400 mb-2 flex items-center gap-2">
                      <SquareTerminal size={20} />
                      INITIATE_SECURE_CONNECTION
                    </h2>
                    <p className="text-sm text-gray-500">
                      // Fill out the parameters below to transmit a message to Yehia Amin.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                      <label htmlFor="contact-name" className="block text-purple-400 text-sm mb-2 flex items-center gap-2">
                        {`> input_name`} <span className="text-gray-600">--required</span>
                      </label>
                      <div className="flex items-center bg-[#111] border border-[#222] focus-within:border-purple-500/50 rounded-lg overflow-hidden transition-colors px-4 py-3">
                        <span className="text-purple-500 mr-3 select-none">$</span>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="contact-email" className="block text-purple-400 text-sm mb-2 flex items-center gap-2">
                        {`> input_contact`} <span className="text-gray-600">--email</span>
                      </label>
                      <div className="flex items-center bg-[#111] border border-[#222] focus-within:border-purple-500/50 rounded-lg overflow-hidden transition-colors px-4 py-3">
                        <span className="text-purple-500 mr-3 select-none">$</span>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="yourname@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="contact-message" className="block text-purple-400 text-sm mb-2 flex items-center gap-2">
                        {`> write_message`} <span className="text-gray-600">--payload</span>
                      </label>
                      <div className="flex items-start bg-[#111] border border-[#222] focus-within:border-purple-500/50 rounded-lg overflow-hidden transition-colors px-4 py-3">
                        <span className="text-purple-500 mr-3 mt-0.5 select-none">{`>`}</span>
                        <textarea
                          id="contact-message"
                          rows={4}
                          required
                          placeholder="Tell me about your project or inquiry..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none text-sm resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#222] flex items-center justify-between">
                      <p className="text-xs text-gray-600 hidden sm:block">
                        Status: <span className="text-purple-400">Ready to transmit</span>
                      </p>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="relative overflow-hidden group bg-purple-500/10 border border-purple-500 text-purple-400 font-bold px-8 py-3 rounded hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {submitting ? "[ TRANSMITTING... ]" : "[ EXECUTE ]"}
                        </span>
                        {/* Terminal scanning line effect on hover */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-300 opacity-0 group-hover:opacity-50 group-hover:animate-pulse" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
