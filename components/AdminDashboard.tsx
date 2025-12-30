
import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, ExternalLink, Download, AlertTriangle, CheckCircle2, Info, Cloud, Settings, Globe, Server, Database, User, Tag, Coins, RefreshCw, LogOut, Wifi, WifiOff } from 'lucide-react';
import { Message } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  onClose: () => void;
  onRefresh: () => void;
  onLogout: () => void;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
  onSaveConfig: (url: string, key: string) => void;
  currentSbConfig: { url: string; key: string; source?: string } | null;
}

interface Toast {
  message: string;
  type: 'success' | 'info' | 'error';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onClose, onRefresh, onLogout, onDelete, onMarkRead, onSaveConfig, currentSbConfig }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [sbUrl, setSbUrl] = useState(currentSbConfig?.url || '');
  const [sbKey, setSbKey] = useState(currentSbConfig?.key || '');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    // Auto refresh on open to catch messages from other devices
    onRefresh();
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Données synchronisées avec le Cloud", "success");
    }, 800);
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone?.includes(searchTerm) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sbUrl || !sbKey) {
      showToast("Veuillez remplir les deux champs", "error");
      return;
    }
    onSaveConfig(sbUrl, sbKey);
    showToast("Configuration Cloud enregistrée !", "success");
    setShowSettings(false);
    // Refresh to verify connection
    setTimeout(onRefresh, 1000);
  };

  return (
    <div className="fixed inset-0 z-[20000] bg-slate-950 flex flex-col overflow-hidden font-sans">
      {/* Immersive Toast */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[20005] flex items-center gap-4 bg-slate-900 border border-white/10 px-6 py-4 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-5 w-[90%] md:w-auto">
          <div className={`p-2 rounded-xl shrink-0 ${toast.type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          </div>
          <span className="text-white text-xs font-black uppercase tracking-widest">{toast.message}</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="bg-slate-900 border-b border-white/5 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between shadow-2xl relative z-20">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-yellow-500 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-900 shadow-xl">
            <ShieldCheck size={24} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h1 className="text-white text-lg md:text-2xl font-black uppercase tracking-tighter">GOLDGEN <span className="text-slate-500">PROSPECT</span></h1>
            <div className="flex items-center gap-2 mt-1">
              {currentSbConfig ? (
                <div className="flex items-center gap-1.5 text-green-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full">
                  <Wifi size={10} /> Cloud Sync Active
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
                  <WifiOff size={10} /> No Sync (Local Only)
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={handleRefresh}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
            title="Rafraîchir les données"
          >
            <RefreshCw size={18} />
          </button>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all border ${showSettings ? 'bg-yellow-500 text-slate-900 border-yellow-500 shadow-xl shadow-yellow-500/20' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
            title="Paramètres Synchronisation"
          >
            <Settings size={18} />
          </button>

          <button 
            onClick={onLogout}
            className="p-3 md:p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl md:rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
            title="Se déconnecter"
          >
            <LogOut size={18} />
          </button>

          <button 
            onClick={onClose} 
            className="p-3 md:p-4 bg-white/10 text-white rounded-xl md:rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Settings Overlay - CRITICAL FOR MULTI-DEVICE SYNC */}
      {showSettings && (
        <div className="bg-slate-900/90 backdrop-blur-xl border-b border-white/5 p-6 md:p-12 animate-in slide-in-from-top-4 duration-300 relative z-10 overflow-y-auto max-h-[60vh]">
          <div className="max-w-4xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <Cloud className="text-yellow-500" size={32} />
                <div>
                   <h3 className="text-white text-2xl font-black uppercase tracking-tighter">Synchronisation Cloud (Multi-Appareils)</h3>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Étape cruciale pour voir les messages de partout</p>
                </div>
             </div>
             
             <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl mb-8">
                <p className="text-blue-200 text-sm font-medium leading-relaxed">
                  <span className="font-black text-blue-400">NOTE :</span> Pour que les messages envoyés depuis la France s'affichent sur votre PC à Safi, 
                  chaque appareil doit être relié au même projet Supabase. Entrez vos accès ci-dessous.
                </p>
             </div>

             <form onSubmit={handleSaveConfig} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Database size={12} /> Supabase Project URL
                   </label>
                   <input 
                    type="text" 
                    placeholder="https://your-id.supabase.co" 
                    className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-white font-bold outline-none focus:border-yellow-500 transition-all" 
                    value={sbUrl} 
                    onChange={e => setSbUrl(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={12} /> Supabase Public Key (Anon)
                   </label>
                   <input 
                    type="password" 
                    placeholder="eyJh..." 
                    className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-white font-bold outline-none focus:border-yellow-500 transition-all" 
                    value={sbKey} 
                    onChange={e => setSbKey(e.target.value)} 
                  />
                </div>
                <button 
                  type="submit" 
                  className="md:col-span-2 py-5 bg-yellow-500 text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-yellow-500/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                   <Cloud size={18} /> ACTIVER LA SYNCHRONISATION GLOBALE
                </button>
             </form>
          </div>
        </div>
      )}

      {/* Leads List */}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto bg-slate-950/50">
        <div className="container mx-auto">
          
          <div className="mb-8 relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Chercher par nom ou téléphone..." 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-white text-sm font-bold focus:outline-none focus:border-yellow-500 transition-all placeholder:text-slate-700 shadow-xl"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6">
             {filteredMessages.length === 0 ? (
               <div className="py-24 text-center">
                  <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                    <MessageSquare size={48} className="text-slate-800" />
                  </div>
                  <h3 className="text-xl font-black text-slate-600 uppercase tracking-widest">Aucun message trouvé</h3>
                  <p className="text-slate-700 mt-2 font-bold">Vérifiez la synchronisation Cloud ou essayez de rafraîchir.</p>
               </div>
             ) : (
               filteredMessages.map((msg) => (
                 <div key={msg.id} className={`bg-slate-900 border-2 rounded-[32px] md:rounded-[40px] p-6 md:p-10 transition-all hover:border-white/10 group ${msg.status === 'new' ? 'border-yellow-500/20 shadow-[0_10px_40px_rgba(234,179,8,0.08)]' : 'border-transparent opacity-80'}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                       
                       {/* Identity Column */}
                       <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[20px] md:rounded-[28px] flex items-center justify-center text-slate-950 shadow-2xl transition-transform group-hover:scale-110">
                                <User size={28} className="md:w-10 md:h-10" />
                             </div>
                             <div>
                                <h4 className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">{msg.name}</h4>
                                <div className="flex flex-wrap gap-4 mt-3">
                                   <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-yellow-500 text-sm md:text-xl font-black hover:text-white transition-colors bg-white/5 px-4 py-1.5 rounded-xl border border-white/5">
                                      <Phone size={18} /> {msg.phone}
                                   </a>
                                   <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-slate-400 text-xs md:text-base font-bold hover:text-white transition-colors">
                                      <Mail size={18} /> {msg.email}
                                   </a>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-[0.3em] mt-2 bg-black/20 w-fit px-3 py-1 rounded-full border border-white/5">
                             <Calendar size={14} className="text-yellow-500" />
                             {new Date(msg.date).toLocaleDateString()} • {new Date(msg.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                       </div>

                       {/* Project Info */}
                       <div className="bg-white/5 p-6 md:p-8 rounded-[32px] border border-white/5 flex-grow lg:max-w-md shadow-inner">
                          <div className="flex items-center gap-3 mb-4">
                             <Tag size={16} className="text-yellow-500" />
                             <span className="text-white font-black uppercase text-xs tracking-[0.2em]">{msg.subject}</span>
                             {msg.status === 'new' && (
                               <span className="ml-auto bg-yellow-500 text-slate-950 text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">NOUVEAU LEAD</span>
                             )}
                          </div>
                          <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed italic line-clamp-4">"{msg.message}"</p>
                          {msg.budget && (
                            <div className="mt-5 flex items-center gap-2 text-yellow-500 font-black bg-yellow-500/10 w-fit px-4 py-2 rounded-xl border border-yellow-500/20">
                               <Coins size={16} /> <span>{msg.budget} MAD</span>
                            </div>
                          )}
                       </div>

                       {/* Actions */}
                       <div className="flex items-center gap-3 lg:flex-col shrink-0">
                          {msg.status === 'new' && (
                             <button 
                               onClick={() => { onMarkRead(msg.id); showToast("Lead marqué comme traité", "success"); }}
                               className="flex-1 lg:w-full flex items-center justify-center gap-3 py-4 md:py-6 px-8 bg-green-500 text-slate-950 rounded-[24px] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-green-400 transition-all shadow-xl shadow-green-500/20 active:scale-95"
                             >
                                <CheckCircle size={20} /> Traité
                             </button>
                          )}
                          <div className="flex gap-3 w-full">
                             <a 
                                href={`mailto:${msg.email}?subject=Réponse GOLDGEN`}
                                className="flex-1 flex items-center justify-center p-5 md:p-6 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-[24px] hover:bg-blue-500 hover:text-white transition-all active:scale-90"
                                title="Répondre par Email"
                             >
                                <ExternalLink size={24} />
                             </a>
                             <button 
                                onClick={() => setDeleteConfirmId(msg.id)}
                                className="flex-1 flex items-center justify-center p-5 md:p-6 bg-red-500/10 text-red-500 border border-red-500/20 rounded-[24px] hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                title="Supprimer Lead"
                             >
                                <Trash2 size={24} />
                             </button>
                          </div>
                       </div>

                    </div>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[20005] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[50px] p-12 text-center shadow-[0_0_100px_rgba(239,68,68,0.2)] animate-in zoom-in-95">
             <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-red-500/30">
                <AlertTriangle size={48} />
             </div>
             <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Confirmer ?</h3>
             <p className="text-slate-400 text-sm font-bold mb-10 leading-relaxed">Cette action est irréversible et supprimera le lead de tous vos appareils synchronisés.</p>
             <div className="space-y-4">
                <button 
                  onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); showToast("Lead supprimé définitivement", "success"); }}
                  className="w-full py-6 bg-red-500 text-white rounded-[24px] font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-xl shadow-red-500/20"
                >
                  Supprimer Maintenant
                </button>
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="w-full py-6 bg-white/5 text-white rounded-[24px] font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
                >
                  Annuler l'action
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
