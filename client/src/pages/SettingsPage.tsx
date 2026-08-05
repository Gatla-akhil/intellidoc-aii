import React, { useState } from 'react';
import { User, Key, Cpu, Shield, Save, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-pro');
  const [apiKey, setApiKey] = useState('idp_live_99481023812039481230');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-4xl mx-auto text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100">Platform Settings & API Configurations</h1>
        <p className="text-xs text-slate-400">Manage user profile, active AI model routing, webhooks, and security keys.</p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6">
        {/* Model Switcher */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100">Primary AI Inference Model</h3>
              <p className="text-xs text-slate-400">Select model engine for OCR entity extraction and RAG reasoning</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'gemini-2.5-pro', name: 'Google Gemini 2.5 Pro', desc: 'Recommended: Highest multimodal precision & speed' },
              { id: 'gpt-5.5', name: 'OpenAI GPT-5.5', desc: 'Optimal for complex legal contract analysis' },
              { id: 'claude-4', name: 'Claude 4 Sonnet', desc: 'Excellent for handwritten note extraction' },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedModel === m.id
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <h4 className="text-xs font-bold text-slate-100 mb-1">{m.name}</h4>
                <p className="text-[11px] text-slate-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Key Management */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100">Enterprise Secret API Token</h3>
              <p className="text-xs text-slate-400">Used for server-to-server REST API integration and CLI SDKs</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => navigator.clipboard.writeText(apiKey)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              Copy Secret
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center space-x-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Configuration Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
