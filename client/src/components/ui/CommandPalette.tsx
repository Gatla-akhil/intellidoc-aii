import React, { useState, useEffect } from 'react';
import { Search, FileText, UploadCloud, MessageSquareCode, GitCompare, BarChart3, Settings, Command, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'upload', title: 'Upload New Document (PDF, Images, ZIP, Scans)', category: 'Actions', icon: UploadCloud },
    { id: 'chat', title: 'Start RAG Chat with Knowledge Base', category: 'AI Tools', icon: MessageSquareCode },
    { id: 'compare', title: 'Compare Two Contracts or Resumes', category: 'AI Tools', icon: GitCompare },
    { id: 'documents', title: 'Browse All Documents (3 Active Files)', category: 'Navigation', icon: FileText },
    { id: 'analytics', title: 'View AI Cost & Token Metrics', category: 'Metrics', icon: BarChart3 },
    { id: 'settings', title: 'Switch AI Model (Gemini 2.5 vs GPT-5.5)', category: 'Settings', icon: Settings },
  ];

  const filtered = actions.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-800 py-3.5 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, document title, or search prompt..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">No matching actions found</div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 text-left transition-colors text-xs text-slate-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-cyan-950/50 group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.category}</p>
                    </div>
                  </div>
                  <Command className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400" />
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between items-center">
          <span>Navigate with arrows or click to select</span>
          <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
