
import React, { useState } from 'react';
import { Phone, Mail, Send, CheckCircle2, AlertCircle, MapPin, User, Tag, Coins, WifiOff, Loader2 } from 'lucide-react';
import { CONTACT_DATA } from './constants';

interface ContactProps {
  t: any;
  lang: string;
  isCloudReady: boolean;
  onSendMessage: (msg: { name: string; phone: string; email: string; subject: string; message: string; budget?: string }) => Promise<void>;
}

const Contact: React.FC<ContactProps> = ({ t, lang, onSendMessage, isCloudReady }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    subject: 'Génie Civil & Construction', 
    budget: '', 
    message: '' 
  });

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
      if (value.length === 10 && /^(05|06|07)\d{8}$/.test(value)) {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    const pError = validatePhone(formData.phone);
    if (pError) {
      setPhoneError(pError);
      return;
    }

    if (!isCloudReady) {
      setErrorMsg("ERREUR: Connexion au serveur non établie.");
      return;
    }

    setIsSending(true);
    
    try {
      await onSendMessage(formData);
      setIsSending(false);
      setIsSent(true);
      
      setFormData({ 
        name: '', 
        phone: '', 
        email: '', 
        subject: 'Génie Civil & Construction', 
        budget: '', 
        message: '' 
      });

      setTimeout(() => setIsSent(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue.");
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-slate-50 dark:bg-slate-950 transition-all duration-700">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 rounded-[32px] md:rounded-[60px] shadow-2xl overflow-hidden border border-slate-100 dark:border-white/5">
          <div className="grid lg:grid-cols-5">
            {/* INFO PANEL */}
            <div className="lg:col-span-2 bg-slate-900 p-8 md:p-16 text-white relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className={`relative z-10 ${lang === 'ar' ? 'text-right' : ''}`}>
                  <h2 className="text-gold-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">{t.label}</h2>
                  <h3 className="text-2xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">{t.title}</h3>
                  <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed mb-8">{t.desc}</p>
                  
                  <div className="space-y-6 md:space-y-10">
                    <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500/20 text-gold-500 rounded-xl flex items-center justify-center shrink-0 border border-gold-500/20"><MapPin size={18} /></div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.addressLabel}</p>
                          <p className="text-xs md:text-base font-bold text-white">{CONTACT_DATA.address}</p>
                       </div>
                    </div>

                    <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500/20 text-gold-500 rounded-xl flex items-center justify-center shrink-0 border border-gold-500/20"><Mail size={18} /></div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.emailLabel}</p>
                          <p className="text-xs md:text-base font-bold text-white break-all">{CONTACT_DATA.email}</p>
                       </div>
                    </div>

                    <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500/20 text-gold-500 rounded-xl flex items-center justify-center shrink-0 border border-gold-500/20"><Phone size={18} /></div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.whatsapp}</p>
                          <div className="flex flex-col gap-1">
                            <p className="text-base md:text-2xl font-black text-white">{CONTACT_DATA.telSecondary}</p>
                            <p className="text-base md:text-2xl font-black text-white">{CONTACT_DATA.whatsapp}</p>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* FORM PANEL */}
            <div className={`lg:col-span-3 p-8 md:p-20 ${lang === 'ar' ? 'text-right' : ''}`}>
               {isSent ? (
                 <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-slate-950 mb-6 shadow-xl shadow-green-500/20">
                       <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">Message Envoyé !</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-lg">Nous reviendrons vers vous rapidement.</p>
                 </div>
               ) : (
                 <>
                  <h4 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">{t.formTitle}</h4>
                  
                  {errorMsg && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
                      <WifiOff size={20} className="shrink-0" />
                      <p className="text-[10px] font-black uppercase tracking-tight">{errorMsg}</p>
                    </div>
                  )}

                  {!isCloudReady && (
                    <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-2 text-yellow-600">
                      <AlertCircle size={16} className="shrink-0" />
                      <p className="text-[9px] font-bold uppercase">Mode Hors-ligne activé.</p>
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <User size={12} className="text-gold-500" /> {t.name} *
                        </label>
                        <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 rounded-xl outline-none font-bold text-slate-900 dark:text-white transition-all text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <Phone size={12} className="text-gold-500" /> {t.phone} *
                        </label>
                        <input 
                          required 
                          type="tel" 
                          placeholder="06XXXXXXXX"
                          className={`w-full bg-slate-50 dark:bg-slate-800 border-2 p-4 rounded-xl outline-none font-bold text-slate-900 dark:text-white transition-all text-sm ${phoneError ? 'border-red-500' : 'border-transparent focus:border-gold-500'}`} 
                          value={formData.phone} 
                          onChange={handlePhoneChange} 
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <Mail size={12} className="text-gold-500" /> Email *
                        </label>
                        <input required type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 rounded-xl outline-none font-bold text-slate-900 dark:text-white transition-all text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                           <Tag size={12} className="text-gold-500" /> {t.subject} *
                        </label>
                        <select required className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 rounded-xl outline-none font-black uppercase text-[10px] tracking-widest text-slate-900 dark:text-white transition-all" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                           <option>Génie Civil & Construction</option>
                           <option>Aménagement & Décoration</option>
                           <option>Maintenance & Services</option>
                           <option>Fourniture de Matériel</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Coins size={12} className="text-gold-500" /> {t.budget}
                      </label>
                      <div className="relative">
                        <input type="text" placeholder="Ex: 100.000" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 rounded-xl outline-none font-bold text-slate-900 dark:text-white transition-all pl-12 text-sm" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 text-[8px] font-black">MAD</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t.message}</label>
                       <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 rounded-xl outline-none font-bold text-slate-900 dark:text-white transition-all resize-none text-sm" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSending || !isCloudReady} 
                      className="relative w-full bg-gold-500 text-slate-950 p-5 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 transition-all disabled:opacity-50"
                    >
                       {isSending ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} /> <span>{t.send}</span></>}
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
