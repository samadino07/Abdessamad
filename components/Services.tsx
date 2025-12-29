
import React from 'react';
import { HardHat, PaintBucket, Flower, Briefcase, PlusCircle } from 'lucide-react';

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
    civil: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    amenagement: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800',
    maintenance: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    fourniture: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  };

  return (
    <section id="expertise" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-sm mb-4">{t.label}</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{t.title}</h3>
          <div className="w-24 h-2 bg-yellow-500 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-600 text-lg">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(t.items).map(([key, service]: [string, any]) => (
            <div 
              key={key} 
              onClick={() => onSelect(key)}
              className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-slate-100 flex flex-col h-full cursor-pointer hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={serviceImages[key as keyof typeof serviceImages]} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors"></div>
                <div className={`absolute top-4 w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900 shadow-lg ${lang === 'ar' ? 'right-4' : 'left-4'}`}>
                  {serviceIcons[key as keyof typeof serviceIcons]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                     {t.learnMore}
                   </div>
                </div>
              </div>
              
              <div className={`p-8 flex flex-col flex-grow ${lang === 'ar' ? 'text-right' : ''}`}>
                <h4 className="text-xl font-black text-slate-900 mb-4 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">
                  {service.desc}
                </p>
                <div className={`mt-auto pt-6 border-t border-slate-50 flex items-center text-yellow-600 font-black text-xs uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform ${lang === 'ar' ? 'flex-row-reverse group-hover:-translate-x-2' : ''}`}>
                  <span>{t.learnMore}</span>
                  <PlusCircle size={14} className={lang === 'ar' ? 'mr-2' : 'ml-2'} />
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
