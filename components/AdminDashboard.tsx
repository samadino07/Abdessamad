
import React, { useEffect, useState } from 'react';
import { X, Trash2, Mail, Phone, Calendar, CheckCircle, MessageSquare, ShieldCheck, Search, ExternalLink } from 'lucide-react';
import { Message } from '../App';

interface AdminDashboardProps {
  messages: Message[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ messages, onClose, onDelete, onMarkRead }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.phone.includes(searchTerm) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[20000] bg-slate-950 flex flex-col overflow-hidden">
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
              placeholder="Rechercher..." 
              className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white text-sm focus:outline-none focus:border-yellow-500 transition-all w-64"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-grow p-8 overflow-y-auto text-white">
        <div className="container mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
             <div className="bg-slate-900 p-8 rounded-3xl border border-white/5">
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Total Demandes</p>
                <p className="text-4xl font-black text-white">{messages.length}</p>
             </div>
             <div className="bg-slate-900 p-8 rounded-3xl border border-white/5">
                <p className="text-yellow-500 text-xs font-black uppercase tracking-widest mb-2">Nouveaux Messages</p>
                <p className="text-4xl font-black text-white">{messages.filter(m => m.status === 'new').length}</p>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
            {filteredMessages.length === 0 ? (
              <div className="p-20 text-center">
                <MessageSquare size={64} className="text-slate-800 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-700">Aucun message trouvé</h3>
                <p className="text-slate-600 mt-2">Les demandes de vos clients s'afficheront ici.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6">Client</th>
                      <th className="px-8 py-6">Service</th>
                      <th className="px-8 py-6">Message</th>
                      <th className="px-8 py-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMessages.map((msg) => (
                      <tr key={msg.id} className={`group hover:bg-white/5 transition-colors ${msg.status === 'new' ? 'bg-yellow-500/5' : ''}`}>
                        <td className="px-8 py-6 whitespace-nowrap">
                           <div className="flex items-center gap-3 text-slate-500 text-xs font-bold">
                              <Calendar size={14} className="text-yellow-500" />
                              {msg.date}
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="text-white font-black text-lg">{msg.name}</span>
                              <div className="flex flex-col gap-1 mt-1">
                                <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-slate-400 text-xs hover:text-yellow-500 transition-colors">
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
                           <div className="flex items-center gap-3">
                              {msg.status === 'new' && (
                                <button 
                                  onClick={() => onMarkRead(msg.id)}
                                  className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-lg"
                                  title="Marquer comme lu"
                                >
                                  <CheckCircle size={18} />
                                </button>
                              )}
                              <a 
                                href={`mailto:${msg.email}?subject=Réponse à votre demande GOLDGEN - ${msg.subject}`}
                                className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                                title="Répondre par mail"
                              >
                                <ExternalLink size={18} />
                              </a>
                              <button 
                                onClick={() => onDelete(msg.id)}
                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                title="Supprimer"
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
    </div>
  );
};

export default AdminDashboard;
