import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DiagnosticHub } from './components/diagnostics/DiagnosticHub';
import { HistoryView } from './components/history/HistoryView';
import { Marketplace } from './components/store/Marketplace';
import { AdvisoryPortal } from './components/advisory/AdvisoryPortal';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { AuthOverlay } from './components/auth/AuthOverlay';
import { Sprout, Phone, LogOut, User as UserIcon } from 'lucide-react';
import './index.css';

// Floating Pill Navigation Component
const PremiumNavbar = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.diagnostics'), path: '/' },
    { name: t('nav.history'), path: '/history' },
    { name: t('nav.store'), path: '/store' },
    { name: t('nav.advisory'), path: '/advisory' }
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-5xl rounded-full bg-slate-900/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex justify-between items-center px-3 py-2.5 transition-all">
        <Link to="/" className="flex items-center gap-2 text-primary-400 group pl-3">
          <div className="p-1.5 bg-primary-900/60 rounded-full border border-primary-500/40 group-hover:bg-primary-500/30 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter drop-shadow-md text-white">KrishiNetra <span className="text-primary-400">AI</span></span>
        </Link>

        <div className="hidden md:flex bg-slate-950/40 px-2 py-1.5 rounded-full border border-white/5 items-center gap-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 text-sm font-bold tracking-wide rounded-full transition-all duration-300 ${isActive
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

        <div className="flex items-center gap-3 mr-4">
          <div className="hidden md:flex items-center gap-3 pr-4 border-r border-white/10 mr-4">
            <div className="flex items-center gap-2 bg-slate-800/40 pl-2 pr-4 py-1.5 rounded-full border border-white/10">
              <UserIcon className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-bold text-white uppercase">{user?.username}</span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 transition-colors bg-white/5 rounded-full"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Phone className="w-3.5 h-3.5" />
            <span>{t('nav.expertCall')}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('cropvision_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cropvision_token');
    localStorage.removeItem('cropvision_user');
    setUser(null);
  };

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden relative font-sans">
        <div className="global-overlay max-h-screen fixed inset-0 z-0"></div>
        <AmbientBackground />

        <div
          className="pointer-events-none fixed inset-0 z-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.08), transparent 40%)`
          }}
        />

        {!user ? (
          <AuthOverlay onLoginSuccess={(u) => setUser(u)} />
        ) : (
          <div className="relative z-30 flex flex-col min-h-screen">
            <PremiumNavbar user={user} onLogout={handleLogout} />
            <main className="flex-1 mt-32 pb-20">
              <Routes>
                <Route path="/" element={<DiagnosticHub />} />
                <Route path="/history" element={<HistoryView />} />
                <Route path="/store" element={<Marketplace />} />
                <Route path="/advisory" element={<AdvisoryPortal />} />
              </Routes>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
