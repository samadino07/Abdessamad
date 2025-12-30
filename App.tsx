
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

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('goldgen_theme');
    return (saved as Theme) || 'light';
  });
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        setLastRtEvent(`FETCH ERR: ${error.message}`);
        return;
      }

      if (data) {
        setMessages(data);
        localStorage.setItem('goldgen_messages', JSON.stringify(data));
      }
    } catch (err) {
      console.error("Fetch crash", err);
    }
  }, [supabase]);

  useEffect(() => {
    if (activePage === 'admin' && isAdminAuthenticated) {
      fetchMessages();
    }
  }, [activePage, isAdminAuthenticated, fetchMessages]);

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel('goldgen-v9-global')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          setLastRtEvent(`UPDATE ${payload.eventType} @ ${new Date().toLocaleTimeString()}`);
          fetchMessages();
        }
      )
      .subscribe((status) => {
        setRtStatus(status === 'SUBSCRIBED' ? 'ACTIF' : status.toUpperCase());
        if (status === 'SUBSCRIBED') fetchMessages();
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchMessages]);

  const addMessage = useCallback(async (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    if (!supabase) {
      throw new Error("CONFIG_MISSING: La connexion au Cloud n'est pas configurée.");
    }

    const payload = { 
      name: msg.name,
      phone: msg.phone,
      email: msg.email,
      subject: msg.subject,
      budget: msg.budget || '',
      message: msg.message,
      status: 'new',
      date: new Date().toISOString()
    };

    const { error } = await supabase.from('messages').insert([payload]);
    
    if (error) {
      throw new Error(`DATABASE_ERROR: ${error.message}`);
    }

    if (activePage === 'admin') fetchMessages();
  }, [supabase, fetchMessages, activePage]);

  const handleTestPropagation = async () => {
    if (!supabase) return;
    try {
      await addMessage({
        name: "TEST ADMIN",
        phone: "0000000000",
        email: "test@goldgen.ma",
        subject: "DIAGNOSTIC",
        message: "Ceci est un test de propagation."
      });
      setLastRtEvent("Test réussi !");
    } catch (err: any) {
      setLastRtEvent(`Erreur: ${err.message}`);
    }
  };

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
              onClose={() => navigateTo('home')} 
              onRefresh={fetchMessages}
              onTestPropagation={handleTestPropagation}
              rtStatus={rtStatus}
              lastRtEvent={lastRtEvent}
              onLogout={() => {
                setIsAdminAuthenticated(false);
                localStorage.removeItem('goldgen_admin_auth');
                navigateTo('home');
              }}
              onDelete={async (id) => {
                if (supabase) {
                  await supabase.from('messages').delete().eq('id', id);
                  fetchMessages();
                }
              }}
              onMarkRead={async (id) => {
                if (supabase) {
                  await supabase.from('messages').update({ status: 'read' }).eq('id', id);
                  fetchMessages();
                }
              }}
              onSaveConfig={handleSaveSbConfig}
              currentSbConfig={{
                url: supabase ? (manualSbConfig?.url || (import.meta as any).env?.VITE_SUPABASE_URL || '') : '',
                key: supabase ? (manualSbConfig?.key || (import.meta as any).env?.VITE_SUPABASE_KEY || '') : '',
                source: (import.meta as any).env?.VITE_SUPABASE_URL ? 'Vercel Env' : 'Manual Config'
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
