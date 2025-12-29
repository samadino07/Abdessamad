import React from 'react';
import { CONTACT_DATA } from '../constants';
import { ActivePage } from '../App';
import { Shield, Facebook, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  t: any;
  lang: string;
  onNavigate: (page: ActivePage) => void;
  unreadCount?: number;
}

const Footer: React.FC<FooterProps> = ({ t, lang, onNavigate, unreadCount = 0 }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: <Facebook size={20} />, 
      url: 'https://www.facebook.com', 
      label: 'Facebook',
      hoverClass: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10'
    },
    { 
      icon: <Linkedin size={20} />, 
      url: 'https://www.linkedin.com', 
      label: 'LinkedIn',
      hoverClass: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10'
    },
    { 
      icon: <Instagram size={20} />, 
      url: 'https://www.instagram.com', 
      label: 'Instagram',
      hoverClass: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10'
    },
  ];

  return (
    <footer className="bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className={`col-span-1 lg:col-span-2 space-y-10 ${lang === 'ar' ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 font-black text-2xl shadow-xl shadow-yellow-500/10">G</div>
              <button onClick={() => onNavigate('home')} className="text-3xl font-black font-display tracking-tighter text-white uppercase">GOLDGEN</button>
            </div>
            
            <p className={`text-slate-400 max-w-sm leading-relaxed text-lg font-medium ${lang === 'ar' ? 'mr-0 ml-auto' : ''}`}>
              {t.desc}
            </p>
            
            <div className={`space-y-4 ${lang === 'ar' ? 'flex flex-col items-end' : ''}`}>
              <h5 className="text-white font-black uppercase tracking-[0.3em] text-[10px]">{lang === 'ar' ? 'تابعونا' : 'Social Media'}</h5>
              <div className={`flex gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                {socialLinks.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/30 shadow-lg active:scale-95 ${social.hoverClass}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={lang === 'ar' ? 'text-right' : ''}>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
              {t.expertise}
            </h4>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors uppercase tracking-wider">{lang === 'ar' ? 'الهندسة المدنية' : 'Génie Civil'}</button></li>
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors uppercase tracking-wider">{lang === 'ar' ? 'التهيئة' : 'Aménagement'}</button></li>
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors uppercase tracking-wider">{lang === 'ar' ? 'الصيانة' : 'Maintenance'}</button></li>
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors uppercase tracking-wider">{lang === 'ar' ? 'التوريدات' : 'Fournitures'}</button></li>
            </ul>
          </div>

          <div className={lang === 'ar' ? 'text-right' : ''}>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
              {t.id}
            </h4>
            <div className="space-y-6 text-slate-400 text-sm">
              <div>
                <span className="text-slate-600 font-black uppercase block text-[9px] tracking-[0.3em] mb-2">{t.rc}</span> 
                <p className="font-bold text-slate-300">{CONTACT_DATA.rc}</p>
              </div>
              <div>
                <span className="text-slate-600 font-black uppercase block text-[9px] tracking-[0.3em] mb-2">{t.siege}</span> 
                <p className="font-bold text-slate-300">{lang === 'ar' ? 'آسفي، المغرب' : 'Safi, Maroc'}</p>
              </div>
              <div>
                <span className="text-slate-600 font-black uppercase block text-[9px] tracking-[0.3em] mb-2">{t.action}</span> 
                <p className="font-bold text-slate-300">{lang === 'ar' ? 'المغرب كامل' : 'Couverture Nationale'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <p className="text-center md:text-left">© {currentYear} STE GOLDGEN SARL AU. {t.rights}</p>
          <div className={`flex space-x-8 items-center ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <button onClick={() => onNavigate('engagement')} className="hover:text-white transition-colors">{t.hse}</button>
            <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
            <button 
              onClick={() => onNavigate('admin')} 
              className="relative flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-yellow-500 hover:text-slate-900 transition-all group"
            >
              <Shield size={14} className="group-hover:animate-pulse" />
              <span>Admin Access</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;