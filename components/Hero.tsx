
import React from 'react';
import { ActivePage } from '../App';

interface HeroProps {
  t: any;
  lang: string;
  onDiscover: () => void;
  onNavigate: (page: ActivePage) => void;
}

const Hero: React.FC<HeroProps> = ({ t, lang, onDiscover, onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000"
          alt="Construction Site"
          className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-4xl ${lang === 'ar' ? 'mr-0 ml-auto text-right' : ''}`}>
          <div className={`inline-block px-4 py-1 mb-6 border-yellow-500 bg-yellow-500/10 ${lang === 'ar' ? 'border-r-4' : 'border-l-4'}`}>
            <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-sm">
              {t.subtitle}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8">
            {t.title1} <span className="text-yellow-500">{t.titleAccent1}</span>, <br />
            {t.title2} <span className="border-b-8 border-yellow-500">{t.titleAccent2}</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
            {t.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                onDiscover();
              }}
              className="group relative overflow-hidden bg-yellow-500 text-slate-900 px-10 py-5 rounded-xl font-black text-lg uppercase tracking-wider transition-all shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-1 active:translate-y-0 text-center"
            >
              <span className="relative z-10">{t.cta1}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-yellow-500 animate-ping opacity-20 group-hover:hidden"></div>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="border-2 border-white/30 text-white backdrop-blur-sm px-10 py-5 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-slate-900 transition-all text-center"
            >
              {t.cta2}
            </button>
          </div>
        </div>
      </div>

      <div className={`hidden lg:flex absolute bottom-20 flex-col gap-8 ${lang === 'ar' ? 'left-20' : 'right-20'}`}>
        {[
          { label: t.stats.sector, val: 'BTP & Services' },
          { label: t.stats.reach, val: t.stats.reachVal },
          { label: t.stats.standard, val: t.stats.standardVal },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-64 transform transition-transform hover:scale-105 cursor-default">
            <p className="text-yellow-500 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-white text-xl font-bold">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => onNavigate('about')}>
        <div className="w-1 h-12 bg-gradient-to-b from-yellow-500 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
