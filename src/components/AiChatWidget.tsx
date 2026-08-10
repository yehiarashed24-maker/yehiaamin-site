import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, X, Send, Sparkles, Key, Settings, Loader2, Check } from 'lucide-react';

const DEFAULT_OPENROUTER_KEY = '';

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

const AVAILABLE_MODELS = [
  { id: 'openrouter/free', name: 'OpenRouter Auto Free (Recommended)' },
  { id: 'google/gemma-4-31b-it:free', name: 'Google Gemma 4 31B (Free)' },
  { id: 'cohere/north-mini-code:free', name: 'Cohere North Mini (Free)' },
  { id: 'nvidia/nemotron-3-nano-30b-a3b:free', name: 'Nvidia Nemotron Nano (Free)' },
  { id: 'google/gemini-2.0-flash-lite-001', name: 'Gemini 2.0 Flash Lite (Paid Credits)' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini (Paid Credits)' },
];

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState<string>(DEFAULT_OPENROUTER_KEY);
  const [selectedModel, setSelectedModel] = useState<string>('openrouter/free');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; isError?: boolean }>>([
    {
      sender: 'bot',
      text: "Hello! 👋 I'm **Yehia's Live AI Assistant**, powered live by OpenRouter. Ask me anything about Yehia's cybersecurity projects, AI tools, skills, CV, or background in any language!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localKey = localStorage.getItem('openrouter_api_key');
    const envKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (localKey) {
      setApiKey(localKey);
    } else if (envKey) {
      setApiKey(envKey);
    } else {
      setApiKey(DEFAULT_OPENROUTER_KEY);
    }

    const savedModel = localStorage.getItem('openrouter_model');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  const saveSettings = (key: string, model: string) => {
    const trimmedKey = key.trim() || DEFAULT_OPENROUTER_KEY;
    setApiKey(trimmedKey);
    setSelectedModel(model);
    localStorage.setItem('openrouter_api_key', trimmedKey);
    localStorage.setItem('openrouter_model', model);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  const quickQuestions = [
    'مين يحيى وأيه خبرته؟',
    'What cybersecurity skills does Yehia have?',
    'أنا محتاج وسيلة تواصل مباشر مع يحيى',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const currentKey = apiKey || DEFAULT_OPENROUTER_KEY;

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

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentKey}`,
          'HTTP-Referer': window.location.origin || 'https://yehiaamin-site.vercel.app',
          'X-Title': 'Yehia Amin Portfolio AI Assistant',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: apiMessages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData.error?.message || `HTTP ${response.status} ${response.statusText}`;
        throw new Error(errMsg);
      }

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "I couldn't retrieve a response from OpenRouter.";

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (err: any) {
      console.error('OpenRouter API error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          isError: true,
          text: `❌ **OpenRouter Error**: ${err.message || 'Failed to communicate with OpenRouter API.'}\n\nPlease check your API key or model availability in Settings (⚙️).`,
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
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-full transition-all ${showSettings ? 'bg-[#B600A8] text-white shadow-[0_0_15px_rgba(182,0,168,0.5)]' : 'bg-black/40 text-gray-400 hover:text-white hover:bg-black/60 border border-white/5'}`}
                  title="Configure AI"
                >
                  <Settings size={16} />
                </button>
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
                  <span className="text-[10px] text-cyan-400 font-bold tracking-widest">ONLINE</span>
                </div>
              </div>
            </div>

            {/* Settings Overlay View */}
            {showSettings ? (
              <div className="flex-1 p-5 bg-[#0C0C0C] space-y-4 overflow-y-auto text-xs">
                <div className="flex items-center justify-between border-b border-[#2B2E36] pb-3">
                  <h5 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Key size={16} className="text-[#B600A8]" /> OpenRouter AI Settings
                  </h5>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-white text-[11px] underline"
                  >
                    Back to Chat
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">
                    OpenRouter API Key:
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="w-full bg-[#141518] border border-[#2B2E36] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#B600A8]"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    API Key active automatically. You can switch keys or custom models here.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">AI Model:</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-[#141518] border border-[#2B2E36] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B600A8]"
                  >
                    {AVAILABLE_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => saveSettings(apiKey, selectedModel)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#7721B1] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    {savedSuccess ? (
                      <>
                        <Check size={16} /> Saved!
                      </>
                    ) : (
                      'Save Settings'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                      <div className="bg-[#0C0C0C] border border-[#2B2E36] p-3 rounded-2xl rounded-bl-none text-cyan-400 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-[#B600A8]" />
                        <span className="text-[11px] text-gray-400 animate-pulse">
                          Generating live OpenRouter response...
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Suggestions */}
                <div className="px-3 py-2 bg-[#0C0C0C]/60 border-t border-[#2B2E36] flex gap-1.5 overflow-x-auto text-[11px]">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      disabled={isLoading}
                      className="px-2.5 py-1 rounded-full bg-[#1E2026] text-gray-300 hover:bg-[#B600A8] hover:text-white transition-colors whitespace-nowrap disabled:opacity-50"
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
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
