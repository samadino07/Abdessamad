
import React from 'react';
import { ActivePage } from '../App';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  t: any;
  lang: string;
  onDiscover: () => void;
  onNavigate: (page: ActivePage) => void;
}

const Hero: React.FC<HeroProps> = ({ t, lang, onDiscover, onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 dark:bg-slate-950 pt-20 transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=75&w=1600"
          alt="Construction Site"
          className="w-full h-full object-cover opacity-40 dark:opacity-20 scale-105 animate-[pulse_15s_ease-in-out_infinite]"
          // @ts-ignore
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 dark:from-slate-950 via-slate-900/80 dark:via-slate-950/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-slate-950 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-4xl ${lang === 'ar' ? 'mr-0 ml-auto text-right' : ''}`}>
          <div className={`inline-flex items-center gap-3 px-4 py-2 mb-8 bg-yellow-500/20 dark:bg-yellow-500/10 border border-yellow-500/30 dark:border-yellow-500/20 rounded-full backdrop-blur-sm`}>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-yellow-500 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs">
              {t.subtitle}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tighter">
            {t.title1} <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 text-glow-gold">{t.titleAccent1}</span>, <br />
            {t.title2} <span className="relative">
              <span className="relative z-10 text-white">{t.titleAccent2}</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-500/30 -z-10"></span>
            </span>.
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 dark:text-slate-400 mb-12 max-w-2xl leading-relaxed font-medium">
            {t.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 md:gap-8">
            <button
              onClick={(e) => {
                e.preventDefault();
                onDiscover();
              }}
              className="shimmer-effect group relative overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-950 px-8 md:px-12 py-5 md:py-6 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:shadow-yellow-500/40 hover:-translate-y-1 active:scale-95 text-center flex items-center justify-center gap-3"
            >
              <span>{t.cta1}</span>
              <ArrowRight size={20} className={`transition-transform duration-300 group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="border-2 border-white/20 text-white backdrop-blur-md px-8 md:px-12 py-5 md:py-6 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all text-center"
            >
              {t.cta2}
            </button>
          </div>
        </div>
      </div>

      <div className={`hidden xl:flex absolute bottom-20 flex-col gap-6 ${lang === 'ar' ? 'left-20' : 'right-20'}`}>
        {[
          { label: t.stats.sector, val: 'BTP & Services' },
          { label: t.stats.reach, val: t.stats.reachVal },
          { label: t.stats.standard, val: t.stats.standardVal },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl w-72 transform transition-all hover:translate-x-[-10px] hover:bg-white/10 cursor-default group border border-white/10">
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 group-hover:tracking-[0.3em] transition-all">{stat.label}</p>
            <p className="text-white text-2xl font-black tracking-tight">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hidden sm:block" onClick={() => onNavigate('about')}>
        <div className="w-[2px] h-16 bg-gradient-to-b from-yellow-500 via-yellow-500/50 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
