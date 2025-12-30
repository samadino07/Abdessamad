
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HSE from './components/HSE';
import Contact from './Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
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
  id: string | number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  budget?: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

export interface Visit {
  id: number;
  timestamp: string;
  page?: string;
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
  const [visits, setVisits] = useState<Visit[]>([]);
  const [rtStatus, setRtStatus] = useState<string>('INIT');
  const [lastRtEvent, setLastRtEvent] = useState<string>('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('goldgen_admin_auth') === 'true';
  });
  
  const [manualSbConfig, setManualSbConfig] = useState<{url: string, key: string} | null>(() => {
    const saved = localStorage.getItem('goldgen_sb_config');
    return saved ? JSON.parse(saved) : null;
  });

  const t = translations[lang];

  const supabase = useMemo(() => {
    const v = (import.meta as any).env;
    const url = v?.VITE_SUPABASE_URL || manualSbConfig?.url;
    const key = v?.VITE_SUPABASE_KEY || manualSbConfig?.key;
    
    if (!url || !key) return null;
    try {
      return createClient(url, key, {
        auth: { persistSession: false }
      });
    } catch (e) {
      console.error("Failed to init Supabase", e);
      return null;
    }
  }, [manualSbConfig]);

  const fetchMessages = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from('messages').select('*').order('date', { ascending: false });
    if (data) setMessages(data);
  }, [supabase]);

  const fetchVisits = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from('visits').select('*').order('timestamp', { ascending: false }).limit(50);
    if (data) setVisits(data);
  }, [supabase]);

  // Track New Visit on Load
  useEffect(() => {
    if (!supabase || activePage === 'admin') return;
    
    const logVisit = async () => {
      try {
        await supabase.from('visits').insert([{ 
          page: activePage || 'home',
          timestamp: new Date().toISOString()
        }]);
      } catch (e) {
        console.error("Visit log failed", e);
      }
    };
    
    logVisit();
  }, [supabase, activePage]);

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel('goldgen-live-tracking')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => {
        setLastRtEvent(`NOUVEAU MESSAGE @ ${new Date().toLocaleTimeString()}`);
        fetchMessages();
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visits' }, () => {
        setLastRtEvent(`VISITEUR ACTIF @ ${new Date().toLocaleTimeString()}`);
        fetchVisits();
      })
      .subscribe((status) => {
        setRtStatus(status === 'SUBSCRIBED' ? 'ACTIF' : status.toUpperCase());
        if (status === 'SUBSCRIBED') {
          fetchMessages();
          fetchVisits();
        }
      });

    return () => { supabase.removeChannel(channel); };
  }, [supabase, fetchMessages, fetchVisits]);

  const addMessage = useCallback(async (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    if (!supabase) throw new Error("CONFIG_MISSING");
    const { error } = await supabase.from('messages').insert([{ ...msg, status: 'new', date: new Date().toISOString() }]);
    if (error) throw new Error(error.message);
  }, [supabase]);

  const navigateTo = useCallback((page: ActivePage) => {
    setActivePage(page);
    setSelectedServiceId(null);
    window.scrollTo(0, 0);
  }, []);

  const handleSaveSbConfig = (url: string, key: string) => {
    localStorage.setItem('goldgen_sb_config', JSON.stringify({ url, key }));
    window.location.reload();
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Hero t={t.hero} lang={lang} onDiscover={() => navigateTo('expertise')} onNavigate={navigateTo} />;
      case 'about': return <About t={t.about} lang={lang} />;
      case 'expertise': return <Services t={t.services} lang={lang} onSelect={setSelectedServiceId} />;
      case 'engagement': return <HSE t={t.hse} lang={lang} />;
      case 'contact': return <Contact t={t.contact} lang={lang} onSendMessage={addMessage} isCloudReady={!!supabase} />;
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
              visits={visits}
              onClose={() => navigateTo('home')} 
              onRefresh={() => { fetchMessages(); fetchVisits(); }}
              rtStatus={rtStatus}
              lastRtEvent={lastRtEvent}
              onLogout={() => {
                setIsAdminAuthenticated(false);
                localStorage.removeItem('goldgen_admin_auth');
                navigateTo('home');
              }}
              onDelete={async (id) => { if (supabase) { await supabase.from('messages').delete().eq('id', id); fetchMessages(); } }}
              onMarkRead={async (id) => { if (supabase) { await supabase.from('messages').update({ status: 'read' }).eq('id', id); fetchMessages(); } }}
              onSaveConfig={handleSaveSbConfig}
              onTestPropagation={() => {}}
              currentSbConfig={{
                url: manualSbConfig?.url || '',
                key: manualSbConfig?.key || '',
                source: 'Config'
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
        <main className="pt-16 md:pt-20">
          {renderPage()}
        </main>
      )}

      {activePage !== 'admin' && (
        <>
          <Footer t={t.footer} lang={lang} onNavigate={navigateTo} unreadCount={messages.filter(m => m.status === 'new').length} isCloudConnected={!!supabase} />
          <FloatingWhatsApp />
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
