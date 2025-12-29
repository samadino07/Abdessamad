
import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, ExternalLink, Download, AlertTriangle, CheckCircle2, Info, Cloud, Settings, Globe, Server, Database } from 'lucide-react';
import { Message } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
  onSaveConfig: (url: string, key: string) => void;
  currentSbConfig: { url: string; key: string; source?: string } | null;
}

interface Toast {
  message: string;
  type: 'success' | 'info' | 'error';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onClose, onDelete, onMarkRead, onSaveConfig, currentSbConfig }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const [sbUrl, setSbUrl] = useState(currentSbConfig?.url || '');
  const [sbKey, setSbKey] = useState(currentSbConfig?.key || '');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone?.includes(searchTerm) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(sbUrl, sbKey);
    showToast("Config enregistrée. Synchronisation Cloud activée.", "success");
    setShowSettings(false);
  };

  const exportToCSV = () => {
    if (messages.length === 0) return;
    const headers = ["ID", "Date", "Nom", "Téléphone", "Email", "Sujet", "Message", "Status"];
    const rows = messages.map(m => [m.id, `"${m.date}"`, `"${m.name}"`, m.phone, m.email, `"${m.subject}"`, `"${m.message}"`, m.status]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `goldgen_prospects_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[20000] bg-slate-950 flex flex-col overflow-hidden font-sans">
      {/* Immersive Toast */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[20005] flex items-center gap-4 bg-slate-900 border border-white/10 px-8 py-5 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className={`p-2 rounded-xl ${toast.type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <Info size={20} />}
          </div>
          <span className="text-white text-sm font-black uppercase tracking-widest">{toast.message}</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="bg-slate-900 border-b border-white/5 px-8 py-6 flex items-center justify-between shadow-2xl relative z-20">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-yellow-500 rounded-[20px] flex items-center justify-center text-slate-900 shadow-xl shadow-yellow-500/10">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-white text-2xl font-black uppercase tracking-tighter">GOLDGEN <span className="text-slate-500">ADMIN</span></h1>
            <div className="flex items-center gap-3 mt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${currentSbConfig ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                {currentSbConfig?.source === 'env' ? 'Vercel Cloud Sync Active' : currentSbConfig ? 'Manual Cloud Sync Active' : 'Local Only Mode'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden xl:block">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            <input 
              type="text" 
              placeholder="Chercher un projet ou client..." 
              className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-8 text-white text-sm font-bold focus:outline-none focus:border-yellow-500 transition-all w-80 placeholder:text-slate-700"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-4 rounded-2xl transition-all border ${showSettings ? 'bg-yellow-500 text-slate-900 border-yellow-500 shadow-lg' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
              title="Paramètres Cloud"
            >
              <Settings size={22} />
            </button>
            <button 
              onClick={exportToCSV} 
              className="hidden md:flex items-center gap-3 bg-white/5 text-white px-6 py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              <Download size={16} /> Export CSV
            </button>
            <button 
              onClick={onClose} 
              className="p-4 bg-white/10 text-white rounded-2xl hover:bg-red-500 transition-all active:scale-95"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel Overlay */}
      {showSettings && (
        <div className="bg-slate-900/50 backdrop-blur-3xl border-b border-white/5 px-8 py-12 animate-in slide-in-from-top-4 duration-300 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Vercel Info Card */}
              <div className={`p-10 rounded-[40px] border-2 ${currentSbConfig?.source === 'env' ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-5 mb-8">
                  <div className={`p-4 rounded-2xl ${currentSbConfig?.source === 'env' ? 'bg-green-500 text-slate-950' : 'bg-white/10 text-white'}`}><Server size={28} /></div>
                  <div>
                    <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Vercel Deployment</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Recommandé pour la Production</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Les variables d'environnement Vercel sont la méthode la plus sûre. Vos clés Supabase sont injectées directement dans le code.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5"><code className="text-yellow-500 text-[10px] font-black">VITE_SUPABASE_URL</code></div>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5"><code className="text-yellow-500 text-[10px] font-black">VITE_SUPABASE_KEY</code></div>
                  </div>
                  {currentSbConfig?.source === 'env' && (
                    <div className="mt-8 flex items-center gap-3 text-green-500 bg-green-500/10 p-4 rounded-2xl">
                      <CheckCircle2 size={20} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Connecté avec succès via Vercel</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Config Card */}
              <div className="bg-white/5 border border-white/10 p-10 rounded-[40px]">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-blue-500/20 text-blue-500 rounded-2xl"><Globe size={28} /></div>
                  <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Config Manuelle</h3>
                </div>
                <form onSubmit={handleSaveConfig} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">URL du Projet</label>
                    <input 
                      type="text" 
                      placeholder="https://xyz.supabase.co"
                      className="w-full bg-slate-950 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-yellow-500 font-bold text-sm"
                      value={sbUrl}
                      onChange={e => setSbUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Clé API (Anon)</label>
                    <input 
                      type="password" 
                      placeholder="votre-cle-api-publique"
                      className="w-full bg-slate-950 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-yellow-500 font-bold text-sm"
                      value={sbKey}
                      onChange={e => setSbKey(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="w-full py-5 bg-yellow-500 text-slate-950 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-yellow-500/20 hover:scale-[1.01] active:scale-95 transition-all">
                    Relier le Navigateur
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow p-8 overflow-y-auto bg-slate-950/50">
        <div className="container mx-auto">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
             <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-colors">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Total Prospects</p>
                <p className="text-4xl font-black text-white">{messages.length}</p>
             </div>
             <div className="bg-slate-900/50 p-8 rounded-[32px] border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                <p className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-3">À Traiter</p>
                <div className="flex items-center gap-3">
                  <p className="text-4xl font-black text-white">{messages.filter(m => m.status === 'new').length}</p>
                  {messages.filter(m => m.status === 'new').length > 0 && (
                    <span className="w-3 h-3 bg-yellow-500 rounded-full animate-ping"></span>
                  )}
                </div>
             </div>
             <div className="bg-slate-900/50 p-8 rounded-[32px] border border-white/5 col-span-1 lg:col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center">
                    <Database size={30} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm tracking-widest">Base de Données</h4>
                    <p className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-widest">Supabase Cloud • Réponse &lt; 100ms</p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                   <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Dernière Sync</p>
                   <p className="text-white text-xs font-black uppercase">{new Date().toLocaleTimeString()}</p>
                </div>
             </div>
          </div>

          {/* Messages Table Container */}
          <div className="bg-slate-900 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
            {filteredMessages.length === 0 ? (
              <div className="p-32 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-8 border border-white/5">
                  <MessageSquare size={48} className="text-slate-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-500 uppercase tracking-widest">Aucune donnée trouvée</h3>
                <p className="text-slate-600 mt-3 font-bold">Les nouveaux leads apparaîtront ici automatiquement.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02] text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                      <th className="px-10 py-8">Date d'arrivée</th>
                      <th className="px-10 py-8">Client Lead</th>
                      <th className="px-10 py-8">Catégorie Projet</th>
                      <th className="px-10 py-8">Message</th>
                      <th className="px-10 py-8 text-center">Action Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMessages.map((msg) => (
                      <tr key={msg.id} className={`group hover:bg-white/[0.03] transition-all ${msg.status === 'new' ? 'bg-yellow-500/[0.02]' : ''}`}>
                        <td className="px-10 py-8 whitespace-nowrap">
                           <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                <Calendar size={14} className="text-yellow-500" />
                                {new Date(msg.date).toLocaleDateString()}
                              </div>
                              <span className="text-[10px] text-slate-600 font-bold">{new Date(msg.date).toLocaleTimeString()}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex flex-col">
                              <span className="text-white font-black text-xl flex items-center gap-3">
                                {msg.name}
                                {msg.status === 'new' && (
                                  <span className="bg-yellow-500 text-slate-950 text-[8px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter shadow-lg shadow-yellow-500/20">Lead</span>
                                )}
                              </span>
                              <div className="flex items-center gap-4 mt-2">
                                <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold hover:text-yellow-500 transition-colors">
                                  <Phone size={10} /> {msg.phone}
                                </a>
                                <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                                <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold hover:text-yellow-500 transition-colors">
                                  <Mail size={10} /> {msg.email}
                                </a>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <span className="px-4 py-2 bg-slate-800 text-yellow-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">
                              {msg.subject}
                           </span>
                        </td>
                        <td className="px-10 py-8 max-w-sm">
                           <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed italic group-hover:text-slate-200 transition-colors">
                             "{msg.message}"
                           </p>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center justify-center gap-4">
                              {msg.status === 'new' && (
                                <button 
                                  onClick={() => {
                                    onMarkRead(msg.id);
                                    showToast("Marqué comme traité", "success");
                                  }}
                                  className="p-3.5 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-500 hover:text-slate-950 transition-all shadow-xl active:scale-90"
                                  title="Marquer comme traité"
                                >
                                  <CheckCircle size={20} />
                                </button>
                              )}
                              <a 
                                href={`mailto:${msg.email}?subject=Réponse GOLDGEN - Votre demande`}
                                className="p-3.5 bg-blue-500/10 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-90"
                                title="Répondre par Email"
                              >
                                <ExternalLink size={20} />
                              </a>
                              <button 
                                onClick={() => setDeleteConfirmId(msg.id)}
                                className="p-3.5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90"
                                title="Supprimer"
                              >
                                <Trash2 size={20} />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[20005] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setDeleteConfirmId(null)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[50px] p-12 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-[32px] flex items-center justify-center mb-8 border border-red-500/30">
                <AlertTriangle size={48} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Action Critique</h3>
              <p className="text-slate-400 text-sm font-bold leading-relaxed mb-12">
                Supprimer ce lead du Cloud GOLDGEN ? Cette action est irréversible et sera synchronisée partout.
              </p>
              <div className="flex flex-col gap-4 w-full">
                <button 
                  onClick={() => {
                    onDelete(deleteConfirmId!);
                    setDeleteConfirmId(null);
                    showToast("Lead supprimé du Cloud", "success");
                  }}
                  className="w-full py-5 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-2xl shadow-red-500/20 active:scale-95"
                >
                  Supprimer Définitivement
                </button>
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="w-full py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
                >
                  Annuler l'Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
