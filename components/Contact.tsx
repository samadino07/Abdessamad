
import React, { useState } from 'react';
import { Phone, Mail, Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

interface ContactProps {
  t: any;
  lang: string;
  onSendMessage: (msg: { name: string; phone: string; email: string; subject: string; message: string }) => void;
}

const Contact: React.FC<ContactProps> = ({ t, lang, onSendMessage }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: 'Génie Civil & Construction', message: '' });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePhone(formData.phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      onSendMessage(formData);
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: '', phone: '', email: '', subject: 'Génie Civil & Construction', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-slate-900 dark:bg-slate-900/50 border border-white/5 rounded-[30px] md:rounded-[50px] p-6 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-5 gap-10 md:gap-16">
            <div className={`lg:col-span-2 space-y-6 md:space-y-10 ${lang === 'ar' ? 'text-right' : ''}`}>
              <div>
                <h2 className="text-yellow-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-sm mb-3 md:mb-4">{t.label}</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">{t.title}</h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">{t.desc}</p>
              </div>
              <div className="space-y-4">
                <a 
                  href={`tel:${CONTACT_DATA.telSecondary.replace(/\s/g, '')}`} 
                  className={`flex items-center space-x-4 md:space-x-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl hover:bg-yellow-500 group transition-all ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Phone size={24} className="text-yellow-500 group-hover:text-slate-900 shrink-0" />
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black text-yellow-500 group-hover:text-slate-900 uppercase mb-0.5 md:mb-1">
                      {lang === 'ar' ? 'الهاتف (عبد العالي)' : 'Tél (Abdelali)'}
                    </p>
                    <p className="text-lg md:text-xl font-bold text-white group-hover:text-slate-900">{CONTACT_DATA.telSecondary}</p>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/212${CONTACT_DATA.whatsapp.substring(1)}`} 
                  className={`flex items-center space-x-4 md:space-x-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl hover:bg-yellow-500 group transition-all ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <MessageCircle size={24} className="text-yellow-500 group-hover:text-slate-900 shrink-0" />
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black text-yellow-500 group-hover:text-slate-900 uppercase mb-0.5 md:mb-1">
                      {lang === 'ar' ? 'واتساب / هاتف (عبد الصمد)' : 'WhatsApp / Tél (Abdessamad)'}
                    </p>
                    <p className="text-lg md:text-xl font-bold text-white group-hover:text-slate-900">{CONTACT_DATA.whatsapp}</p>
                  </div>
                </a>

                <div className={`flex items-center space-x-4 md:space-x-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Mail size={24} className="text-yellow-500 shrink-0" />
                  <div className="min-w-0 overflow-hidden">
                    <p className="text-[8px] md:text-[10px] font-black text-yellow-500 uppercase mb-0.5 md:mb-1">{t.email}</p>
                    <p className="text-sm md:text-base font-bold text-white truncate">{CONTACT_DATA.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl ${lang === 'ar' ? 'text-right' : ''}`}>
              {isSent ? (
                <div className="h-64 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
                  <CheckCircle2 size={56} className="text-green-500 mb-4" />
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">{lang === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Envoyé !'}</h4>
                </div>
              ) : (
                <>
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-6 md:mb-8">{t.formTitle}</h4>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                      <input required type="text" placeholder={t.name} className="w-full bg-slate-50 dark:bg-slate-900 border dark:border-white/5 p-3 md:p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      <div className="relative">
                        <input 
                          required 
                          type="tel" 
                          inputMode="numeric"
                          placeholder={t.phone} 
                          className={`w-full bg-slate-50 dark:bg-slate-900 border dark:border-white/5 p-3 md:p-4 rounded-xl focus:ring-2 outline-none font-bold text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 ${phoneError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-yellow-500'}`} 
                          value={formData.phone} 
                          onChange={handlePhoneChange} 
                        />
                        {phoneError && (
                          <div className={`mt-1.5 flex items-center gap-1 text-red-500 text-[9px] font-bold uppercase animate-in fade-in slide-in-from-top-1 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <AlertCircle size={10} />
                            <span>{phoneError}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <input required type="email" placeholder={t.email} className="w-full bg-slate-50 dark:bg-slate-900 border dark:border-white/5 p-3 md:p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border dark:border-white/5 p-3 md:p-4 rounded-xl outline-none font-bold text-sm md:text-base text-slate-900 dark:text-white" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                      <option>Génie Civil & Construction</option>
                      <option>Aménagement & Décoration</option>
                      <option>Maintenance & Services</option>
                      <option>Fourniture de Matériel</option>
                    </select>
                    <textarea required rows={3} placeholder={t.message} className="w-full bg-slate-50 dark:bg-slate-900 border dark:border-white/5 p-3 md:p-4 rounded-xl outline-none font-bold text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                    <button disabled={isSending} className="w-full bg-yellow-500 text-slate-900 p-4 md:p-5 rounded-xl font-black uppercase text-xs md:text-sm flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50 transition-all">
                      <span>{isSending ? '...' : t.send}</span><Send size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
