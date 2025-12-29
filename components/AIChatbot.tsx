
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

interface AIChatbotProps {
  lang: string;
  t: any;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ lang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: t.chatbot.system + ` Actuellement l'utilisateur parle en ${lang}.`,
          temperature: 0.7,
        },
      });

      const botResponse = response.text || t.chatbot.error;
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: t.chatbot.error }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 left-6 md:left-8 z-[501] w-14 h-14 md:w-16 md:h-16 bg-slate-900 text-yellow-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group border border-yellow-500/20"
      >
        <Bot size={28} className="md:w-8 md:h-8" />
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-yellow-500 rounded-full"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed inset-0 md:inset-auto md:bottom-24 md:left-8 md:w-[400px] md:h-[600px] z-[5000] bg-white md:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500 ${lang === 'ar' ? 'font-arabic' : ''}`}>
          
          {/* Header */}
          <div className="bg-slate-900 p-5 md:p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-xl text-slate-900">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-black text-xs md:text-sm uppercase tracking-widest">{t.chatbot.title}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">En ligne</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-10 md:py-16 opacity-50">
                <Bot size={40} className="mx-auto text-slate-300 mb-4 md:w-12 md:h-12" />
                <p className="text-xs md:text-sm font-bold text-slate-400 px-6">{t.chatbot.welcome}</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 md:p-4 rounded-2xl md:rounded-3xl text-xs md:text-sm font-medium leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-yellow-500 text-slate-900 rounded-br-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 md:p-4 rounded-2xl md:rounded-3xl rounded-bl-none flex gap-1">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 md:p-6 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                placeholder={t.chatbot.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-50 border-2 border-slate-100 p-3.5 md:p-4 rounded-xl md:rounded-2xl pr-12 md:pr-14 focus:border-yellow-500 outline-none transition-all font-bold text-xs md:text-sm text-slate-900"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-yellow-500 rounded-lg md:rounded-xl hover:bg-yellow-500 hover:text-slate-900 transition-all disabled:opacity-50"
              >
                <Send size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
