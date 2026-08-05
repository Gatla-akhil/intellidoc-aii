import React from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  FileText,
  MessageSquareCode,
  GitCompare,
  Search,
  BarChart3,
  Settings,
  ShieldAlert,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: undefined },
    { id: 'upload', label: 'AI Document Upload', icon: UploadCloud, badge: 'New' },
    { id: 'documents', label: 'Document Library', icon: FileText, badge: '3' },
    { id: 'chat', label: 'AI Multi-Doc RAG Chat', icon: MessageSquareCode, badge: 'Agent' },
    { id: 'compare', label: 'AI Comparison Engine', icon: GitCompare, badge: undefined },
    { id: 'search', label: 'Semantic Search', icon: Search, badge: undefined },
    { id: 'analytics', label: 'Analytics & Costs', icon: BarChart3, badge: undefined },
    { id: 'settings', label: 'Platform Settings', icon: Settings, badge: undefined },
    { id: 'admin', label: 'Admin Security', icon: ShieldAlert, badge: undefined },
  ];

  return (
    <aside className="w-64 bg-slate-950/80 border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-61px)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-2">Core Workspace</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-transparent text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.badge === 'Agent'
                          ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                          : item.badge === 'New'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Upgrade / Agent Status Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 border border-indigo-500/20 text-left">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Autonomous OCR Agent</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Auto-processing invoices, contracts, medical reports, and tax documents with 99.8% precision.
        </p>
        <button
          onClick={() => onNavigate('landing')}
          className="w-full flex items-center justify-center space-x-1.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] transition-colors shadow-md shadow-cyan-500/20"
        >
          <span>View SaaS Features</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
