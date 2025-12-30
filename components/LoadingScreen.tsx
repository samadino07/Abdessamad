
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [step, setStep] = useState(0); // 0: Logo, 1: French Welcome, 2: Arabic Welcome

  useEffect(() => {
    // Sequence of animations (Extended for better readability)
    // Step 0: Logo only (initial)
    
    // Step 1: French Welcome after 1.5s
    const step1 = setTimeout(() => setStep(1), 1500);
    
    // Step 2: Arabic Welcome after 4.5s
    const step2 = setTimeout(() => setStep(2), 4500);
    
    // Start Fade Out after 7.5s
    const fadeOutStart = setTimeout(() => {
      setIsFading(true);
      // Completely remove after fade animation (800ms)
      setTimeout(() => setIsVisible(false), 800);
    }, 7500);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(fadeOutStart);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100000] bg-slate-950 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isFading ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Background Decoration */}
        <div className="absolute inset-0 -m-12 md:-m-16 border border-gold-500/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-0 -m-12 md:-m-16 border-t-2 border-gold-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
        
        {/* Logo Section */}
        <div className={`relative z-10 w-32 h-32 md:w-56 md:h-56 mb-16 transition-all duration-1000 ${step > 0 ? 'scale-90 -translate-y-4' : 'scale-100'}`}>
          <Logo className="w-full h-full" />
        </div>
        
        {/* Text Area with fixed height to prevent layout shifts */}
        <div className="h-32 flex items-center justify-center relative w-full max-w-2xl px-8">
          
          {/* Step 1: French Welcome */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${step === 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <h2 className="text-white font-black tracking-[0.25em] text-sm md:text-base lg:text-lg uppercase text-center drop-shadow-lg">
              Bienvenue chez <span className="text-gold-500">GOLDGEN</span>
            </h2>
            <p className="text-slate-400 text-[11px] md:text-sm mt-4 font-medium text-center uppercase tracking-[0.15em] leading-relaxed max-w-md opacity-80">
              Nous espérons être à la hauteur de vos attentes.
            </p>
          </div>

          {/* Step 2: Arabic Welcome */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${step === 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <h2 className="text-white font-black text-2xl md:text-4xl text-center font-arabic leading-relaxed drop-shadow-lg">
              مرحباً بكم في <span className="text-gold-500">GOLDGEN</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-xl mt-4 font-arabic font-bold text-center leading-relaxed opacity-90">
              نتمنى أن نكون عند حسن ظنكم.
            </p>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-12 h-1 w-40 md:w-64 bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-gradient-to-r from-gold-700 via-gold-500 to-gold-300 animate-[loading_7.5s_linear_forwards]"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .font-arabic {
          font-family: 'Noto Sans Arabic', sans-serif;
        }
      `}} />
    </div>
  );
};

export default LoadingScreen;
