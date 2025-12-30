
import React from 'react';
import { HardHat, PaintBucket, Flower, Briefcase, Plus } from 'lucide-react';

interface ServicesProps {
  t: any;
  lang: string;
  onSelect: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ t, lang, onSelect }) => {
  const serviceIcons = {
    civil: <HardHat className="w-6 h-6 md:w-8 md:h-8" />,
    amenagement: <PaintBucket className="w-6 h-6 md:w-8 md:h-8" />,
    maintenance: <Flower className="w-6 h-6 md:w-8 md:h-8" />,
    fourniture: <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
  };

  const serviceImages = {
    civil: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=75&w=1000',
    amenagement: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=75&w=1000',
    maintenance: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=75&w=1000',
    fourniture: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=1000',
  };

  return (
    <section id="expertise" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900 transition-all duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 md:gap-10 ${lang === 'ar' ? 'md:flex-row-reverse text-right' : ''}`}>
          <div className="max-w-2xl">
            <h2 className="text-gold-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6">{t.label}</h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
              Nos <span className="text-luxury">Expertises</span>
            </h3>
          </div>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {Object.entries(t.items).map(([key, service]: [string, any], idx) => (
            <div 
              key={key} 
              onClick={() => onSelect(key)}
              className={`flex flex-col lg:flex-row bg-white dark:bg-slate-950 rounded-[32px] md:rounded-[60px] overflow-hidden hover-lift cursor-pointer group border border-slate-100 dark:border-white/5 ${lang === 'ar' ? 'lg:flex-row-reverse text-right' : ''} ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2 h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                <img 
                  src={serviceImages[key as keyof typeof serviceImages]} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                />
              </div>
              <div className="lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                 <div className={`w-12 h-12 md:w-16 md:h-16 bg-gold-500 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-950 mb-6 md:mb-10 shadow-xl ${lang === 'ar' ? 'ml-auto' : ''}`}>
                    {serviceIcons[key as keyof typeof serviceIcons]}
                 </div>
                 <h4 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 group-hover:text-gold-600 transition-colors">
                   {service.title}
                 </h4>
                 <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 md:mb-12">
                   {service.desc}
                 </p>
                 <div className={`flex items-center gap-3 md:gap-4 text-slate-900 dark:text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                   <span>{t.learnMore}</span>
                   <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center group-hover:bg-gold-500 group-hover:text-slate-950 transition-all">
                      <Plus size={18} className="md:w-5 md:h-5" />
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
