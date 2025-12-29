
import React from 'react';
import { ShieldCheck, HardHat, AlertTriangle, Users } from 'lucide-react';

interface HSEProps {
  t: any;
  lang: string;
}

const HSE: React.FC<HSEProps> = ({ t, lang }) => {
  return (
    <section id="engagement" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className={`absolute top-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 ${lang === 'ar' ? 'left-0 -translate-x-20' : 'right-0 translate-x-20'}`}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-red-500/10 border-2 border-red-500/30 p-12 rounded-[40px] backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={lang === 'ar' ? 'text-right' : ''}>
              <div className={`inline-flex items-center space-x-2 text-red-500 mb-6 bg-red-500/20 px-4 py-2 rounded-full border border-red-500/50 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <AlertTriangle size={20} />
                <span className="font-black uppercase tracking-widest text-xs">{t.label}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                {t.title} <br />
                <span className="text-red-500 italic">{t.subtitle}</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {t.desc}
              </p>
              
              <div className={`flex items-center space-x-6 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="bg-white/10 p-6 rounded-3xl border border-white/10 flex flex-col items-center">
                  <span className="text-4xl font-black text-yellow-500 mb-1">0</span>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">{t.zero}</span>
                </div>
                <div className="text-slate-300">
                  <p className="text-xl font-bold text-white">{t.culture}</p>
                  <p className="text-sm">{t.cultureDesc}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck size={32} />, title: t.card1 },
                { icon: <HardHat size={32} />, title: t.card2 },
                { icon: <Users size={32} />, title: t.card3 },
                { icon: <AlertTriangle size={32} />, title: t.card4 },
              ].map((item, i) => (
                <div key={i} className={`bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors ${lang === 'ar' ? 'text-right' : ''}`}>
                  <div className={`text-yellow-500 mb-4 ${lang === 'ar' ? 'flex justify-end' : ''}`}>{item.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HSE;
