import React, { useState } from 'react';
import { Network, Building2, User, FileText, DollarSign, ShieldCheck, Sparkles } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const KnowledgeGraphPage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('c-1');

  const nodes = [
    { id: 'c-1', label: 'Acme Cloud Dynamics Inc.', type: 'Company', icon: Building2, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' },
    { id: 'c-2', label: 'Apex Technologies Ltd.', type: 'Company', icon: Building2, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40' },
    { id: 'p-1', label: 'Dr. Evelyn Vance', type: 'Person', icon: User, color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' },
    { id: 'd-1', label: 'Invoice #INV-2026-8849', type: 'Document', icon: FileText, color: 'text-amber-400 border-amber-500/40 bg-amber-950/40' },
    { id: 'd-2', label: 'Master Services Agreement', type: 'Document', icon: FileText, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' },
    { id: 'v-1', label: '$14,850.00 Payment', type: 'Financial', icon: DollarSign, color: 'text-rose-400 border-rose-500/40 bg-rose-950/40' },
  ];

  const relationships = [
    { source: 'Acme Cloud Dynamics Inc.', target: 'Invoice #INV-2026-8849', relation: 'ISSUED_BY' },
    { source: 'Invoice #INV-2026-8849', target: '$14,850.00 Payment', relation: 'HAS_AMOUNT' },
    { source: 'Apex Technologies Ltd.', target: 'Master Services Agreement', relation: 'PARTY_TO' },
    { source: 'Dr. Evelyn Vance', target: 'Apex Technologies Ltd.', relation: 'CANDIDATE_FOR' },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">AI Entity Knowledge Graph</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40">
            Semantic Vector Graph
          </span>
        </div>
        <p className="text-xs text-slate-400">Automated relationship mapping across people, vendors, invoices, contracts, and payments.</p>
      </div>

      {/* Visual Knowledge Graph Network Map */}
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8 liquid-glass p-8 rounded-3xl border border-slate-800 relative min-h-[420px] flex items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-lg">
            {nodes.map((n) => {
              const Icon = n.icon;
              const isSelected = selectedNode === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNode(n.id)}
                  className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${n.color} ${
                    isSelected ? 'ring-2 ring-cyan-400 scale-105 shadow-xl' : 'hover:scale-102'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-100 truncate">{n.label}</p>
                  <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{n.type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Relationship Details Panel */}
        <div className="md:col-span-4 space-y-4">
          <SpotlightCard className="p-5">
            <h3 className="text-sm font-bold text-slate-100 mb-3 flex items-center space-x-2">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>Extracted Entity Edges</span>
            </h3>

            <div className="space-y-2.5">
              {relationships.map((rel, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-200 font-bold">
                    <span>{rel.source}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                      {rel.relation}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">↳ {rel.target}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};
