import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldAlert, Droplets, Sun, Beaker, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import { scaleUp } from '../../utils/animations';
import { useTranslation } from 'react-i18next';

export const ResultCard = ({ result, language = "en-IN" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();
  const audioRef = useRef(null);

  const stoppedRef = useRef(false);

  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Split text into sentence chunks for parallel fetching
  const splitChunks = (text) => {
    const parts = text.match(/[^.!?।]+[.!?।]*/g) || [text];
    const chunks = [];
    let current = '';
    for (const p of parts) {
      if (current && (current + p).length > 200) {
        chunks.push(current.trim());
        current = p;
      } else {
        current = current ? current + ' ' + p : p;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.length ? chunks : [text];
  };

  const fetchChunk = async (chunk, language) => {
    const fd = new FormData();
    fd.append('text', chunk);
    fd.append('language', language);
    const res = await fetch('http://localhost:8000/api/diagnostics/tts', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('TTS chunk failed');
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  };

  const playUrl = (url) => new Promise((resolve) => {
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
    audio.onerror = () => { URL.revokeObjectURL(url); resolve(); };
    audio.play().catch(resolve);
  });

  const toggleSpeech = async () => {
    if (isPlaying) {
      stoppedRef.current = true;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      setIsPlaying(false);
      return;
    }

    stoppedRef.current = false;
    const text = `${result.disease}. ${result.treatment_chemical}. ${result.treatment_organic}. ${result.climate_impact}.`;
    const chunks = splitChunks(text);

    try {
      setIsPlaying(true);

      // Fire all chunk fetches in parallel
      const fetchPromises = chunks.map(c => fetchChunk(c, language));

      // Play each chunk sequentially as its promise resolves
      for (let i = 0; i < fetchPromises.length; i++) {
        if (stoppedRef.current) break;
        const url = await fetchPromises[i];
        if (stoppedRef.current) { URL.revokeObjectURL(url); break; }
        await playUrl(url);
      }
    } catch (err) {
      console.error('TTS error:', err);
    } finally {
      if (!stoppedRef.current) setIsPlaying(false);
    }
  };

  if (!result) return null;

  const getStatusColor = (confidence) => {
    if (confidence > 0.90) return 'text-emerald-400 bg-emerald-900/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    if (confidence > 0.70) return 'text-amber-400 bg-amber-900/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
    return 'text-red-400 bg-red-900/30 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
  };

  const isHealthy = result.disease.toLowerCase().includes('healthy');

  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto mt-16 p-1 rounded-[28px] glass-panel"
    >
      <div className="bg-slate-900/70 backdrop-blur-xl rounded-[26px] p-8 border border-white/5 h-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-6 gap-4">
          <h3 className="text-2xl font-black text-white flex items-center gap-3 drop-shadow-lg">
            {isHealthy ? <CheckCircle className="text-emerald-400 w-9 h-9 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"/> : <ShieldAlert className="text-orange-400 w-9 h-9 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]"/>}
            {result.disease}
          </h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSpeech}
              title="Read Aloud in Regional Language"
              className={`p-2.5 rounded-full transition-all border shadow-[0_4px_15px_rgba(0,0,0,0.5)] ${isPlaying ? 'bg-primary-500/20 border-primary-400 text-primary-400 neon-glow' : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border-white/10'}`}
            >
              {isPlaying ? <VolumeX className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <span className={`px-5 py-2 rounded-full text-sm font-bold border tracking-wide whitespace-nowrap ${getStatusColor(result.confidence)}`}>
              {t('result.confidence')}: {(result.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.01 }} className="p-5 glass-card rounded-2xl group flex flex-col gap-1 cursor-default">
            <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-lg drop-shadow-md">
              <Beaker className="w-5 h-5 text-blue-400" /> {t('result.synthetic')}
            </h4>
            <p className="text-slate-300 font-medium leading-relaxed">{result.treatment_chemical}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="p-5 glass-card rounded-2xl group flex flex-col gap-1 cursor-default">
            <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-lg drop-shadow-md">
              <Leaf className="w-5 h-5 text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all" /> {t('result.organic')}
            </h4>
            <p className="text-slate-300 font-medium leading-relaxed">{result.treatment_organic}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="flex gap-4 p-5 glass-card rounded-2xl group cursor-default">
            <div className="flex-1">
               <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-lg drop-shadow-md">
                <Sun className="w-5 h-5 text-amber-400" /> {t('result.climate')}
              </h4>
              <span className="text-slate-300 font-medium text-[15px]">{result.climate_impact}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
