
import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, ExternalLink, Download, AlertTriangle, CheckCircle2, Info, Cloud, Settings, Globe, Server, Database, User, Tag, Coins, RefreshCw, LogOut, Wifi, WifiOff, Activity } from 'lucide-react';
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
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[20000] bg-slate-950 flex flex-col overflow-hidden font-sans">
      
      {/* Admin Header */}
      <div className="bg-slate-900 border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-2xl relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-white text-xl font-black uppercase tracking-tighter">ADMIN <span className="text-slate-500">GOLDGEN</span></h1>
            <div className="flex items-center gap-2 mt-0.5">
              {currentSbConfig?.url ? (
                <div className="flex items-center gap-1.5 text-green-500 text-[9px] font-black uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                  <Wifi size={10} /> Sync Cloud OK ({currentSbConfig.source})
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-500 text-[9px] font-black uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  <WifiOff size={10} /> Mode Local (Non Sync)
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleRefresh} className={`p-3.5 rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
            <RefreshCw size={20} />
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-3.5 rounded-2xl border transition-all ${showSettings ? 'bg-yellow-500 text-slate-900 border-yellow-500' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
            <Settings size={20} />
          </button>
          <button onClick={onLogout} className="p-3.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={20} />
          </button>
          <button onClick={onClose} className="p-3.5 bg-white/10 text-white rounded-2xl hover:bg-slate-800 transition-all">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Connection Monitor Overlay */}
      {showSettings && (
        <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/5 p-8 md:p-12 animate-in slide-in-from-top-4 duration-300 relative z-10 overflow-y-auto max-h-[70vh]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
             
             {/* Status Display */}
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <Activity className="text-yellow-500" size={24} />
                   <h3 className="text-white text-xl font-black uppercase tracking-tighter">Moniteur de Connexion</h3>
                </div>
                <div className="space-y-4 bg-black/30 p-6 rounded-[32px] border border-white/5">
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Source Actuelle</p>
                      <p className="text-white font-bold">{currentSbConfig?.source || 'Aucune'}</p>
                   </div>
                   <div className="pt-4 border-t border-white/5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">URL Détecté (Vercel/Manual)</p>
                      <p className="text-slate-300 font-mono text-xs break-all bg-slate-950 p-2 rounded-lg">
                         {currentSbConfig?.url ? `${currentSbConfig.url.substring(0, 15)}...${currentSbConfig.url.substring(currentSbConfig.url.length - 10)}` : 'Non configuré'}
                      </p>
                   </div>
                   <div className="pt-4 border-t border-white/5">
                      <p className="text-slate-400 text-xs leading-relaxed">
                         Si l'URL est vide et que vous avez mis les variables dans Vercel, assurez-vous qu'elles commencent par <span className="text-yellow-500 font-bold">VITE_</span> et que vous avez fait un <span className="text-white font-bold">Redeploy</span>.
                      </p>
                   </div>
                </div>
             </div>

             {/* Manual Config Form */}
             <div>
                <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-6">Configuration Manuelle</h3>
                <form onSubmit={(e) => { e.preventDefault(); onSaveConfig(sbUrl, sbKey); }} className="space-y-4">
                   <input 
                    type="text" 
                    placeholder="Supabase URL" 
                    className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-white font-bold outline-none focus:border-yellow-500" 
                    value={sbUrl} 
                    onChange={e => setSbUrl(e.target.value)} 
                   />
                   <input 
                    type="password" 
                    placeholder="Supabase Anon Key" 
                    className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-white font-bold outline-none focus:border-yellow-500" 
                    value={sbKey} 
                    onChange={e => setSbKey(e.target.value)} 
                   />
                   <button type="submit" className="w-full py-4 bg-yellow-500 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-yellow-500/10 hover:scale-[1.01] active:scale-95 transition-all">
                      Enregistrer & Actualiser
                   </button>
                </form>
             </div>

          </div>
        </div>
      )}

      {/* Main List */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto bg-slate-950/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="mb-10 relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
            <input 
              type="text" 
              placeholder="Chercher par nom, téléphone..." 
              className="w-full bg-slate-900 border border-white/10 rounded-3xl py-5 pl-14 pr-8 text-white font-bold focus:outline-none focus:border-yellow-500 transition-all shadow-2xl"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6">
             {filteredMessages.length === 0 ? (
               <div className="py-32 text-center opacity-30">
                  <MessageSquare size={80} className="mx-auto mb-6" />
                  <p className="text-2xl font-black uppercase tracking-widest">Aucun message</p>
               </div>
             ) : (
               filteredMessages.map((msg) => (
                 <div key={msg.id} className={`bg-slate-900 border-2 rounded-[40px] p-8 md:p-12 transition-all hover:border-white/10 ${msg.status === 'new' ? 'border-yellow-500/20 shadow-2xl' : 'border-transparent opacity-60'}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                       
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[30px] flex items-center justify-center text-slate-950 shadow-2xl">
                             <User size={32} />
                          </div>
                          <div>
                             <h4 className="text-white text-3xl md:text-4xl font-black tracking-tighter uppercase">{msg.name}</h4>
                             <div className="flex flex-wrap gap-4 mt-3">
                                <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-yellow-500 text-lg font-black hover:text-white transition-colors bg-white/5 px-4 py-1.5 rounded-xl border border-white/5">
                                   <Phone size={18} /> {msg.phone}
                                </a>
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-xl border border-white/5">
                                   <Calendar size={14} className="text-yellow-500" />
                                   {new Date(msg.date).toLocaleDateString()}
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="bg-white/5 p-8 rounded-[40px] flex-grow lg:max-w-md shadow-inner">
                          <div className="flex items-center gap-3 mb-4">
                             <Tag size={16} className="text-yellow-500" />
                             <span className="text-white font-black uppercase text-xs tracking-[0.2em]">{msg.subject}</span>
                          </div>
                          <p className="text-slate-300 text-sm font-medium leading-relaxed italic line-clamp-3">"{msg.message}"</p>
                          {msg.budget && (
                            <div className="mt-5 flex items-center gap-2 text-yellow-500 font-black bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/20 w-fit">
                               <Coins size={16} /> <span>{msg.budget} MAD</span>
                            </div>
                          )}
                       </div>

                       <div className="flex items-center gap-3 lg:flex-col shrink-0">
                          {msg.status === 'new' && (
                             <button 
                               onClick={() => onMarkRead(msg.id)}
                               className="flex-1 lg:w-full flex items-center justify-center gap-3 py-5 px-10 bg-green-500 text-slate-950 rounded-[28px] font-black uppercase text-[10px] tracking-widest hover:bg-green-400 transition-all shadow-xl shadow-green-500/20"
                             >
                                <CheckCircle size={20} /> Lu
                             </button>
                          )}
                          <div className="flex gap-3">
                             <a href={`mailto:${msg.email}`} className="p-6 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-[28px] hover:bg-blue-500 hover:text-white transition-all"><Mail size={24} /></a>
                             <button onClick={() => setDeleteConfirmId(msg.id)} className="p-6 bg-red-500/10 text-red-500 border border-red-500/20 rounded-[28px] hover:bg-red-500 hover:text-white transition-all"><Trash2 size={24} /></button>
                          </div>
                       </div>

                    </div>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>

      {/* Delete Overlay */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[20005] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-[50px] p-12 text-center shadow-2xl">
             <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-[35px] flex items-center justify-center mx-auto mb-8 border border-red-500/30">
                <AlertTriangle size={48} />
             </div>
             <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Confirmation</h3>
             <p className="text-slate-400 text-sm font-bold mb-10 leading-relaxed">Voulez-vous supprimer définitivement ce prospect de la base Cloud ?</p>
             <div className="grid gap-4">
                <button onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); }} className="w-full py-6 bg-red-500 text-white rounded-[25px] font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-xl shadow-red-500/20">Supprimer</button>
                <button onClick={() => setDeleteConfirmId(null)} className="w-full py-6 bg-white/5 text-white rounded-[25px] font-black uppercase tracking-widest text-xs transition-all">Annuler</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
