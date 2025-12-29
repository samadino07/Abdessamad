
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
  isAdmin?: boolean;
  theme: Theme;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, onLangChange, t, onNavigate, isAdmin, theme, onToggleTheme }) => {
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-slate-900 shadow-lg py-3 md:py-4' : 'bg-transparent py-4 md:py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 md:gap-3 group">
          <Logo className="h-9 w-9 md:h-12 md:w-12" />
          <span className={`text-xl md:text-3xl font-black font-display tracking-tighter transition-colors ${
            isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'
          }`}>GOLDGEN</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {isAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest animate-pulse"
            >
              <ShieldCheck size={14} />
              Admin
            </button>
          )}
          
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.page)}
              className={`font-semibold text-sm uppercase tracking-wider hover:text-yellow-500 transition-colors ${
                isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-200'
              }`}
            >
              {link.name}
            </button>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl transition-all ${
              isScrolled 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-500' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title={theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="flex items-center space-x-1.5 bg-slate-900/10 dark:bg-white/5 p-1 rounded-lg backdrop-blur-sm border border-white/10">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => onLangChange(l.code)}
                className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${
                  currentLang === l.code 
                    ? 'bg-yellow-500 text-slate-900 shadow-md' 
                    : isScrolled ? 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="relative" ref={callMenuRef}>
            <button
              onClick={() => setIsCallMenuOpen(!isCallMenuOpen)}
              className="bg-yellow-500 text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-yellow-400 transition-all shadow-lg active:scale-95 flex items-center space-x-2"
            >
              <Phone size={16} className={currentLang === 'ar' ? 'ml-2' : 'mr-2'} />
              <span>{t.call}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isCallMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCallMenuOpen && (
              <div className={`absolute top-full mt-3 w-64 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl border border-slate-100 dark:border-white/5 py-4 animate-in fade-in slide-in-from-top-2 duration-200 ${
                currentLang === 'ar' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
              }`}>
                <p className="px-6 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 dark:border-white/5 mb-2">
                  {t.chooseNum}
                </p>
                {phoneNumbers.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.number.replace(/\s/g, '')}`}
                    className={`flex flex-col px-6 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group ${
                      currentLang === 'ar' ? 'text-right' : 'text-left'
                    }`}
                    onClick={() => setIsCallMenuOpen(false)}
                  >
                    <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-500 uppercase tracking-wider">{phone.label}</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-500">{phone.number}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">
           <button 
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl transition-all ${
              isScrolled 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-500' 
                : 'bg-white/10 text-white'
            }`}
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <button
            className={`p-2 transition-colors ${isScrolled ? 'text-slate-900 dark:text-yellow-500' : 'text-yellow-500'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl py-6 px-4 space-y-4 border-t border-slate-100 dark:border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { onNavigate(link.page); setIsMobileMenuOpen(false); }}
              className={`block w-full font-bold text-slate-800 dark:text-slate-200 text-base py-3 hover:text-yellow-500 transition-colors ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex justify-center space-x-2 mb-4 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
             {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => { onLangChange(l.code); setIsMobileMenuOpen(false); }}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-black transition-all ${
                  currentLang === l.code ? 'bg-yellow-500 text-slate-900 shadow-sm' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-white/5">
            <p className={`text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 ${currentLang === 'ar' ? 'text-right' : ''}`}>
              {t.chooseNum}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {phoneNumbers.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.number.replace(/\s/g, '')}`}
                  className={`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl group active:bg-yellow-500 transition-colors ${
                    currentLang === 'ar' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={currentLang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-[8px] font-bold text-yellow-600 dark:text-yellow-500 uppercase tracking-wider">{phone.label}</p>
                    <p className="text-base font-black text-slate-900 dark:text-white group-active:text-slate-900">{phone.number}</p>
                  </div>
                  <Phone size={18} className="text-yellow-500 group-active:text-slate-900" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
