
import React from 'react';
import { Award, CheckCircle, UserCheck } from 'lucide-react';

interface FounderSpotlightProps {
  t: any;
  lang: string;
}

const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ t, lang }) => {
  const founders = [
    {
      name: "Abdelali Tounani",
      role: lang === 'ar' ? "المؤسس و مدير العمليات" : "Fondateur & Directeur des Opérations",
      expertise: "Maintenance & Logistique",
    },
    {
      name: "Abdessamad Amraoui",
      role: lang === 'ar' ? "المؤسس المشارك و المدير العام" : "Co-fondateur & Directeur Général",
      expertise: "Génie Civil & Stratégie",
    }
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 translate-x-1/4"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-20 items-center ${lang === 'ar' ? 'text-right' : ''}`}>
          <div>
            <h2 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-sm mb-4">Leadership</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              {lang === 'ar' ? 'العقول وراء التميز' : 'Les Visages de l\'Excellence'}
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl font-medium">
              {lang === 'ar' 
                ? 'اجتمع مؤسسونا على رؤية واحدة: تقديم جودة لا تضاهى في قطاع البناء بالمغرب. كل مشروع هو التزام شخصي منا تجاهكم.'
                : 'Nos fondateurs sont unis par une vision unique : apporter une qualité inégalée au secteur du BTP au Maroc. Chaque chantier est un engagement personnel.'}
            </p>
            
            <div className="space-y-6">
              {[
                { title: lang === 'ar' ? 'إشراف مباشر' : 'Supervision Directe', desc: lang === 'ar' ? 'نحن نراقب كل ورش عملنا بأنفسنا.' : 'Nous supervisons chaque chantier personnellement.' },
                { title: lang === 'ar' ? 'ثقافة الجودة' : 'Culture de Qualité', desc: lang === 'ar' ? 'التشطيب هو ما يميزنا عن الآخرين.' : 'Le souci du détail est ce qui nous distingue.' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle size={14} className="text-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-12 p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-6 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
               <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900">
                  <Award size={32} />
               </div>
               <div>
                  <p className="text-yellow-500 font-black uppercase tracking-widest text-[10px]">Engagement Personnel</p>
                  <p className="text-white font-bold italic">"{t.quote}"</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {founders.map((founder, i) => (
              <div key={i} className="group relative">
                <div className={`p-8 md:p-12 bg-white/5 border border-white/10 rounded-[40px] hover:border-yellow-500/50 transition-all duration-500 hover:bg-white/[0.08] ${lang === 'ar' ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-6 mb-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center">
                      <UserCheck size={32} />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-2xl md:text-3xl mb-1">{founder.name}</h4>
                      <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest">{founder.role}</p>
                    </div>
                  </div>
                  <div className={`pt-6 border-t border-white/10 flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">{founder.expertise}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
