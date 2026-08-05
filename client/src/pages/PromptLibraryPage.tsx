import React, { useState } from 'react';
import { Sparkles, Copy, Check, BookOpen, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

interface PromptLibraryPageProps {
  onNavigate: (tab: string) => void;
}

export const PromptLibraryPage: React.FC<PromptLibraryPageProps> = ({ onNavigate }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = [
    { id: 'p-1', title: 'Invoice Math Integrity & Tax Verification', domain: 'Finance', prompt: 'Extract subtotal, tax amount, and total billable figures. Verify if subtotal + tax equals total billable amount and flag any discrepancy.' },
    { id: 'p-2', title: 'Contract Liability Cap & Termination Clause', domain: 'Legal', prompt: 'Locate the limitation of liability cap amount and termination notice requirement clause. Highlight any automatic renewal conditions.' },
    { id: 'p-3', title: 'Resume Candidate Qualification Summary', domain: 'HR & Recruiting', prompt: 'Summarize candidate technical skills, years of experience, Stanford CS Ph.D. degree, and top 3 engineering achievements.' },
    { id: 'p-4', title: 'Medical Lab Vital Range Detection', domain: 'Healthcare', prompt: 'Extract all lab test markers, patient vital statistics, reference ranges, and flag any out-of-bounds metrics.' },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">Enterprise AI Prompt Library</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            Pre-Tested Templates
          </span>
        </div>
        <p className="text-xs text-slate-400">Curated, high-precision prompt templates for Finance, Legal, HR, and Healthcare document intelligence.</p>
      </div>

      {/* Prompts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {prompts.map((p) => (
          <SpotlightCard key={p.id} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {p.domain}
              </span>
              <button
                onClick={() => handleCopy(p.id, p.prompt)}
                className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedId === p.id ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-100">{p.title}</h3>
            <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 whitespace-pre-line leading-relaxed">
              {p.prompt}
            </pre>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
