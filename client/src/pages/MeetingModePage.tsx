import React, { useState } from 'react';
import { Mic, FileAudio, CheckCircle2, Sparkles, ListTodo, UserCheck, Loader2 } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const MeetingModePage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribed, setTranscribed] = useState(false);

  const handleSimulateTranscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTranscribed(true);
    }, 2000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-5xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">AI Meeting Transcriber & Action Items Engine</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            Whisper & Gemini Voice
          </span>
        </div>
        <p className="text-xs text-slate-400">Upload Zoom/Teams audio recordings to extract summaries, key decisions, and tasks.</p>
      </div>

      {/* Audio Dropzone */}
      <SpotlightCard className="p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto shadow-lg">
          <FileAudio className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-100">Upload Audio / Video Meeting Recording</h3>
          <p className="text-xs text-slate-400 mt-1">Supports MP3, WAV, M4A, MP4 up to 500MB</p>
        </div>

        <button
          onClick={handleSimulateTranscribe}
          disabled={isProcessing}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer inline-flex items-center space-x-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transcribing Speech with Whisper...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Transcribe & Extract Action Items</span>
            </>
          )}
        </button>
      </SpotlightCard>

      {/* Transcribed Output & Tasks */}
      {transcribed && (
        <div className="grid md:grid-cols-12 gap-6">
          {/* Transcript (Col 7) */}
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Speech Transcript (99.2% Accuracy):</h3>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-3 font-sans leading-relaxed">
              <p><span className="font-bold text-cyan-400">Alex Rivera (00:14):</span> "We need to finalize the Master Services Agreement liability cap before the Q3 contract signature date."</p>
              <p><span className="font-bold text-purple-400">Dr. Evelyn Vance (00:42):</span> "I verified the tax subtotal calculation on Invoice #INV-2026-8849. The $14,850 total is mathematically accurate."</p>
            </div>
          </div>

          {/* Action Items (Col 5) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <ListTodo className="w-4 h-4 text-cyan-400" />
              <span>Extracted Tasks:</span>
            </h3>

            <div className="space-y-2">
              {[
                { task: 'Approve Invoice #INV-2026-8849 ($14,850)', assignee: 'Alex Rivera' },
                { task: 'Update Delaware Liability Cap to $1M in MSA', assignee: 'Legal Team' },
                { task: 'Deploy Gemini 2.5 RAG Indexer', assignee: 'Evelyn Vance' },
              ].map((t, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center space-x-2 text-slate-200 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.task}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-semibold block pl-6">Assigned: {t.assignee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
