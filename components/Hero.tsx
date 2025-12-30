
import React from 'react';
import { ActivePage } from '../App';
import { ArrowRight, Globe, ShieldCheck } from 'lucide-react';

interface HeroProps {
  t: any;
  lang: string;
  onDiscover: () => void;
  onNavigate: (page: ActivePage) => void;
}

const Hero: React.FC<HeroProps> = ({ t, lang, onDiscover, onNavigate }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center bg-white dark:bg-slate-950 overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20 transition-all duration-500">
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24 h-full">
          
          {/* Content Side */}
          <div className={`lg:w-1/2 flex flex-col justify-center animate-in slide-in-from-left-10 duration-1000 ${lang === 'ar' ? 'lg:order-2 text-right' : ''}`}>
            <div className={`inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 ${lang === 'ar' ? 'flex-row-reverse ml-auto' : 'mr-auto'}`}>
              <span className="flex h-1.5 w-1.5 rounded-full bg-gold-500 animate-ping"></span>
              <span className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px]">{t.subtitle}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white leading-[1] tracking-tighter mb-6 md:mb-12">
              {t.title1} <br />
              <span className="text-luxury">{t.titleAccent1}</span>
            </h1>
            
            <p className="text-base md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 mb-8 md:mb-14 max-w-xl font-medium leading-relaxed">
              {t.desc}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 md:gap-8 ${lang === 'ar' ? 'lg:justify-end' : ''}`}>
              <button
                onClick={onDiscover}
                className="bg-slate-900 dark:bg-gold-500 text-white dark:text-slate-950 px-8 py-4 md:px-12 md:py-7 rounded-2xl font-black text-[11px] md:text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
              >
                <span>{t.cta1}</span>
                <ArrowRight size={18} className={`${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white px-8 py-4 md:px-12 md:py-7 rounded-2xl font-black text-[11px] md:text-sm uppercase tracking-[0.2em] border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all text-center active:scale-95"
              >
                {t.cta2}
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className={`grid grid-cols-2 gap-6 md:gap-10 mt-10 md:mt-20 pt-8 border-t border-slate-100 dark:border-white/5 ${lang === 'ar' ? 'text-right' : ''}`}>
               <div>
                  <div className={`flex items-center gap-2 mb-1 text-gold-500 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Globe size={16} />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{t.stats.reach}</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-black text-base md:text-xl">{t.stats.reachVal}</p>
               </div>
               <div>
                  <div className={`flex items-center gap-2 mb-1 text-gold-500 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <ShieldCheck size={16} />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{t.stats.standard}</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-black text-base md:text-xl">{t.stats.standardVal}</p>
               </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="lg:w-1/2 relative h-[350px] md:h-[500px] lg:h-[80vh] w-full rounded-[32px] md:rounded-[80px] overflow-hidden shadow-2xl group animate-in zoom-in-95 duration-1000">
             <img 
               src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=1200" 
               alt="Construction Goldgen" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
             
             {/* Dynamic Card */}
             <div className={`absolute bottom-6 md:bottom-16 ${lang === 'ar' ? 'left-6 md:left-16' : 'right-6 md:right-16'} bg-white/10 backdrop-blur-3xl p-6 md:p-10 rounded-[28px] md:rounded-[48px] border border-white/20 hidden sm:block max-w-[280px] md:max-w-sm`}>
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gold-500 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-900 mb-4 shadow-xl">
                   <ShieldCheck size={24} />
                </div>
                <h4 className="text-white text-lg md:text-3xl font-black mb-2">GOLDGEN Excellence</h4>
                <p className="text-slate-300 text-[10px] md:text-sm font-medium leading-relaxed">Standards de qualité rigoureux du secteur BTP au Maroc.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
