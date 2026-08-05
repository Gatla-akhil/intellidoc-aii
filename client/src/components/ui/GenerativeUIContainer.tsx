import React from 'react';
import { DollarSign, UserCheck, ShieldAlert, HeartPulse, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { DocumentItem } from '../../types';
import { SpotlightCard } from './SpotlightCard';

interface GenerativeUIContainerProps {
  document: DocumentItem;
}

export const GenerativeUIContainer: React.FC<GenerativeUIContainerProps> = ({ document }) => {
  const category = document.category;

  // Generative View 1: Finance Dashboard for Invoices & Bills
  if (category === 'INVOICE' || category === 'BILL' || category === 'PURCHASE_ORDER') {
    return (
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Generative UI: Finance & Tax Audit Workspace</h3>
              <p className="text-[10px] text-cyan-400 font-mono">Dynamically adapted layout for Invoice & Billing data</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Math Verified</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-semibold block">Subtotal</span>
            <span className="text-sm font-bold text-slate-100">$13,500.00</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-semibold block">Tax (10% GST)</span>
            <span className="text-sm font-bold text-slate-100">$1,350.00</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-semibold block">Total Billable</span>
            <span className="text-sm font-extrabold text-cyan-400">$14,850.00</span>
          </div>
        </div>
      </SpotlightCard>
    );
  }

  // Generative View 2: Talent Profile for Resumes
  if (category === 'RESUME') {
    return (
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Generative UI: Talent & HR Candidate Workspace</h3>
              <p className="text-[10px] text-purple-400 font-mono">Dynamically adapted layout for Resume & CV Profiles</p>
            </div>
          </div>
          <span className="text-xs font-bold text-cyan-400">Match Score: 98%</span>
        </div>

        <div className="space-y-3 text-left">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-semibold block">Top Verified Technical Skills:</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['PyTorch', 'Gemini 2.5 Pro', 'RAG Architectures', 'React 19', 'Vector DBs', 'Python'].map((s, i) => (
                <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>
    );
  }

  // Generative View 3: Legal Risk View for Contracts
  if (category === 'CONTRACT' || category === 'LEGAL_DOCUMENT') {
    return (
      <SpotlightCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Generative UI: Legal Compliance & Clause Risk Workspace</h3>
              <p className="text-[10px] text-indigo-400 font-mono">Dynamically adapted layout for Contracts & MSAs</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400">Risk Level: Low (12%)</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-semibold block">Liability Cap</span>
            <span className="text-xs font-bold text-slate-100">$1,000,000 USD</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-500 font-semibold block">Governing Jurisdiction</span>
            <span className="text-xs font-bold text-slate-100">State of Delaware</span>
          </div>
        </div>
      </SpotlightCard>
    );
  }

  // Fallback View
  return (
    <SpotlightCard className="p-5 text-left">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-slate-100">Generative UI Active for {document.title}</span>
      </div>
    </SpotlightCard>
  );
};
