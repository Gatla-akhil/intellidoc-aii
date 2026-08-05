import React, { useEffect, useState } from 'react';
import { BarChart3, Cpu, DollarSign, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import { ApiClient } from '../services/api';
import { AnalyticsData } from '../types';

export const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    async function load() {
      const data = await ApiClient.getAnalytics();
      setAnalytics(data);
    }
    load();
  }, []);

  if (!analytics) return <div className="p-8 text-center text-slate-500 text-xs animate-pulse">Loading Analytics...</div>;

  const { metrics, aiModelUsage } = analytics;

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100">AI Cost, Model Tokens & Operational Metrics</h1>
        <p className="text-xs text-slate-400">Track token expenditure, model latency, storage allocation, and OCR throughput.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-slate-400">Total AI Inference Cost</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-slate-100">${metrics.aiTokenCostUSD}</p>
          <p className="text-[10px] text-slate-500 mt-1">Calculated via Gemini 2.5 & GPT-5.5 API rates</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-slate-400">Extracted Key Fields</span>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-slate-100">{metrics.totalFieldsExtracted.toLocaleString()}</p>
          <p className="text-[10px] text-slate-500 mt-1">100% verified schema fields</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-slate-400">Storage Allocation</span>
            <HardDrive className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-slate-100">{metrics.storageUsedMB} MB</p>
          <div className="w-full bg-slate-900 h-2 rounded-full mt-2 overflow-hidden border border-slate-800">
            <div className="bg-purple-500 h-full w-[8.2%] rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">8.2% of 10 GB limit used</p>
        </div>
      </div>

      {/* AI Model Usage Breakdown Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-100">Multi-Model AI Token Distribution</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">AI Model Engine</th>
                <th className="p-4">Tokens Ingested</th>
                <th className="p-4">Avg Latency</th>
                <th className="p-4">Volume Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {aiModelUsage.map((m, i) => (
                <tr key={i} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4 font-bold text-slate-200">{m.model}</td>
                  <td className="p-4 font-mono text-cyan-300">{m.tokens}</td>
                  <td className="p-4 font-mono text-slate-400">{m.latency}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                      {m.share}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
