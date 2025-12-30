
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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  
  const t = translations[lang];

  // Theme Toggle Effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('goldgen_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Page Navigation with Transition
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

  // Safe Supabase Initialization
  const supabase = useMemo(() => {
    const url = (import.meta as any).env?.VITE_SUPABASE_URL;
    const key = (import.meta as any).env?.VITE_SUPABASE_KEY;
    if (!url || !key) return null;
    try {
      return createClient(url, key);
    } catch (e) {
      console.warn("Supabase initialization failed:", e);
      return null;
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!supabase) {
      const saved = localStorage.getItem('goldgen_messages');
      if (saved) setMessages(JSON.parse(saved));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('date', { ascending: false });
      if (!error && data) setMessages(data);
    } catch (err) {
      const saved = localStorage.getItem('goldgen_messages');
      if (saved) setMessages(JSON.parse(saved));
    }
  }, [supabase]);

  useEffect(() => {
    fetchMessages();
    const authStatus = sessionStorage.getItem('goldgen_admin_auth');
    if (authStatus === 'true') setIsAdminAuthenticated(true);
  }, [fetchMessages]);

  const addMessage = useCallback(async (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    const newMessage = { ...msg, date: new Date().toISOString(), status: 'new' };
    
    if (supabase) {
      const { error } = await supabase.from('messages').insert([newMessage]);
      if (!error) {
        fetchMessages();
        return;
      }
    }

    // Fallback to localStorage if Supabase fails or is not configured
    const currentLocal = JSON.parse(localStorage.getItem('goldgen_messages') || '[]');
    const updated = [{ ...newMessage, id: Date.now().toString() }, ...currentLocal];
    setMessages(updated as any);
    localStorage.setItem('goldgen_messages', JSON.stringify(updated));
  }, [supabase, fetchMessages]);

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
            onDelete={async (id) => {
              if (supabase) {
                await supabase.from('messages').delete().eq('id', id);
                fetchMessages();
              } else {
                const updated = messages.filter(m => m.id !== id);
                setMessages(updated);
                localStorage.setItem('goldgen_messages', JSON.stringify(updated));
              }
            }}
            onMarkRead={async (id) => {
              if (supabase) {
                await supabase.from('messages').update({ status: 'read' }).eq('id', id);
                fetchMessages();
              } else {
                const updated = messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m);
                setMessages(updated);
                localStorage.setItem('goldgen_messages', JSON.stringify(updated));
              }
            }}
            onSaveConfig={() => {}}
            currentSbConfig={supabase ? { url: (import.meta as any).env.VITE_SUPABASE_URL, key: (import.meta as any).env.VITE_SUPABASE_KEY, source: 'env' } : null}
          />
        ) : (
          <AdminLogin onClose={() => navigateTo('home')} onSuccess={() => setIsAdminAuthenticated(true)} />
        );
      default:
        return <Hero t={t.hero} lang={lang} onDiscover={() => navigateTo('expertise')} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 selection:bg-gold-500 selection:text-slate-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
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

      {activePage !== 'admin' && <Footer t={t.footer} lang={lang} onNavigate={navigateTo} unreadCount={messages.filter(m => m.status === 'new').length} />}

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
