
import React, { useEffect, useState } from 'react';
import { X, ShieldAlert, ShieldCheck, HardHat, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EngagementModalProps {
  onClose: () => void;
  lang: string;
  t: any;
}

const EngagementModal: React.FC<EngagementModalProps> = ({ onClose, lang, t }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900 overflow-hidden">
       <div className={`relative w-full h-full flex flex-col overflow-y-auto transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          
          <button 
            onClick={onClose}
            className={`fixed top-8 z-[100] p-4 bg-yellow-500 text-slate-900 rounded-full hover:bg-white transition-all shadow-2xl ${lang === 'ar' ? 'left-8' : 'right-8'}`}
          >
            <X size={28} />
          </button>

          {/* HERO SECTION HSE */}
          <section className="relative min-h-[60vh] flex items-center justify-center bg-red-600 overflow-hidden px-6">
             <div className="absolute inset-0 bg-slate-950 opacity-80"></div>
             <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
             
             <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-3 bg-red-600 px-6 py-2 rounded-full border border-red-400 mb-8">
                   <ShieldAlert className="text-white" size={24} />
                   <span className="text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">{t.label}</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-8">
                   {t.title} <br />
                   <span className="text-yellow-500">{t.subtitle}</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                   {t.desc}
                </p>
             </div>
          </section>

          {/* STATS SECTION */}
          <section className="py-24 bg-slate-950">
             <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                   <div className="bg-white/5 border border-white/10 p-12 rounded-[50px] text-center">
                      <div className="text-7xl md:text-9xl font-black text-yellow-500 mb-4 tracking-tighter">0</div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-4">{t.zero}</h3>
                      <p className="text-slate-400 font-bold">{t.culture}</p>
                      <p className="text-slate-500 mt-2">{t.cultureDesc}</p>
                   </div>
                   <div className="space-y-8">
                      <div className="p-8 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-6">
                         <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white"><CheckCircle2 size={32} /></div>
                         <div>
                            <h4 className="text-xl font-black text-white mb-1">Qualité ISO Certifiée</h4>
                            <p className="text-slate-400 font-medium">Contrôles permanents à chaque étape.</p>
                         </div>
                      </div>
                      <div className="p-8 bg-yellow-500 rounded-3xl flex items-center gap-6 text-slate-900">
                         <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-yellow-500"><ShieldCheck size={32} /></div>
                         <div>
                            <h4 className="text-xl font-black mb-1">Protection Individuelle</h4>
                            <p className="font-bold">Équipements de pointe pour tous nos agents.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* GRID CARDS SECTION */}
          <section className="py-24 bg-slate-900">
             <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {[
                      { icon: <ShieldCheck size={32} />, title: t.card1, desc: "Application stricte des lois en vigueur." },
                      { icon: <HardHat size={32} />, title: t.card2, desc: "Matériel vérifié et entretenu périodiquement." },
                      { icon: <Users size={32} />, title: t.card3, desc: "Sensibilisation hebdomadaire aux risques." },
                      { icon: <AlertTriangle size={32} />, title: t.card4, desc: "Analyse préalable avant chaque intervention." },
                   ].map((item, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all group">
                         <div className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                         <h4 className="text-xl font-black text-white mb-4">{item.title}</h4>
                         <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                   ))}
                </div>
             </div>
          </section>

          {/* ENVIRONMENTAL FOCUS */}
          <section className="py-24 bg-white">
             <div className="container mx-auto px-6">
                <div className={`flex flex-col lg:flex-row items-center gap-16 ${lang === 'ar' ? 'lg:flex-row-reverse text-right' : ''}`}>
                   <div className="lg:w-1/2 overflow-hidden rounded-[60px] shadow-2xl h-[500px]">
                      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Environnement" />
                   </div>
                   <div className="lg:w-1/2">
                      <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8">{lang === 'ar' ? 'الالتزام البيئي' : 'Notre Conscience Écologique'}</h2>
                      <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">
                         Parce que construire l'avenir c'est aussi protéger la terre, GOLDGEN intègre une gestion rigoureuse des déchets BTP et favorise l'utilisation de matériaux éco-responsables partout où cela est possible.
                      </p>
                      <ul className="space-y-6">
                         {['Tri sélectif des déchets de chantier', 'Consommation énergétique optimisée', 'Réduction de l\'empreinte carbone logistique'].map((li, idx) => (
                            <li key={idx} className={`flex items-center gap-4 text-slate-900 font-black text-lg ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                               <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                               <span>{li}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
             </div>
          </section>

       </div>
    </div>
  );
};

export default EngagementModal;
