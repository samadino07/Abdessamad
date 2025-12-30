
import React, { useEffect, useState } from 'react';
import { ActivePage } from '../App';
import { ArrowRight, Globe, ShieldCheck } from 'lucide-react';

interface HeroProps {
  t: any;
  lang: string;
  onDiscover: () => void;
  onNavigate: (page: ActivePage) => void;
}

const Hero: React.FC<HeroProps> = ({ t, lang, onDiscover, onNavigate }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Petit délai pour s'assurer que le LoadingScreen a fini de s'estomper
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isAr = lang === 'ar';

  return (
    <section className="relative min-h-[85vh] md:min-h-[95vh] flex items-center bg-white dark:bg-slate-950 overflow-hidden pt-28 pb-12 md:pt-32 md:pb-20 transition-all duration-700">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gold-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 h-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24 h-full">
          
          {/* Content Side */}
          <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isAr ? 'lg:order-2 text-right' : ''}`}>
            
            {/* 1. Subtitle Badge */}
            <div className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 transition-all duration-1000 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isAr ? 'flex-row-reverse ml-auto' : 'mr-auto'}`}>
              <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse"></span>
              <span className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.3em] text-[9px] md:text-[11px] whitespace-nowrap">{t.subtitle}</span>
            </div>
            
            {/* 2. Main Title */}
            <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-9xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter mb-6 md:mb-10 transition-all duration-1000 delay-300 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {t.title1} <br />
              <span className="text-luxury whitespace-nowrap inline-block hover:scale-[1.02] transition-transform cursor-default">{t.titleAccent1}</span>
            </h1>
            
            {/* 3. Description */}
            <p className={`text-base md:text-lg lg:text-xl xl:text-2xl text-slate-500 dark:text-slate-400 mb-8 md:mb-12 max-w-xl font-medium leading-relaxed transition-all duration-1000 delay-500 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t.desc}
            </p>
            
            {/* 4. Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 transition-all duration-1000 delay-700 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${isAr ? 'lg:justify-end' : ''}`}>
              <button
                onClick={onDiscover}
                className="group relative bg-slate-900 dark:bg-gold-500 text-white dark:text-slate-950 px-8 py-4 md:px-10 md:py-6 rounded-2xl font-black text-[11px] md:text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <span className="relative z-10">{t.cta1}</span>
                <ArrowRight size={18} className={`relative z-10 transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white px-8 py-4 md:px-10 md:py-6 rounded-2xl font-black text-[11px] md:text-xs uppercase tracking-[0.2em] border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all text-center active:scale-95"
              >
                {t.cta2}
              </button>
            </div>

            {/* 5. Quick Stats Grid */}
            <div className={`grid grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-20 pt-8 border-t border-slate-100 dark:border-white/5 transition-all duration-1000 delay-900 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isAr ? 'text-right' : ''}`}>
               <div className="group cursor-default">
                  <div className={`flex items-center gap-2 mb-2 text-gold-500 transition-transform group-hover:translate-x-1 ${isAr ? 'flex-row-reverse group-hover:-translate-x-1' : ''}`}>
                    <Globe size={18} />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{t.stats.reach}</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-black text-sm md:text-xl lg:text-2xl">{t.stats.reachVal}</p>
               </div>
               <div className="group cursor-default">
                  <div className={`flex items-center gap-2 mb-2 text-gold-500 transition-transform group-hover:translate-x-1 ${isAr ? 'flex-row-reverse group-hover:-translate-x-1' : ''}`}>
                    <ShieldCheck size={18} />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{t.stats.standard}</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-black text-sm md:text-xl lg:text-2xl">{t.stats.standardVal}</p>
               </div>
            </div>
          </div>

          {/* Visual Side (Smooth Image Reveal) */}
          <div className={`w-full lg:w-1/2 relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[75vh] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] overflow-hidden shadow-2xl transition-all duration-[1.5s] delay-500 cubic-bezier(0.23, 1, 0.32, 1) transform ${isMounted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
             <div className="absolute inset-0 bg-slate-900">
               <img 
                 src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=1200" 
                 alt="Construction Goldgen" 
                 className={`w-full h-full object-cover transition-transform duration-[6s] ease-out ${isMounted ? 'scale-100' : 'scale-110'}`}
               />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
             
             {/* Floating Info Card */}
             <div className={`absolute bottom-8 md:bottom-16 ${isAr ? 'left-8 md:left-16' : 'right-8 md:right-16'} transition-all duration-1000 delay-[1.2s] transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/10 backdrop-blur-3xl p-6 md:p-10 rounded-[32px] md:rounded-[48px] border border-white/20 shadow-2xl max-w-[260px] md:max-w-sm hover:scale-105 transition-transform duration-500">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gold-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-slate-900 mb-4 shadow-xl">
                     <ShieldCheck size={24} className="md:w-8 md:h-8" />
                  </div>
                  <h4 className="text-white text-lg md:text-3xl font-black mb-2 tracking-tighter">GOLDGEN Quality</h4>
                  <p className="text-slate-300 text-[10px] md:text-sm font-medium leading-relaxed">L'excellence technique au service de vos infrastructures les plus ambitieuses au Maroc.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
