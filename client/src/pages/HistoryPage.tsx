import React, { useState } from 'react';
import { History, Clock, FileText, CheckCircle2, ShieldCheck, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const HistoryPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const historyLogs = [
    {
      id: 'h-1',
      time: '2026-08-06 10:45 AM',
      doc: 'Invoice_Acme_Cloud_Q3_2026.pdf',
      action: 'Document Upload & Vision OCR Analysis',
      user: 'Alex Rivera',
      status: 'COMPLETED',
      confidence: 0.98,
      details: 'Extracted 4 metadata key-values. Math formula integrity passed.',
    },
    {
      id: 'h-2',
      time: '2026-08-06 10:12 AM',
      doc: 'Master_Services_Agreement_VanceCorp.pdf',
      action: 'Legal Risk & Compliance Audit',
      user: 'AI Copilot Engine',
      status: 'COMPLETED',
      confidence: 0.96,
      details: 'Identified Delaware governing law & 60-day renewal notice term.',
    },
    {
      id: 'h-3',
      time: '2026-08-05 08:30 PM',
      doc: 'Resume_Evelyn_Vance_2026.pdf',
      action: 'Talent Profile Extraction',
      user: 'Alex Rivera',
      status: 'COMPLETED',
      confidence: 0.99,
      details: 'Extracted Ph.D. credentials and 6 verified technical skills.',
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">Document Processing & Action History</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-mono">
            Audit Trail
          </span>
        </div>
        <p className="text-xs text-slate-400">Complete historical activity log of document ingestions, AI extractions, and user actions.</p>
      </div>

      {/* Filter Selector */}
      <div className="flex space-x-3">
        {['ALL', 'UPLOADS', 'AI EXTRACTIONS', 'EXPORTS'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === f
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* History Timeline Stream */}
      <div className="space-y-4">
        {historyLogs.map((log) => (
          <SpotlightCard key={log.id} className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-100">{log.action}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{log.doc}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-right">
                <div>
                  <span className="text-[10px] text-slate-500 block font-mono">{log.time}</span>
                  <span className="text-[10px] text-cyan-400 font-bold">Actor: {log.user}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {(log.confidence * 100).toFixed(0)}% Score
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono">
              {log.details}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
