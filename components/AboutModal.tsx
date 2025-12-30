
import React, { useEffect, useState } from 'react';
import { X, Award, Target, Users, ArrowDown, ShieldCheck, Zap } from 'lucide-react';
import Logo from './Logo';

interface AboutModalProps {
  onClose: () => void;
  lang: string;
  t: any;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose, lang, t }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white overflow-hidden">
      <div className={`relative w-full h-full flex flex-col overflow-y-auto transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`fixed top-8 z-[100] p-4 bg-slate-900 text-white rounded-full hover:bg-yellow-500 hover:text-slate-900 transition-all shadow-2xl active:scale-90 ${lang === 'ar' ? 'left-8' : 'right-8'}`}
        >
          <X size={28} />
        </button>

        {/* HERO SECTION ABOUT */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-slate-900 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=75&w=1600" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            alt="Vision"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
          <div className="relative z-10 text-center container mx-auto px-6">
            <span className="text-yellow-500 font-black uppercase tracking-[0.5em] text-xs mb-6 block drop-shadow-lg">{t.title}</span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8">
              {t.subtitle.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-yellow-500">{t.subtitle.split(' ').slice(2).join(' ')}</span>
            </h1>
            <div className="flex justify-center">
               <ArrowDown className="text-white animate-bounce" size={48} />
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${lang === 'ar' ? 'text-right' : ''}`}>
                <div>
                   <h2 className="text-4xl font-black text-slate-900 mb-8">{lang === 'ar' ? 'قصتنا' : 'Notre Histoire'}</h2>
                   <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">
                     {t.desc}
                   </p>
                   <div className="p-10 bg-slate-50 border-l-8 border-yellow-500 rounded-3xl italic text-2xl text-slate-700 font-bold leading-relaxed shadow-xl">
                      {t.quote}
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=75&w=500" className="rounded-[40px] shadow-2xl h-64 w-full object-cover" alt="History 1" loading="lazy" />
                      <div className="bg-yellow-500 p-8 rounded-[40px] text-center flex flex-col items-center justify-center h-48">
                         <span className="text-4xl font-black text-slate-900">2023</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Lancement</span>
                      </div>
                   </div>
                   <div className="space-y-4 pt-12">
                      <div className="bg-slate-900 p-8 rounded-[40px] text-center flex flex-col items-center justify-center h-48">
                         <span className="text-4xl font-black text-yellow-500">100%</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-white">Engagement</span>
                      </div>
                      <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=75&w=500" className="rounded-[40px] shadow-2xl h-64 w-full object-cover" alt="History 2" loading="lazy" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS SECTION */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-black text-slate-900 mb-16 text-center">{lang === 'ar' ? 'ركائزنا' : 'Nos Piliers Fondateurs'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="bg-white p-12 rounded-[50px] shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 mb-8"><Zap size={32} /></div>
                  <h4 className="text-xl font-black mb-4">{t.pillar1}</h4>
                  <p className="text-slate-500 text-sm font-medium">{t.pillar1Desc}</p>
               </div>
               <div className="bg-slate-900 p-12 rounded-[50px] shadow-xl hover:-translate-y-2 transition-all text-white">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 mb-8"><ShieldCheck size={32} /></div>
                  <h4 className="text-xl font-black mb-4">{t.pillar2}</h4>
                  <p className="text-slate-400 text-sm font-medium">{t.pillar2Desc}</p>
               </div>
               <div className="bg-white p-12 rounded-[50px] shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-8"><Target size={32} /></div>
                  <h4 className="text-xl font-black mb-4">{t.goal}</h4>
                  <p className="text-slate-500 text-sm font-medium">{t.goalDesc}</p>
               </div>
               <div className="bg-white p-12 rounded-[50px] shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-8"><Users size={32} /></div>
                  <h4 className="text-xl font-black mb-4">{t.team}</h4>
                  <p className="text-slate-500 text-sm font-medium">{t.teamDesc}</p>
               </div>
            </div>
          </div>
        </section>

        {/* FOUNDERS SECTION */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-950 p-12 md:p-24 rounded-[60px] text-white">
                 <div className="max-w-xl">
                    <span className="text-yellow-500 font-black uppercase tracking-widest text-xs mb-6 block">Leadership</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                       {lang === 'ar' ? 'فريق القيادة' : 'Une Vision de Jeunes Entrepreneurs'}
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 italic">
                       "Abdessamad Amraoui & Abdelali Tounani - {lang === 'ar' ? 'المؤسسون المشاركون' : 'Co-fondateurs'}"
                    </p>
                    <div className="flex gap-4">
                       <Award className="text-yellow-500" size={32} />
                       <p className="text-slate-300 font-bold">{t.engagement}</p>
                    </div>
                 </div>
                 <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center p-2 shadow-2xl animate-pulse">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden p-4">
                       <Logo className="w-full h-full" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default AboutModal;
