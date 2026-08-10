import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

const SYSTEM_PROMPT = `You are the official AI Assistant on Yehia Amin's portfolio website. 
Answer questions accurately, professionally, and concisely about Yehia Amin. Always reply in the same language as the user's prompt (Arabic, English, French, etc.).

About Yehia Amin:
- Full Name: Yehia Mohamed Amin (يحيى محمد أمين)
- Role: Cybersecurity Specialist, AI Tools Developer, & Full-Stack Developer
- Education: Level 3 Computer Science & Artificial Intelligence student at Banha University (Faculty of Computers & Artificial Intelligence) - Expected graduation 2027.
- Contact Details:
  • Email: yehia.rashed3200@gmail.com
  • Phone / WhatsApp: +20 1060076900
  • Location: Banha / Cairo, Egypt
- Key Skills:
  • Programming & Web: JavaScript (ES6+), Node.js, Express.js, React, Tailwind CSS, Python, RESTful APIs, JWT Authentication.
  • AI & LLM Tools: Gemini API Integration, Prompt Engineering, OpenRouter APIs, AI Resume Analysis, RAG workflows.
  • Cybersecurity & PenTesting: Vulnerability Assessment & Penetration Testing (VAPT), Kali Linux, Nmap, Wireshark, Burp Suite, Aircrack-ng, Bettercap.
- Professional Certifications:
  • CCNA (Cisco Certified Network Associate)
  • HCIA-Security V4.0 (Huawei Certified ICT Associate - Security)
  • ITI Front-End Web Development Certification
- Key Projects:
  1. YA CV AI: Full-stack AI Resume & ATS Builder using React, Node.js, and Gemini API.
  2. NØURGINE World: AI Bio Links & Creator Platform for links and dynamic analytics.
  3. Wi-Fi Penetration Testing: Kali Linux security audit, WPA/WPA2 handshakes assessment.
  4. Android Vulnerability Assessment Lab: Mobile security audit using APKTool, MobSF, and Dex2Jar.
  5. Interactive 3D/Modern Portfolio: Built with React, Tailwind CSS, Framer Motion, and OpenRouter AI integration.
- Business Experience: Self-employed E-Commerce Store Owner & Operations Lead (2018–2023).

Guidelines:
- Keep responses friendly, clean, well-formatted, and markdown-styled.
- Highlight Yehia's strengths in cybersecurity, full-stack web, and AI integration when relevant.`;

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; isError?: boolean }>>([
    {
      sender: 'bot',
      text: "Hello! 👋 I'm **Yehia's Live AI Assistant**, powered by secure servers. Ask me anything about Yehia's cybersecurity projects, AI tools, skills, CV, or background in any language!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    'مين يحيى وأيه خبرته؟',
    'What cybersecurity skills does Yehia have?',
    'أنا محتاج وسيلة تواصل مباشر مع يحيى',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const updatedMessages = [...messages, { sender: 'user' as const, text: query }];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...updatedMessages
          .filter((m) => !m.isError)
          .slice(-8)
          .map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
      ];

      // Call our secure backend instead of OpenRouter directly!
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openrouter/auto', // Requesting the best free model
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "I couldn't retrieve a response.";

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (err: any) {
      console.error('API proxy error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          isError: true,
          text: `❌ **Connection Error**: ${err.message || 'Failed to communicate with secure backend.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#B600A8] to-[#7721B1] text-white shadow-2xl border border-white/20 cursor-pointer"
        aria-label="Toggle AI Assistant"
      >
        <div className="flex items-center gap-1.5 bg-black/30 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
          <Sparkles size={12} className="text-cyan-300 animate-pulse" /> Live AI
        </div>
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </motion.button>

      {/* Drawer / Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-0 sm:bottom-24 right-0 sm:right-6 z-50 w-full sm:w-[420px] h-[88vh] sm:h-[600px] bg-[#09090b] border-t sm:border border-[#B600A8]/40 sm:rounded-[32px] rounded-t-[32px] shadow-[0_0_50px_rgba(182,0,168,0.25)] flex flex-col overflow-hidden text-[#D7E2EA]"
          >
            {/* Cyber Header */}
            <div className="relative p-5 bg-gradient-to-b from-[#1a0b2e] to-[#09090b] border-b border-[#B600A8]/30 flex flex-col items-center justify-center overflow-hidden flex-shrink-0">
              {/* Holographic background elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#B600A8]/20 rounded-full blur-3xl"></div>
              </div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-black/40 text-gray-400 hover:text-white hover:bg-rose-500/80 border border-white/5 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative z-10 flex flex-col items-center mt-2">
                <div className="relative w-16 h-16 rounded-full bg-[#050505] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.4)] mb-3">
                  <Bot size={32} className="text-cyan-400" />
                  {/* Glowing pulse ring */}
                  <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-25"></div>
                </div>
                <h4 className="font-black text-lg text-white tracking-widest uppercase mb-1">
                  CYBER AI ASSISTANT
                </h4>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                  <span className="text-[10px] text-cyan-400 font-bold tracking-widest">SECURE PORTAL</span>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] relative overflow-hidden ${m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#B600A8] to-[#f80759] text-white rounded-br-none shadow-[0_0_15px_rgba(182,0,168,0.3)]'
                      : m.isError
                        ? 'bg-rose-950/40 border border-rose-500/50 text-rose-200 rounded-bl-none shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                        : 'bg-[#12141a] border border-cyan-500/30 text-cyan-50 rounded-bl-none shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                      }`}
                  >
                    {m.sender === 'bot' && !m.isError && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
                    )}
                    <p className="whitespace-pre-line leading-relaxed relative z-10">{m.text}</p>
                  </div>
                </div>
              ))}

              {/* Loading Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#12141a] border border-cyan-500/30 p-3 rounded-2xl rounded-bl-none text-cyan-400 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-cyan-400" />
                    <span className="text-[11px] text-gray-400 animate-pulse">
                      Analyzing request...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 py-2 bg-[#0a0a0c]/80 border-t border-[#B600A8]/30 flex gap-1.5 overflow-x-auto text-[11px] flex-shrink-0">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1.5 rounded-full bg-[#141518] border border-[#2B2E36] text-gray-300 hover:bg-[#B600A8] hover:border-[#B600A8] hover:text-white transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-[#0a0a0c] border-t border-[#B600A8]/30 flex items-center gap-3 relative z-20 flex-shrink-0">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="w-full bg-[#141518] border border-[#2B2E36] focus:border-cyan-400 rounded-xl pl-4 pr-10 py-3.5 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all disabled:opacity-50"
                />
                <Sparkles size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="p-3.5 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#f80759] text-white hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(182,0,168,0.4)]"
                title="Send message"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

