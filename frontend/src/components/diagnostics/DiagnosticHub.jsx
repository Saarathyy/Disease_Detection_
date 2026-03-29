import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Mic, X, Loader2, PlaySquare, Globe, ChevronDown, Check } from 'lucide-react';
import { ResultCard } from './ResultCard';
import { fadeIn, staggerContainer, floatingAnimation, breathingGlow } from '../../utils/animations';
import { useTranslation } from 'react-i18next';

const LoadingSteps = () => {
  const { t } = useTranslation();
  const STEPS = t('hub.loadingSteps', { returnObjects: true });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % STEPS.length), 2200);
    return () => clearInterval(id);
  }, [STEPS.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={step}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        className="text-indigo-300 text-sm font-medium"
      >
        {STEPS[step]}
      </motion.p>
    </AnimatePresence>
  );
};

const DashboardLanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en-IN', name: 'English', native: 'English' },
    { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
    { code: 'mr-IN', name: 'Marathi', native: 'मराठी' },
    { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' }
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-slate-900/80 border border-primary-500/30 rounded-2xl hover:border-primary-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.1)] group"
      >
        <Globe className="w-5 h-5 text-primary-400 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-black text-white uppercase tracking-widest">{currentLanguage.native}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 rounded-[28px] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-[100] p-2"
            style={{ backgroundColor: '#0f172a' }}
          >
            <div className="flex flex-col gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm transition-all ${
                    i18n.language === lang.code
                      ? 'bg-primary-500 text-white font-black'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-base font-bold leading-tight">{lang.native}</span>
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${i18n.language === lang.code ? 'text-white/70' : 'text-slate-500'}`}>
                      {lang.name}
                    </span>
                  </div>
                  {i18n.language === lang.code && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DiagnosticHub = () => {
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const languageRef = useRef(language);
  const autoStopRef = useRef(null);

  // Keep languageRef in sync so onstop always uses current language
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  // Voice Interaction Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const response = await fetch("http://localhost:8000/api/diagnostics/analyze-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to AI server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Pick best supported MIME type
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/ogg';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (autoStopRef.current) { clearTimeout(autoStopRef.current); autoStopRef.current = null; }
        const chunks = audioChunksRef.current;
        if (!chunks.length) {
          setVoiceLoading(false);
          alert("No audio recorded. Please try again.");
          return;
        }

        const audioBlob = new Blob(chunks, { type: mimeType });
        const currentLang = languageRef.current;

        setVoiceLoading(true);
        try {
          const formData = new FormData();
          formData.append("voice_note", audioBlob, "symptoms.webm");
          formData.append("language", currentLang);

          const response = await fetch("http://localhost:8000/api/diagnostics/analyze-voice", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Voice RAG analysis failed");

          const data = await response.json();
          setResult(data);
        } catch (err) {
          console.error(err);
          alert("Failed to analyze voice. Ensure backend is running.");
        } finally {
          setVoiceLoading(false);
          stream.getTracks().forEach(track => track.stop());
        }
      };

      // timeslice=250ms ensures ondataavailable fires regularly
      mediaRecorder.start(250);
      setIsRecording(true);
      setResult(null);

      // Auto-stop after 15 seconds
      autoStopRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      }, 15000);

    } catch (err) {
      console.error(err);
      alert("Microphone access denied or unsupported by this browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={fadeIn} className="text-center mb-16 relative z-50">
        <motion.div
          animate={floatingAnimation}
          className="w-24 h-24 bg-primary-500/20 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
        />
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-2xl relative z-10">
          KrishiNetra <span className="text-primary-400">AI</span>
        </h2>
  <p className="mt-6 max-w-2xl text-xl text-slate-300 mx-auto font-medium drop-shadow-md relative z-10">
    {t('hub.subtitle')}
  </p>

  {/* NEW: Primary Dashboard Language Dropdown */}
  <div className="mt-10 flex justify-center relative z-[60]">
    <DashboardLanguageDropdown />
  </div>
</motion.div >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        
        {/* Image Upload Area */}
        <motion.div variants={fadeIn} className="h-full flex flex-col">
          <div 
            {...getRootProps()} 
            className={`flex-grow glass-section rounded-3xl p-1 border-2 transition-all duration-500 cursor-pointer ${
              isDragActive 
                ? 'border-primary-400 bg-primary-900/40 neon-glow' 
                : 'border-white/20 hover:border-primary-500/60 glass-panel hover:bg-slate-900/40'
            }`}
          >
            <input {...getInputProps()} />
            
            <div className="h-full min-h-[320px] rounded-3xl flex flex-col items-center justify-center p-8 bg-slate-900/50 backdrop-blur-md">
                {!file ? (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <motion.div 
                      animate={floatingAnimation}
                      className="p-6 bg-gradient-to-br from-primary-500/20 to-emerald-900/40 rounded-full border border-primary-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                    >
                      <UploadCloud className="w-14 h-14 text-primary-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                    </motion.div>
                    <div>
                      <p className="text-white font-bold text-xl drop-shadow-md">{t('hub.dragDrop')}</p>
                      <p className="text-slate-400 font-medium mt-2 text-sm">{t('hub.browse')}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative inline-block h-full w-full flex items-center justify-center">
                    <img 
                      src={file.preview} 
                      alt="Crop preview" 
                      className="max-h-64 object-contain rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] ring-2 ring-primary-500/50"
                      onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }}
                      className="absolute -top-4 -right-4 p-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
            </div>
          </div>

          <AnimatePresence>
            {file && !result && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-6 w-full py-5 bg-gradient-to-r from-primary-600 to-emerald-500 text-white rounded-2xl font-black text-xl hover:from-primary-500 hover:to-emerald-400 transition-all neon-glow flex items-center justify-center gap-3 border border-primary-400 uppercase tracking-widest"
              >
                {loading ? <Loader2 className="w-7 h-7 animate-spin drop-shadow-md" /> : <PlaySquare className="w-7 h-7 drop-shadow-md" />}
                <span className="drop-shadow-md">{loading ? t('hub.processing') : t('hub.initiateScan')}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Voice Diagnostics Area */}
        <motion.div variants={fadeIn} className="glass-panel rounded-3xl p-1 border-white/20 h-full">
           <div className="h-full bg-slate-900/50 rounded-[22px] flex flex-col justify-center items-center backdrop-blur-md relative group" style={{minHeight: '320px'}}>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-primary-600/10"></div>

              {/* Loading overlay — shown while AI is processing voice */}
              <AnimatePresence>
                {voiceLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-[22px] flex flex-col items-center justify-center gap-5 z-30"
                    style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(8px)' }}
                  >
                    {/* Pulsing ring */}
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-500/30"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                        className="absolute w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-400/40"
                      />
                      <Loader2 className="w-8 h-8 text-indigo-400 animate-spin relative z-10" />
                    </div>

                    {/* Animated loading steps */}
                    <div className="flex flex-col items-center gap-2 text-center px-6">
                      <p className="text-white font-bold text-lg">{t('hub.analyzingVoice')}</p>
                      <LoadingSteps />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col items-center gap-8 text-center p-8 w-full" style={{position:'relative', zIndex:10}}>
                  
                  {/* Mic Button */}
                  <div className="relative flex justify-center items-center" style={{width:120, height:120}}>
                    {isRecording && (
                      <>
                        <motion.div
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 2.2 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                          style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid rgba(239,68,68,0.6)' }}
                        />
                        <motion.div
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.6 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                          style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid rgba(239,68,68,0.8)' }}
                        />
                      </>
                    )}
                    <button
                      type="button"
                      onClick={toggleRecording}
                      disabled={voiceLoading}
                      style={{
                        position: 'relative',
                        zIndex: 20,
                        width: 104,
                        height: 104,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: isRecording ? '2px solid #f87171' : voiceLoading ? '2px solid #475569' : '2px solid rgba(16,185,129,0.5)',
                        background: isRecording ? 'rgba(239,68,68,0.15)' : voiceLoading ? 'rgba(51,65,85,0.4)' : 'rgba(6,78,59,0.3)',
                        cursor: voiceLoading ? 'not-allowed' : 'pointer',
                        opacity: voiceLoading ? 0.6 : 1,
                        transition: 'all 0.2s',
                        outline: 'none',
                      }}
                    >
                      <Mic className={`w-12 h-12 ${isRecording ? 'text-red-400' : 'text-emerald-400'}`} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-2xl mb-1 drop-shadow-md">{t('hub.voiceTitle')}</h3>
                    <p className="text-slate-400 font-medium text-sm max-w-[220px] mx-auto leading-relaxed">
                      {isRecording ? t('hub.tapToStop') : t('hub.voiceSubtitle')}
                    </p>
                    <div className="mt-5">
                      <span className={`inline-block px-4 py-1.5 rounded-full border font-bold text-xs tracking-widest uppercase shadow-sm transition-all duration-300 ${
                        isRecording
                          ? 'border-red-500/50 bg-red-900/30 text-red-400 animate-pulse'
                          : voiceLoading
                          ? 'border-indigo-500/50 bg-indigo-900/40 text-indigo-300 animate-pulse'
                          : 'border-white/10 bg-slate-800/80 text-slate-400'
                      }`}>
                        {voiceLoading ? t('hub.analyzing') : isRecording ? t('hub.recording') : t('hub.tapMic')}
                      </span>
                    </div>
                  </div>
              </div>
           </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {result && <ResultCard result={result} language={language} />}
      </AnimatePresence>
    </motion.div >
  );
};
