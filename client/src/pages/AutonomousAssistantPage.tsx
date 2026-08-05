import React, { useState } from 'react';
import { Sparkles, Play, CheckCircle2, Bot, ArrowRight, ShieldCheck, Mail, MessageSquare, Database, FileText, Cpu, Clock, Layers } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const AutonomousAssistantPage: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'Check my Gmail for invoices, extract all data, validate GST, compare with purchase orders, detect fraud, generate a monthly report, notify my team on Slack, and archive everything.'
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const executionSteps = [
    { id: 's-1', agent: 'Gmail MCP Connector', action: 'Connected to Gmail Inbox', detail: 'Fetched 3 new invoice attachments' },
    { id: 's-2', agent: 'Vision OCR Agent', action: 'Multi-Modal Parsing', detail: 'Extracted 28 metadata key-values & line items' },
    { id: 's-3', agent: 'Validation Agent', action: 'GST & Math Integrity Audit', detail: 'Verified 100% mathematical formula compliance' },
    { id: 's-4', agent: 'Comparison Agent', action: 'PO Cross-Verification', detail: 'Matched against PO #99381 (0% variance)' },
    { id: 's-5', agent: 'Fraud Guard Agent', action: 'Tamper & Stamp Analysis', detail: 'Verified authentic digital signature & seal' },
    { id: 's-6', agent: 'Executive Report Agent', action: 'Generating Business Summary', detail: 'Created Q3 Executive Financial Briefing' },
    { id: 's-7', agent: 'Slack MCP Agent', action: 'Team Notification', detail: 'Dispatched digest to #finance-approvals' },
    { id: 's-8', agent: 'Archive Agent', action: 'PostgreSQL & S3 Storage', detail: 'Persisted encrypted record with SHA-256 hash' },
  ];

  const handleRunAutonomous = () => {
    setIsExecuting(true);
    setActiveStep(0);

    executionSteps.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStep(idx);
        if (idx === executionSteps.length - 1) {
          setTimeout(() => {
            setIsExecuting(false);
            setActiveStep(executionSteps.length);
          }, 800);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">Autonomous AI Office Assistant Console</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 uppercase">
            One-Prompt Agentic Orchestrator
          </span>
        </div>
        <p className="text-xs text-slate-400">Specify complex end-to-end office tasks in natural language. Multi-agent AI plans, executes, and archives automatically.</p>
      </div>

      {/* Main Prompt Execution Console */}
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Bot className="w-5 h-5 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-100">Autonomous Task Prompt:</h3>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950 border border-slate-800 rounded-2xl p-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none font-mono"
          />
          <button
            onClick={handleRunAutonomous}
            disabled={isExecuting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-95 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isExecuting ? 'Orchestrating Agents...' : 'Execute Autonomous Task'}</span>
          </button>
        </div>
      </SpotlightCard>

      {/* Execution Tree Stream */}
      {activeStep !== null && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Multi-Agent Task Execution Sequence:</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {executionSteps.map((step, idx) => {
              const isExecutingStep = activeStep === idx;
              const isDoneStep = activeStep > idx;

              return (
                <SpotlightCard key={step.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono">
                      {step.agent}
                    </span>
                    {isExecutingStep ? (
                      <span className="text-[10px] font-bold text-cyan-400 animate-pulse flex items-center space-x-1 font-mono">
                        <Sparkles className="w-3 h-3 animate-spin text-cyan-400" />
                        <span>Executing...</span>
                      </span>
                    ) : isDoneStep ? (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Passed</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">Pending</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{step.action}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{step.detail}</p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
