import React, { useState } from 'react';
import { Sparkles, FileText, Download, Copy, Check, Wand2 } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const GeneratorPage: React.FC = () => {
  const [docType, setDocType] = useState('NDA');
  const [partyA, setPartyA] = useState('IntelliDoc AI Inc.');
  const [partyB, setPartyB] = useState('Apex Global Enterprises Ltd.');
  const [amount, setAmount] = useState('$15,000.00');
  const [copied, setCopied] = useState(false);

  const generatedPreview = `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)
Effective Date: August 5, 2026

This Mutual Non-Disclosure Agreement ("Agreement") is entered into by and between:
1. ${partyA} ("Disclosing Party")
2. ${partyB} ("Receiving Party")

1. PURPOSE & CONFIDENTIALITY
The parties intend to evaluate a potential business relationship regarding Artificial Intelligence Document Intelligence Integration.

2. CONFIDENTIAL INFORMATION
All proprietary metadata, OCR algorithms, vector embeddings, and financial figures equal to or exceeding ${amount} USD shall remain strictly confidential for a period of 5 years.

3. GOVERNING LAW
This agreement shall be governed by the laws of the State of Delaware.

IN WITNESS WHEREOF, the authorized representatives have executed this agreement.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">AI Document & Contract Generator</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            Gemini 2.5 Legal Wizard
          </span>
        </div>
        <p className="text-xs text-slate-400">Generate NDAs, Master Service Agreements, Commercial Invoices, and Offer Letters instantly.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Left Inputs (Col 5) */}
        <div className="md:col-span-5 space-y-4">
          <SpotlightCard className="p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Configure Document Parameters:</h3>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Document Template Type:</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="NDA">Mutual Non-Disclosure Agreement (NDA)</option>
                <option value="MSA">Master Services Agreement (MSA)</option>
                <option value="INVOICE">SaaS Commercial Invoice</option>
                <option value="OFFER">Executive Offer Letter</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">First Party Name:</label>
              <input
                type="text"
                value={partyA}
                onChange={(e) => setPartyA(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Second Party Name:</label>
              <input
                type="text"
                value={partyB}
                onChange={(e) => setPartyB(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Contract / Invoice Value:</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </SpotlightCard>
        </div>

        {/* Right Preview (Col 7) */}
        <div className="md:col-span-7 space-y-4">
          <SpotlightCard className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Generated AI Document Preview</span>
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
            </div>

            <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-line overflow-x-auto max-h-[380px]">
              {generatedPreview}
            </pre>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};
