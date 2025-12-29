
import React from 'react';
import { Target, Users, ShieldCheck, Zap } from 'lucide-react';

interface AboutProps {
  t: any;
  lang: string;
}

const About: React.FC<AboutProps> = ({ t, lang }) => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className={`absolute -top-10 w-48 md:w-64 h-48 md:h-64 bg-yellow-500/10 rounded-full blur-3xl ${lang === 'ar' ? '-right-10' : '-left-10'}`}></div>
            <div className={`relative z-10 space-y-6 md:space-y-8 ${lang === 'ar' ? 'text-right' : ''}`}>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                {t.title} <br />
                <span className="text-yellow-500">{t.subtitle}</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {t.desc}
              </p>
              
              <div className={`bg-slate-50 border-yellow-500 p-6 md:p-8 rounded-2xl italic text-lg md:text-xl text-slate-700 font-medium ${lang === 'ar' ? 'border-r-4 rounded-r-none rounded-l-2xl' : 'border-l-4 rounded-l-none rounded-r-2xl'}`}>
                {t.quote}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="p-5 md:p-6 bg-slate-900 text-white rounded-2xl">
                  <div className={`flex items-center space-x-3 mb-3 text-yellow-500 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Target size={20} />
                    <h4 className="font-bold uppercase tracking-wide text-sm">{t.goal}</h4>
                  </div>
                  <p className="text-xs text-slate-400">{t.goalDesc}</p>
                </div>
                <div className="p-5 md:p-6 bg-yellow-500 text-slate-900 rounded-2xl">
                  <div className={`flex items-center space-x-3 mb-3 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Users size={20} />
                    <h4 className="font-bold uppercase tracking-wide text-sm">{t.team}</h4>
                  </div>
                  <p className="text-xs font-medium">{t.teamDesc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 lg:pt-12">
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 group hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 mb-4 md:mb-6 group-hover:rotate-6 transition-transform mx-auto lg:mx-0">
                  <Zap size={24} />
                </div>
                <h3 className={`text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar1}</h3>
                <p className={`text-slate-500 text-xs md:text-sm leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar1Desc}</p>
              </div>
              <div className="bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl group hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 mb-4 md:mb-6 group-hover:-rotate-6 transition-transform mx-auto lg:mx-0">
                  <ShieldCheck size={24} />
                </div>
                <h3 className={`text-lg md:text-xl font-bold text-white mb-2 md:mb-3 ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar2}</h3>
                <p className={`text-slate-400 text-xs md:text-sm leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>{t.pillar2Desc}</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=75&w=800" 
                alt="Architecture Excellence" 
                className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-2xl"
                loading="lazy"
              />
              <div className="bg-yellow-500 p-6 md:p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                <span className="text-4xl md:text-5xl font-black text-slate-900 mb-2">100%</span>
                <span className="font-bold text-slate-900 uppercase tracking-widest text-[10px] md:text-xs">{t.engagement}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
