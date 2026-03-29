import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon, LogOut, ChevronDown, UserCircle2, Settings, Shield } from 'lucide-react';

export const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative pointer-events-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800/40 pl-2 pr-4 py-1.5 rounded-full border border-white/10 hover:border-primary-500/30 transition-all duration-300 group"
      >
        <div className="p-1 bg-primary-500/20 rounded-full group-hover:bg-primary-500/30 transition-colors">
          <UserIcon className="w-3.5 h-3.5 text-primary-400" />
        </div>
        <span className="text-xs font-bold text-white uppercase tracking-wider">{user?.username}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ backgroundColor: '#0f172a', pointerEvents: 'auto' }}
            className="absolute right-0 mt-3 w-64 rounded-[32px] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-[9999] overflow-hidden p-2"
          >
            {/* User Header */}
            <div className="px-5 py-5 bg-white/[0.03] rounded-[24px] mb-2 border border-white/5">
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-primary-500/10 rounded-2xl border border-primary-500/20">
                   <UserCircle2 className="w-9 h-9 text-primary-400" />
                 </div>
                 <div className="overflow-hidden">
                   <p className="text-sm font-black text-white uppercase tracking-widest truncate">{user?.username || 'Farmer'}</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{user?.email || 'Premium Member'}</p>
                 </div>
               </div>
            </div>

            <div className="flex flex-col gap-1 p-1">
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all group opacity-50 cursor-not-allowed">
                <Settings className="w-4 h-4 text-slate-500 group-hover:text-primary-400 transition-colors" />
                <span className="font-bold uppercase tracking-wider text-[10px]">Account Profile</span>
              </button>
              
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all group opacity-50 cursor-not-allowed">
                <Shield className="w-4 h-4 text-slate-500 group-hover:text-primary-400 transition-colors" />
                <span className="font-bold uppercase tracking-wider text-[10px]">Privacy & Guard</span>
              </button>

              <div className="h-px bg-white/5 my-2 mx-3" />

              <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-black uppercase tracking-widest shadow-inner"
              >
                <LogOut className="w-4 h-4" />
                <span>End Session</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
