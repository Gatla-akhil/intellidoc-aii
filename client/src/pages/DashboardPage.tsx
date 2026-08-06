import React, { useEffect, useState } from 'react';
import {
  FileText,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  MessageSquareCode,
  GitCompare,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Sparkles,
  Download,
} from 'lucide-react';
import { exportDocumentData } from '../services/export.service';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { ApiClient } from '../services/api';
import { AnalyticsData, DocumentItem } from '../types';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

interface DashboardPageProps {
  onNavigate: (tab: string, docId?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [anData, docData] = await Promise.all([ApiClient.getAnalytics(), ApiClient.getDocuments()]);
      setAnalytics(anData);
      setDocuments(docData);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-slate-900 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-900 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const { metrics, categoryDistribution, processingTrend } = analytics;

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto text-left">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">Executive Intelligence Dashboard</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 animate-spin text-cyan-400" />
              <span>Real-Time Engine</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">Autonomous multi-agent document processing, fraud validation & latency stats</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('upload')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center space-x-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Document</span>
          </button>
        </div>
      </div>

      {/* Horizontal Processing Workflow Pipeline Banner */}
      <div className="liquid-glass p-4 rounded-3xl border border-slate-800/90 overflow-x-auto">
        <div className="flex items-center justify-between min-w-max space-x-4">
          {[
            { step: '01', title: 'File Ingestion', status: 'Multi-Format PDF/ZIP/Images' },
            { step: '02', title: 'Vision OCR', status: 'Handwriting & Tables' },
            { step: '03', title: 'Security Guard', status: 'Fraud & Math Audit' },
            { step: '04', title: 'Gemini 2.5 Pro', status: 'Field Extraction' },
            { step: '05', title: 'Vector Index', status: 'RAG Knowledge Graph' },
          ].map((s, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center space-x-3 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-[11px] font-bold font-mono flex items-center justify-center">
                  {s.step}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{s.title}</h4>
                  <p className="text-[10px] text-slate-400">{s.status}</p>
                </div>
              </div>
              {idx < 4 && <span className="text-slate-600 font-bold text-sm">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Metric Cards Row with Animated Counters and Spotlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Processed</span>
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-100">
            <AnimatedCounter value={metrics.totalDocumentsProcessed} />
          </p>
          <div className="flex items-center space-x-1 mt-2 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% volume surge this week</span>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400">Extraction Accuracy</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-100">
            <AnimatedCounter value={metrics.averageAccuracy} decimals={1} suffix="%" />
          </p>
          <div className="flex items-center space-x-1 mt-2 text-[11px] text-emerald-400 font-medium">
            <span>Verified via Gemini 2.5 Pro</span>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400">Average Processing Speed</span>
            <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-100">
            <AnimatedCounter value={metrics.avgProcessingTimeMs} suffix=" ms" />
          </p>
          <div className="flex items-center space-x-1 mt-2 text-[11px] text-purple-300 font-medium">
            <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>High-throughput parallel OCR</span>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400">Fraud & Anomaly Guard</span>
            <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-100">
            <AnimatedCounter value={metrics.fraudDetectedCount} suffix=" Flagged" />
          </p>
          <div className="flex items-center space-x-1 mt-2 text-[11px] text-amber-400 font-medium">
            <span>0 compliance breaches</span>
          </div>
        </SpotlightCard>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-12 gap-6 text-left">
        {/* Daily Processing Trend Area Chart */}
        <div className="md:col-span-8 liquid-glass p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-100">Document Processing Throughput</h2>
              <p className="text-[11px] text-slate-400">Daily document volume ingestion across all workspaces</p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono">
              Live Stream
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processingTrend}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="md:col-span-4 liquid-glass p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-100 mb-1">Document Classes Breakdown</h2>
            <p className="text-[11px] text-slate-400 mb-4">Distribution by document class</p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryDistribution} layout="vertical">
                  <XAxis type="number" stroke="#64748b" fontSize={10} />
                  <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={9} width={90} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '12px', fontSize: '11px' }}
                  />
                  <Bar dataKey="count" fill="#818cf8" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Supported Classes: 24</span>
            <button onClick={() => onNavigate('search')} className="text-cyan-400 hover:underline flex items-center font-semibold">
              <span>View Filtered</span>
              <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Ingested Documents Table */}
      <div className="liquid-glass rounded-3xl border border-slate-800 overflow-hidden text-left">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-100">Recent Extracted Documents</h2>
            <p className="text-[11px] text-slate-400">Click any document to open interactive field editor & bounding boxes</p>
          </div>
          <button
            onClick={() => onNavigate('documents')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View All Documents →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Document Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Confidence</th>
                <th className="p-4">Security / Fraud</th>
                <th className="p-4">PII Count</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => onNavigate('documents', doc.id)}
                  className="hover:bg-slate-900/60 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{doc.title}</p>
                        <p className="text-[10px] text-slate-500">{doc.originalName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-800">
                      {doc.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-400 font-bold">{(doc.confidenceScore * 100).toFixed(1)}%</span>
                  </td>
                  <td className="p-4">
                    {doc.isFraud ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Fraud Flagged</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-slate-400 font-mono">{doc.piiCount} fields</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                        {(['JSON', 'CSV', 'PDF'] as const).map((fmt) => (
                          <button
                            key={fmt}
                            onClick={(e) => {
                              e.stopPropagation();
                              exportDocumentData(doc, fmt);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-cyan-950 hover:text-cyan-300 text-[9px] font-mono font-bold text-slate-400 transition-colors cursor-pointer"
                            title={`Export ${fmt}`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                      <button className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-[11px] text-slate-200 transition-colors cursor-pointer">
                        Inspect →
                      </button>
                    </div>
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
