
import React from 'react';
import { LOGO_PATH } from '../constants';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-16 w-16" }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden transition-transform duration-700 ${className}`}>
      {/* Background soft glow circle */}
      <div className="absolute inset-0 bg-slate-900 rounded-full border border-gold-500/20 scale-95 shadow-[inset_0_0_20px_rgba(234,179,8,0.1)]"></div>
      
      <img 
        src={LOGO_PATH} 
        alt="GOLDGEN" 
        className="w-full h-full object-contain relative z-10 p-2"
        style={{ filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.5))' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'logo-fallback absolute inset-0 flex items-center justify-center bg-slate-900 border border-gold-500/30 rounded-full w-full h-full shadow-2xl';
            fallback.innerHTML = `<span style="color:#EAB308; font-weight:900; font-size: 1.8rem; letter-spacing:-0.05em">G<small style="font-size:0.7rem">G</small></span>`;
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

export default Logo;
