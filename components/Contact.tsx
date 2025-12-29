
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

interface ContactProps {
  t: any;
  lang: string;
  onSendMessage: (msg: { name: string; phone: string; email: string; subject: string; message: string }) => void;
}

const Contact: React.FC<ContactProps> = ({ t, lang, onSendMessage }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: 'Génie Civil & Construction', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[50px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid lg:grid-cols-5 gap-16">
            <div className={`lg:col-span-2 space-y-10 ${lang === 'ar' ? 'text-right' : ''}`}>
              <div>
                <h2 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-sm mb-4">{t.label}</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6">{t.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{t.desc}</p>
              </div>
              <div className="space-y-4">
                <a 
                  href={`https://wa.me/212${CONTACT_DATA.whatsapp.substring(1)}`} 
                  className={`flex items-center space-x-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-yellow-500 group transition-all ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <MessageCircle size={28} className="text-yellow-500 group-hover:text-slate-900" />
                  <div>
                    <p className="text-[10px] font-black text-yellow-500 group-hover:text-slate-900 uppercase mb-1">
                      {lang === 'ar' ? 'واتساب / هاتف (عبد الصمد)' : 'WhatsApp / Tél (Abdessamad)'}
                    </p>
                    <p className="text-xl font-bold text-white group-hover:text-slate-900">{CONTACT_DATA.whatsapp}</p>
                  </div>
                </a>

                <a 
                  href={`tel:${CONTACT_DATA.telSecondary.replace(/\s/g, '')}`} 
                  className={`flex items-center space-x-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-yellow-500 group transition-all ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Phone size={28} className="text-yellow-500 group-hover:text-slate-900" />
                  <div>
                    <p className="text-[10px] font-black text-yellow-500 group-hover:text-slate-900 uppercase mb-1">
                      {lang === 'ar' ? 'الهاتف (عبد العالي)' : 'Tél (Abdelali)'}
                    </p>
                    <p className="text-xl font-bold text-white group-hover:text-slate-900">{CONTACT_DATA.telSecondary}</p>
                  </div>
                </a>

                <div className={`flex items-center space-x-6 p-6 bg-white/5 border border-white/10 rounded-3xl ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Mail size={28} className="text-yellow-500" />
                  <div>
                    <p className="text-[10px] font-black text-yellow-500 uppercase mb-1">{t.email}</p>
                    <p className="text-sm font-bold text-white">{CONTACT_DATA.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-3 bg-white rounded-3xl p-8 md:p-12 shadow-xl ${lang === 'ar' ? 'text-right' : ''}`}>
              {isSent ? (
                <div className="h-64 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
                  <CheckCircle2 size={64} className="text-green-500 mb-4" />
                  <h4 className="text-2xl font-black text-slate-900">{lang === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Envoyé !'}</h4>
                </div>
              ) : (
                <>
                  <h4 className="text-2xl font-black text-slate-900 mb-8">{t.formTitle}</h4>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input required type="text" placeholder={t.name} className="w-full bg-slate-50 border p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-slate-900 placeholder:text-slate-400" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      <input required type="tel" placeholder={t.phone} className="w-full bg-slate-50 border p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-slate-900 placeholder:text-slate-400" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <input required type="email" placeholder={t.email} className="w-full bg-slate-50 border p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none font-bold text-slate-900 placeholder:text-slate-400" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <select className="w-full bg-slate-50 border p-4 rounded-xl outline-none font-bold text-slate-900" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                      <option>Génie Civil & Construction</option>
                      <option>Aménagement & Décoration</option>
                      <option>Maintenance & Services</option>
                      <option>Fourniture de Matériel</option>
                    </select>
                    <textarea required rows={4} placeholder={t.message} className="w-full bg-slate-50 border p-4 rounded-xl outline-none font-bold text-slate-900 placeholder:text-slate-400" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                    <button disabled={isSending} className="w-full bg-yellow-500 text-slate-900 p-5 rounded-xl font-black uppercase flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50">
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
