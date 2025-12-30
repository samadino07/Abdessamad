
import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Le mot de passe requis
    if (password === 'Goldgen2025@@') {
      onSuccess();
    } else {
      setError(true);
      setIsShake(true);
      setTimeout(() => setIsShake(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950 overflow-hidden">
      {/* Immersive Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      ></div>

      {/* Login Box */}
      <div className={`relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-[0_0_100px_rgba(234,179,8,0.15)] transition-all duration-500 z-10 ${
        isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
      } ${isShake ? 'animate-shake' : ''}`}>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/5 text-slate-400 rounded-full hover:bg-white/10 hover:text-white transition-all"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center text-slate-900 shadow-2xl shadow-yellow-500/20 mb-6">
            <Lock size={36} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Accès Restreint</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Administration GOLDGEN</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              required
              autoFocus
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Mot de passe"
              className={`w-full bg-white/5 border-2 ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-yellow-500'} py-5 pl-6 pr-14 rounded-2xl text-white font-bold outline-none transition-all placeholder:text-slate-600`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-yellow-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest justify-center animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} />
              <span>Mot de passe incorrect</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-yellow-500/10 flex items-center justify-center gap-3"
          >
            <ShieldCheck size={20} />
            Se Connecter
          </button>
        </form>

        <p className="mt-8 text-center text-[8px] text-slate-600 font-black uppercase tracking-[0.3em]">
          Système de sécurité GOLDGEN • 2025
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}} />
    </div>
  );
};

export default AdminLogin;
