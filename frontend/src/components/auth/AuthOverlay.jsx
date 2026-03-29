import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, Globe, Phone, Check, ChevronDown, Sprout, ShieldCheck } from 'lucide-react';

const LANGUAGES = [
  { value: 'en-IN', label: 'English', native: 'English', flag: '🇮🇳' },
  { value: 'hi-IN', label: 'Hindi',   native: 'हिन्दी',           flag: '🇮🇳' },
  { value: 'te-IN', label: 'Telugu',  native: 'తెలుగు',           flag: '🇮🇳' },
  { value: 'ta-IN', label: 'Tamil',   native: 'தமிழ்',            flag: '🇮🇳' },
  { value: 'mr-IN', label: 'Marathi', native: 'मराठी',            flag: '🇮🇳' },
  { value: 'kn-IN', label: 'Kannada', native: 'ಕನ್ನಡ',            flag: '🇮🇳' },
  { value: 'ml-IN', label: 'Malayalam', native: 'മലയാളം',         flag: '🇮🇳' },
];

export const AuthOverlay = ({ onLoginSuccess }) => {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: ''
  });

  const selectedLang = LANGUAGES.find(l => l.value === i18n.language) || LANGUAGES[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
        ? { username: formData.username, password: formData.password }
        : { 
            username: formData.username, 
            email: formData.email, 
            phone_number: formData.phone_number,
            password: formData.password,
            confirm_password: formData.confirm_password
          };

    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Authentication failed');

      localStorage.setItem('cropvision_token', data.access_token);
      localStorage.setItem('cropvision_user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020617] overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[440px] z-10"
      >
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="p-8 sm:p-10">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-10 text-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative group mb-6"
              >
                <div className="absolute inset-0 bg-primary-500/30 blur-3xl rounded-full scale-150 group-hover:bg-primary-500/50 transition-all duration-700" />
                <div className="relative bg-gradient-to-br from-primary-600 via-emerald-500 to-primary-700 p-5 rounded-3xl border border-white/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <Sprout className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </motion.div>
              
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-xs uppercase tracking-[0.5em] font-black mb-3 opacity-60">Welcome to</span>
                <motion.h1 
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl sm:text-5xl font-black tracking-tight"
                >
                  <span className="bg-gradient-to-tr from-white via-primary-200 to-primary-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    {t('auth.welcome').replace(/Welcome to |में आपका स्वागत है|ಗೆ ಸ್ವಾಗತ|కి స్వాగతం|-க்கு வரவேற்கிறோம்|मध्ये आपले स्वागत आहे|-ലേക്ക് സ്വാഗതം/g, '').trim() || 'CROPVISION'}
                  </span>
                </motion.h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent mt-5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)]" 
                />
              </div>
              <p className="text-slate-400 text-sm font-semibold max-w-[300px] leading-relaxed mt-6 italic opacity-75">
                {t('auth.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={t('auth.username')}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>

                {!isLogin && (
                  <>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder={t('auth.email')}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder={t('auth.phone_number')}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all"
                        value={formData.phone_number}
                        onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                      />
                    </div>
                  </>
                )}

                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder={t('auth.password')}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                {!isLogin && (
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <ShieldCheck className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                    </div>
                    <input
                      type="password"
                      required
                      placeholder={t('auth.confirm_password')}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all"
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                    />
                  </div>
                )}
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl"
                >
                  <p className="text-red-400 text-xs text-center font-bold uppercase tracking-wider">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-primary-600 to-emerald-600 hover:from-primary-500 hover:to-emerald-500 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-primary-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-tighter"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-white/80" />
                ) : (
                  <>
                    {isLogin ? t('auth.submitLogin') : t('auth.submitRegister')}
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-slate-400 hover:text-primary-400 transition-colors text-sm font-bold flex items-center gap-2"
              >
                <span>{isLogin ? t('auth.noAccount') : t('auth.hasAccount')}</span>
                <span className="text-primary-500 underline underline-offset-4 decoration-primary-500/30">
                  {isLogin ? t('auth.register') : t('auth.login')}
                </span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-3 px-6 py-2.5 bg-slate-800/30 border border-white/5 rounded-full text-slate-300 hover:text-white transition-all ring-1 ring-white/5 hover:ring-white/20 shadow-lg"
                >
                  <span className="text-base">{selectedLang.flag}</span>
                  <span className="text-xs font-black uppercase tracking-widest">{selectedLang.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-44 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 ring-1 ring-white/10"
                    >
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang.value}
                          onClick={() => { i18n.changeLanguage(lang.value); setLangOpen(false); }}
                          className="w-full px-4 py-2.5 text-left text-sm text-slate-400 hover:bg-primary-500/10 hover:text-primary-400 transition-all flex items-center justify-between font-bold"
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            {lang.label}
                          </span>
                          {lang.value === i18n.language && <Check className="w-4 h-4 text-primary-500" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
