import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/ui/CommandPalette';
import { VoiceAssistant } from './components/ai/VoiceAssistant';
import { AIAvatarGuide } from './components/ui/AIAvatarGuide';
import { AIDigitalTwin } from './components/ui/AIDigitalTwin';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
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

export function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>(undefined);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

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

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-950 text-slate-100' : 'light bg-slate-50 text-slate-900'} flex flex-col font-sans relative`}>
      {/* Top Horizontal Navigation Dock Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Full-Width Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* AI Digital Twin Workstyle Banner (Show on workspace views) */}
        {currentTab !== 'landing' && (
          <div className="px-4 lg:px-8 pt-4 max-w-7xl mx-auto w-full">
            <AIDigitalTwin onNavigate={handleNavigate} />
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          {currentTab === 'landing' && <LandingPage onNavigate={handleNavigate} />}
          {currentTab === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
          {currentTab === 'autonomous' && <AutonomousAssistantPage />}
          {currentTab === 'upload' && <UploadPage onNavigate={handleNavigate} />}
          {currentTab === 'documents' && <DocumentDetailPage documentId={selectedDocId} onNavigate={handleNavigate} />}
          {currentTab === 'chat' && <AIChatPage />}
          {currentTab === 'report-gen' && <ReportGeneratorPage />}
          {currentTab === 'ledger' && <BlockchainAuditPage />}
          {currentTab === 'prompts' && <PromptLibraryPage onNavigate={handleNavigate} />}
          {currentTab === 'workflow' && <WorkflowPage />}
          {currentTab === 'graph' && <KnowledgeGraphPage />}
          {currentTab === 'generator' && <GeneratorPage />}
          {currentTab === 'meeting' && <MeetingModePage />}
          {currentTab === 'mcp' && <MCPMarketplacePage />}
          {currentTab === 'twin' && <DigitalTwinPage />}
          {currentTab === 'security' && <SecurityHubPage />}
          {currentTab === 'tools' && <ToolsPage />}
          {currentTab === 'compare' && <ComparePage />}
          {currentTab === 'search' && <SearchPage onNavigate={handleNavigate} />}
          {currentTab === 'analytics' && <AnalyticsPage />}
          {currentTab === 'settings' && <SettingsPage />}
          {currentTab === 'admin' && <AdminPage />}
        </main>
      </div>

      {/* Floating AI Avatar Assistant Guide Widget */}
      <AIAvatarGuide onNavigate={handleNavigate} />

      {/* Floating AI Voice Assistant Widget */}
      <VoiceAssistant onNavigate={handleNavigate} />

      {/* Command Palette Keyboard Shortcut Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
