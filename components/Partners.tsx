
import React from 'react';

const Partners: React.FC = () => {
  // Using generic high-quality building/industrial related placeholder logos
  const partners = [
    { name: 'OCP Group', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/OCP_Group_Logo.svg/1200px-OCP_Group_Logo.svg.png' },
    { name: 'LafargeHolcim', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/LafargeHolcim_logo.svg/2560px-LafargeHolcim_logo.svg.png' },
    { name: 'ONEE', logo: 'https://upload.wikimedia.org/wikipedia/fr/b/b3/Logo_ONEE.png' },
    { name: 'Ciments du Maroc', logo: 'https://www.cimentsdumaroc.com/sites/default/files/logo_cimmar.png' },
    { name: 'Cosumar', logo: 'https://upload.wikimedia.org/wikipedia/fr/5/52/Cosumar_logo.png' },
    { name: 'Marsa Maroc', logo: 'https://www.marsamaroc.co.ma/sites/default/files/logo_marsa_maroc.png' }
  ];

  return (
    <section className="py-12 bg-slate-950 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Ils nous font confiance pour leurs infrastructures</p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="mx-12 md:mx-20 flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 md:h-14 w-auto object-contain filter brightness-200 contrast-75 hover:brightness-100 hover:contrast-100" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
