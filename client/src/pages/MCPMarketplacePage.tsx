import React, { useState } from 'react';
import { Search, CheckCircle2, Plus, ExternalLink, ShieldCheck, Database, HardDrive, Mail, Github, MessageSquare } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const MCPMarketplacePage: React.FC = () => {
  const [federatedQuery, setFederatedQuery] = useState('');
  const [plugins, setPlugins] = useState([
    { id: 'mcp-drive', name: 'Google Drive MCP', category: 'Cloud Storage', installed: true, icon: HardDrive, desc: 'Query and auto-ingest documents directly from Google Drive folders.' },
    { id: 'mcp-gmail', name: 'Gmail Attachment MCP', category: 'Email Watcher', installed: true, icon: Mail, desc: 'Auto-scan inbound email invoices and legal contract attachments.' },
    { id: 'mcp-slack', name: 'Slack Bot MCP', category: 'Collaboration', installed: true, icon: MessageSquare, desc: 'Post automated document fraud alerts and extracted summaries to Slack channels.' },
    { id: 'mcp-github', name: 'GitHub Code & Docs MCP', category: 'Developer Tools', installed: false, icon: Github, desc: 'Index README documentation and legal open source licenses.' },
  ]);

  const toggleInstall = (id: string) => {
    setPlugins((prev) => prev.map((p) => (p.id === id ? { ...p, installed: !p.installed } : p)));
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">Model Context Protocol (MCP) & Federated Search Marketplace</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            MCP Protocol v2026
          </span>
        </div>
        <p className="text-xs text-slate-400">Connect external tools (Google Drive, Gmail, Slack, Notion) securely to query data across all cloud sources.</p>
      </div>

      {/* Federated Unified Search Bar */}
      <SpotlightCard className="p-4">
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={federatedQuery}
            onChange={(e) => setFederatedQuery(e.target.value)}
            placeholder="Federated Search prompt: e.g. 'Find all invoices in my Google Drive' or 'Search contracts in Notion'..."
            className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shrink-0 cursor-pointer">
            Run Federated Search
          </button>
        </div>
      </SpotlightCard>

      {/* Plugin Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {plugins.map((plugin) => {
          const Icon = plugin.icon;
          return (
            <SpotlightCard key={plugin.id} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{plugin.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">{plugin.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleInstall(plugin.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plugin.installed
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  }`}
                >
                  {plugin.installed ? '✓ Connected (MCP)' : 'Connect Integration'}
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{plugin.desc}</p>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
};
