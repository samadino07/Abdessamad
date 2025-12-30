
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
      setErrorMsg("ERREUR DE CONFIGURATION: La connexion au serveur n'est pas établie. Veuillez contacter l'administrateur.");
      return;
    }

    setIsSending(true);
    
    try {
      console.log("Submitting form...");
      await onSendMessage(formData);
      console.log("Form submitted successfully!");
      setIsSending(false);
      setIsSent(true);
      
      // Reset form
      setFormData({ 
        name: '', 
        phone: '', 
        email: '', 
        subject: 'Génie Civil & Construction', 
        budget: '', 
        message: '' 
      });

      // Clear success message after 5s
      setTimeout(() => setIsSent(false), 5000);
    } catch (err: any) {
      console.error("Form submission failed:", err);
      setErrorMsg(err.message || "Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-950 transition-all duration-700">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-[32px] md:rounded-[60px] shadow-2xl overflow-hidden border border-slate-100 dark:border-white/5">
          <div className="grid lg:grid-cols-5">
            {/* INFO PANEL */}
            <div className="lg:col-span-2 bg-slate-900 p-8 md:p-12 lg:p-16 text-white relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               
               <div className={`relative z-10 ${lang === 'ar' ? 'text-right' : ''}`}>
                  <h2 className="text-gold-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6">{t.label}</h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 leading-tight tracking-tighter">{t.title}</h3>
                  <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-10">{t.desc}</p>
                  
                  <div className="space-y-6 md:space-y-10">
                    <div className={`flex items-start gap-4 md:gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500/20 text-gold-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-gold-500/20"><MapPin size={20} className="md:w-6 md:h-6" /></div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.addressLabel}</p>
                          <p className="text-sm md:text-base lg:text-lg font-bold text-white leading-relaxed">{CONTACT_DATA.address}</p>
                       </div>
                    </div>

                    <div className={`flex items-start gap-4 md:gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500/20 text-gold-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-gold-500/20"><Mail size={20} className="md:w-6 md:h-6" /></div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.emailLabel}</p>
                          <p className="text-sm md:text-base lg:text-lg font-bold text-white break-all">{CONTACT_DATA.email}</p>
                       </div>
                    </div>

                    <div className={`flex items-start gap-4 md:gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500/20 text-gold-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-gold-500/20"><Phone size={20} className="md:w-6 md:h-6" /></div>
                       <div>
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.whatsapp}</p>
                          <div className="flex flex-col gap-1 md:gap-2">
                            <p className="text-xl md:text-2xl font-black text-white">{CONTACT_DATA.telSecondary}</p>
                            <p className="text-xl md:text-2xl font-black text-white">{CONTACT_DATA.whatsapp}</p>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* FORM PANEL */}
            <div className={`lg:col-span-3 p-8 md:p-12 lg:p-20 ${lang === 'ar' ? 'text-right' : ''}`}>
               {isSent ? (
                 <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700 py-10">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-slate-950 mb-6 shadow-2xl shadow-green-500/20">
                       <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">Message Envoyé !</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-base md:text-lg">Votre demande a été enregistrée avec succès.</p>
                 </div>
               ) : (
                 <>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8 md:mb-10">{t.formTitle}</h4>
                  
                  {errorMsg && (
                    <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 animate-in fade-in slide-in-from-top-2">
                      <WifiOff size={24} className="shrink-0" />
                      <p className="text-xs font-black uppercase tracking-tight leading-relaxed">{errorMsg}</p>
                    </div>
                  )}

                  {!isCloudReady && (
                    <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 text-yellow-600">
                      <AlertCircle size={18} className="shrink-0" />
                      <p className="text-[10px] font-bold uppercase">Mode Hors-ligne : L'envoi est désactivé (Configurez Supabase f l'Admin).</p>
                    </div>
                  )}

                  <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 md:ml-2 flex items-center gap-2">
                           <User size={12} className="text-gold-500" /> {t.name} *
                        </label>
                        <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 md:p-5 rounded-xl md:rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm text-sm md:text-base" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 md:ml-2 flex items-center gap-2">
                           <Phone size={12} className="text-gold-500" /> {t.phone} *
                        </label>
                        <input 
                          required 
                          type="tel" 
                          placeholder="06XXXXXXXX"
                          className={`w-full bg-slate-50 dark:bg-slate-800 border-2 p-4 md:p-5 rounded-xl md:rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm text-sm md:text-base ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-gold-500'}`} 
                          value={formData.phone} 
                          onChange={handlePhoneChange} 
                        />
                        {phoneError && (
                          <div className={`mt-1 md:mt-2 flex items-center gap-1 text-red-500 text-[9px] md:text-[10px] font-bold uppercase tracking-tight animate-in fade-in slide-in-from-top-1 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <AlertCircle size={12} />
                            <span>{phoneError}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 md:ml-2 flex items-center gap-2">
                           <Mail size={12} className="text-gold-500" /> {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                        </label>
                        <input required type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 md:p-5 rounded-xl md:rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm text-sm md:text-base" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 md:ml-2 flex items-center gap-2">
                           <Tag size={12} className="text-gold-500" /> {t.subject} *
                        </label>
                        <select required className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 md:p-5 rounded-xl md:rounded-2xl outline-none font-black uppercase text-[10px] md:text-xs tracking-widest text-slate-900 dark:text-white transition-all shadow-sm" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                           <option>Génie Civil & Construction</option>
                           <option>Aménagement & Décoration</option>
                           <option>Maintenance & Services</option>
                           <option>Fourniture de Matériel</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 md:ml-2 flex items-center gap-2">
                        <Coins size={12} className="text-gold-500" /> {t.budget}
                      </label>
                      <div className="relative">
                        <input type="text" placeholder="Ex: 100.000" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 md:p-5 rounded-xl md:rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm pl-12 md:pl-16 text-sm md:text-base" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
                        <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gold-500 text-[8px] md:text-[10px] font-black">MAD</div>
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                       <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 md:ml-2">{t.message}</label>
                       <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-gold-500 p-4 md:p-5 rounded-xl md:rounded-2xl outline-none font-bold text-slate-900 dark:text-white transition-all shadow-sm resize-none text-sm md:text-base" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSending || !isCloudReady} 
                      className="btn-shimmer relative overflow-hidden w-full bg-gold-500 text-slate-950 p-5 md:p-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[12px] md:text-sm flex items-center justify-center gap-3 md:gap-4 shadow-xl shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       {isSending ? (
                         <>
                           <Loader2 className="animate-spin" size={18} />
                           <span>Envoi en cours...</span>
                         </>
                       ) : (
                         <>
                           <span>{t.send}</span>
                           <Send size={18} className="md:w-5 md:h-5" />
                         </>
                       )}
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
