import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, Bot } from 'lucide-react';

interface VoiceAssistantProps {
  onNavigate: (tab: string) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const voiceCommands = [
    { label: '"Summarize Acme Invoice"', action: () => onNavigate('documents') },
    { label: '"Compare contracts side-by-side"', action: () => onNavigate('compare') },
    { label: '"Open AI Workflow Builder"', action: () => onNavigate('workflow') },
    { label: '"Generate non-disclosure NDA"', action: () => onNavigate('generator') },
  ];

  const handleToggleListen = () => {
    if (!isListening) {
      setIsListening(true);
      setTranscript('Listening for voice commands...');
      setTimeout(() => {
        setTranscript('"Summarize Acme Cloud Invoice and check payment terms"');
        setAiResponse('Analyzing Invoice #INV-2026-8849: Total billable amount is $14,850.00 USD with NET 30 terms. Verified 100% tax subtotal accuracy.');
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-slate-950 font-bold shadow-2xl shadow-cyan-500/40 hover:scale-110 transition-transform cursor-pointer flex items-center space-x-2 group"
        title="Open AI Voice Assistant"
      >
        <Mic className="w-6 h-6 animate-pulse text-slate-950" />
        <span className="hidden group-hover:inline text-xs font-extrabold pr-1 text-slate-950">AI Voice Assistant</span>
      </button>

      {/* Voice Assistant Floating Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 bg-slate-900/95 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-left space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-100">AI Voice Assistant</h3>
                <p className="text-[10px] text-cyan-400">Web Speech & Gemini Live Engine</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Voice Orb */}
          <div className="text-center py-4 space-y-3">
            <div
              onClick={handleToggleListen}
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center cursor-pointer transition-all ${
                isListening
                  ? 'bg-cyan-500 text-slate-950 shadow-2xl shadow-cyan-500/60 scale-110 animate-ping'
                  : 'bg-gradient-to-tr from-cyan-950 via-indigo-900 to-purple-950 text-cyan-400 border border-cyan-500/40 hover:scale-105'
              }`}
            >
              <Mic className="w-8 h-8" />
            </div>
            <p className="text-xs font-semibold text-slate-300">
              {isListening ? 'Listening...' : 'Tap Mic to speak command'}
            </p>
          </div>

          {/* Transcript & AI Response */}
          {transcript && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 font-mono">
              <p className="text-slate-400 italic">{transcript}</p>
              {aiResponse && (
                <div className="pt-2 border-t border-slate-800 text-cyan-300 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{aiResponse}</span>
                </div>
              )}
            </div>
          )}

          {/* Suggested Voice Commands */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Suggested Speech Prompts:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {voiceCommands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={cmd.action}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 text-left truncate"
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
