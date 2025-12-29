import React, { useEffect, useState } from 'react';
import { X, HardHat, PaintBucket, Flower, Briefcase, ChevronRight } from 'lucide-react';

interface ExpertiseModalProps {
  onClose: () => void;
  lang: string;
  t: any;
  onSelectService: (id: string) => void;
}

const ExpertiseModal: React.FC<ExpertiseModalProps> = ({ onClose, lang, t, onSelectService }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const serviceIcons = {
    civil: <HardHat size={40} />,
    amenagement: <PaintBucket size={40} />,
    maintenance: <Flower size={40} />,
    fourniture: <Briefcase size={40} />,
  };

  const serviceImages = {
    civil: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=75&w=800',
    amenagement: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=75&w=800',
    maintenance: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=75&w=800',
    fourniture: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=800',
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-50 overflow-hidden">
       <div className={`relative w-full h-full flex flex-col overflow-y-auto transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          <button 
            onClick={onClose}
            className={`fixed top-8 z-[100] p-4 bg-slate-900 text-white rounded-full hover:bg-yellow-500 hover:text-slate-900 shadow-2xl ${lang === 'ar' ? 'left-8' : 'right-8'}`}
          >
            <X size={28} />
          </button>

          <section className="py-32 px-6 container mx-auto">
             <div className={`mb-20 ${lang === 'ar' ? 'text-right' : ''}`}>
                <span className="text-yellow-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">{t.label}</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8">{t.title}</h1>
                <p className="text-xl text-slate-500 max-w-3xl font-medium leading-relaxed">{t.desc}</p>
             </div>

             <div className="grid lg:grid-cols-2 gap-12">
                {Object.entries(t.items).map(([key, service]: [string, any]) => (
                   <div 
                    key={key} 
                    onClick={() => onSelectService(key)}
                    className={`flex flex-col md:flex-row bg-white rounded-[50px] overflow-hidden shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group ${lang === 'ar' ? 'md:flex-row-reverse text-right' : ''}`}
                   >
                      <div className="md:w-1/2 relative h-80 md:h-auto overflow-hidden">
                         <img 
                          src={serviceImages[key as keyof typeof serviceImages]} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                          alt={service.title} 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-yellow-500 text-slate-900 p-4 rounded-full font-black uppercase text-xs tracking-widest">{t.learnMore}</div>
                        </div>
                      </div>
                      <div className="md:w-1/2 p-12 flex flex-col justify-center">
                         <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center text-slate-900 mb-8 shadow-xl">
                            {serviceIcons[key as keyof typeof serviceIcons]}
                         </div>
                         <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-yellow-600 transition-colors">{service.title}</h3>
                         <p className="text-slate-500 font-medium mb-10">{service.desc}</p>
                         <div className={`flex items-center text-yellow-600 font-black uppercase text-xs tracking-widest ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span>{t.learnMore}</span>
                            <ChevronRight size={18} className={lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} />
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </section>
       </div>
    </div>
  );
};

export default ExpertiseModal;