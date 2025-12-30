
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Phone, ShieldCheck, Sun, Moon } from 'lucide-react';
import { Language, ActivePage, Theme } from '../App';
import { CONTACT_DATA } from '../constants';
import Logo from './Logo';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  t: any;
  onNavigate: (page: ActivePage) => void;
  onBrandClick?: () => void;
  isAdmin?: boolean;
  theme: Theme;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, onLangChange, t, onNavigate, onBrandClick, isAdmin, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallMenuOpen, setIsCallMenuOpen] = useState(false);
  const callMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (callMenuRef.current && !callMenuRef.current.contains(event.target as Node)) {
        setIsCallMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks: { name: string; page: ActivePage }[] = [
    { name: t.about, page: 'about' },
    { name: t.expertise, page: 'expertise' },
    { name: t.engagement, page: 'engagement' },
    { name: t.contact, page: 'contact' },
  ];

  const langs: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عربي' },
  ];

  const phoneNumbers = [
    { label: currentLang === 'ar' ? 'عبد العالي' : 'Abdelali', number: CONTACT_DATA.telSecondary },
    { label: currentLang === 'ar' ? 'عبد الصمد' : 'Abdessamad', number: CONTACT_DATA.whatsapp },
  ];

  const handleLogoAction = () => {
    if (onBrandClick) {
      onBrandClick();
    } else {
      onNavigate('home');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-100 dark:border-white/5 py-3 md:py-4' 
        : 'bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-transparent py-4 md:py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <button onClick={handleLogoAction} className="flex items-center gap-3 md:gap-4 group shrink-0">
          <Logo className="h-10 w-10 md:h-16 md:w-16" />
          <span className="text-xl md:text-3xl font-black font-display tracking-tighter text-slate-900 dark:text-white transition-colors group-hover:text-gold-500 uppercase">GOLDGEN</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.page)}
              className="font-black text-[10px] xl:text-[11px] uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 hover:text-gold-500 dark:hover:text-gold-500 transition-colors whitespace-nowrap"
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/10 pl-6 xl:pl-10">
            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-gold-500 rounded-xl hover:bg-gold-500 hover:text-slate-900 transition-all"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Language Switch */}
            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLangChange(l.code)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${
                    currentLang === l.code ? 'bg-gold-500 text-slate-900 shadow-md' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Call Menu */}
            <div className="relative" ref={callMenuRef}>
              <button
                onClick={() => setIsCallMenuOpen(!isCallMenuOpen)}
                className="bg-slate-900 dark:bg-gold-500 text-white dark:text-slate-950 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-2"
              >
                <Phone size={12} />
                <span className="hidden xl:inline">{t.call}</span>
                <ChevronDown size={12} className={`transition-transform ${isCallMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCallMenuOpen && (
                <div className="absolute top-full mt-4 w-60 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl border border-slate-100 dark:border-white/5 py-4 animate-in fade-in slide-in-from-top-2 duration-300 right-0">
                  <p className="px-6 pb-3 text-[8px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 dark:border-white/5 mb-2">
                    {t.chooseNum}
                  </p>
                  {phoneNumbers.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.number.replace(/\s/g, '')}`}
                      className="flex flex-col px-6 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-[8px] font-black text-gold-600 uppercase tracking-widest mb-0.5">{phone.label}</span>
                      <span className="text-base font-black text-slate-900 dark:text-white group-hover:text-gold-500">{phone.number}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <button 
            onClick={onToggleTheme}
            className="p-2.5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-gold-500 rounded-xl"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="p-2.5 text-slate-900 dark:text-white bg-slate-100 dark:bg-white/5 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl p-6 space-y-5 border-t border-slate-100 dark:border-white/5 animate-in slide-in-from-top-4 duration-500 overflow-y-auto max-h-[80vh]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { onNavigate(link.page); setIsMobileMenuOpen(false); }}
              className="block w-full font-black text-slate-900 dark:text-white text-lg uppercase tracking-tight text-left py-1"
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => { onLangChange(l.code); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black transition-all ${
                  currentLang === l.code ? 'bg-gold-500 text-slate-900 shadow-md' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/5 grid gap-3">
            {phoneNumbers.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone.number.replace(/\s/g, '')}`}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl group"
              >
                <div>
                  <p className="text-[8px] font-black text-gold-600 uppercase tracking-widest mb-0.5">{phone.label}</p>
                  <p className="text-base font-black text-slate-900 dark:text-white">{phone.number}</p>
                </div>
                <Phone size={18} className="text-gold-500" />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
