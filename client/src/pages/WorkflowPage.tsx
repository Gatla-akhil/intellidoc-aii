import React, { useState } from 'react';
import { Play, Plus, CheckCircle2, ArrowRight, Sparkles, Mail, Database, ShieldCheck, FileText, Cpu, Zap } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const WorkflowPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const [workflowNodes, setWorkflowNodes] = useState([
    { id: 'n-1', title: 'Upload Document Ingestion', category: 'Trigger', icon: FileText, desc: 'Auto-ingest PDF/Images from email attachment or webhook' },
    { id: 'n-2', title: 'Gemini 2.5 Multi-Agent OCR', category: 'AI Processing', icon: Cpu, desc: 'Extract metadata, table line items, and signature seals' },
    { id: 'n-3', title: 'GST & Math Integrity Audit', category: 'Validation Guard', icon: ShieldCheck, desc: 'Verify subtotal + tax formula against IRS database' },
    { id: 'n-4', title: 'Email Finance Approval Team', category: 'Notification', icon: Mail, desc: 'Dispatch automated summary digest to finance@company.com' },
    { id: 'n-5', title: 'Sync to PostgreSQL Database', category: 'Storage', icon: Database, desc: 'Persist verified structured records into enterprise DB' },
  ]);

  const handleTestWorkflow = () => {
    setIsRunning(true);
    setActiveStep(0);
    setTimeout(() => setActiveStep(1), 800);
    setTimeout(() => setActiveStep(2), 1600);
    setTimeout(() => setActiveStep(3), 2400);
    setTimeout(() => setActiveStep(4), 3200);
    setTimeout(() => {
      setIsRunning(false);
      setActiveStep(null);
    }, 4000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-100">No-Code AI Automation Workflow Builder</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              BullMQ & Redis Engine
            </span>
          </div>
          <p className="text-xs text-slate-400">Design autonomous document processing pipelines without writing code.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleTestWorkflow}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center space-x-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>{isRunning ? 'Running Automation...' : 'Execute Test Workflow'}</span>
          </button>
        </div>
      </div>

      {/* Workflow Canvas Visualizer */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Pipeline Node Sequence:</h3>

        <div className="space-y-4">
          {workflowNodes.map((node, idx) => {
            const Icon = node.icon;
            const isExecuting = activeStep === idx;
            const isDone = activeStep !== null && activeStep > idx;

            return (
              <React.Fragment key={node.id}>
                <SpotlightCard className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          isExecuting
                            ? 'bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/40 scale-105 animate-pulse'
                            : isDone
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-900 text-cyan-400 border border-slate-800'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-slate-500">Step {idx + 1}</span>
                          <span className="text-xs font-bold text-slate-100">{node.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                            {node.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{node.desc}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      {isExecuting ? (
                        <span className="text-xs font-bold text-cyan-400 font-mono animate-pulse flex items-center space-x-1">
                          <Sparkles className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing Node...</span>
                        </span>
                      ) : isDone ? (
                        <span className="text-xs font-bold text-emerald-400 font-mono">Status: Passed</span>
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">Ready</span>
                      )}
                    </div>
                  </div>
                </SpotlightCard>

                {idx < workflowNodes.length - 1 && (
                  <div className="flex justify-center my-1">
                    <span className="text-slate-600 font-bold text-lg">↓</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
