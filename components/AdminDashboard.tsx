
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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone?.includes(searchTerm) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col overflow-hidden text-slate-200">
      
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-lg">G</div>
          <div>
            <h1 className="text-white font-black uppercase tracking-tighter text-lg">GOLDGEN <span className="text-slate-500">ADMIN</span></h1>
            <div className="flex items-center gap-2">
               {currentSbConfig?.url ? (
                 <span className="flex items-center gap-1 text-green-500 text-[9px] font-black uppercase bg-green-500/10 px-2 py-0.5 rounded-full">
                    <Wifi size={10} /> Cloud Active
                 </span>
               ) : (
                 <span className="flex items-center gap-1 text-red-500 text-[9px] font-black uppercase bg-red-500/10 px-2 py-0.5 rounded-full">
                    <WifiOff size={10} /> Local Mode
                 </span>
               )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleRefresh} className={`p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
            <RefreshCw size={18} />
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-3 rounded-xl border transition-all ${showSettings ? 'bg-gold-500 text-slate-950' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
            <Settings size={18} />
          </button>
          <button onClick={onLogout} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={18} />
          </button>
          <button onClick={onClose} className="p-3 bg-white/10 rounded-xl hover:bg-slate-800 transition-all">
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Settings Modal Overlay */}
      {showSettings && (
        <div className="bg-slate-900 border-b border-white/10 p-8 animate-in slide-in-from-top-2 duration-300">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-gold-500 font-black uppercase text-xs">
                <Activity size={16} /> Status de Connexion
              </h3>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3">
                 <p className="text-xs text-slate-400">Source: <span className="text-white font-bold">{currentSbConfig?.source || 'Aucune'}</span></p>
                 <p className="text-[10px] text-slate-500 font-mono break-all line-clamp-1">{currentSbConfig?.url || 'URL Non configuré'}</p>
                 <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    Assurez-vous que Vercel contient <span className="text-gold-500">VITE_SUPABASE_URL</span>.
                 </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-gold-500 font-black uppercase text-xs">Configuration Cloud Manuelle</h3>
              <form onSubmit={(e) => { e.preventDefault(); onSaveConfig(sbUrl, sbKey); }} className="space-y-3">
                 <input type="text" placeholder="URL Supabase" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-gold-500" value={sbUrl} onChange={e => setSbUrl(e.target.value)} />
                 <input type="password" placeholder="Anon Key" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-gold-500" value={sbKey} onChange={e => setSbKey(e.target.value)} />
                 <button className="w-full py-3 bg-gold-500 text-slate-950 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-gold-500/10">Sauvegarder</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Messages Content */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-slate-950/50">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Chercher..." 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white font-medium focus:outline-none focus:border-gold-500 transition-all"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
             {filteredMessages.length === 0 ? (
               <div className="py-20 text-center opacity-20 flex flex-col items-center">
                  <MessageSquare size={60} className="mb-4" />
                  <p className="text-xl font-black uppercase">Aucun Prospect</p>
               </div>
             ) : (
               filteredMessages.map((msg) => (
                 <div key={msg.id} className={`group bg-slate-900 border border-white/5 rounded-3xl p-6 transition-all hover:bg-slate-800/80 ${msg.status === 'new' ? 'border-gold-500/30 shadow-lg' : 'opacity-60'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shrink-0">
                             <User size={24} />
                          </div>
                          <div>
                             <h4 className="text-white text-xl font-black">{msg.name}</h4>
                             <div className="flex flex-wrap gap-3 mt-1.5">
                                <a href={`tel:${msg.phone}`} className="text-gold-500 font-bold text-sm hover:underline flex items-center gap-1.5">
                                   <Phone size={14} /> {msg.phone}
                                </a>
                                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-lg">
                                   <Calendar size={12} /> {new Date(msg.date).toLocaleDateString()}
                                </span>
                             </div>
                          </div>
                       </div>

                       <div className="bg-black/30 p-5 rounded-2xl flex-grow md:max-w-sm border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                             <Tag size={12} className="text-gold-500" />
                             <span className="text-white font-black uppercase text-[9px] tracking-widest">{msg.subject}</span>
                          </div>
                          <p className="text-slate-400 text-xs leading-relaxed italic line-clamp-2">"{msg.message}"</p>
                          {msg.budget && (
                             <div className="mt-3 text-gold-500 font-black text-[10px] bg-gold-500/10 px-2 py-1 rounded-md w-fit border border-gold-500/20">
                                {msg.budget} MAD
                             </div>
                          )}
                       </div>

                       <div className="flex items-center gap-2 shrink-0">
                          {msg.status === 'new' && (
                             <button onClick={() => onMarkRead(msg.id)} className="p-4 bg-green-500 text-slate-950 rounded-2xl hover:bg-green-400 transition-all shadow-lg">
                                <CheckCircle size={20} />
                             </button>
                          )}
                          <a href={`mailto:${msg.email}`} className="p-4 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
                             <Mail size={20} />
                          </a>
                          <button onClick={() => setDeleteConfirmId(msg.id)} className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                             <Trash2 size={20} />
                          </button>
                       </div>

                    </div>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[40px] p-10 text-center shadow-2xl">
             <AlertTriangle size={50} className="text-red-500 mx-auto mb-6" />
             <h3 className="text-2xl font-black text-white mb-3">Supprimer ?</h3>
             <p className="text-slate-400 text-sm font-medium mb-8">Cette action est irréversible dans la base de données Cloud.</p>
             <div className="flex flex-col gap-3">
                <button onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); }} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest">Confirmer</button>
                <button onClick={() => setDeleteConfirmId(null)} className="w-full py-4 bg-white/5 text-white rounded-2xl font-black uppercase text-xs tracking-widest">Annuler</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
