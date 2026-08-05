import React from 'react';
import { Activity, Cpu, Server, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Canvas3D } from '../components/ui/Canvas3D';

export const DigitalTwinPage: React.FC = () => {
  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">Digital Twin Pipeline & 3D Spatial Visualizer</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            Live Stream
          </span>
        </div>
        <p className="text-xs text-slate-400">Real-time simulation of documents flowing through ingestion, vision OCR, and vector graph nodes.</p>
      </div>

      {/* 3D Spatial Canvas Visualizer */}
      <SpotlightCard className="p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>3D Floating Document Network Graph</span>
          </h3>
          <span className="text-[10px] font-mono text-cyan-300">Spatial Nodes Active</span>
        </div>
        <Canvas3D />
      </SpotlightCard>

      {/* Digital Twin Stage Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { stage: 'Stage 1', name: 'Ingestion Queue', metric: '0 Pending', status: 'Optimal', icon: Server, color: 'text-cyan-400' },
          { stage: 'Stage 2', name: 'Vision OCR Engine', metric: '420ms Latency', status: 'High Throughput', icon: Cpu, color: 'text-purple-400' },
          { stage: 'Stage 3', name: 'Fraud & Math Audit', metric: '100% Passed', status: 'Active Guard', icon: ShieldCheck, color: 'text-emerald-400' },
          { stage: 'Stage 4', name: 'Vector Indexer', metric: '184k Embeddings', status: 'RAG Ready', icon: Zap, color: 'text-amber-400' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <SpotlightCard key={idx} className="p-5 text-left space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 font-mono">{item.stage}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <h4 className="text-xs font-bold text-slate-100">{item.name}</h4>
              <p className="text-xs font-mono font-bold text-cyan-300">{item.metric}</p>
              <span className="text-[10px] font-semibold text-emerald-400 block pt-1">{item.status}</span>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
};
