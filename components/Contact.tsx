
import React, { useState } from 'react';
import { Phone, Mail, Send, CheckCircle2, AlertCircle, MapPin, User, Tag, Coins } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

interface ContactProps {
  t: any;
  lang: string;
  onSendMessage: (msg: { name: string; phone: string; email: string; subject: string; message: string; budget?: string }) => void;
}

const Contact: React.FC<ContactProps> = ({ t, lang, onSendMessage }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
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
    // Validation stricte: commence par 05, 06 ou 07 et fait exactement 10 chiffres
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
      // Effacer l'erreur en temps réel si le format devient correct
      if (value.length === 10 && /^(05|06|07)/.test(value)) {
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
    
    // Simulation d'envoi
    setTimeout(() => {
      onSendMessage(formData);
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
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-slate-50 dark:bg-slate-950 transition-all duration-700">
      <div className="container mx-auto px-6">
        <div className="bg-white dark:bg-slate-900 rounded-[60px] shadow-2xl overflow-hidden border border-slate-100 dark:border-white/5">
          <div className="grid lg:grid-cols-5">
            {/* PANNEAU GAUCHE: INFORMATIONS SOCIÉTÉ (RÉTABLIES) */}
            <div className="lg:col-span-2 bg-slate-900 p-12 md:p-16 text-white relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className={`relative z-10 ${lang === 'ar' ? 'text-right' : ''}`}>
                  <h2 className="text-gold-500 font-black uppercase tracking-[0.4em] text-xs mb-6">{t.label}</h2>
                  <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">{t.title}</h3>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">{t.desc}</p>
                  
                  <div className="space-y-10">
                    {/* ADRESSE / LOCALISATION */}
                    <div className={`flex items-start gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-12 h-12 bg-gold-500/20 text-gold-500 rounded-2xl flex items-center justify-center shrink-0"><MapPin size={24} /></div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.addressLabel}</p>
                          <p className="text-lg font-bold text-white leading-relaxed">{CONTACT_DATA.address}</p>
                       </div>
                    </div>

                    {/* EMAIL SOCIÉTÉ */}
                    <div className={`flex items-start gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-12 h-12 bg-gold-500/20 text-gold-500 rounded-2xl flex items-center justify-center shrink-0"><Mail size={24} /></div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.emailLabel}</p>
                          <p className="text-lg font-bold text-white">{CONTACT_DATA.email}</p>
                       </div>
                    </div>

                    {/* NUMÉROS DE TÉLÉPHONE */}
                    <div className={`flex items-start gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-12 h-12 bg-gold-500/20 text-gold-500 rounded-2xl flex items-center justify-center shrink-0"><Phone size={24} /></div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.whatsapp}</p>
                          <div className="flex flex-col gap-2">
                            <p className="text-2xl font-black text-white">{CONTACT_DATA.telSecondary}</p>
                            <p className="text-2xl font-black text-white">{CONTACT_DATA.whatsapp}</p>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* PANNEAU DROIT: FORMULAIRE (NOM, NUM, EMAIL, SUJET D'EXPERTISE, BUDGET) */}
            <div className={`lg:col-span-3 p-12 md:p-20 ${lang === 'ar' ? 'text-right' : ''}`}>
               {isSent ? (
                 <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
                    <div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center text-slate-950 mb-8 shadow-2xl shadow-gold-500/20">
                       <CheckCircle2 size={48} />
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Message Transmis !</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Notre équipe vous contactera dans les plus brefs délais.</p>
                 </div>
               ) : (
                 <>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-10">{t.formTitle}</h4>
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-8">
                      {/* NOM COMPLET */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                           <User size={12} className="text-gold-500" /> {t.name} *
                        </label>
                        <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-5 rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      {/* TÉLÉPHONE (VALIDATION STRICTE) */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                           <Phone size={12} className="text-gold-500" /> {t.phone} *
                        </label>
                        <input 
                          required 
                          type="tel" 
                          placeholder="06XXXXXXXX"
                          className={`w-full bg-slate-50 dark:bg-slate-800 border-2 p-5 rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-gold-500'}`} 
                          value={formData.phone} 
                          onChange={handlePhoneChange} 
                        />
                        {phoneError && (
                          <div className={`mt-2 flex items-center gap-1 text-red-500 text-[10px] font-bold uppercase tracking-tight animate-in fade-in slide-in-from-top-1 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <AlertCircle size={12} />
                            <span>{phoneError}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-8">
                      {/* EMAIL */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                           <Mail size={12} className="text-gold-500" /> {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                        </label>
                        <input required type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-5 rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      {/* SUJET D'EXPERTISE (SÉLECTION) */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                           <Tag size={12} className="text-gold-500" /> {t.subject} *
                        </label>
                        <select required className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-5 rounded-2xl outline-none font-black uppercase text-xs tracking-widest text-slate-900 dark:text-white transition-all shadow-sm" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                           <option>Génie Civil & Construction</option>
                           <option>Aménagement & Décoration</option>
                           <option>Maintenance & Services</option>
                           <option>Fourniture de Matériel</option>
                        </select>
                      </div>
                    </div>

                    {/* BUDGET ESTIMÉ (OPTIONNEL) */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                        <Coins size={12} className="text-gold-500" /> {t.budget}
                      </label>
                      <div className="relative">
                        <input type="text" placeholder="Ex: 100.000" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-5 rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm pl-16" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-500 text-[10px] font-black">MAD</div>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t.message}</label>
                       <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-5 rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>

                    <button disabled={isSending} className="btn-shimmer relative overflow-hidden w-full bg-gold-500 text-slate-950 p-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50">
                       <span>{isSending ? '...' : t.send}</span><Send size={20} />
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
