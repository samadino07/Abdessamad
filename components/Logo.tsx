
import React from 'react';
import { LOGO_PATH } from '../constants';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-12" }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl transition-transform hover:scale-110 duration-500 ${className}`}>
      <img 
        src={LOGO_PATH} 
        alt="GOLDGEN Logo" 
        className="w-full h-full object-contain relative z-10 animate-pulse"
        style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'logo-fallback absolute inset-0 flex items-center justify-center bg-yellow-500 text-slate-900 font-black rounded-xl w-full h-full text-xl shadow-inner animate-pulse';
            fallback.innerText = 'G';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

export default Logo;
