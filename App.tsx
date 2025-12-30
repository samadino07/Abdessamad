
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
  const [pageTransition, setPageTransition] = useState(false);
  
  // Local Config Fallback if Vercel Env variables fail
  const [manualSbConfig, setManualSbConfig] = useState<{url: string, key: string} | null>(() => {
    const saved = localStorage.getItem('goldgen_sb_config');
    return saved ? JSON.parse(saved) : null;
  });

  const t = translations[lang];

  // Supabase Client - Robust Initialization
  const supabase = useMemo(() => {
    // Fixed: Using process.env instead of import.meta.env to resolve TypeScript ImportMeta property errors
    const envUrl = process.env.VITE_SUPABASE_URL;
    const envKey = process.env.VITE_SUPABASE_KEY;
    
    const url = envUrl || manualSbConfig?.url;
    const key = envKey || manualSbConfig?.key;
    
    if (!url || !key) return null;
    try {
      return createClient(url, key);
    } catch (e) {
      console.error("Supabase fail", e);
      return null;
    }
  }, [manualSbConfig]);

  const fetchMessages = useCallback(async () => {
    if (!supabase) {
      const localData = localStorage.getItem('goldgen_messages');
      if (localData) setMessages(JSON.parse(localData));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('date', { ascending: false });
      
      if (!error && data) {
        setMessages(data);
        localStorage.setItem('goldgen_messages', JSON.stringify(data));
      }
    } catch (err) {
      console.error("Cloud fetch error:", err);
    }
  }, [supabase]);

  // Global Real-time Sync
  useEffect(() => {
    fetchMessages();
    
    if (supabase) {
      // Listen to 'INSERT', 'UPDATE', 'DELETE' events from ANY device
      const channel = supabase
        .channel('db_sync_global')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
          console.log('Real-time update received:', payload);
          fetchMessages(); // Refresh UI for everyone
        })
        .subscribe((status) => {
          console.log('Supabase sync status:', status);
        });

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [supabase, fetchMessages]);

  const addMessage = useCallback(async (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    const newMessage = { ...msg, date: new Date().toISOString(), status: 'new' };
    
    if (supabase) {
      const { error } = await supabase.from('messages').insert([newMessage]);
      if (!error) {
        // fetchMessages() will be triggered by real-time listener
        return;
      }
      console.error("Error inserting to Cloud:", error);
    }

    // Local-only Fallback (France PC or Safi PC if offline)
    const localMsgs = JSON.parse(localStorage.getItem('goldgen_messages') || '[]');
    const updated = [{ ...newMessage, id: Date.now().toString() }, ...localMsgs];
    setMessages(updated as any);
    localStorage.setItem('goldgen_messages', JSON.stringify(updated));
  }, [supabase, fetchMessages]);

  const handleSaveSbConfig = (url: string, key: string) => {
    const config = { url, key };
    setManualSbConfig(config);
    localStorage.setItem('goldgen_sb_config', JSON.stringify(config));
    setTimeout(fetchMessages, 500);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('goldgen_admin_auth');
    navigateTo('home');
  };

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('goldgen_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const navigateTo = useCallback((page: ActivePage) => {
    if (page === activePage) return;
    setPageTransition(true);
    setTimeout(() => {
      setActivePage(page);
      setSelectedServiceId(null);
      window.scrollTo(0, 0);
      setPageTransition(false);
    }, 400);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Hero t={t.hero} lang={lang} onDiscover={() => navigateTo('expertise')} onNavigate={navigateTo} />;
      case 'about':
        return <About t={t.about} lang={lang} />;
      case 'expertise':
        return <Services t={t.services} lang={lang} onSelect={setSelectedServiceId} />;
      case 'engagement':
        return <HSE t={t.hse} lang={lang} />;
      case 'contact':
        return <Contact t={t.contact} lang={lang} onSendMessage={addMessage} />;
      case 'admin':
        return isAdminAuthenticated ? (
          <AdminDashboard 
            messages={messages} 
            onClose={() => navigateTo('home')} 
            onRefresh={fetchMessages}
            onLogout={handleLogout}
            onDelete={async (id) => {
              if (supabase) await supabase.from('messages').delete().eq('id', id);
              else {
                const updated = messages.filter(m => m.id !== id);
                setMessages(updated);
                localStorage.setItem('goldgen_messages', JSON.stringify(updated));
              }
            }}
            onMarkRead={async (id) => {
              if (supabase) await supabase.from('messages').update({ status: 'read' }).eq('id', id);
              else {
                const updated = messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m);
                setMessages(updated);
                localStorage.setItem('goldgen_messages', JSON.stringify(updated));
              }
            }}
            onSaveConfig={handleSaveSbConfig}
            currentSbConfig={supabase ? { 
              // Fixed: Using process.env instead of import.meta.env to resolve TypeScript ImportMeta property errors
              url: process.env.VITE_SUPABASE_URL || manualSbConfig?.url, 
              key: process.env.VITE_SUPABASE_KEY || manualSbConfig?.key, 
              source: process.env.VITE_SUPABASE_URL ? 'env' : 'manual' 
            } : null}
          />
        ) : (
          <AdminLogin onClose={() => navigateTo('home')} onSuccess={() => {
            setIsAdminAuthenticated(true);
            localStorage.setItem('goldgen_admin_auth', 'true');
          }} />
        );
      default:
        return <Hero t={t.hero} lang={lang} onDiscover={() => navigateTo('expertise')} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 selection:bg-gold-500 selection:text-slate-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <LoadingScreen />
      
      <Navbar 
        currentLang={lang} 
        onLangChange={setLang} 
        t={t.nav} 
        onNavigate={navigateTo}
        isAdmin={isAdminAuthenticated}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <main className={`transition-all duration-500 min-h-[80vh] ${pageTransition ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        {renderPage()}
      </main>

      {activePage !== 'admin' && (
        <Footer 
          t={t.footer} 
          lang={lang} 
          onNavigate={navigateTo} 
          unreadCount={messages.filter(m => m.status === 'new').length} 
          isCloudConnected={!!supabase}
        />
      )}

      <FloatingWhatsApp />
      <AIChatbot lang={lang} t={t} />
      <ScrollToTop />

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
