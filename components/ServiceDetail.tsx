
import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck, Zap, Target, ArrowLeft } from 'lucide-react';

interface ServiceDetailProps {
  service: any;
  onClose: () => void;
  onNavigate: (page: any) => void;
  lang: string;
  t: any;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onClose, onNavigate, lang, t }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden">
      {/* Immersive Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-950/98 backdrop-blur-2xl transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      ></div>
      
      {/* Main Container - Full Screen Transition */}
      <div 
        className={`relative w-full h-full bg-white dark:bg-slate-950 transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) flex flex-col overflow-y-auto ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Header / Navigation */}
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onClose}
            className={`flex items-center space-x-2 text-slate-900 dark:text-white font-bold hover:text-yellow-500 transition-colors ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {lang === 'ar' ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
            <span className="uppercase tracking-widest text-xs">{lang === 'ar' ? 'رجوع' : 'Retour'}</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black text-slate-900 dark:text-white">GOLDGEN</span>
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
            <span className="text-yellow-600 font-bold text-xs uppercase tracking-widest">{t.methodology}</span>
          </div>

          <button 
            onClick={onClose}
            className="p-3 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-full hover:bg-yellow-500 transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Section of the Service */}
        <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
           <img 
            src={service.imageUrl} 
            alt={service.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-white dark:to-slate-950"></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-block px-4 py-1 mb-6 bg-yellow-500 text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs rounded-full">
              Expertise GOLDGEN
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
              {service.title}
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-6 -mt-20 relative z-20 pb-24">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Introduction Card */}
              <div className={`bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[48px] shadow-2xl border border-slate-50 dark:border-white/5 ${lang === 'ar' ? 'text-right' : ''}`}>
                <p className="text-yellow-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block">{lang === 'ar' ? 'التفاصيل الكاملة' : 'Détails de l\'expertise'}</p>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 leading-tight">{service.fullDesc}</h3>
                <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-12 italic">
                  "{service.approach}"
                </p>

                {/* Grid of technical points */}
                <div className="grid md:grid-cols-2 gap-8">
                  {service.details.map((detail: string, idx: number) => (
                    <div key={idx} className={`flex items-start space-x-4 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 group hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-all ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900 shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        <Zap size={20} />
                      </div>
                      <span className="text-slate-900 dark:text-white font-bold text-lg">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Process Section */}
              <div className={`${lang === 'ar' ? 'text-right' : ''}`}>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-12 flex items-center gap-4">
                   <Target className="text-yellow-500" size={32} />
                   {t.processTitle}
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8 relative">
                   {/* Connection line desktop */}
                   <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-slate-200 dark:bg-white/10 z-0"></div>
                   
                   {service.steps.map((step: any, idx: number) => (
                     <div key={idx} className="relative z-10 bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-yellow-500/10 transition-shadow">
                        <div className="w-16 h-16 bg-slate-900 dark:bg-yellow-500 text-white dark:text-slate-950 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 shadow-2xl">
                          0{idx + 1}
                        </div>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4">{step.title}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold leading-relaxed">{step.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* HSE Engagement Sidebar */}
              <div className="bg-slate-900 p-10 rounded-[40px] text-white relative overflow-hidden group border border-white/5">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                 <ShieldCheck className="text-yellow-500 mb-6" size={48} />
                 <h4 className="text-2xl font-black mb-4">{t.guarantees}</h4>
                 <ul className="space-y-4">
                   {['Sécurité Maximale', 'Qualité Normée', 'Délais Respectés', 'Zéro Déchets BTP'].map((item, i) => (
                     <li key={i} className={`flex items-center space-x-3 text-sm font-bold text-slate-300 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                       <CheckCircle2 size={16} className="text-yellow-500" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>

              {/* Call to Action Sidebar - FIXED BUTTON */}
              <div className="bg-yellow-500 p-10 rounded-[40px] text-slate-900 shadow-2xl shadow-yellow-500/20 transform hover:-rotate-1 transition-transform">
                 <h4 className="text-2xl font-black mb-4">{lang === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Prêt à démarrer ?'}</h4>
                 <p className="font-bold mb-8 text-slate-800 leading-relaxed">
                   {lang === 'ar' 
                    ? 'فريقنا متاح لمواكبتكم في جميع مراحل مشروعكم. استشارة مجانية ودراسة تقنية.' 
                    : 'Notre équipe est disponible pour vous accompagner dans toutes les phases de votre projet. Étude technique gratuite.'}
                 </p>
                 <button 
                  onClick={() => {
                    onNavigate('contact');
                    onClose();
                  }}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors shadow-xl active:scale-95"
                 >
                   <PhoneCall size={18} />
                   <span>{lang === 'ar' ? 'تواصل معنا الآن' : 'Contactez-nous'}</span>
                 </button>
              </div>
              
              {/* Image highlight */}
              <div className="rounded-[40px] overflow-hidden h-64 shadow-xl">
                 <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=75&w=800" 
                  className="w-full h-full object-cover" 
                  alt="Quality Assurance"
                  loading="lazy"
                 />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
