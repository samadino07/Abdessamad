
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ServiceDetail from './components/ServiceDetail';
import DiscoveryModal from './components/DiscoveryModal';
import ContactModal from './components/ContactModal';
import AboutModal from './components/AboutModal';
import ExpertiseModal from './components/ExpertiseModal';
import EngagementModal from './components/EngagementModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AIChatbot from './components/AIChatbot';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import HSE from './components/HSE';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { translations } from './translations';
import { createClient } from '@supabase/supabase-js';

export type Language = 'fr' | 'en' | 'ar';
export type ActivePage = 'home' | 'about' | 'expertise' | 'engagement' | 'contact' | 'admin' | null;

export interface Message {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>(null);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Robust Environment Variable Fetcher
  const getEnv = (key: string): string => {
    try {
      // 1. Try Vite standard (Build-time injection)
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        // @ts-ignore
        return import.meta.env[key];
      }
    } catch (e) {}

    try {
      // 2. Try Node/Vercel standard (Runtime or defined process)
      // @ts-ignore
      if (typeof process !== 'undefined' && process.env && process.env[key]) {
        // @ts-ignore
        return process.env[key];
      }
    } catch (e) {}

    return '';
  };

  const sbConfig = useMemo(() => {
    // Check with and without VITE_ prefix to be safe
    const url = getEnv('VITE_SUPABASE_URL') || getEnv('SUPABASE_URL');
    const key = getEnv('VITE_SUPABASE_KEY') || getEnv('SUPABASE_KEY');

    if (url && key) {
      return { url, key, source: 'env' };
    }

    // Fallback to local storage for manual dashboard config
    const saved = localStorage.getItem('goldgen_supabase_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.url && parsed.key) {
          return { ...parsed, source: 'local' };
        }
      } catch (e) {
        console.warn("Invalid saved Supabase config");
      }
    }

    return null;
  }, []);

  const supabase = useMemo(() => {
    if (sbConfig?.url && sbConfig?.key) {
      try {
        return createClient(sbConfig.url, sbConfig.key);
      } catch (e) {
        console.error("Failed to initialize Supabase client", e);
      }
    }
    return null;
  }, [sbConfig]);

  const t = translations[lang];

  const fetchMessages = useCallback(async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('date', { ascending: false });
      
      if (!error && data) {
        setMessages(data);
      } else if (error) {
        console.error("Supabase fetch error:", error);
      }
    } else {
      const savedMessages = localStorage.getItem('goldgen_messages');
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          setMessages([]);
        }
      }
    }
  }, [supabase]);

  useEffect(() => {
    fetchMessages();

    let subscription: any;
    if (supabase) {
      subscription = supabase
        .channel('schema-db-changes')
        .on('postgres_changes', { event: '*', table: 'messages' }, () => {
          fetchMessages();
        })
        .subscribe();
    }

    return () => {
      if (subscription) supabase?.removeChannel(subscription);
    };
  }, [supabase, fetchMessages]);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('goldgen_admin_auth');
    if (authStatus === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  const addMessage = async (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    const newMessageData = {
      ...msg,
      date: new Date().toISOString(),
      status: 'new'
    };

    if (supabase) {
      const { error } = await supabase.from('messages').insert([newMessageData]);
      if (error) {
        console.error("Cloud insert error:", error);
        // Fallback local persistence if cloud fails
        const localMsg = { ...newMessageData, id: Date.now().toString() };
        const updated = [localMsg, ...messages];
        setMessages(updated as any);
        localStorage.setItem('goldgen_messages', JSON.stringify(updated));
      }
    } else {
      const localMsg = { ...newMessageData, id: Date.now().toString() };
      const updatedMessages = [localMsg, ...messages];
      setMessages(updatedMessages as any);
      localStorage.setItem('goldgen_messages', JSON.stringify(updatedMessages));
    }
  };

  const deleteMessage = async (id: string) => {
    if (supabase) {
      await supabase.from('messages').delete().eq('id', id);
    } else {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('goldgen_messages', JSON.stringify(updated));
    }
  };

  const markAsRead = async (id: string) => {
    if (supabase) {
      await supabase.from('messages').update({ status: 'read' }).eq('id', id);
    } else {
      const updated = messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m);
      setMessages(updated);
      localStorage.setItem('goldgen_messages', JSON.stringify(updated));
    }
  };

  const saveSbConfig = (url: string, key: string) => {
    localStorage.setItem('goldgen_supabase_config', JSON.stringify({ url, key }));
    window.location.reload();
  };

  const navigateTo = useCallback((page: ActivePage) => {
    if (page === 'home') {
      setActivePage(null);
      setIsDiscoveryOpen(false);
      setSelectedServiceId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage(page);
    }
  }, []);

  const handleSelectService = useCallback((id: string) => {
    setSelectedServiceId(id);
    setActivePage(null);
  }, []);

  const unreadCount = messages.filter(m => m.status === 'new').length;

  return (
    <div className={`min-h-screen bg-white selection:bg-yellow-500 selection:text-slate-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <LoadingScreen />
      
      <Navbar 
        currentLang={lang} 
        onLangChange={setLang} 
        t={t.nav} 
        onNavigate={navigateTo}
        isAdmin={isAdminAuthenticated}
      />
      
      <main className="relative">
        <Hero t={t.hero} lang={lang} onDiscover={() => setIsDiscoveryOpen(true)} onNavigate={navigateTo} />
        <About t={t.about} lang={lang} />
        <Services t={t.services} lang={lang} onSelect={handleSelectService} />
        <HSE t={t.hse} lang={lang} />
        <Contact t={t.contact} lang={lang} onSendMessage={addMessage} />
      </main>

      <Footer t={t.footer} lang={lang} onNavigate={navigateTo} unreadCount={unreadCount} />

      <FloatingWhatsApp />
      <AIChatbot lang={lang} t={translations[lang]} />
      <ScrollToTop />

      {selectedServiceId && (
        <ServiceDetail 
          service={(translations[lang].services.items as any)[selectedServiceId]} 
          onClose={() => setSelectedServiceId(null)} 
          lang={lang}
          t={translations[lang].services}
        />
      )}

      {isDiscoveryOpen && (
        <DiscoveryModal 
          onClose={() => setIsDiscoveryOpen(false)}
          onExploreServices={() => { setIsDiscoveryOpen(false); setActivePage('expertise'); }}
          lang={lang}
          t={translations[lang].discovery}
        />
      )}

      {activePage === 'about' && (
        <AboutModal onClose={() => setActivePage(null)} lang={lang} t={translations[lang].about} />
      )}

      {activePage === 'expertise' && (
        <ExpertiseModal onClose={() => setActivePage(null)} lang={lang} t={translations[lang].services} onSelectService={handleSelectService} />
      )}

      {activePage === 'engagement' && (
        <EngagementModal onClose={() => setActivePage(null)} lang={lang} t={translations[lang].hse} />
      )}

      {activePage === 'contact' && (
        <ContactModal onClose={() => setActivePage(null)} lang={lang} t={translations[lang].contact} onSendMessage={addMessage} />
      )}

      {activePage === 'admin' && (
        isAdminAuthenticated ? (
          <AdminDashboard 
            messages={messages} 
            onClose={() => setActivePage(null)} 
            onDelete={deleteMessage}
            onMarkRead={markAsRead}
            onSaveConfig={saveSbConfig}
            currentSbConfig={sbConfig}
          />
        ) : (
          <AdminLogin onClose={() => setActivePage(null)} onSuccess={() => { setIsAdminAuthenticated(true); sessionStorage.setItem('goldgen_admin_auth', 'true'); }} />
        )
      )}
    </div>
  );
};

export default App;
