
import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, Activity, Settings, RefreshCw, LogOut, Wifi, WifiOff, User, Tag, Coins, AlertTriangle } from 'lucide-react';
import { Message } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  onClose: () => void;
  onRefresh: () => void;
  onLogout: () => void;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
  onSaveConfig: (url: string, key: string) => void;
  currentSbConfig: { url: string; key: string; source: string } | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onClose, onRefresh, onLogout, onDelete, onMarkRead, onSaveConfig, currentSbConfig }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sbUrl, setSbUrl] = useState(currentSbConfig?.url || '');
  const [sbKey, setSbKey] = useState(currentSbConfig?.key || '');

  // Fetch initial on mount
  useEffect(() => {
    onRefresh();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone?.includes(searchTerm) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col overflow-hidden text-slate-200">
      
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-lg">G</div>
          <div>
            <h1 className="text-white font-black uppercase tracking-tighter text-lg">GOLDGEN <span className="text-slate-500">ADMIN</span></h1>
            <div className="flex items-center gap-2">
               {currentSbConfig?.url ? (
                 <span className="flex items-center gap-1 text-green-500 text-[9px] font-black uppercase bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    <Wifi size={10} /> Cloud Sync OK
                 </span>
               ) : (
                 <span className="flex items-center gap-1 text-red-500 text-[9px] font-black uppercase bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                    <WifiOff size={10} /> Mode Local
                 </span>
               )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleRefresh} className={`p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
            <RefreshCw size={18} />
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-3 rounded-xl border transition-all ${showSettings ? 'bg-gold-500 text-slate-950 border-gold-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
            <Settings size={18} />
          </button>
          <button onClick={onLogout} className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={18} />
          </button>
          <button onClick={onClose} className="p-3 bg-white/10 rounded-xl hover:bg-slate-800 transition-all border border-white/5">
            <X size={18} />
          </button>
        </div>
      </header>

      {showSettings && (
        <div className="bg-slate-900 border-b border-white/10 p-8 animate-in slide-in-from-top-2 duration-300 shadow-2xl">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-gold-500 font-black uppercase text-[10px] tracking-widest">
                <Activity size={16} /> Status Système
              </h3>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-4">
                 <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Source des données</p>
                    <p className="text-white font-bold text-sm">{currentSbConfig?.source || 'Aucune'}</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">URL Endpoint</p>
                    <p className="text-[10px] text-slate-400 font-mono break-all bg-slate-950 p-2 rounded-lg">{currentSbConfig?.url || 'Non configuré'}</p>
                 </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-gold-500 font-black uppercase text-[10px] tracking-widest">Configuration Cloud Manuelle</h3>
              <form onSubmit={(e) => { e.preventDefault(); onSaveConfig(sbUrl, sbKey); }} className="space-y-3">
                 <input type="text" placeholder="URL Supabase" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-gold-500" value={sbUrl} onChange={e => setSbUrl(e.target.value)} />
                 <input type="password" placeholder="Anon Key" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-gold-500" value={sbKey} onChange={e => setSbKey(e.target.value)} />
                 <button className="w-full py-4 bg-gold-500 text-slate-950 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-gold-500/20 active:scale-95 transition-all">Sauvegarder & Redémarrer</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-10 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Chercher par nom, tel, sujet..." 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-white font-bold focus:outline-none focus:border-gold-500 transition-all shadow-xl"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-5">
             {filteredMessages.length === 0 ? (
               <div className="py-32 text-center opacity-10 flex flex-col items-center">
                  <MessageSquare size={100} className="mb-6" />
                  <p className="text-3xl font-black uppercase tracking-tighter">Aucun Message Détecté</p>
                  <p className="mt-2 font-bold italic">Vérifiez la connexion Cloud dans les paramètres</p>
               </div>
             ) : (
               filteredMessages.map((msg) => (
                 <div key={msg.id} className={`group bg-slate-900 border border-white/5 rounded-[32px] p-6 md:p-8 transition-all hover:bg-slate-800/80 ${msg.status === 'new' ? 'border-gold-500/20 shadow-[0_0_40px_rgba(234,179,8,0.05)]' : 'opacity-60'}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                       
                       <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-slate-950 shadow-xl shrink-0 ${msg.status === 'new' ? 'bg-gold-500' : 'bg-slate-700 text-slate-400'}`}>
                             <User size={28} />
                          </div>
                          <div>
                             <h4 className="text-white text-2xl font-black tracking-tight">{msg.name}</h4>
                             <div className="flex flex-wrap gap-4 mt-2">
                                <a href={`tel:${msg.phone}`} className="text-gold-500 font-black text-sm hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                                   <Phone size={14} /> {msg.phone}
                                </a>
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                                   <Calendar size={14} className="text-gold-500" /> {new Date(msg.date).toLocaleDateString()}
                                </span>
                             </div>
                          </div>
                       </div>

                       <div className="bg-black/20 p-6 rounded-3xl flex-grow lg:max-w-md border border-white/5">
                          <div className="flex items-center gap-2 mb-3">
                             <Tag size={14} className="text-gold-500" />
                             <span className="text-white font-black uppercase text-[10px] tracking-widest">{msg.subject}</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed italic line-clamp-3">"{msg.message}"</p>
                          {msg.budget && (
                             <div className="mt-4 text-gold-500 font-black text-[11px] bg-gold-500/10 px-3 py-1.5 rounded-xl border border-gold-500/20 w-fit flex items-center gap-2">
                                <Coins size={14} /> {msg.budget} MAD
                             </div>
                          )}
                       </div>

                       <div className="flex items-center gap-3 shrink-0">
                          {msg.status === 'new' && (
                             <button onClick={() => onMarkRead(msg.id)} className="p-5 bg-green-500 text-slate-950 rounded-2xl hover:bg-green-400 transition-all shadow-lg hover:scale-105 active:scale-95">
                                <CheckCircle size={24} />
                             </button>
                          )}
                          <a href={`mailto:${msg.email}`} className="p-5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-lg">
                             <Mail size={24} />
                          </a>
                          <button onClick={() => setDeleteConfirmId(msg.id)} className="p-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg">
                             <Trash2 size={24} />
                          </button>
                       </div>

                    </div>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[40px] p-10 text-center shadow-2xl">
             <AlertTriangle size={60} className="text-red-500 mx-auto mb-6" />
             <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">Supprimer?</h3>
             <p className="text-slate-400 text-sm font-bold mb-8 leading-relaxed">Cette action effacera définitivement le prospect de la base de données Cloud.</p>
             <div className="flex flex-col gap-3">
                <button onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); }} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-red-500/20 active:scale-95 transition-all">Confirmer la suppression</button>
                <button onClick={() => setDeleteConfirmId(null)} className="w-full py-4 bg-white/5 text-white rounded-2xl font-black uppercase text-xs tracking-widest">Annuler</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
