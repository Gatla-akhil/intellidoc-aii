import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Command,
  Sun,
  Moon,
  Zap,
  LayoutDashboard,
  UploadCloud,
  FileText,
  MessageSquareCode,
  GitCompare,
  BarChart3,
  Settings,
  ShieldAlert,
  GitBranch,
  Network,
  Wand2,
  Mic,
  Wrench,
  Plug,
  Activity,
  ShieldCheck,
  BookOpen,
  Bot,
  Presentation,
  Hash,
  History,
  LogOut,
} from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenCommandPalette: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  user?: { name: string; email: string; role: string; avatarUrl: string } | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenCommandPalette,
  isDark,
  onToggleTheme,
  user,
  onLogout,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const horizontalNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'autonomous', label: 'Autonomous AI Assistant', icon: Bot, highlight: true },
    { id: 'upload', label: 'Upload & Process', icon: UploadCloud },
    { id: 'documents', label: 'Document Library', icon: FileText },
    { id: 'history', label: 'History & Logs', icon: History },
    { id: 'chat', label: 'RAG AI Chat', icon: MessageSquareCode },
    { id: 'workflow', label: 'AI Workflow Builder', icon: GitBranch },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'generator', label: 'Doc Generator', icon: Wand2 },
    { id: 'report-gen', label: 'Report & Decks', icon: Presentation },
    { id: 'ledger', label: 'Blockchain Audit', icon: Hash },
    { id: 'meeting', label: 'Meeting Mode', icon: Mic },
    { id: 'mcp', label: 'MCP Marketplace', icon: Plug },
    { id: 'twin', label: 'Digital Twin', icon: Activity },
    { id: 'security', label: 'Security Hub', icon: ShieldCheck },
    { id: 'prompts', label: 'AI Prompts', icon: BookOpen },
    { id: 'compare', label: 'AI Compare', icon: GitCompare },
    { id: 'search', label: 'Semantic Search', icon: Search },
    { id: 'tools', label: 'AI Tools', icon: Wrench },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-slate-950/85 border-b border-slate-800/80 transition-all duration-300">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => onNavigate('landing')}>
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight gradient-text">IntelliDoc AI</span>
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-400 border border-cyan-500/40 uppercase">
                Futurist Edition
              </span>
            </div>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center space-x-3">
          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl px-3 py-1.5 text-xs transition-all duration-200 shadow-inner group cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search or press</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Quick History Button */}
          <button
            onClick={() => onNavigate('history')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            title="View Action History"
          >
            <History className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Smart Notification Center */}
          <NotificationCenter />

          {/* AI Model Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
            <span>Gemini 2.5 Pro Active</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors cursor-pointer"
            title="Toggle Dark / Light Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* User Profile Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 cursor-pointer p-1.5 pr-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop'}
                alt={user?.name || 'User'}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-cyan-500/40 shrink-0"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-200 leading-none">{user?.name || 'Alex Rivera'}</p>
                <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{user?.role || 'ADMIN'}</p>
              </div>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/60 overflow-hidden z-50">
                <div className="p-4 border-b border-slate-800">
                  <p className="text-xs font-bold text-slate-100">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => { onNavigate('settings'); setShowUserMenu(false); }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-slate-800 text-xs text-slate-300 transition-colors text-left cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Settings & API Keys</span>
                  </button>
                  <button
                    onClick={() => { if (onLogout) onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-red-950/40 hover:border hover:border-red-500/30 text-xs text-red-400 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Nav Bar (Pill Tabs Dock) */}
      <div className="border-t border-slate-900 bg-slate-950/90 px-4 lg:px-8 py-1.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center space-x-1.5 min-w-max">
          {horizontalNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
