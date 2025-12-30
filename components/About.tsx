
import React from 'react';
import { Target, Users, Award } from 'lucide-react';

interface AboutProps {
  t: any;
  lang: string;
}

const About: React.FC<AboutProps> = ({ t, lang }) => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white dark:bg-slate-950 transition-all duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Visual Side */}
          <div className={`relative ${lang === 'ar' ? 'lg:order-2' : ''}`}>
             <div className="relative rounded-[40px] md:rounded-[60px] overflow-hidden h-[450px] md:h-[600px] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=1200" 
                  className="w-full h-full object-cover" 
                  alt="Team Goldgen" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
             </div>
             {/* Float Badge (Caché sur mobile pour éviter le chevauchement) */}
             <div className={`absolute -bottom-8 ${lang === 'ar' ? '-left-8' : '-right-8'} bg-gold-500 p-8 md:p-12 rounded-[32px] md:rounded-[50px] shadow-2xl hidden xl:block`}>
                <Award size={48} className="text-slate-950 mb-3 md:w-16 md:h-16" />
                <p className="text-slate-950 font-black text-xl md:text-2xl">Qualité Certifiée</p>
             </div>
          </div>

          {/* Text Side */}
          <div className={lang === 'ar' ? 'text-right' : ''}>
            <h2 className="text-gold-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-8">Notre Vision</h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1] tracking-tighter mb-8 md:mb-12">
              {t.title} <br />
              <span className="text-luxury">{t.subtitle}</span>
            </h3>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 md:mb-12">
              {t.desc}
            </p>

            <div className={`p-8 md:p-10 bg-slate-50 dark:bg-white/5 rounded-[32px] md:rounded-[40px] mb-8 md:mb-12 italic border-l-8 border-gold-500 ${lang === 'ar' ? 'border-l-0 border-r-8 text-right' : ''}`}>
              <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-200 font-black leading-relaxed">
                {t.quote}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-10">
               <div>
                  <div className={`flex items-center gap-2 md:gap-3 mb-3 md:mb-4 text-gold-500 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Target size={20} className="md:w-6 md:h-6" />
                    <h4 className="font-black uppercase tracking-widest text-[9px] md:text-[10px]">{t.goal}</h4>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium">{t.goalDesc}</p>
               </div>
               <div>
                  <div className={`flex items-center gap-2 md:gap-3 mb-3 md:mb-4 text-gold-500 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Users size={20} className="md:w-6 md:h-6" />
                    <h4 className="font-black uppercase tracking-widest text-[9px] md:text-[10px]">{t.team}</h4>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium">{t.teamDesc}</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
