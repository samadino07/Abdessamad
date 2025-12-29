
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Language, ActivePage } from '../App';
import { CONTACT_DATA } from '../constants';
import Logo from './Logo';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  t: any;
  onNavigate: (page: ActivePage) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, onLangChange, t, onNavigate }) => {
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
    { name: t.home, page: 'home' },
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
    { label: 'Abdessamad', number: CONTACT_DATA.whatsapp },
    { label: 'Abdelali', number: CONTACT_DATA.telSecondary },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
          <Logo className="h-10 w-10 md:h-12 md:w-12" />
          <span className={`text-2xl md:text-3xl font-black font-display tracking-tighter transition-colors ${
            isScrolled ? 'text-slate-900' : 'text-white'
          }`}>GOLDGEN</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.page)}
              className={`font-semibold text-sm uppercase tracking-wider hover:text-yellow-500 transition-colors ${
                isScrolled ? 'text-slate-600' : 'text-slate-200'
              }`}
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex items-center space-x-2 bg-slate-900/10 p-1 rounded-lg backdrop-blur-sm border border-white/10">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => onLangChange(l.code)}
                className={`px-3 py-1 rounded-md text-xs font-black transition-all ${
                  currentLang === l.code 
                    ? 'bg-yellow-500 text-slate-900 shadow-md' 
                    : isScrolled ? 'text-slate-500 hover:text-slate-900' : 'text-slate-300 hover:text-white'
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
              <div className={`absolute top-full mt-3 w-64 bg-white shadow-2xl rounded-2xl border border-slate-100 py-4 animate-in fade-in slide-in-from-top-2 duration-200 ${
                currentLang === 'ar' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
              }`}>
                <p className="px-6 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 mb-2">
                  {t.chooseNum}
                </p>
                {phoneNumbers.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.number.replace(/\s/g, '')}`}
                    className={`flex flex-col px-6 py-3 hover:bg-slate-50 transition-colors group ${
                      currentLang === 'ar' ? 'text-right' : 'text-left'
                    }`}
                    onClick={() => setIsCallMenuOpen(false)}
                  >
                    <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">{phone.label}</span>
                    <span className="text-lg font-black text-slate-900 group-hover:text-yellow-600">{phone.number}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-yellow-500 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl py-6 px-6 space-y-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-center space-x-4 mb-6 p-2 bg-slate-50 rounded-xl">
             {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => { onLangChange(l.code); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-black transition-all ${
                  currentLang === l.code ? 'bg-yellow-500 text-slate-900' : 'text-slate-500'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { onNavigate(link.page); setIsMobileMenuOpen(false); }}
              className={`block w-full font-bold text-slate-800 text-lg py-3 hover:text-yellow-500 transition-colors ${currentLang === 'ar' ? 'text-right' : 'text-left'}`}
            >
              {link.name}
            </button>
          ))}
          
          <div className="pt-4 border-t border-slate-100">
            <p className={`text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ${currentLang === 'ar' ? 'text-right' : ''}`}>
              {t.chooseNum}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {phoneNumbers.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.number.replace(/\s/g, '')}`}
                  className={`flex items-center justify-between p-4 bg-slate-50 rounded-2xl group active:bg-yellow-500 transition-colors ${
                    currentLang === 'ar' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={currentLang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">{phone.label}</p>
                    <p className="text-lg font-black text-slate-900 group-active:text-slate-900">{phone.number}</p>
                  </div>
                  <Phone size={20} className="text-yellow-500 group-active:text-slate-900" />
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
