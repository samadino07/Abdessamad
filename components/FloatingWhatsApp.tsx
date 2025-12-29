
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_DATA } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={`https://wa.me/212${CONTACT_DATA.whatsapp.substring(1)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[500] group flex items-center gap-3"
      aria-label="Contact WhatsApp"
    >
      <div className="bg-white px-4 py-2 rounded-full shadow-xl text-slate-900 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
        Besoin d'aide ?
      </div>
      <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(34,197,94,0.4)] hover:scale-110 active:scale-95 transition-all animate-bounce hover:animate-none">
        <MessageCircle size={32} fill="currentColor" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
