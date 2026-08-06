import React, { useState, useEffect } from 'react';
import { History, Clock, UploadCloud, Sparkles, Download, Filter } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { ApiClient } from '../services/api';
import { DocumentItem } from '../types';

interface HistoryEvent {
  id: string;
  time: string;
  doc: string;
  action: string;
  actionType: 'UPLOAD' | 'AI_EXTRACTION' | 'EXPORT';
  user: string;
  status: string;
  confidence: number;
  details: string;
}

export const HistoryPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const docs = await ApiClient.getDocuments();
        setDocuments(docs);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Build audit history from fetched documents + static seed events
  const buildHistory = (): HistoryEvent[] => {
    const events: HistoryEvent[] = [];

    documents.forEach((doc, idx) => {
      // Upload event
      events.push({
        id: `${doc.id}-upload`,
        time: new Date(doc.createdAt).toLocaleString(),
        doc: doc.originalName,
        action: 'Document Upload & Vision OCR Analysis',
        actionType: 'UPLOAD',
        user: 'Alex Rivera',
        status: 'COMPLETED',
        confidence: doc.confidenceScore,
        details: `Extracted ${doc.extractedFields?.length || 0} key-value fields. Category: ${doc.category}. ${doc.isFraud ? '⚠️ Fraud flag raised.' : 'No fraud indicators.'}`,
      });
      // AI Extraction event
      events.push({
        id: `${doc.id}-ai`,
        time: new Date(new Date(doc.updatedAt).getTime() + 300).toLocaleString(),
        doc: doc.originalName,
        action: 'AI Entity Extraction & Risk Assessment',
        actionType: 'AI_EXTRACTION',
        user: 'Gemini 2.0 Flash Engine',
        status: 'COMPLETED',
        confidence: doc.confidenceScore,
        details: doc.summary,
      });
    });

    // Sort newest first
    return events.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  };

  const allHistory = buildHistory();

  const filtered = allHistory.filter((h) => {
    if (filter === 'ALL') return true;
    if (filter === 'UPLOADS') return h.actionType === 'UPLOAD';
    if (filter === 'AI EXTRACTIONS') return h.actionType === 'AI_EXTRACTION';
    if (filter === 'EXPORTS') return h.actionType === 'EXPORT';
    return true;
  });

  const actionIcon = (type: string) => {
    if (type === 'UPLOAD') return <UploadCloud className="w-4 h-4" />;
    if (type === 'AI_EXTRACTION') return <Sparkles className="w-4 h-4" />;
    if (type === 'EXPORT') return <Download className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
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
        <span className="ml-auto text-[10px] text-slate-500 flex items-center">{filtered.length} events</span>
      </div>

      {/* History Timeline Stream */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-500 text-xs animate-pulse">Loading audit log from document library...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-xs">No history events found. Upload documents to populate the audit log.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((log) => (
            <SpotlightCard key={log.id} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl border ${log.actionType === 'UPLOAD' ? 'bg-indigo-950 border-indigo-500/30 text-indigo-400' : 'bg-cyan-950 border-cyan-500/30 text-cyan-400'}`}>
                    {actionIcon(log.actionType)}
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
      )}
    </div>
  );
};
