
import React from 'react';
import { Target, Users, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface AboutProps {
  t: any;
  lang: string;
}

const About: React.FC<AboutProps> = ({ t, lang }) => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className={`absolute -top-20 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] ${lang === 'ar' ? '-right-20' : '-left-20'}`}></div>
            <div className={`relative z-10 space-y-10 ${lang === 'ar' ? 'text-right' : ''}`}>
              <div>
                <div className="inline-block px-4 py-1.5 mb-6 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-yellow-500 rounded-lg text-[10px] font-black uppercase tracking-[0.3em]">
                  Notre Identité
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-8">
                  {t.title} <br />
                  <span className="text-yellow-600 dark:text-yellow-500">{t.subtitle}</span>
                </h2>
                <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {t.desc}
                </p>
              </div>
              
              <div className={`bg-slate-50 dark:bg-slate-900 p-10 rounded-[40px] border-l-8 border-yellow-500 relative group overflow-hidden ${lang === 'ar' ? 'border-l-0 border-r-8 text-right' : ''}`}>
                <div className="absolute top-0 right-0 p-8 text-yellow-500/10 group-hover:scale-110 transition-transform">
                  <Zap size={80} />
                </div>
                <p className="text-2xl text-slate-800 dark:text-slate-200 font-black leading-relaxed relative z-10">
                  {t.quote}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-slate-950 dark:bg-slate-900 text-white rounded-[32px] hover:translate-y-[-5px] transition-all border border-white/5">
                  <div className={`flex items-center gap-3 mb-4 text-yellow-500 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Target size={24} />
                    <h4 className="font-black uppercase tracking-widest text-xs">{t.goal}</h4>
                  </div>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{t.goalDesc}</p>
                </div>
                <div className="p-8 bg-yellow-500 dark:bg-yellow-500 text-slate-950 rounded-[32px] hover:translate-y-[-5px] transition-all shadow-xl shadow-yellow-500/10">
                  <div className={`flex items-center gap-3 mb-4 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Users size={24} />
                    <h4 className="font-black uppercase tracking-widest text-xs">{t.team}</h4>
                  </div>
                  <p className="text-sm font-bold leading-relaxed">{t.teamDesc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6 lg:pt-20">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-2xl dark:shadow-none border border-slate-100 dark:border-white/5 group hover:bg-slate-950 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-slate-900 transition-all duration-500">
                  <div className="w-16 h-16 bg-yellow-500 dark:bg-slate-950 dark:text-yellow-500 rounded-2xl flex items-center justify-center text-slate-950 mb-8 transform group-hover:rotate-6 transition-transform">
                    <Zap size={32} />
                  </div>
                  <h3 className={`text-2xl font-black mb-4 ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar1}</h3>
                  <p className={`text-slate-500 dark:text-slate-400 group-hover:text-slate-400 dark:group-hover:text-slate-900 text-sm font-medium leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar1Desc}</p>
                </div>
                <div className="bg-slate-950 dark:bg-slate-900 p-10 rounded-[40px] shadow-2xl group hover:bg-yellow-500 dark:hover:bg-yellow-500 transition-all duration-500 border border-white/5">
                  <div className="w-16 h-16 bg-yellow-500 dark:bg-slate-950 dark:text-yellow-500 group-hover:bg-slate-950 group-hover:text-yellow-500 rounded-2xl flex items-center justify-center text-slate-950 mb-8 transform group-hover:-rotate-6 transition-transform">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className={`text-2xl font-black text-white group-hover:text-slate-950 mb-4 ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar2}</h3>
                  <p className={`text-slate-400 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-900 text-sm font-medium leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar2Desc}</p>
                </div>
              </div>
              <div className="space-y-6 hidden sm:block">
                <div className="relative rounded-[40px] overflow-hidden h-[400px] group shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=75&w=800" 
                    alt="Architecture Excellence" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700 p-10 rounded-[40px] flex flex-col items-center justify-center text-center shadow-2xl">
                  <span className="text-6xl font-black text-slate-950 mb-2 tracking-tighter">100%</span>
                  <span className="font-black text-slate-950 uppercase tracking-[0.3em] text-[10px]">{t.engagement}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
