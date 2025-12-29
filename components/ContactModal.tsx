
import React, { useEffect, useState } from 'react';
import { X, Send, Phone, Mail, MapPin, MessageCircle, Globe, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

interface ContactModalProps {
  onClose: () => void;
  lang: string;
  t: any;
  onSendMessage: (msg: { name: string; phone: string; email: string; subject: string; message: string }) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose, lang, t, onSendMessage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStep, setFormStep] = useState(0); 
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: 'Génie Civil & Construction', message: '' });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(05|06|07)\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return t.phoneError;
    }
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
      if (value.length > 0 && !/^(05|06|07)/.test(value)) {
        setPhoneError(t.phoneError);
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validatePhone(formData.phone);
    if (error) {
      setPhoneError(error);
      return;
    }

    setFormStep(1);
    
    // Simulate API Call and actually save message
    setTimeout(() => {
      onSendMessage(formData);
      setFormStep(2);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 lg:p-8 overflow-hidden">
      <div className={`absolute inset-0 bg-slate-950/98 backdrop-blur-2xl transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>

      <div className={`relative w-full max-w-7xl bg-white md:rounded-[60px] shadow-[0_0_120px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
        <button onClick={onClose} className={`absolute top-8 z-50 p-4 bg-slate-900 text-white rounded-full hover:bg-yellow-500 hover:text-slate-900 transition-all ${lang === 'ar' ? 'left-8' : 'right-8'}`}><X size={28} /></button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* LEFT: Information Panel */}
          <div className="lg:w-[35%] bg-slate-900 p-8 md:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
             <div className={lang === 'ar' ? 'text-right' : ''}>
                <div className="mb-12">
                  <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block">{t.label}</span>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{t.title}</h2>
                </div>
                <div className="space-y-8">
                  <div className={`flex items-start space-x-6 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-yellow-500 shrink-0"><Phone size={24} /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Direct</p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] font-bold text-yellow-500/50 uppercase tracking-widest">{lang === 'ar' ? 'عبد الصمد' : 'Abdessamad'}</p>
                          <p className="text-xl font-bold text-white">{CONTACT_DATA.whatsapp}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-yellow-500/50 uppercase tracking-widest">{lang === 'ar' ? 'عبد العالي' : 'Abdelali'}</p>
                          <p className="text-xl font-bold text-white">{CONTACT_DATA.telSecondary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-6 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-yellow-500 shrink-0"><Mail size={24} /></div>
                    <div><p className="text-[10px] font-black text-slate-500 uppercase mb-1">{t.email}</p><p className="text-lg font-bold text-white">{CONTACT_DATA.email}</p></div>
                  </div>
                </div>
             </div>
             <div className="mt-12 pt-12 border-t border-white/5">
                <a href={`https://wa.me/212${CONTACT_DATA.whatsapp.substring(1)}`} target="_blank" className="flex items-center justify-between p-6 bg-green-500/10 border border-green-500/30 rounded-3xl hover:bg-green-500 group transition-all">
                  <p className="text-white font-bold">WhatsApp Business</p>
                  <MessageCircle size={32} className="text-green-500 group-hover:text-white" />
                </a>
             </div>
          </div>

          {/* RIGHT: Form Panel */}
          <div className={`lg:w-[65%] p-8 md:p-16 lg:p-24 overflow-y-auto ${lang === 'ar' ? 'text-right' : ''}`}>
             {formStep === 2 ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                  <CheckCircle2 size={80} className="text-yellow-500 mb-8" />
                  <h3 className="text-4xl font-black text-slate-900 mb-4">{lang === 'ar' ? 'شكراً لكم!' : 'Merci !'}</h3>
                  <p className="text-xl text-slate-500 max-w-md font-medium">{lang === 'ar' ? 'لقد تلقينا رسالتكم.' : 'Votre message a été reçu.'}</p>
                </div>
             ) : (
                <div className={`${formStep === 1 ? 'opacity-30 blur-sm pointer-events-none' : 'opacity-100'}`}>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-12">{t.formTitle}</h3>
                  <form className="space-y-8" onSubmit={handleSend}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <input required type="text" placeholder={t.name} className="w-full bg-slate-50 border-2 p-6 rounded-2xl focus:border-yellow-500 outline-none font-bold text-slate-900 placeholder:text-slate-400" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      <div className="relative">
                        <input 
                          required 
                          type="tel" 
                          inputMode="numeric"
                          placeholder={t.phone} 
                          className={`w-full bg-slate-50 border-2 p-6 rounded-2xl outline-none font-bold text-slate-900 placeholder:text-slate-400 ${phoneError ? 'border-red-500 focus:border-red-500' : 'focus:border-yellow-500 border-white/10'}`} 
                          value={formData.phone} 
                          onChange={handlePhoneChange} 
                        />
                        {phoneError && (
                          <div className={`mt-2 flex items-center gap-1 text-red-500 text-[11px] font-bold uppercase animate-in fade-in slide-in-from-top-1 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <AlertCircle size={14} />
                            <span>{phoneError}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <input required type="email" placeholder={t.email} className="w-full bg-slate-50 border-2 p-6 rounded-2xl focus:border-yellow-500 outline-none font-bold text-slate-900 placeholder:text-slate-400" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <select className="w-full bg-slate-50 border-2 p-6 rounded-2xl focus:border-yellow-500 outline-none font-bold text-slate-900" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                        <option>Génie Civil & Construction</option>
                        <option>Aménagement & Décoration</option>
                        <option>Maintenance & Services</option>
                        <option>Fourniture de Matériel</option>
                    </select>
                    <textarea required rows={4} placeholder={t.message} className="w-full bg-slate-50 border-2 p-6 rounded-2xl focus:border-yellow-500 outline-none font-bold text-slate-900 resize-none placeholder:text-slate-400" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                    <button type="submit" className="w-full bg-slate-900 text-white p-6 rounded-2xl font-black uppercase tracking-[0.4em] hover:bg-yellow-500 hover:text-slate-900 transition-all flex items-center justify-center gap-4">
                        <span>{t.send}</span><Send size={20} />
                    </button>
                  </form>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
