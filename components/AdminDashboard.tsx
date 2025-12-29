import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, ExternalLink, Download, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Message } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
}

interface Toast {
  message: string;
  type: 'success' | 'info' | 'error';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onClose, onDelete, onMarkRead }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

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
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone.includes(searchTerm) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (messages.length === 0) {
      showToast("Aucune donnée à exporter", "info");
      return;
    }
    
    const headers = ["Date", "Nom", "Téléphone", "Email", "Sujet", "Message", "Status"];
    const rows = messages.map(m => [
      m.date,
      `"${m.name.replace(/"/g, '""')}"`,
      m.phone,
      m.email,
      `"${m.subject.replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      m.status
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `goldgen_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Export CSV réussi");
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast("Message supprimé définitivement", "success");
    }
  };

  const handleMarkRead = (id: string) => {
    onMarkRead(id);
    showToast("Message marqué comme lu");
  };

  return (
    <div className="fixed inset-0 z-[20000] bg-slate-950 flex flex-col overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[20002] flex items-center gap-3 bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          {toast.type === 'success' ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : toast.type === 'info' ? (
            <Info size={20} className="text-blue-500" />
          ) : (
            <AlertTriangle size={20} className="text-red-500" />
          )}
          <span className="text-white text-sm font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header Dashboard */}
      <div className="bg-slate-900 border-b border-white/5 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900 shadow-xl shadow-yellow-500/20">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-white text-2xl font-black uppercase tracking-widest">Dashboard GOLDGEN</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Espace de Gestion des Demandes</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un client ou sujet..." 
              className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-yellow-500 transition-all w-64 md:w-80"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-full hover:bg-yellow-400 transition-all text-xs font-black uppercase tracking-widest shadow-lg shadow-yellow-500/10"
          >
            <Download size={16} />
            <span>Exporter CSV</span>
          </button>
          <button onClick={onClose} className="p-4 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all active:scale-95" aria-label="Fermer le dashboard">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-grow p-8 overflow-y-auto text-white">
        <div className="container mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
             <div className="bg-slate-900 p-8 rounded-3xl border border-white/5 group hover:border-white/10 transition-colors">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Total Demandes</p>
                <p className="text-4xl font-black text-white">{messages.length}</p>
             </div>
             <div className="bg-slate-900 p-8 rounded-3xl border border-yellow-500/20 group hover:border-yellow-500/40 transition-colors">
                <p className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-2">Nouveaux Messages</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-white">{messages.filter(m => m.status === 'new').length}</p>
                  {messages.filter(m => m.status === 'new').length > 0 && (
                    <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
                  )}
                </div>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
            {filteredMessages.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare size={40} className="text-slate-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-400">Aucun message trouvé</h3>
                <p className="text-slate-600 mt-2 max-w-xs mx-auto">Vérifiez vos filtres de recherche ou attendez de nouvelles demandes clients.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6">Informations Client</th>
                      <th className="px-8 py-6">Sujet du Projet</th>
                      <th className="px-8 py-6">Aperçu du Message</th>
                      <th className="px-8 py-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMessages.map((msg) => (
                      <tr key={msg.id} className={`group hover:bg-white/5 transition-colors ${msg.status === 'new' ? 'bg-yellow-500/[0.03]' : ''}`}>
                        <td className="px-8 py-6 whitespace-nowrap">
                           <div className="flex items-center gap-3 text-slate-500 text-xs font-bold">
                              <Calendar size={14} className="text-yellow-500" />
                              {msg.date}
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="text-white font-black text-lg flex items-center gap-2">
                                {msg.name}
                                {msg.status === 'new' && (
                                  <span className="bg-yellow-500 text-slate-900 text-[8px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Nouveau</span>
                                )}
                              </span>
                              <div className="flex flex-col gap-1 mt-1">
                                <a href={`tel:${msg.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-slate-400 text-xs hover:text-yellow-500 transition-colors">
                                  <Phone size={10} className="text-yellow-500" />
                                  {msg.phone}
                                </a>
                                <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-slate-400 text-xs hover:text-yellow-500 transition-colors">
                                  <Mail size={10} className="text-yellow-500" />
                                  {msg.email}
                                </a>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-4 py-1.5 bg-slate-800 text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">
                              {msg.subject}
                           </span>
                        </td>
                        <td className="px-8 py-6 max-w-md">
                           <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed italic">
                             "{msg.message}"
                           </p>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center justify-center gap-3">
                              {msg.status === 'new' && (
                                <button 
                                  onClick={() => handleMarkRead(msg.id)}
                                  className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-lg active:scale-90"
                                  title="Marquer comme lu"
                                >
                                  <CheckCircle size={18} />
                                </button>
                              )}
                              <a 
                                href={`mailto:${msg.email}?subject=Réponse à votre demande GOLDGEN - ${msg.subject}`}
                                className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-90"
                                title="Répondre par mail"
                              >
                                <ExternalLink size={18} />
                              </a>
                              <button 
                                onClick={() => handleDeleteClick(msg.id)}
                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-90"
                                title="Supprimer définitivement"
                              >
                                <Trash2 size={18} />
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
        <div className="fixed inset-0 z-[20001] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setDeleteConfirmId(null)}
          ></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-[24px] flex items-center justify-center mb-8 animate-bounce-short">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">Action Irréversible</h3>
              <p className="text-slate-400 text-base font-medium leading-relaxed mb-10">
                Vous êtes sur le point de supprimer cette demande client. Les données seront définitivement effacées de la base de données locale.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={confirmDelete}
                  className="w-full px-8 py-5 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                >
                  Confirmer la suppression
                </button>
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="w-full px-8 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;