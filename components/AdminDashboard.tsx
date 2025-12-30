
import React, { useEffect, useState } from 'react';
import { X, Trash2, Phone, Calendar, CheckCircle, MessageSquare, Search, Activity, Settings, RefreshCw, LogOut, User, Tag, AlertTriangle, HardDrive, ShieldAlert, Zap, Radio, Users, Globe, Eye } from 'lucide-react';
import { Message, Visit } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  visits: Visit[];
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, visits, onClose, onRefresh, onLogout, onDelete, onMarkRead, onSaveConfig, currentSbConfig, rtStatus, lastRtEvent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'fix'>('config');
  const [sbUrl, setSbUrl] = useState(currentSbConfig?.url || '');
  const [sbKey, setSbKey] = useState(currentSbConfig?.key || '');

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone?.includes(searchTerm)
  );

  const sqlUniversalFixV10 = `-- SCRIPT DE RÉPARATION V10 (MESSAGES + VISITES)
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS visits;

-- 1. Table Messages
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

-- 2. Table Visites
CREATE TABLE visits (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  page TEXT
);

ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE visits DISABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE messages TO anon, authenticated, postgres, service_role;
GRANT ALL ON TABLE visits TO anon, authenticated, postgres, service_role;

DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE messages, visits;`;

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col overflow-hidden text-slate-200 font-sans">
      
      {/* Header Admin */}
      <header className="bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 px-4 md:px-6 py-4 flex items-center justify-between shrink-0 shadow-2xl relative z-20">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-lg transition-colors ${lastRtEvent?.includes('VISITEUR') ? 'bg-green-400 animate-pulse' : 'bg-gold-500'}`}>G</div>
          <div className="hidden sm:block">
            <h1 className="text-white font-black uppercase tracking-tighter text-sm md:text-lg">GOLDGEN <span className="text-slate-500">ADMIN</span></h1>
            <div className="flex items-center gap-2">
               <span className={`flex items-center gap-1.5 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${rtStatus === 'ACTIF' ? 'text-green-400 border-green-500/20 bg-green-500/5' : 'text-orange-400 border-orange-500/20 bg-orange-500/5'}`}>
                  <Radio size={10} className={rtStatus === 'ACTIF' ? 'animate-pulse' : ''} /> 
                  {rtStatus === 'ACTIF' ? 'SYSTÈME LIVE' : 'DÉCONNECTÉ'}
               </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className={`flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${lastRtEvent?.includes('VISITEUR') ? 'text-green-400 border-green-400/40 bg-green-400/10' : 'text-slate-400'}`}>
             <Eye size={14} className={lastRtEvent?.includes('VISITEUR') ? 'animate-bounce' : ''} /> 
             <span className="hidden xs:inline">Live:</span> {visits.length}
          </div>
          <button onClick={() => setShowSettings(!showSettings)} className={`p-2.5 md:p-3 rounded-xl border transition-all ${showSettings ? 'bg-gold-500 text-slate-900 border-gold-500' : 'bg-white/5 border-white/10'}`}>
            <Settings size={18} />
          </button>
          <button onClick={onLogout} className="p-2.5 md:p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={18} />
          </button>
          <button onClick={onClose} className="p-2.5 md:p-3 bg-white/10 rounded-xl border border-white/5">
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-slate-900 border-b border-white/10 p-6 md:p-8 animate-in slide-in-from-top-4 duration-500 shadow-2xl relative z-30 shrink-0 max-h-[80vh] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-4 mb-8 border-b border-white/5 pb-4">
               <button onClick={() => setActiveTab('config')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest ${activeTab === 'config' ? 'bg-gold-500 text-slate-950' : 'text-slate-400'}`}>Cloud</button>
               <button onClick={() => setActiveTab('fix')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest ${activeTab === 'fix' ? 'bg-red-500 text-white' : 'text-slate-400'}`}>SQL V10</button>
            </div>
            {activeTab === 'config' ? (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-gold-500 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={14} /> Log d'Événements</h3>
                  <div className="text-[10px] font-mono text-slate-400 space-y-1">
                    <p className="text-green-400">Dernier event: {lastRtEvent || 'Aucun'}</p>
                    <p>Visites logged: {visits.length}</p>
                  </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSaveConfig(sbUrl, sbKey); }} className="space-y-3">
                  <input type="text" placeholder="Supabase URL" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-gold-500" value={sbUrl} onChange={e => setSbUrl(e.target.value)} />
                  <input type="password" placeholder="Supabase Key" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-gold-500" value={sbKey} onChange={e => setSbKey(e.target.value)} />
                  <button className="w-full py-3 bg-gold-500 text-slate-900 rounded-xl font-black uppercase text-[10px] shadow-lg">Enregistrer</button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                   <p className="text-xs text-slate-300 mb-4 font-bold flex items-center gap-2"><ShieldAlert size={14} /> Script de mise à jour pour le Tracking Live :</p>
                   <pre className="bg-black/60 p-4 rounded-lg text-[9px] font-mono text-gold-500 overflow-x-auto whitespace-pre">{sqlUniversalFixV10}</pre>
                   <button onClick={() => { navigator.clipboard.writeText(sqlUniversalFixV10); alert("Copié !"); }} className="mt-4 px-4 py-2 bg-gold-500 text-slate-950 rounded-lg text-[10px] font-black uppercase">Copier Script V10</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
               <Users size={20} className="text-gold-500 mb-2" />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Visiteurs (Live)</p>
               <p className="text-2xl md:text-3xl font-black text-white">{visits.length}</p>
            </div>
            <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
               <MessageSquare size={20} className="text-blue-500 mb-2" />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Nouveaux Messages</p>
               <p className="text-2xl md:text-3xl font-black text-white">{messages.filter(m => m.status === 'new').length}</p>
            </div>
            <div className={`bg-slate-900 border p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center transition-all duration-1000 ${lastRtEvent?.includes('VISITEUR') ? 'border-green-500/50 scale-105 bg-green-500/5' : 'border-white/5'}`}>
               <Globe size={20} className={`${lastRtEvent?.includes('VISITEUR') ? 'text-green-400 animate-spin' : 'text-slate-500'} mb-2`} />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Activité Site</p>
               <p className="text-xs font-black text-slate-300 uppercase truncate max-w-full">
                  {lastRtEvent?.includes('VISITEUR') ? 'Signal Reçu !' : 'En veille...'}
               </p>
            </div>
            <div className="hidden lg:flex bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl flex-col items-center justify-center text-center">
               <Radio size={20} className="text-orange-500 mb-2 animate-pulse" />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Statut Serveur</p>
               <p className="text-xs font-black text-green-400 uppercase tracking-widest">Connecté</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
             <div className="relative max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
               <input 
                 type="text" 
                 placeholder="Chercher dans les messages..." 
                 className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 md:py-4 pl-12 pr-6 text-sm text-white focus:border-gold-500 outline-none shadow-xl"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
             </div>
             <button onClick={onRefresh} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 text-slate-400 transition-all flex items-center gap-2 text-xs font-black uppercase">
               <RefreshCw size={14} /> Actualiser
             </button>
          </div>

          <div className="space-y-4 pb-20">
             {filteredMessages.length === 0 ? (
               <div className="py-20 text-center opacity-20">
                  <MessageSquare size={60} className="mx-auto mb-4" />
                  <p className="text-lg font-black uppercase">Aucun message</p>
               </div>
             ) : (
               filteredMessages.map((msg) => (
                 <div key={msg.id} className={`group bg-slate-900 border rounded-[32px] p-6 transition-all hover:bg-slate-800/80 ${msg.status === 'new' ? 'border-gold-500/20 shadow-lg' : 'border-white/5 opacity-60'}`}>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                       <div className="flex items-center gap-4 w-full lg:w-auto">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-slate-950 shadow-xl shrink-0 ${msg.status === 'new' ? 'bg-gold-500' : 'bg-slate-700'}`}>
                             <User size={24} />
                          </div>
                          <div className="min-w-0 flex-grow">
                             <h4 className="text-white text-lg font-black truncate">{msg.name}</h4>
                             <div className="flex gap-4 mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                <span className="flex items-center gap-1"><Phone size={10} className="text-gold-500" /> {msg.phone}</span>
                                <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(msg.date).toLocaleDateString()}</span>
                             </div>
                          </div>
                       </div>

                       <div className="bg-black/30 p-4 rounded-2xl flex-grow w-full lg:max-w-md border border-white/5">
                          <p className="text-white text-[10px] font-black uppercase mb-1 tracking-widest flex items-center gap-1"><Tag size={10} className="text-gold-500" /> {msg.subject}</p>
                          <p className="text-slate-400 text-xs italic line-clamp-2">"{msg.message}"</p>
                       </div>

                       <div className="flex items-center gap-3 shrink-0">
                          {msg.status === 'new' && (
                             <button onClick={() => onMarkRead(msg.id)} className="p-4 bg-green-500 text-slate-950 rounded-xl hover:scale-105 transition-all shadow-lg">
                                <CheckCircle size={20} />
                             </button>
                          )}
                          <button onClick={() => setDeleteConfirmId(msg.id)} className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all">
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

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-slate-950/98 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[40px] p-10 text-center shadow-2xl">
             <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
             <h3 className="text-2xl font-black text-white mb-2 uppercase">Supprimer?</h3>
             <p className="text-slate-400 text-xs mb-8">Action irréversible.</p>
             <div className="flex flex-col gap-3">
                <button onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); }} className="w-full py-4 bg-red-500 text-white rounded-xl font-black uppercase text-[10px]">Confirmer</button>
                <button onClick={() => setDeleteConfirmId(null)} className="w-full py-4 bg-white/5 text-white rounded-xl font-black uppercase text-[10px]">Annuler</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
