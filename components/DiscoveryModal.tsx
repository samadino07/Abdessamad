
import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowRight, ShieldCheck, Globe, Zap, Trophy, Target } from 'lucide-react';

interface DiscoveryModalProps {
  onClose: () => void;
  onExploreServices: () => void;
  lang: string;
  t: any;
}

// Fixed StatCounter by defining it as a React.FC to correctly handle reserved props like 'key'
const StatCounter: React.FC<{ end: number, label: string, suffix?: string }> = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const steps = 60;
    const increment = end / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
      <span className="text-3xl font-black text-yellow-500 mb-1">
        {count}{suffix}
      </span>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{label}</span>
    </div>
  );
};

const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ onClose, onExploreServices, lang, t }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small delay to trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { end: 15, label: lang === 'ar' ? 'مشاريع كبرى' : 'Projets Majeurs', suffix: '+' },
    { end: 100, label: lang === 'ar' ? 'رضا الزبناء' : 'Satisfaction', suffix: '%' },
    { end: 24, label: lang === 'ar' ? 'ساعة دعم' : 'Support 24/7', suffix: '/7' },
  ];

  // Helper for title splitting
  const getTitleParts = () => {
    const parts = (t.title || "").split(' ');
    if (parts.length < 2) return { first: t.title, rest: "" };
    return { first: parts[0], rest: parts.slice(1).join(' ') };
  };

  const { first, rest } = getTitleParts();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 lg:p-12 overflow-hidden">
      {/* Background Overlay */}
      <div 
        className={`absolute inset-0 bg-slate-950/95 backdrop-blur-3xl transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_70%)] animate-pulse"></div>
      </div>
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className={`relative w-full max-w-7xl bg-slate-900 md:rounded-[60px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) flex flex-col h-full md:h-[90vh] lg:h-[85vh] ${
          isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
        }`}
      >
        {/* Close Button - Always visible and high z-index */}
        <button 
          onClick={onClose}
          className={`absolute top-8 z-[100] p-4 bg-slate-800/80 text-white rounded-full hover:bg-yellow-500 hover:text-slate-900 transition-all shadow-2xl backdrop-blur-xl border border-white/10 active:scale-90 ${lang === 'ar' ? 'left-8' : 'right-8'}`}
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* LEFT: Visual & Branding */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:h-auto overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" 
              alt="GOLDGEN Excellence" 
              className="w-full h-full object-cover transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-125"
            />
            
            {/* Animated Scan line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent h-[20%] w-full top-0 animate-[scan_6s_linear_infinite]"></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8 md:p-12 lg:p-16">
              <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className={`flex items-center space-x-3 mb-6 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="p-3 bg-yellow-500 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                    <Trophy size={24} className="text-slate-900" />
                  </div>
                  <span className="text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Standard d'Élite • 2023</span>
                </div>
                
                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 ${lang === 'ar' ? 'text-right' : ''}`}>
                  {first} <span className="text-yellow-500">{rest}</span>
                </h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {stats.map((stat, i) => (
                    <StatCounter key={i} end={stat.end} label={stat.label} suffix={stat.suffix} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content & CTA */}
          <div className={`lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative bg-slate-900 overflow-y-auto ${lang === 'ar' ? 'text-right' : ''}`}>
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className={`relative z-10 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : (lang === 'ar' ? '-translate-x-10' : 'translate-x-10') + ' opacity-0'}`}>
              <div className="mb-10 lg:mb-12">
                <span className="text-yellow-500 font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-4 block drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">{t.subtitle}</span>
                <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-6">
                  {t.intro}
                </p>
                <div className={`w-24 h-2 bg-yellow-500 rounded-full ${lang === 'ar' ? 'ml-auto' : ''}`}></div>
              </div>

              {/* Pillars list */}
              <div className="space-y-4 md:space-y-6 mb-12 lg:mb-16">
                {t.points.map((point: any, i: number) => (
                  <div 
                    key={i} 
                    className={`flex items-start space-x-6 p-5 md:p-6 rounded-[32px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all group cursor-default ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center text-slate-900 shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {i === 0 ? <Zap size={28} /> : i === 1 ? <ShieldCheck size={28} /> : <Globe size={28} />}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-lg md:text-xl font-black text-white mb-1 group-hover:text-yellow-500 transition-colors">{point.title}</h4>
                      <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final CTA Box */}
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-[1px] rounded-[32px]">
                <div className="bg-slate-950 rounded-[31px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group/cta">
                  <div className={lang === 'ar' ? 'text-right' : ''}>
                    <div className={`flex items-center space-x-2 mb-2 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Target className="text-yellow-500" size={20} />
                      <h4 className="text-white font-black text-lg">{t.hseTitle}</h4>
                    </div>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold leading-relaxed max-w-xs italic">
                      "{t.hseDesc}"
                    </p>
                  </div>
                  <button 
                    onClick={onExploreServices}
                    className={`whitespace-nowrap flex items-center space-x-3 bg-yellow-500 text-slate-900 px-8 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.3)] active:scale-95 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <span>{t.ctaServices}</span>
                    <ArrowRight size={22} className={`transition-transform duration-500 group-hover/cta:translate-x-2 ${lang === 'ar' ? 'rotate-180 group-hover/cta:-translate-x-2' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: -20%; }
          100% { top: 120%; }
        }
      `}} />
    </div>
  );
};

export default DiscoveryModal;
