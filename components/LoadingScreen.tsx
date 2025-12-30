
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Exact 7 seconds timing
    const interval = setInterval(() => {
      setPercent(prev => {
        const next = prev + 0.72;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 50);

    if (percent >= 100) {
      const exitTimer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsVisible(false), 800);
      }, 500);
      return () => clearTimeout(exitTimer);
    }

    return () => clearInterval(interval);
  }, [percent]);

  if (!isVisible) return null;

  // Trilingual logic: FR (0-33%), EN (33-66%), AR (66-100%)
  let currentMessage = "";
  let isArabic = false;

  if (percent < 34) {
    currentMessage = "NOUS ASPIRONS À ÊTRE VOTRE PARTENAIRE STRATÉGIQUE";
  } else if (percent < 67) {
    currentMessage = "WE STRIVE TO BE YOUR STRATEGIC PARTNER";
  } else {
    currentMessage = "نطمح لنكون شريككم الاستراتيجي";
    isArabic = true;
  }

  return (
    <div className={`fixed inset-0 z-[100000] bg-slate-950 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${isFading ? 'opacity-0 scale-105 blur-2xl' : 'opacity-100'}`}>
      
      {/* LUXURY BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_70%)] opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.03]"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center w-full max-w-3xl px-8">
        
        {/* ENHANCED LOGO AREA WITH DYNAMIC ORBITS */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12 flex items-center justify-center">
          
          {/* OUTER ROTATING RINGS */}
          <div className="absolute inset-0 border-2 border-gold-500/10 rounded-full"></div>
          
          {/* DASHED ANIMATED ORBITS */}
          <div className="absolute inset-[-15px] border-[1px] border-dashed border-gold-500/30 rounded-full animate-[spin_12s_linear_infinite]"></div>
          <div className="absolute inset-[-30px] border-[1px] border-dashed border-gold-500/15 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
          
          {/* FAST GLOWING ACCENTS */}
          <div className="absolute inset-[-5px] border-t-2 border-gold-500 rounded-full animate-[spin_4s_linear_infinite] opacity-60"></div>
          <div className="absolute inset-[-10px] border-r-2 border-gold-400/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>

          {/* CENTRAL LOGO REVEAL */}
          <div className={`relative z-10 transition-all duration-1000 ${percent > 10 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
             <Logo className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_50px_rgba(234,179,8,0.45)]" />
          </div>
        </div>

        {/* MESSAGE AREA - ENHANCED VISIBILITY */}
        <div className="w-full flex flex-col items-center text-center">
          
          <div className="h-20 md:h-24 flex items-center justify-center mb-8 px-4 overflow-hidden">
             <h2 
              key={currentMessage}
              className={`text-gold-500 text-sm md:text-xl font-black tracking-[0.3em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 drop-shadow-[0_0_20px_rgba(234,179,8,0.6)] leading-relaxed ${isArabic ? 'font-arabic tracking-normal md:text-2xl' : ''}`}
             >
                {currentMessage}
             </h2>
          </div>

          {/* PROGRESS INDICATOR */}
          <div className="w-full max-w-sm h-[2px] bg-white/5 rounded-full overflow-hidden mb-6 relative">
             <div 
               className="h-full bg-gold-500 transition-all duration-300 shadow-[0_0_25px_#eab308]" 
               style={{ width: `${percent}%` }}
             ></div>
             {/* Glowing pulse at progress head */}
             <div 
               className="absolute top-[-4px] h-[10px] w-[10px] bg-white rounded-full shadow-[0_0_20px_#fff] blur-[1px] transition-all duration-300"
               style={{ left: `calc(${percent}% - 5px)` }}
             ></div>
          </div>

          <div className="flex flex-col items-center gap-2">
             <span className="text-xs md:text-sm font-black text-white tabular-nums tracking-[0.3em] opacity-80">{Math.floor(percent)}%</span>
             <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] animate-pulse">Initialisation Système</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default LoadingScreen;
