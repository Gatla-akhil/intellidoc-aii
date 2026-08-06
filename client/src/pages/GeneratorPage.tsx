import React, { useState } from 'react';
import { Sparkles, FileText, Download, Copy, Check, Wand2, Play } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const GeneratorPage: React.FC = () => {
  const [docType, setDocType] = useState('NDA');
  const [partyA, setPartyA] = useState('IntelliDoc AI Inc.');
  const [partyB, setPartyB] = useState('Apex Global Enterprises Ltd.');
  const [amount, setAmount] = useState('$15,000.00');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState(
    `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)\nEffective Date: August 5, 2026\n\nThis Mutual Non-Disclosure Agreement ("Agreement") is entered into by and between:\n1. IntelliDoc AI Inc. ("Disclosing Party")\n2. Apex Global Enterprises Ltd. ("Receiving Party")\n\n1. PURPOSE & CONFIDENTIALITY\nThe parties intend to evaluate a potential business relationship regarding Artificial Intelligence Document Intelligence Integration.\n\n2. CONFIDENTIAL INFORMATION\nAll proprietary metadata, OCR algorithms, vector embeddings, and financial figures equal to or exceeding $15,000.00 USD shall remain strictly confidential for a period of 5 years.\n\n3. GOVERNING LAW\nThis agreement shall be governed by the laws of the State of Delaware.\n\nIN WITNESS WHEREOF, the authorized representatives have executed this agreement.`
  );

  const templates: Record<string, (pA: string, pB: string, val: string) => string> = {
    NDA: (pA, pB, val) =>
      `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)\nEffective Date: August 5, 2026\n\n1. PARTIES\n- Disclosing Party: ${pA}\n- Receiving Party: ${pB}\n\n2. CONFIDENTIALITY OBLIGATIONS\nAll proprietary trade secrets, financial records, AI model weights, and contract terms valued at ${val} shall remain strictly confidential for 5 years.\n\n3. GOVERNING LAW\nState of Delaware.`,
    MSA: (pA, pB, val) =>
      `MASTER SERVICES AGREEMENT (MSA)\nEffective Date: August 5, 2026\n\n1. SERVICES\n${pA} agrees to provide Intelligent Document Processing SaaS platform services to ${pB}.\n\n2. FINANCIAL CONSIDERATION\nContract Service Value: ${val} payable Net 30 days.\n\n3. INDEMNIFICATION & LIABILITY\nTotal liability cap set to 10x monthly recurring revenue.`,
    INVOICE: (pA, pB, val) =>
      `COMMERCIAL SAAS INVOICE #INV-2026-8849\nInvoice Date: August 5, 2026\n\nBilled By: ${pA}\nBilled To: ${pB}\n\nLine Item 1: IntelliDoc Enterprise Processing Engine - ${val}\nTax (10% GST): Included\nTotal Payable Amount: ${val}\nPayment Status: Pending Approval`,
    OFFER: (pA, pB, val) =>
      `EXECUTIVE EMPLOYMENT OFFER LETTER\nDate: August 5, 2026\n\nDear Candidate,\n${pA} is pleased to offer you the position of Principal AI Engineer at ${pB}.\n\nAnnual Compensation Package: ${val} USD per annum.\nStock Options: 0.5% Equity Grant.\nStart Date: September 1, 2026.`,
    PURCHASE_ORDER: (pA, pB, val) =>
      `OFFICIAL PURCHASE ORDER #PO-99381\nIssued By: ${pB}\nVendor: ${pA}\n\nItem: Enterprise OCR Vision Server Nodes\nTotal Order Value: ${val}\nDelivery Terms: Instant Electronic Transfer`,
    BUSINESS_PROPOSAL: (pA, pB, val) =>
      `ENTERPRISE AI ARCHITECTURE PROPOSAL\nPrepared For: ${pB}\nSubmitted By: ${pA}\n\nObjective: Implement Multi-Agent Document Intelligence with Supabase PostgreSQL and Vector RAG.\nProjected ROI: $42,500 USD annual savings.\nTotal Implementation Budget: ${val}`,
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatorFn = templates[docType] || templates['NDA'];
      setGeneratedPreview(generatorFn(partyA, partyB, amount));
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: string) => {
    const ext = format === 'JSON' ? 'json' : format === 'CSV' ? 'csv' : format === 'MD' ? 'md' : 'txt';
    const mime = format === 'JSON' ? 'application/json' : 'text/plain';
    const blob = new Blob([generatedPreview], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Generated_${docType}_Document.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <p className="text-xs text-slate-400">Generate NDAs, Master Service Agreements, Commercial Invoices, Offer Letters, and POs instantly.</p>
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
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="NDA">Mutual Non-Disclosure Agreement (NDA)</option>
                <option value="MSA">Master Services Agreement (MSA)</option>
                <option value="INVOICE">SaaS Commercial Invoice</option>
                <option value="OFFER">Executive Offer Letter</option>
                <option value="PURCHASE_ORDER">Official Purchase Order</option>
                <option value="BUSINESS_PROPOSAL">Business Proposal</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">First Party / Vendor Name:</label>
              <input
                type="text"
                value={partyA}
                onChange={(e) => setPartyA(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Second Party / Client Name:</label>
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

            {/* Prominent Generate CTA Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-95 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>{isGenerating ? 'Synthesizing Legal Document...' : 'Generate AI Document'}</span>
            </button>
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
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                {['PDF', 'DOCX', 'MD'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => handleDownload(fmt)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 text-[11px] font-bold text-cyan-300 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-cyan-400" />
                    <span>{fmt}</span>
                  </button>
                ))}
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
