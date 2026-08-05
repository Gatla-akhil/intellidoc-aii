import React from 'react';
import { AlertCircle } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (tab: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-100">404 — Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm">The requested document route or view does not exist in IntelliDoc AI workspace.</p>
      <button
        onClick={() => onNavigate('dashboard')}
        className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
      >
        Return to Dashboard
      </button>
    </div>
  );
};
