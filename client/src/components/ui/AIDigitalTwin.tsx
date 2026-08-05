import React, { useState } from 'react';
import { Cpu, Sparkles, ArrowRight, X } from 'lucide-react';

interface AIDigitalTwinProps {
  onNavigate: (tab: string) => void;
}

export const AIDigitalTwin: React.FC<AIDigitalTwinProps> = ({ onNavigate }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-cyan-950/80 border border-purple-500/30 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/40 shrink-0">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-xs font-bold text-slate-100">AI Digital Twin Prediction</h4>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
              95% Confidence
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Based on your workstyle memory: <span className="text-cyan-400 font-bold">Export Invoice #INV-2026-8849 to CSV & sync with Slack</span>.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        <button
          onClick={() => onNavigate('documents')}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center space-x-1 cursor-pointer"
        >
          <span>Execute Shortcut</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setDismissed(true)} className="p-1.5 text-slate-500 hover:text-slate-300">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
