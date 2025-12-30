
import React from 'react';
import { LOGO_PATH } from '../constants';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-16 w-16" }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl transition-transform hover:scale-110 duration-700 ${className}`}>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gold-500/20 blur-2xl rounded-full scale-75 animate-pulse"></div>
      
      <img 
        src={LOGO_PATH} 
        alt="GOLDGEN Logo" 
        className="w-full h-full object-contain relative z-10"
        style={{ filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.2))' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'logo-fallback absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold-400 to-gold-600 text-slate-900 font-black rounded-2xl w-full h-full text-2xl shadow-xl animate-pulse';
            fallback.innerText = 'G';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

export default Logo;
