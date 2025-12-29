
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { MapPin, ArrowUpRight, Search } from 'lucide-react';

interface PortfolioProps {
  t: any;
  lang: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ t, lang }) => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: t.portfolio.all },
    { id: 'civil', label: t.portfolio.civil },
    { id: 'amenagement', label: t.portfolio.decor },
    { id: 'maintenance', label: t.portfolio.maint }
  ];

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col items-center mb-16 gap-8 ${lang === 'ar' ? 'text-right' : ''}`}>
          <div className="text-center max-w-2xl">
            <h2 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-sm mb-4">{t.portfolio.label}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{t.portfolio.title}</h3>
            <p className="text-slate-500 font-medium">{t.portfolio.desc}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl shadow-inner border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === cat.id 
                    ? 'bg-yellow-500 text-slate-900 shadow-md scale-105' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[300px] md:auto-rows-[250px]">
          {filteredProjects.map((project, idx) => {
            // Pattern for bento grid logic
            const isWide = idx % 5 === 0;
            const isTall = idx % 5 === 1;
            
            return (
              <div 
                key={project.id} 
                className={`group relative rounded-[40px] overflow-hidden shadow-xl transition-all duration-700 hover:shadow-2xl cursor-pointer ${
                  isWide ? 'md:col-span-2 lg:col-span-3' : isTall ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 lg:col-span-2'
                }`}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay with Glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className={`absolute bottom-0 left-0 right-0 p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${lang === 'ar' ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-2 text-yellow-500 mb-2 text-[10px] font-black uppercase tracking-widest ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <MapPin size={12} />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-black mb-4 leading-tight group-hover:text-yellow-500 transition-colors">{project.title}</h3>
                  
                  <div className={`flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                      <Search size={18} />
                    </div>
                    <span className="text-white/70 text-[10px] font-black uppercase tracking-widest">Voir le projet</span>
                  </div>
                </div>

                <div className="absolute top-6 right-6 w-12 h-12 bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl shadow-yellow-500/20">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
