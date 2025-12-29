
import React from 'react';
import { HardHat, PaintBucket, Flower, Briefcase, Plus } from 'lucide-react';

interface ServicesProps {
  t: any;
  lang: string;
  onSelect: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ t, lang, onSelect }) => {
  const serviceIcons = {
    civil: <HardHat className="w-8 h-8" />,
    amenagement: <PaintBucket className="w-8 h-8" />,
    maintenance: <Flower className="w-8 h-8" />,
    fourniture: <Briefcase className="w-8 h-8" />,
  };

  const serviceImages = {
    civil: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=75&w=600',
    amenagement: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=75&w=600',
    maintenance: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=75&w=600',
    fourniture: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=600',
  };

  return (
    <section id="expertise" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-slate-900 dark:bg-yellow-500 text-yellow-500 dark:text-slate-950 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
            {t.label}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">{t.title}</h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(t.items).map(([key, service]: [string, any]) => (
            <div 
              key={key} 
              onClick={() => onSelect(key)}
              className="group relative bg-white dark:bg-slate-800 rounded-[40px] overflow-hidden shadow-2xl dark:shadow-none transition-all duration-700 cursor-pointer flex flex-col h-full border border-slate-100 dark:border-white/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={serviceImages[key as keyof typeof serviceImages]} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                <div className={`absolute top-6 ${lang === 'ar' ? 'right-6' : 'left-6'} w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-2xl transform group-hover:rotate-6 transition-transform`}>
                  {serviceIcons[key as keyof typeof serviceIcons]}
                </div>
              </div>
              
              <div className={`p-10 flex flex-col flex-grow ${lang === 'ar' ? 'text-right' : ''}`}>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors leading-tight">
                  {service.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 flex-grow">
                  {service.desc}
                </p>
                
                <div className={`flex items-center gap-3 text-slate-900 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-all ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className="relative">
                    {t.learnMore}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-500"></span>
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-yellow-500 dark:group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-all group-hover:text-slate-900">
                    <Plus size={16} />
                  </div>
                </div>
              </div>

              {/* Decorative background number */}
              <div className="absolute -bottom-6 -right-6 text-9xl font-black text-slate-50 dark:text-white/5 opacity-0 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
                {Object.keys(t.items).indexOf(key) + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
