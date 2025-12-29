
import React from 'react';
import { CONTACT_DATA } from '../constants';
import { ActivePage } from '../App';
import { Shield } from 'lucide-react';

interface FooterProps {
  t: any;
  lang: string;
  onNavigate: (page: ActivePage) => void;
  unreadCount?: number;
}

const Footer: React.FC<FooterProps> = ({ t, lang, onNavigate, unreadCount = 0 }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className={`col-span-2 space-y-8 ${lang === 'ar' ? 'text-right' : ''}`}>
            <div className={`flex items-center ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button onClick={() => onNavigate('home')} className="text-3xl font-black font-display tracking-tighter text-white uppercase">GOLDGEN</button>
            </div>
            <p className={`text-slate-500 max-w-sm leading-relaxed text-lg ${lang === 'ar' ? 'mr-0 ml-auto' : ''}`}>
              {t.desc}
            </p>
            <div className={`flex space-x-4 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {['FB', 'LN', 'IG'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-white hover:bg-yellow-500 hover:text-slate-900 transition-colors cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>

          <div className={lang === 'ar' ? 'text-right' : ''}>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">{t.expertise}</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors">{lang === 'ar' ? 'الهندسة المدنية' : 'Génie Civil'}</button></li>
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors">{lang === 'ar' ? 'التهيئة' : 'Aménagement'}</button></li>
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors">{lang === 'ar' ? 'الصيانة' : 'Maintenance'}</button></li>
              <li><button onClick={() => onNavigate('expertise')} className="hover:text-yellow-500 transition-colors">{lang === 'ar' ? 'التوريدات' : 'Fournitures'}</button></li>
            </ul>
          </div>

          <div className={lang === 'ar' ? 'text-right' : ''}>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">{t.id}</h4>
            <div className="space-y-4 text-slate-400 text-sm">
              <p><span className="text-slate-600 font-bold uppercase block text-[10px] tracking-widest mb-1">{t.rc}</span> {CONTACT_DATA.rc}</p>
              <p><span className="text-slate-600 font-bold uppercase block text-[10px] tracking-widest mb-1">{t.siege}</span> {lang === 'ar' ? 'آسفي' : 'Safi'}</p>
              <p><span className="text-slate-600 font-bold uppercase block text-[10px] tracking-widest mb-1">{t.action}</span> {lang === 'ar' ? 'المغرب كامل' : 'Tout le Maroc'}</p>
            </div>
          </div>
        </div>

        <div className={`border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-600 text-xs font-bold uppercase tracking-[0.2em] ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <p>© {currentYear} STE GOLDGEN SARL AU. {t.rights}</p>
          <div className={`flex space-x-6 items-center ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <button onClick={() => onNavigate('engagement')} className="hover:text-white transition-colors">{t.hse}</button>
            <button onClick={() => onNavigate('admin')} className="relative flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-all">
              <Shield size={12} />
              <span>Admin</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-slate-950"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
