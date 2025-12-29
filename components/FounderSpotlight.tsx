
import React from 'react';
import { Award, CheckCircle, UserCheck, Star } from 'lucide-react';

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
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-24 items-center ${lang === 'ar' ? 'text-right' : ''}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-yellow-500/10 rounded-lg text-yellow-500 border border-yellow-500/20">
              <Star size={14} fill="currentColor" />
              <span className="font-black uppercase tracking-widest text-[10px]">Leadership</span>
            </div>
            <h3 className="text-4xl md:text-7xl font-black text-white mb-10 leading-tight tracking-tighter">
              {lang === 'ar' ? 'العقول وراء التميز' : 'Les Visages de l\'Excellence'}
            </h3>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-xl font-medium">
              {lang === 'ar' 
                ? 'اجتمع مؤسسونا على رؤية واحدة: تقديم جودة لا تضاهى في قطاع البناء بالمغرب. كل مشروع هو التزام شخصي منا تجاهكم.'
                : 'Nos fondateurs sont unis par une vision unique : apporter une qualité inégalée au secteur du BTP au Maroc. Chaque chantier est un engagement personnel.'}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-16">
              {[
                { title: lang === 'ar' ? 'إشراف مباشر' : 'Supervision Directe', desc: lang === 'ar' ? 'نحن نراقب كل ورش عملنا بأنفسنا.' : 'Nous supervisons chaque chantier personnellement.' },
                { title: lang === 'ar' ? 'ثقافة الجودة' : 'Culture de Qualité', desc: lang === 'ar' ? 'التشطيب هو ما يميزنا عن الآخرين.' : 'Le souci du détail est ce qui nous distingue.' },
              ].map((item, i) => (
                <div key={i} className={`space-y-4 ${lang === 'ar' ? 'text-right' : ''}`}>
                  <div className={`w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-yellow-500 ${lang === 'ar' ? 'ml-auto' : ''}`}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`inline-flex items-center gap-6 p-6 glass-card rounded-3xl border border-white/10 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
               <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl">
                  <Award size={28} />
               </div>
               <div>
                  <p className="text-yellow-500 font-black uppercase tracking-widest text-[9px] mb-1">Engagement Personnel</p>
                  <p className="text-white font-bold italic text-sm">"{t.quote}"</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            {founders.map((founder, i) => (
              <div key={i} className="group relative">
                <div className={`p-10 md:p-14 glass-card rounded-[40px] hover:border-yellow-500/30 transition-all duration-700 hover:bg-white/[0.06] ${lang === 'ar' ? 'text-right' : ''}`}>
                  <div className={`flex items-start justify-between mb-10 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-20 h-20 bg-yellow-500/10 text-yellow-500 rounded-3xl flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all duration-500">
                      <UserCheck size={36} />
                    </div>
                    <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10">
                       <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">{founder.expertise}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-3xl md:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:from-yellow-200 group-hover:to-yellow-500 transition-all duration-700">
                      {founder.name}
                    </h4>
                    <p className="text-yellow-500 font-black text-xs md:text-sm uppercase tracking-[0.3em]">{founder.role}</p>
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
