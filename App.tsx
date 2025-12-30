
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HSE from './components/HSE';
import Contact from './Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AIChatbot from './components/AIChatbot';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import ServiceDetail from './components/ServiceDetail';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { translations } from './translations';
import { createClient } from '@supabase/supabase-js';

export type Language = 'fr' | 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type ActivePage = 'home' | 'about' | 'expertise' | 'engagement' | 'contact' | 'admin' | null;

export interface Message {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  budget?: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('goldgen_theme');
    return (saved as Theme) || 'light';
  });
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('goldgen_admin_auth') === 'true';
  });
  
  const [manualSbConfig, setManualSbConfig] = useState<{url: string, key: string} | null>(() => {
    const saved = localStorage.getItem('goldgen_sb_config');
    return saved ? JSON.parse(saved) : null;
  });

  const t = translations[lang];

  // Initialisation Supabase (Vercel ou Manuel)
  const supabase = useMemo(() => {
    const v = (import.meta as any).env;
    const url = v?.VITE_SUPABASE_URL || manualSbConfig?.url;
    const key = v?.VITE_SUPABASE_KEY || manualSbConfig?.key;
    
    if (!url || !key) return null;
    try {
      return createClient(url, key);
    } catch (e) {
      return null;
    }
  }, [manualSbConfig]);

  const fetchMessages = useCallback(async () => {
    if (!supabase) {
      const local = localStorage.getItem('goldgen_messages');
      if (local) setMessages(JSON.parse(local));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('date', { ascending: false });
      
      if (!error && data) {
        setMessages(data);
        // Backup local pour le hors-ligne
        localStorage.setItem('goldgen_messages', JSON.stringify(data));
      }
    } catch (err) {
      console.error("Fetch Cloud Error", err);
    }
  }, [supabase]);

  // Synchronisation en Temps Réel (Indispensable pour voir les messages d'autres appareils sans refresh)
  useEffect(() => {
    fetchMessages();
    
    if (supabase) {
      const subscription = supabase
        .channel('any')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
          console.log('Change received!', payload);
          fetchMessages();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [supabase, fetchMessages]);

  const addMessage = useCallback(async (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    const newMessage = { ...msg, date: new Date().toISOString(), status: 'new' };
    
    // Tentative Cloud d'abord (Partage universel)
    if (supabase) {
      const { error } = await supabase.from('messages').insert([newMessage]);
      if (!error) {
        console.log("Message saved to Cloud");
        return;
      }
      console.error("Cloud insert failed, saving locally...", error.message);
    }

    // Fallback Local (uniquement visible sur cet appareil)
    const local = JSON.parse(localStorage.getItem('goldgen_messages') || '[]');
    const updated = [{ ...newMessage, id: Date.now().toString() }, ...local];
    setMessages(updated as any);
    localStorage.setItem('goldgen_messages', JSON.stringify(updated));
  }, [supabase]);

  const navigateTo = useCallback((page: ActivePage) => {
    setActivePage(page);
    setSelectedServiceId(null);
    window.scrollTo(0, 0);
  }, []);

  const handleSaveSbConfig = (url: string, key: string) => {
    const config = { url, key };
    setManualSbConfig(config);
    localStorage.setItem('goldgen_sb_config', JSON.stringify(config));
    window.location.reload();
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Hero t={t.hero} lang={lang} onDiscover={() => navigateTo('expertise')} onNavigate={navigateTo} />;
      case 'about': return <About t={t.about} lang={lang} />;
      case 'expertise': return <Services t={t.services} lang={lang} onSelect={setSelectedServiceId} />;
      case 'engagement': return <HSE t={t.hse} lang={lang} />;
      case 'contact': return <Contact t={t.contact} lang={lang} onSendMessage={addMessage} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <LoadingScreen />
      
      {activePage !== 'admin' && (
        <Navbar 
          currentLang={lang} 
          onLangChange={setLang} 
          t={t.nav} 
          onNavigate={navigateTo}
          theme={theme}
          onToggleTheme={() => setTheme(p => p === 'light' ? 'dark' : 'light')}
        />
      )}
      
      {activePage === 'admin' ? (
        <div className="min-h-screen bg-slate-950">
          {isAdminAuthenticated ? (
            <AdminDashboard 
              messages={messages} 
              onClose={() => navigateTo('home')} 
              onRefresh={fetchMessages}
              onLogout={() => {
                setIsAdminAuthenticated(false);
                localStorage.removeItem('goldgen_admin_auth');
                navigateTo('home');
              }}
              onDelete={async (id) => {
                if (supabase) await supabase.from('messages').delete().eq('id', id);
                else setMessages(prev => prev.filter(m => m.id !== id));
              }}
              onMarkRead={async (id) => {
                if (supabase) await supabase.from('messages').update({ status: 'read' }).eq('id', id);
                else setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' as const } : m));
              }}
              onSaveConfig={handleSaveSbConfig}
              currentSbConfig={{
                url: supabase ? (manualSbConfig?.url || (import.meta as any).env?.VITE_SUPABASE_URL || '') : '',
                key: supabase ? (manualSbConfig?.key || (import.meta as any).env?.VITE_SUPABASE_KEY || '') : '',
                source: (import.meta as any).env?.VITE_SUPABASE_URL ? 'Vercel Env' : 'Manual Settings'
              }}
            />
          ) : (
            <AdminLogin onClose={() => navigateTo('home')} onSuccess={() => {
              setIsAdminAuthenticated(true);
              localStorage.setItem('goldgen_admin_auth', 'true');
            }} />
          )}
        </div>
      ) : (
        <main className="pt-20">
          {renderPage()}
        </main>
      )}

      {activePage !== 'admin' && (
        <>
          <Footer t={t.footer} lang={lang} onNavigate={navigateTo} unreadCount={messages.filter(m => m.status === 'new').length} isCloudConnected={!!supabase} />
          <FloatingWhatsApp />
          <AIChatbot lang={lang} t={t} />
          <ScrollToTop />
        </>
      )}

      {selectedServiceId && (
        <ServiceDetail 
          service={(t.services.items as any)[selectedServiceId]} 
          onClose={() => setSelectedServiceId(null)} 
          onNavigate={navigateTo}
          lang={lang}
          t={t.services}
        />
      )}
    </div>
  );
};

export default App;
