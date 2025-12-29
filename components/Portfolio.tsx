import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { MapPin, ArrowUpRight } from 'lucide-react';

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
          {/* Main header block completely removed per user request */}
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-slate-100 rounded-2xl shadow-inner border border-slate-200">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-yellow-500/10 cursor-pointer"
            >
              {/* Subtle zoom animation on image */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Permanent base overlay for readability */}
              <div className="absolute inset-0 bg-slate-950/20"></div>
              
              {/* Fade-in gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
              
              <div className={`absolute bottom-8 left-8 right-8 z-10 transition-transform duration-500 group-hover:-translate-y-2 ${lang === 'ar' ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 text-yellow-500 mb-3 text-[10px] font-black uppercase tracking-widest ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <MapPin size={12} />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-white text-2xl font-black mb-4 drop-shadow-lg leading-tight">{project.title}</h3>
                
                {/* Visual arrow appearing on hover */}
                <div className="w-12 h-12 bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 shadow-xl shadow-yellow-500/20">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;