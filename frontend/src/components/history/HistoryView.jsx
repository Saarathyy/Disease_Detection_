import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Leaf, Activity } from 'lucide-react';
import { staggerContainer, fadeIn, scaleUp } from '../../utils/animations';

const MOCK_SCANS = [
  { id: 1, date: '2026-03-25', disease: 'Leaf Rust', status: 'Treated', confidence: 0.92 },
  { id: 2, date: '2026-03-10', disease: 'Healthy', status: 'Optimal', confidence: 0.98 },
  { id: 3, date: '2026-02-28', disease: 'Nitrogen Deficiency', status: 'Requires Attention', confidence: 0.85 }
];

export const HistoryView = () => {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-6 h-full"
    >
      <motion.div variants={fadeIn} className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-white tracking-tight flex justify-center items-center gap-3 drop-shadow-lg">
          <Calendar className="w-10 h-10 text-primary-400" />
          History & Crop Life-Cycle
        </h2>
        <p className="mt-4 text-lg text-slate-300">Track your past diagnostic scans and manage upcoming crop milestones.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Past Scans Tracker */}
        <motion.div variants={fadeIn} className="glass-panel rounded-3xl p-8 h-full">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow-md">
            <Clock className="w-6 h-6 text-indigo-400" /> Past Diagnoses
          </h3>
          
          <div className="space-y-4">
            {MOCK_SCANS.map((scan) => (
              <motion.div 
                key={scan.id}
                variants={scaleUp}
                className="flex items-center justify-between p-4 glass-card rounded-2xl group cursor-default"
              >
                <div>
                  <h4 className="font-bold text-white text-lg">{scan.disease}</h4>
                  <span className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                     <Activity className="w-4 h-4 text-primary-400"/> {scan.date}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                    scan.status === 'Healthy' || scan.status === 'Optimal' 
                      ? 'border-emerald-500/50 text-emerald-400 bg-emerald-900/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : scan.status === 'Treated'
                      ? 'border-blue-500/50 text-blue-400 bg-blue-900/30'
                      : 'border-orange-500/50 text-orange-400 bg-orange-900/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                   }`}>
                    {scan.status}
                  </span>
                  <div className="text-xs text-slate-400 mt-2 font-medium">
                    {scan.confidence * 100}% Confidence
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Crop Calendar Timeline */}
        <motion.div variants={fadeIn} className="glass-panel rounded-3xl p-8 h-full">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow-md">
             <Leaf className="w-6 h-6 text-emerald-400" /> Wheat Growth Timeline
          </h3>
          
          <div className="relative border-l-2 border-primary-500/30 ml-4 space-y-10 pl-8 py-2">
            
            <div className="relative">
              <span className="absolute -left-[41px] bg-emerald-500 w-5 h-5 rounded-full border-4 border-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.6)] ring-2 ring-emerald-500/50" />
              <h4 className="font-bold text-white text-lg drop-shadow-md">Sowing Phase <span className="text-sm font-normal text-slate-400 ml-2">Completed</span></h4>
              <p className="text-slate-300 mt-1 font-medium">Seeds were successfully planted with adequate base moisture.</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[41px] bg-indigo-500 w-5 h-5 rounded-full border-4 border-slate-900 shadow-[0_0_15px_rgba(99,102,241,0.6)] ring-2 ring-indigo-500/50 animate-pulse" />
              <h4 className="font-bold text-white text-lg drop-shadow-md">Vegetative Stage <span className="text-sm font-bold text-indigo-400 ml-2 border border-indigo-500/30 px-2 py-0.5 rounded-md bg-indigo-900/20">Current</span></h4>
              <div className="mt-3 p-4 bg-indigo-900/30 rounded-xl text-indigo-100 border border-indigo-500/30 shadow-inner">
                <p className="font-bold text-sm text-indigo-300">Action Required:</p>
                <p className="text-sm mt-1">Apply second round of Nitrogen-based fertilizer this week for optimal tiller growth.</p>
              </div>
            </div>

            <div className="relative opacity-60 hover:opacity-100 transition-all">
              <span className="absolute -left-[41px] bg-slate-600 w-5 h-5 rounded-full border-4 border-slate-900" />
              <h4 className="font-bold text-slate-300 text-lg">Flowering Stage <span className="text-sm font-normal ml-2">Upcoming in 14 days</span></h4>
              <p className="text-slate-400 mt-1">Prepare irrigation reserves. High water demand period initiated.</p>
            </div>

             <div className="relative opacity-40 hover:opacity-100 transition-all">
              <span className="absolute -left-[41px] bg-slate-600 w-5 h-5 rounded-full border-4 border-slate-900" />
              <h4 className="font-bold text-slate-300 text-lg">Harvest Readiness</h4>
              <p className="text-slate-400 mt-1">Expected visual cues: crop yellowing and grain hardening.</p>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
