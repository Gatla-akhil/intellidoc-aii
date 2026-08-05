import React, { useEffect, useState } from 'react';
import { GitCompare, FileText, ArrowRight, Download, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ApiClient } from '../services/api';
import { ComparisonReportItem, DocumentItem } from '../types';

export const ComparePage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [doc1Id, setDoc1Id] = useState('');
  const [doc2Id, setDoc2Id] = useState('');
  const [reportItem, setReportItem] = useState<ComparisonReportItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const docs = await ApiClient.getDocuments();
      setDocuments(docs);
      if (docs.length >= 2) {
        setDoc1Id(docs[0].id);
        setDoc2Id(docs[1].id);
        runComparison(docs[0].id, docs[1].id);
      }
    }
    init();
  }, []);

  const runComparison = async (d1: string, d2: string) => {
    setLoading(true);
    const res = await ApiClient.compareDocuments(d1, d2);
    setReportItem(res);
    setLoading(false);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100">AI Document & Contract Comparison Engine</h1>
        <p className="text-xs text-slate-400">Select two documents to perform intelligent clause diffs, price variance analysis, and risk detection.</p>
      </div>

      {/* Select Document Selector Cards */}
      <div className="grid md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <label className="text-xs font-bold text-slate-400 block mb-2">Document 1 (Base Version):</label>
          <select
            value={doc1Id}
            onChange={(e) => setDoc1Id(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.category})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            onClick={() => runComparison(doc1Id, doc2Id)}
            className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <GitCompare className="w-5 h-5" />
          </button>
        </div>

        <div className="md:col-span-5 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <label className="text-xs font-bold text-slate-400 block mb-2">Document 2 (Compared Version):</label>
          <select
            value={doc2Id}
            onChange={(e) => setDoc2Id(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Results Card */}
      {loading ? (
        <div className="p-12 text-center text-xs text-cyan-400 font-mono animate-pulse">Running AI Clause Comparison...</div>
      ) : reportItem ? (
        <div className="space-y-6">
          {/* Executive Diff Summary */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Executive Diff Summary</span>
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                Variance Risk Score: {(reportItem.report.riskScore * 100).toFixed(0)}% (Low)
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{reportItem.report.diffSummary}</p>
          </div>

          {/* Detailed Field Variances Table */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">Specific Clause & Field Variances</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Field / Clause</th>
                    <th className="p-4">Value in Doc 1</th>
                    <th className="p-4">Value in Doc 2</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {reportItem.report.fieldVariances.map((v, i) => (
                    <tr key={i} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-4 font-bold text-slate-200">{v.field}</td>
                      <td className="p-4 font-mono text-slate-400">{v.valueDoc1}</td>
                      <td className="p-4 font-mono text-cyan-300 font-bold">{v.valueDoc2}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            v.status === 'ATTENTION_REQUIRED'
                              ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                              : v.status === 'FAVORABLE' || v.status === 'IMPROVED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-[11px] font-semibold text-slate-400">{v.impact}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
