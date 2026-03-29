import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DiagnosticHub } from './components/diagnostics/DiagnosticHub';
import { HistoryView } from './components/history/HistoryView';
import { Marketplace } from './components/store/Marketplace';
import { AdvisoryPortal } from './components/advisory/AdvisoryPortal';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Sprout, Phone, Globe } from 'lucide-react';
import './index.css';

// Floating Pill Navigation Component
const PremiumNavbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en-IN' ? 'hi-IN' : 'en-IN';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.diagnostics'), path: '/' },
    { name: t('nav.history'), path: '/history' },
    { name: t('nav.store'), path: '/store' },
    { name: t('nav.advisory'), path: '/advisory' }
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
       {/* Pointer-events-auto allows the glass pill itself to be clickable while the full-width wrapper doesn't block clicks */}
       <nav className="pointer-events-auto w-full max-w-5xl rounded-full bg-slate-900/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex justify-between items-center px-3 py-2.5 transition-all">
          
          <Link to="/" className="flex items-center gap-2 text-primary-400 group pl-3">
             <div className="p-1.5 bg-primary-900/60 rounded-full border border-primary-500/40 group-hover:bg-primary-500/30 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <Sprout className="w-5 h-5" />
             </div>
             <span className="text-xl font-black tracking-tighter drop-shadow-md text-white">KrishiNetra <span className="text-primary-400">AI</span></span>
          </Link>

          <div className="hidden md:flex bg-slate-950/40 px-2 py-1.5 rounded-full border border-white/5 items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                 <Link 
                   key={link.path}
                   to={link.path} 
                   className={`relative px-4 py-1.5 text-sm font-bold tracking-wide rounded-full transition-all duration-300 ${
                     isActive 
                        ? 'text-white' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                   }`}
                 >
                   {isActive && (
                     <span className="absolute inset-0 rounded-full bg-primary-500/20 border border-primary-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)] pointer-events-none" />
                   )}
                   <span className="relative z-10">{link.name}</span>
                 </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-all font-bold tracking-wider uppercase border border-white/10 px-3 py-1.5 rounded-full bg-slate-800/60 backdrop-blur-md shadow-sm text-xs hover:border-white/30"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{i18n.language.split('-')[0].toUpperCase()}</span>
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-emerald-500 text-white px-5 py-2 rounded-full font-black uppercase text-xs tracking-wider hover:from-primary-500 hover:to-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all border border-primary-400/50">
              <Phone className="w-3.5 h-3.5 hidden sm:block shadow-sm" />
              <span className="hidden sm:block drop-shadow-sm">{t('nav.expertCall')}</span>
            </button>
          </div>
       </nav>
    </div>
  );
};

// Root Component rendering the Mouse Tracking Background & App Router
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    // Add throttled event listener or just raw mousemove for highly precise tracking
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <Router>
      {/* Structural Layers Container */}
      <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden relative font-sans">
        
        {/* Layer 1: Global Background Image (CSS classes in index.css body) */}
        
        {/* Layer 2: Dark Overlay to crush the background brightness */}
        <div className="global-overlay max-h-screen fixed inset-0 z-0"></div>

        {/* Layer 3: Moving Orbs Background Elements */}
        <AmbientBackground />

        {/* Layer 4: Global Mouse Pointer Spotlight */}
        <div 
           className="pointer-events-none fixed inset-0 z-20"
           style={{
             background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.08), transparent 40%)`
           }}
        />

        {/* Layer 5: App UI */}
        <div className="relative z-30 flex flex-col min-h-screen">
          <PremiumNavbar />
          
          <main className="flex-1 mt-32 pb-20">
            <Routes>
              <Route path="/" element={<DiagnosticHub />} />
              <Route path="/history" element={<HistoryView />} />
              <Route path="/store" element={<Marketplace />} />
              <Route path="/advisory" element={<AdvisoryPortal />} />
            </Routes>
          </main>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
