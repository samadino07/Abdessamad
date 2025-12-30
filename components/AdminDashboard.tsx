
import React, { useEffect, useState } from 'react';
import { X, Trash2, Phone, Calendar, CheckCircle, MessageSquare, Search, Activity, Settings, RefreshCw, LogOut, User, Tag, AlertTriangle, ShieldAlert, Radio, Users, Globe, Eye, MapPin, Clock } from 'lucide-react';
import { Message, Visit } from '../App';
import Logo from './Logo';

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
  const [viewMode, setViewMode] = useState<'messages' | 'visits'>('messages');

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone?.includes(searchTerm)
  );

  const filteredVisits = visits.filter(v => 
    v.ip_address?.includes(searchTerm) || 
    v.page?.includes(searchTerm)
  );

  const sqlUniversalFixV11 = `-- SCRIPT DE RÉPARATION V11 (MESSAGES + VISITES AVEC IP)
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS visits;

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

CREATE TABLE visits (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  page TEXT,
  ip_address TEXT
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
          <div className={`${lastRtEvent?.includes('VISITEUR') ? 'animate-pulse' : ''}`}>
            <Logo className="w-10 h-10" />
          </div>
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
               <button onClick={() => setActiveTab('config')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest ${activeTab === 'config' ? 'bg-gold-500 text-slate-950' : 'text-slate-400'}`}>Cloud Configuration</button>
               <button onClick={() => setActiveTab('fix')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest ${activeTab === 'fix' ? 'bg-red-500 text-white' : 'text-slate-400'}`}>Base de données V11</button>
            </div>
            {activeTab === 'config' ? (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-gold-500 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={14} /> Etat du serveur</h3>
                  <div className="text-[10px] font-mono text-slate-400 space-y-1">
                    <p className="text-green-400">Dernière activité: {lastRtEvent || 'En attente...'}</p>
                    <p>Total logs visites: {visits.length}</p>
                  </div>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSaveConfig(sbUrl, sbKey); }} className="space-y-3">
                  <input type="text" placeholder="Supabase URL" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-gold-500" value={sbUrl} onChange={e => setSbUrl(e.target.value)} />
                  <input type="password" placeholder="Supabase Key" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-gold-500" value={sbKey} onChange={e => setSbKey(e.target.value)} />
                  <button className="w-full py-3 bg-gold-500 text-slate-900 rounded-xl font-black uppercase text-[10px] shadow-lg">Sauvegarder</button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                   <p className="text-xs text-slate-300 mb-4 font-bold">Exécutez ce script dans l'éditeur SQL de Supabase :</p>
                   <pre className="bg-black/60 p-4 rounded-lg text-[9px] font-mono text-gold-500 overflow-x-auto whitespace-pre">{sqlUniversalFixV11}</pre>
                   <button onClick={() => { navigator.clipboard.writeText(sqlUniversalFixV11); alert("Copié !"); }} className="mt-4 px-4 py-2 bg-gold-500 text-slate-950 rounded-lg text-[10px] font-black uppercase">Copier le script</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
               <Users size={20} className="text-gold-500 mb-2" />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Total Visiteurs</p>
               <p className="text-2xl md:text-3xl font-black text-white">{visits.length}</p>
            </div>
            <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
               <MessageSquare size={20} className="text-blue-500 mb-2" />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Total Messages</p>
               <p className="text-2xl md:text-3xl font-black text-white">{messages.length}</p>
            </div>
            <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
               <Globe size={20} className="text-green-400 mb-2" />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Dernière IP</p>
               <p className="text-sm font-black text-slate-200 uppercase truncate max-w-full">
                  {visits[0]?.ip_address || 'Aucune'}
               </p>
            </div>
            <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
               <Clock size={20} className="text-orange-500 mb-2" />
               <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Mode Live</p>
               <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">Actif</p>
            </div>
          </div>

          {/* Explicit Navigation Tabs */}
          <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/10 mb-8 max-w-sm">
             <button 
               onClick={() => setViewMode('messages')}
               className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'messages' ? 'bg-gold-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <MessageSquare size={14} /> Messages
             </button>
             <button 
               onClick={() => setViewMode('visits')}
               className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'visits' ? 'bg-gold-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <Users size={14} /> Visiteurs
             </button>
          </div>

          {/* Search & Refresh */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
             <div className="relative max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
               <input 
                 type="text" 
                 placeholder={viewMode === 'messages' ? "Chercher un message..." : "Chercher une IP ou page..."}
                 className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:border-gold-500 outline-none shadow-xl"
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
             </div>
             <button onClick={onRefresh} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 text-slate-400 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
               <RefreshCw size={14} /> Actualiser les données
             </button>
          </div>

          {/* List Content */}
          <div className="space-y-4 pb-20">
             {viewMode === 'messages' ? (
               filteredMessages.length === 0 ? (
                 <div className="py-20 text-center opacity-20 flex flex-col items-center">
                    <MessageSquare size={60} className="mb-4" />
                    <p className="text-lg font-black uppercase">Aucun message reçu</p>
                 </div>
               ) : (
                 filteredMessages.map((msg) => (
                   <div key={msg.id} className={`group bg-slate-900 border rounded-[32px] p-6 transition-all hover:bg-slate-800/80 ${msg.status === 'new' ? 'border-gold-500/20 shadow-lg' : 'border-white/5 opacity-70'}`}>
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
               )
             ) : (
               /* VISITOR LOG VIEW */
               filteredVisits.length === 0 ? (
                 <div className="py-20 text-center opacity-20 flex flex-col items-center">
                    <Users size={60} className="mb-4" />
                    <p className="text-lg font-black uppercase">Aucun visiteur enregistré</p>
                 </div>
               ) : (
                 <div className="bg-slate-900 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left text-sm">
                         <thead>
                           <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                             <th className="px-6 py-5">Date & Heure</th>
                             <th className="px-6 py-5">Adresse IP</th>
                             <th className="px-6 py-5">Page visitée</th>
                             <th className="px-6 py-5 text-right">Actions</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                           {filteredVisits.map((v) => (
                             <tr key={v.id} className="hover:bg-white/5 transition-colors group">
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-3">
                                     <Clock size={14} className="text-slate-600" />
                                     <div>
                                        <p className="text-slate-200 font-bold">{new Date(v.timestamp).toLocaleTimeString()}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{new Date(v.timestamp).toLocaleDateString()}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-2 text-gold-500 font-mono font-black text-xs">
                                     <Globe size={14} className="opacity-40" />
                                     {v.ip_address || '0.0.0.0'}
                                   </div>
                               </td>
                               <td className="px-6 py-5">
                                  <span className="bg-white/5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter text-slate-400 border border-white/5">
                                     {v.page || 'Home'}
                                  </span>
                               </td>
                               <td className="px-6 py-5 text-right">
                                  <a 
                                    href={`https://ipapi.co/${v.ip_address}/json/`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2.5 bg-gold-500/10 text-gold-500 hover:bg-gold-500 hover:text-slate-950 rounded-xl transition-all inline-flex items-center gap-2 text-[9px] font-black uppercase"
                                  >
                                    <MapPin size={12} /> Localiser
                                  </a>
                                </td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                    </div>
                 </div>
               )
             )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-slate-950/98 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[40px] p-10 text-center shadow-2xl">
             <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
             <h3 className="text-2xl font-black text-white mb-2 uppercase">Suppression</h3>
             <p className="text-slate-400 text-xs mb-8">Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible.</p>
             <div className="flex flex-col gap-3">
                <button onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); }} className="w-full py-4 bg-red-500 text-white rounded-xl font-black uppercase text-[10px]">Confirmer la suppression</button>
                <button onClick={() => setDeleteConfirmId(null)} className="w-full py-4 bg-white/5 text-white rounded-xl font-black uppercase text-[10px]">Annuler</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
