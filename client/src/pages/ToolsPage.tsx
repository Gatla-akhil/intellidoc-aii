import React, { useState } from 'react';
import { Mail, FormInput, WifiOff, Chrome, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const ToolsPage: React.FC = () => {
  const [autoFilled, setAutoFilled] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">AI Automation Tools & Browser Extensions</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            Smart Ecosystem
          </span>
        </div>
        <p className="text-xs text-slate-400">AI Form Auto-Fill, Email Attachment Watcher, Browser Extensions, and Offline AI Mode.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tool 1: AI Form Auto-Fill */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <FormInput className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">AI Form Auto-Fill Engine</h3>
              <p className="text-[11px] text-slate-400">Upload ID or Invoice to auto-fill web forms instantly</p>
            </div>
          </div>

          <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block">Full Name:</label>
              <input
                type="text"
                readOnly
                value={autoFilled ? 'Dr. Evelyn Vance' : ''}
                placeholder="Click Auto-Fill to populate..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block">Tax Registration / Tax ID:</label>
              <input
                type="text"
                readOnly
                value={autoFilled ? 'US994821034-TAX' : ''}
                placeholder="Click Auto-Fill to populate..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200"
              />
            </div>
          </div>

          <button
            onClick={() => setAutoFilled(true)}
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            {autoFilled ? '✓ Form Populated via OCR' : 'Simulate Form Auto-Fill'}
          </button>
        </SpotlightCard>

        {/* Tool 2: Offline AI Mode Toggle */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Local Offline AI Model Engine</h3>
              <p className="text-[11px] text-slate-400">Process documents locally without internet connection</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-semibold">Local Small Language Model (WebLLM):</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${offlineMode ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>
                {offlineMode ? 'ACTIVE (OFFLINE)' : 'OFF (CLOUD)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              When offline mode is active, document parsing runs 100% inside your browser using WebAssembly.
            </p>
          </div>

          <button
            onClick={() => setOfflineMode(!offlineMode)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs transition-colors cursor-pointer"
          >
            {offlineMode ? 'Switch to Cloud Gemini 2.5' : 'Enable Offline AI Engine'}
          </button>
        </SpotlightCard>
      </div>
    </div>
  );
};
