import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
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
  
  const t = translations[lang];

  useEffect(() => {
    const savedMessages = localStorage.getItem('goldgen_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    const authStatus = sessionStorage.getItem('goldgen_admin_auth');
    if (authStatus === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  useEffect(() => {
    if (selectedServiceId || isDiscoveryOpen || activePage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedServiceId, isDiscoveryOpen, activePage]);

  const addMessage = (msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    const newMessage: Message = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      status: 'new'
    };
    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('goldgen_messages', JSON.stringify(updatedMessages));
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('goldgen_messages', JSON.stringify(updated));
  };

  const markAsRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m);
    setMessages(updated);
    localStorage.setItem('goldgen_messages', JSON.stringify(updated));
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

  const handleOpenDiscovery = useCallback(() => {
    setIsDiscoveryOpen(true);
  }, []);

  const handleSelectService = useCallback((id: string) => {
    setSelectedServiceId(id);
    setActivePage(null);
  }, []);

  const handleAdminAuth = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('goldgen_admin_auth', 'true');
  };

  const getSelectedServiceData = () => {
    if (!selectedServiceId) return null;
    const service = (t.services.items as any)[selectedServiceId];
    if (!service) return null;

    const serviceImages = {
      civil: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=75&w=1200',
      amenagement: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=75&w=1200',
      maintenance: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=75&w=1200',
      fourniture: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=1200',
    };

    return {
      ...service,
      imageUrl: serviceImages[selectedServiceId as keyof typeof serviceImages]
    };
  };

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
        <Hero 
          t={t.hero} 
          lang={lang} 
          onDiscover={handleOpenDiscovery} 
          onNavigate={navigateTo}
        />
        <About t={t.about} lang={lang} />
        <Services t={t.services} lang={lang} onSelect={handleSelectService} />
        <Portfolio t={t} lang={lang} />
        <HSE t={t.hse} lang={lang} />
        <Contact t={t.contact} lang={lang} onSendMessage={addMessage} />
      </main>

      <Footer t={t.footer} lang={lang} onNavigate={navigateTo} unreadCount={unreadCount} />

      <FloatingWhatsApp />
      <AIChatbot lang={lang} t={t} />
      <ScrollToTop />

      {selectedServiceId && (
        <ServiceDetail 
          service={getSelectedServiceData()} 
          onClose={() => setSelectedServiceId(null)} 
          lang={lang}
          t={t.services}
        />
      )}

      {isDiscoveryOpen && (
        <DiscoveryModal 
          onClose={() => setIsDiscoveryOpen(false)}
          onExploreServices={() => { setIsDiscoveryOpen(false); setActivePage('expertise'); }}
          lang={lang}
          t={t.discovery}
        />
      )}

      {activePage === 'about' && (
        <AboutModal onClose={() => setActivePage(null)} lang={lang} t={t.about} />
      )}

      {activePage === 'expertise' && (
        <ExpertiseModal 
          onClose={() => setActivePage(null)} 
          lang={lang} 
          t={t.services} 
          onSelectService={handleSelectService}
        />
      )}

      {activePage === 'engagement' && (
        <EngagementModal onClose={() => setActivePage(null)} lang={lang} t={t.hse} />
      )}

      {activePage === 'contact' && (
        <ContactModal onClose={() => setActivePage(null)} lang={lang} t={t.contact} onSendMessage={addMessage} />
      )}

      {activePage === 'admin' && (
        isAdminAuthenticated ? (
          <AdminDashboard 
            messages={messages} 
            onClose={() => setActivePage(null)} 
            onDelete={deleteMessage}
            onMarkRead={markAsRead}
          />
        ) : (
          <AdminLogin 
            onClose={() => setActivePage(null)} 
            onSuccess={handleAdminAuth} 
          />
        )
      )}
    </div>
  );
};

export default App;