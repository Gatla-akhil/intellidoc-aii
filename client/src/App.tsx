import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/ui/CommandPalette';
import { VoiceAssistant } from './components/ai/VoiceAssistant';
import { AIAvatarGuide } from './components/ui/AIAvatarGuide';
import { AIDigitalTwin } from './components/ui/AIDigitalTwin';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { HistoryPage } from './pages/HistoryPage';
import { AIChatPage } from './pages/AIChatPage';
import { AutonomousAssistantPage } from './pages/AutonomousAssistantPage';
import { ReportGeneratorPage } from './pages/ReportGeneratorPage';
import { BlockchainAuditPage } from './pages/BlockchainAuditPage';
import { PromptLibraryPage } from './pages/PromptLibraryPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { GeneratorPage } from './pages/GeneratorPage';
import { MeetingModePage } from './pages/MeetingModePage';
import { MCPMarketplacePage } from './pages/MCPMarketplacePage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { SecurityHubPage } from './pages/SecurityHubPage';
import { ToolsPage } from './pages/ToolsPage';
import { ComparePage } from './pages/ComparePage';
import { SearchPage } from './pages/SearchPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

interface AuthUser {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>(undefined);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // ── AUTH STATE ──
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // On mount: restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('intellidoc_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.email) setAuthUser(parsed);
      } catch {}
    }
    setAuthChecked(true);
  }, []);

  const handleLoginSuccess = (user: AuthUser) => {
    setAuthUser(user);
    localStorage.setItem('intellidoc_user', JSON.stringify(user));
    setCurrentTab('landing');
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('intellidoc_user');
    localStorage.removeItem('intellidoc_token');
    setCurrentTab('landing');
  };

  const handleNavigate = (tab: string, docId?: string) => {
    setCurrentTab(tab);
    if (docId) setSelectedDocId(docId);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  // ── Loading check ──
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
          <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
    );
  }

  // ── Show Login if not authenticated ──
  if (!authUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // ── Authenticated App Shell ──
  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-950 text-slate-100' : 'light bg-slate-50 text-slate-900'} flex flex-col font-sans relative`}>
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        user={authUser}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {currentTab !== 'landing' && (
          <div className="px-4 lg:px-8 pt-4 max-w-7xl mx-auto w-full">
            <AIDigitalTwin onNavigate={handleNavigate} />
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          {currentTab === 'landing'    && <LandingPage onNavigate={handleNavigate} />}
          {currentTab === 'dashboard'  && <DashboardPage onNavigate={handleNavigate} />}
          {currentTab === 'autonomous' && <AutonomousAssistantPage />}
          {currentTab === 'upload'     && <UploadPage onNavigate={handleNavigate} />}
          {currentTab === 'documents'  && <DocumentDetailPage documentId={selectedDocId} onNavigate={handleNavigate} />}
          {currentTab === 'history'    && <HistoryPage />}
          {currentTab === 'chat'       && <AIChatPage />}
          {currentTab === 'report-gen' && <ReportGeneratorPage />}
          {currentTab === 'ledger'     && <BlockchainAuditPage />}
          {currentTab === 'prompts'    && <PromptLibraryPage onNavigate={handleNavigate} />}
          {currentTab === 'workflow'   && <WorkflowPage />}
          {currentTab === 'graph'      && <KnowledgeGraphPage />}
          {currentTab === 'generator'  && <GeneratorPage />}
          {currentTab === 'meeting'    && <MeetingModePage />}
          {currentTab === 'mcp'        && <MCPMarketplacePage />}
          {currentTab === 'twin'       && <DigitalTwinPage />}
          {currentTab === 'security'   && <SecurityHubPage />}
          {currentTab === 'tools'      && <ToolsPage />}
          {currentTab === 'compare'    && <ComparePage />}
          {currentTab === 'search'     && <SearchPage onNavigate={handleNavigate} />}
          {currentTab === 'analytics'  && <AnalyticsPage />}
          {currentTab === 'settings'   && <SettingsPage />}
          {currentTab === 'admin'      && <AdminPage />}
        </main>
      </div>

      <AIAvatarGuide onNavigate={handleNavigate} />
      <VoiceAssistant onNavigate={handleNavigate} />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
