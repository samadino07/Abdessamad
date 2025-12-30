
import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, Activity, Settings, RefreshCw, LogOut, Wifi, WifiOff, User, Tag, Coins, AlertTriangle, Database, CloudAlert, ArrowRight, Terminal, ShieldAlert, Cpu, HardDrive, Beaker, Check, AlertCircle, Radio, Zap } from 'lucide-react';
import { Message } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  onClose: () => void;
  onRefresh: () => void;
  onLogout: () => void;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
  onSaveConfig: (url: string, key: string) => void;
  onTestPropagation: () => void;
  currentSbConfig: { url: string; key: string; source: string } | null;
  rtStatus?: string;
  lastRtEvent?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onClose, onRefresh, onLogout, onDelete, onMarkRead, onSaveConfig, onTestPropagation, currentSbConfig, rtStatus, lastRtEvent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sbUrl, setSbUrl] = useState(currentSbConfig?.url || '');
  const [sbKey, setSbKey] = useState(currentSbConfig?.key || '');
  const [activeTab, setActiveTab] = useState<'config' | 'fix'>('config');

  useEffect(() => {
    onRefresh();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone?.includes(searchTerm) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sqlFixUltimateV6 = `-- SCRIPT DE RÉPARATION SUPRÊME (V6 - FULL ACCESS)
-- Exécutez ce script si vous voyez "INSERT" mais que la liste reste vide.

-- 1. Nettoyage Complet
drop publication if exists supabase_realtime;
create publication supabase_realtime;
alter publication supabase_realtime add table messages;

-- 2. Identité de réplique (Crucial pour Realtime)
alter table messages replica identity full;

-- 3. FORCER L'ACCÈS PUBLIC TOTAL (Bypass RLS)
-- Nous désactivons RLS temporairement pour vérifier si c'est la cause.
alter table messages disable row level security;

-- 4. Droits de base de données (Grant)
grant all on table messages to postgres, anon, authenticated, service_role;
grant all on all sequences in schema public to postgres, anon, authenticated, service_role;

-- 5. Recréer une politique de secours au cas où RLS est réactivé
drop policy if exists "Master Access" on messages;
create policy "Master Access" on messages for all using (true) with check (true);

-- 6. Note : Si ça ne marche toujours pas, vérifiez dans Supabase Dashboard :
-- Database > Replication > 'supabase_realtime' publication > Ensure 'messages' is checked.`;

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col overflow-hidden text-slate-200 font-sans">
      
      {/* Top Header */}
      <header className="bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0 shadow-2xl relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-lg">G</div>
          <div>
            <h1 className="text-white font-black uppercase tracking-tighter text-lg">GOLDGEN <span className="text-slate-500">ADMIN</span></h1>
            <div className="flex items-center gap-2">
               <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${rtStatus === 'ACTIF' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-orange-400 bg-orange-500/10 border-orange-500/20'}`}>
                  <Radio size={10} className={rtStatus === 'ACTIF' ? 'animate-pulse' : ''} /> 
                  {rtStatus === 'ACTIF' ? 'FLUX ACTIF' : `STATUT : ${rtStatus || 'OFFLINE'}`}
               </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onTestPropagation} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
             <Zap size={14} /> Tester Flux Cloud
          </button>
          <button onClick={handleRefresh} className={`p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
            <RefreshCw size={18} />
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-3 rounded-xl border transition-all ${showSettings ? 'bg-gold-500 text-slate-950 border-gold-500 shadow-lg shadow-gold-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
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
        <div className="bg-slate-900 border-b border-white/10 p-8 animate-in slide-in-from-top-4 duration-500 shadow-2xl relative z-30 shrink-0 max-h-[85vh] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 mb-8 border-b border-white/5 pb-6">
               <button onClick={() => setActiveTab('config')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-gold-500 text-slate-950 shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Moniteur</button>
               <button onClick={() => setActiveTab('fix')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'fix' ? 'bg-red-500 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Forcer Accès (SQL V6)</button>
            </div>

            {activeTab === 'config' ? (
              <div className="grid md:grid-cols-2 gap-10 animate-in fade-in duration-300">
                <div className="space-y-6">
                  <div className={`p-6 rounded-3xl border transition-all duration-500 ${lastRtEvent?.includes('INSERT') ? 'bg-green-500/10 border-green-400/40 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'bg-black/40 border-white/5'}`}>
                    <h3 className="flex items-center gap-2 text-gold-500 font-black uppercase text-[10px] tracking-widest mb-4"><Activity size={16} /> Signal Diagnostic</h3>
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 italic">Dernière Activité :</span>
                          <span className={`${lastRtEvent?.includes('INSERT') ? 'text-green-400 font-black' : 'text-slate-400'} font-mono text-[10px]`}>
                            {lastRtEvent || 'En attente...'}
                          </span>
                       </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-3 items-center">
                     <AlertCircle size={18} className="text-blue-500" />
                     <p className="text-[10px] text-slate-400 leading-relaxed">
                        Si le moniteur affiche "INSERT" mais que rien n'apparaît, c'est que Supabase bloque l'affichage (SELECT). Utilisez le script <strong>V6</strong>.
                     </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-gold-500 font-black uppercase text-[10px] tracking-widest flex items-center gap-2"><HardDrive size={14} /> Identifiants</h3>
                  <form onSubmit={(e) => { e.preventDefault(); onSaveConfig(sbUrl, sbKey); }} className="space-y-3">
                    <input type="text" placeholder="URL Supabase" className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-gold-500" value={sbUrl} onChange={e => setSbUrl(e.target.value)} />
                    <input type="password" placeholder="Clé Anon" className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-gold-500" value={sbKey} onChange={e => setSbKey(e.target.value)} />
                    <button className="w-full py-4 bg-gold-500 text-slate-950 rounded-2xl font-black uppercase text-[10px] tracking-widest">Sauvegarder</button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[40px] space-y-4">
                   <div className="flex items-center gap-4 text-red-500">
                      <ShieldAlert size={32} />
                      <h3 className="font-black uppercase tracking-tighter text-xl">Script SQL Déblocage V6</h3>
                   </div>
                   <p className="text-slate-400 text-xs italic">Désactive les politiques de sécurité pour forcer l'affichage de tous les messages.</p>
                   <div className="relative">
                      <pre className="bg-black/80 p-6 rounded-2xl border border-white/10 text-gold-500/90 font-mono text-[10px] overflow-x-auto whitespace-pre leading-relaxed">
                        {sqlFixUltimateV6}
                      </pre>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(sqlFixUltimateV6); alert("Script V6 Copié !"); }}
                        className="absolute bottom-4 right-4 bg-gold-500 text-slate-950 px-4 py-2 rounded-xl text-[9px] font-black uppercase shadow-xl"
                      >
                        Copier Script V6
                      </button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 relative z-10 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
             <div className="relative max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
               <input 
                 type="text" 
                 placeholder="Chercher..." 
                 className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 md:py-5 pl-12 pr-6 text-white font-bold focus:outline-none focus:border-gold-500 transition-all shadow-xl"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
             </div>
             
             <div className="flex gap-4">
                <div className="bg-slate-900 border border-white/5 rounded-2xl px-8 py-4 text-center">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">En attente</p>
                   <p className="text-gold-500 font-black text-2xl">{messages.filter(m => m.status === 'new').length}</p>
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl px-8 py-4 text-center">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Cloud</p>
                   <p className="text-white font-black text-2xl">{messages.length}</p>
                </div>
             </div>
          </div>

          <div className="space-y-6 pb-20">
             {filteredMessages.length === 0 ? (
               <div className="py-32 text-center opacity-20 flex flex-col items-center">
                  <MessageSquare size={100} className="mb-6" />
                  <p className="text-2xl font-black uppercase tracking-tighter">Aucun message sur le Cloud</p>
                  <button onClick={handleRefresh} className="mt-6 flex items-center gap-2 text-gold-500 font-black uppercase tracking-widest text-[10px] hover:underline">
                    <RefreshCw size={14} /> Forcer le rafraîchissement
                  </button>
               </div>
             ) : (
               filteredMessages.map((msg) => (
                 <div key={msg.id} className={`group bg-slate-900 border border-white/5 rounded-[40px] p-6 md:p-8 transition-all hover:bg-slate-800/80 ${msg.status === 'new' ? 'border-gold-500/20 shadow-[0_0_50px_rgba(234,179,8,0.05)]' : 'opacity-60'}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                       
                       <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[32px] flex items-center justify-center text-slate-950 shadow-xl shrink-0 ${msg.status === 'new' ? 'bg-gold-500' : 'bg-slate-700 text-slate-400'}`}>
                             <User size={32} />
                          </div>
                          <div>
                             <h4 className="text-white text-2xl md:text-3xl font-black tracking-tight">{msg.name}</h4>
                             <div className="flex flex-wrap gap-3 mt-3">
                                <a href={`tel:${msg.phone}`} className="text-gold-500 font-black text-xs md:text-sm hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-xl border border-white/5">
                                   <Phone size={14} /> {msg.phone}
                                </a>
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-xl border border-white/5">
                                   <Calendar size={14} className="text-gold-500" /> {new Date(msg.date).toLocaleDateString()}
                                </span>
                             </div>
                          </div>
                       </div>

                       <div className="bg-black/20 p-6 md:p-8 rounded-[32px] flex-grow lg:max-w-md border border-white/5">
                          <div className="flex items-center gap-2 mb-4">
                             <Tag size={14} className="text-gold-500" />
                             <span className="text-white font-black uppercase text-[10px] tracking-widest">{msg.subject}</span>
                          </div>
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed italic line-clamp-3">"{msg.message}"</p>
                       </div>

                       <div className="flex items-center gap-4 shrink-0">
                          {msg.status === 'new' && (
                             <button onClick={() => onMarkRead(msg.id)} className="p-5 bg-green-500 text-slate-950 rounded-2xl hover:bg-green-400 transition-all shadow-lg hover:scale-105 active:scale-95">
                                <CheckCircle size={28} />
                             </button>
                          )}
                          <button onClick={() => setDeleteConfirmId(msg.id)} className="p-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg">
                             <Trash2 size={28} />
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
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-slate-950/98 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[48px] p-12 text-center shadow-2xl">
             <AlertTriangle size={60} className="text-red-500 mx-auto mb-6" />
             <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">Supprimer?</h3>
             <p className="text-slate-400 text-sm font-bold mb-10 leading-relaxed">Cette action effacera définitivement le prospect du Cloud.</p>
             <div className="flex flex-col gap-4">
                <button onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); }} className="w-full py-5 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-red-500/20 active:scale-95 transition-all">Confirmer</button>
                <button onClick={() => setDeleteConfirmId(null)} className="w-full py-5 bg-white/5 text-white rounded-2xl font-black uppercase text-xs tracking-widest">Annuler</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
