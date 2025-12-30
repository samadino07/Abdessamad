
import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, Activity, Settings, RefreshCw, LogOut, Wifi, WifiOff, User, Tag, Coins, AlertTriangle, Database, CloudAlert, ArrowRight, Terminal, ShieldAlert, Cpu, HardDrive, Beaker, Check, AlertCircle, Radio, Zap } from 'lucide-react';
import { Message } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  onClose: () => void;
  onRefresh: () => void;
  onLogout: () => void;
  onDelete: (id: string | number) => void;
  onMarkRead: (id: string | number) => void;
  onSaveConfig: (url: string, key: string) => void;
  onTestPropagation: () => void;
  currentSbConfig: { url: string; key: string; source: string } | null;
  rtStatus?: string;
  lastRtEvent?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onClose, onRefresh, onLogout, onDelete, onMarkRead, onSaveConfig, onTestPropagation, currentSbConfig, rtStatus, lastRtEvent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);
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

  const sqlUniversalFixV9 = `-- SCRIPT DE RÉPARATION V9 (LE PLUS SIMPLE)
-- 1. On supprime tout pour éviter les erreurs de structure
DROP TABLE IF EXISTS messages;

-- 2. Création de la table avec ID auto-incrémenté
CREATE TABLE messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  budget TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  date TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DÉSACTIVER TOUTE LA SÉCURITÉ (Obligatoire pour tester)
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- 4. Ouvrir les droits à tout le monde
GRANT ALL ON TABLE messages TO anon, authenticated, postgres, service_role;

-- 5. Activer Realtime (Pour voir les messages arriver sans recharger)
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE messages;`;

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
                  {rtStatus === 'ACTIF' ? 'CLOUD CONNECTÉ' : `STATUT : ${rtStatus || 'DÉCONNECTÉ'}`}
               </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onTestPropagation} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
             <Zap size={14} /> Diagnostic V9
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
               <button onClick={() => setActiveTab('config')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'config' ? 'bg-gold-500 text-slate-950 shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>État du Cloud</button>
               <button onClick={() => setActiveTab('fix')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'fix' ? 'bg-red-500 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Réparation Forcée (SQL V9)</button>
            </div>

            {activeTab === 'config' ? (
              <div className="grid md:grid-cols-2 gap-10 animate-in fade-in duration-300">
                <div className="space-y-6">
                  <div className={`p-6 rounded-3xl border transition-all duration-500 ${lastRtEvent?.includes('SYNC') ? 'bg-green-500/10 border-green-400/40' : 'bg-black/40 border-white/5'}`}>
                    <h3 className="flex items-center gap-2 text-gold-500 font-black uppercase text-[10px] tracking-widest mb-4"><Activity size={16} /> Diagnostic Live</h3>
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 italic">Dernière activité :</span>
                          <span className={`font-mono text-[10px] ${lastRtEvent?.includes('ERR') ? 'text-red-400' : 'text-green-400'}`}>
                            {lastRtEvent || 'En attente de signal...'}
                          </span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-gold-500 font-black uppercase text-[10px] tracking-widest flex items-center gap-2"><HardDrive size={14} /> Credentials</h3>
                  <form onSubmit={(e) => { e.preventDefault(); onSaveConfig(sbUrl, sbKey); }} className="space-y-3">
                    <input type="text" placeholder="URL du Cloud" className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-gold-500" value={sbUrl} onChange={e => setSbUrl(e.target.value)} />
                    <input type="password" placeholder="Clé Secrète" className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-gold-500" value={sbKey} onChange={e => setSbKey(e.target.value)} />
                    <button className="w-full py-4 bg-gold-500 text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-xl">Sauvegarder et Connecter</button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[40px] space-y-4">
                   <div className="flex items-center gap-4 text-red-500">
                      <ShieldAlert size={32} />
                      <h3 className="font-black uppercase tracking-tighter text-xl text-white">Script SQL V9 (The Nuclear Reset)</h3>
                   </div>
                   <p className="text-slate-400 text-xs">Si le formulaire de contact ne marche pas, copiez ce script dans l'éditeur SQL de Supabase.</p>
                   <div className="relative">
                      <pre className="bg-black/80 p-6 rounded-2xl border border-white/10 text-gold-500/90 font-mono text-[10px] overflow-x-auto whitespace-pre leading-relaxed">
                        {sqlUniversalFixV9}
                      </pre>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(sqlUniversalFixV9); alert("Script SQL V9 Copié !"); }}
                        className="absolute bottom-4 right-4 bg-gold-500 text-slate-900 px-4 py-2 rounded-xl text-[9px] font-black uppercase shadow-xl"
                      >
                        Copier Script V9
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
                 placeholder="Chercher dans les prospects..." 
                 className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 md:py-5 pl-12 pr-6 text-white font-bold focus:outline-none focus:border-gold-500 transition-all shadow-xl"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
             </div>
             
             <div className="flex gap-4">
                <div className="bg-slate-900 border border-white/5 rounded-2xl px-8 py-4 text-center shadow-2xl min-w-[120px]">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Nouveaux</p>
                   <p className="text-gold-500 font-black text-2xl">{messages.filter(m => m.status === 'new').length}</p>
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl px-8 py-4 text-center shadow-2xl min-w-[120px]">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total</p>
                   <p className="text-white font-black text-2xl">{messages.length}</p>
                </div>
             </div>
          </div>

          <div className="space-y-6 pb-20">
             {filteredMessages.length === 0 ? (
               <div className="py-32 text-center opacity-20 flex flex-col items-center">
                  <MessageSquare size={100} className="mb-6 text-slate-600" />
                  <p className="text-2xl font-black uppercase tracking-tighter">Base de données vide</p>
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
                             <button onClick={() => onMarkRead(msg.id)} className="p-5 bg-green-500 text-slate-900 rounded-2xl hover:bg-green-400 transition-all shadow-lg hover:scale-105 active:scale-95">
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
