import React, { useState } from 'react';
import { Bot, Sparkles, X, ChevronRight, CheckCircle2 } from 'lucide-react';

interface AIAvatarGuideProps {
  onNavigate: (tab: string) => void;
}

export const AIAvatarGuide: React.FC<AIAvatarGuideProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const tips = [
    { text: 'Try comparing 2 legal contracts side-by-side in AI Compare', tab: 'compare' },
    { text: 'Build a no-code document pipeline in AI Workflow Builder', tab: 'workflow' },
    { text: 'Ask questions with exact citations in RAG AI Chat', tab: 'chat' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 text-left">
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="p-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-slate-950 shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center space-x-2"
        >
          <Bot className="w-5 h-5 text-slate-950" />
          <span className="text-xs font-bold pr-1 text-slate-950">AI Guide</span>
        </button>
      ) : (
        <div className="w-80 bg-slate-900/95 border border-purple-500/40 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 flex items-center space-x-1">
                  <span>AI Avatar Assistant</span>
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </h4>
                <p className="text-[10px] text-slate-400">Proactive SaaS Platform Guide</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setMinimized(true)} className="text-slate-400 hover:text-slate-200 text-xs px-1">
                _
              </button>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200 text-xs px-1">
                ✕
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Welcome to <span className="text-cyan-400 font-bold">IntelliDoc AI</span>! I can guide you through our 2026 feature suite.
          </p>

          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Recommended Actions:</span>
            {tips.map((t, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(t.tab)}
                className="w-full p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors flex items-center justify-between text-left group cursor-pointer"
              >
                <span className="truncate pr-2">{t.text}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
