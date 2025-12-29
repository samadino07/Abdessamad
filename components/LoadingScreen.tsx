
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 800);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100000] bg-slate-950 flex flex-col items-center justify-center transition-all duration-800 ease-in-out ${isFading ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative">
        {/* Animated Rings */}
        <div className="absolute inset-0 -m-8 border-2 border-yellow-500/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
        <div className="absolute inset-0 -m-16 border border-yellow-500/10 rounded-full animate-[ping_4s_linear_infinite_reverse]"></div>
        
        <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 animate-pulse">
          <Logo className="w-full h-full" />
        </div>
      </div>
      
      <div className="mt-12 overflow-hidden">
        <h2 className="text-white font-black tracking-[0.5em] text-sm uppercase animate-[slideUp_1s_ease-out]">
          Bâtir l'Excellence
        </h2>
        <div className="h-1 w-full bg-slate-800 mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0%; transform: translateX(100%); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default LoadingScreen;
