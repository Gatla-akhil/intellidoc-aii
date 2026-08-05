import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileCheck,
  BrainCircuit,
  GitCompare,
  Lock,
  CheckCircle2,
  Cpu,
  Download,
  ChevronDown,
  Star,
  Layers,
} from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which document formats are supported by IntelliDoc AI?',
      a: 'IntelliDoc AI natively parses PDF (native & scanned), PNG, JPG, TIFF, DOCX, XLSX, camera photos, and ZIP archives containing thousands of mixed files.',
    },
    {
      q: 'How does the AI handle handwriting, stamps, and signatures?',
      a: 'Our Vision OCR pipeline uses specialized multi-modal models to isolate handwriting signatures, company seals, and QR barcodes with 99.8% precision.',
    },
    {
      q: 'Is my document data retained or used for public AI training?',
      a: 'No. IntelliDoc AI enforces strict zero-data retention policies with AES-256 encryption at rest and TLS 1.3 in transit under SOC2 Type II compliance.',
    },
    {
      q: 'Can I connect IntelliDoc AI to my existing enterprise ERP or CRM?',
      a: 'Yes! We provide robust REST APIs, Webhooks, and direct integrations for SAP, Salesforce, QuickBooks, and Snowflake.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Aurora Glow Mesh Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-tr from-cyan-500/20 via-indigo-600/20 to-purple-600/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-cyan-400 mb-8 backdrop-blur-xl shadow-lg">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>Introducing IntelliDoc AI 2026 Master Engine</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Google Gemini 2.5 Pro & Vision AI</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-none mb-6">
          Turn Any Document into <br />
          <span className="gradient-text">Structured Intelligence. Instantly.</span>
        </h1>

        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          The next-generation document processing platform that reads, classifies, validates, detects fraud, extracts line items, and answers questions from any format in milliseconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={() => onNavigate('upload')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-slate-950 font-extrabold text-sm hover:opacity-95 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>Launch Platform Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Explore Live Dashboard</span>
          </button>
        </div>

        {/* Hero Interactive Document Card Showcase */}
        <SpotlightCard className="p-2 max-w-5xl mx-auto">
          <div className="bg-slate-950 rounded-[22px] p-6 md:p-8 text-left grid md:grid-cols-12 gap-6 border border-slate-800/80">
            {/* Left: Input File Card */}
            <div className="md:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
              <div className="laser-scanner-line" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw Input File</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30">
                  PDF / Invoice
                </span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <div className="w-24 h-3 bg-slate-800 rounded"></div>
                  <div className="w-16 h-3 bg-slate-800 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-slate-900 rounded"></div>
                  <div className="w-3/4 h-2 bg-slate-900 rounded"></div>
                  <div className="w-5/6 h-2 bg-slate-900 rounded"></div>
                </div>
                <div className="pt-4 border-t border-slate-800 flex justify-between">
                  <span className="text-xs text-slate-400">Total Billable</span>
                  <span className="text-xs font-bold text-cyan-400">$14,850.00</span>
                </div>
              </div>
            </div>

            {/* Center: Processing Flow Node */}
            <div className="hidden md:flex md:col-span-2 items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg animate-pulse">
                <Cpu className="w-6 h-6" />
              </div>
            </div>

            {/* Right: Extracted Intelligence JSON */}
            <div className="md:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-cyan-500/40 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Extracted JSON Data</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  Accuracy: 99.8%
                </span>
              </div>
              <pre className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 overflow-x-auto">
{`{
  "vendor": "Acme Cloud Inc.",
  "invoice_no": "INV-2026-8849",
  "subtotal": 13500.00,
  "tax": 1350.00,
  "total": 14850.00,
  "fraud_check": "PASSED",
  "signature_detected": true
}`}
              </pre>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-100 mb-4">Enterprise Document Capabilities</h2>
          <p className="text-slate-400 text-sm">
            Everything your finance, legal, compliance, and HR teams need in a single autonomous platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Multi-Agent OCR & Parsing',
              desc: 'Extract text, line items, handwriting, signatures, QR codes, and tables from PDFs, images, and scanned docs.',
              icon: FileCheck,
              color: 'text-cyan-400',
            },
            {
              title: 'AI Contract & PDF Comparison',
              desc: 'Side-by-side legal clause diffs, salary updates, invoice variations, and automated variance scoring.',
              icon: GitCompare,
              color: 'text-indigo-400',
            },
            {
              title: 'RAG Conversational Intelligence',
              desc: 'Ask complex questions across 1,000s of documents simultaneously with exact page and line citations.',
              icon: BrainCircuit,
              color: 'text-purple-400',
            },
            {
              title: 'Automated Fraud & Anomaly Guard',
              desc: 'Detect altered dollar amounts, missing seals, duplicate invoice submissions, and unverified bank details.',
              icon: ShieldCheck,
              color: 'text-emerald-400',
            },
            {
              title: 'PII Redaction & Masking',
              desc: 'Auto-detect social security numbers, passport numbers, and medical details before data export.',
              icon: Lock,
              color: 'text-rose-400',
            },
            {
              title: 'One-Click Multi-Format Export',
              desc: 'Export cleaned structured results instantly into JSON, CSV, Excel, Word, PDF, or sync via API webhooks.',
              icon: Download,
              color: 'text-amber-400',
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <SpotlightCard key={i} className="p-6 text-left space-y-3">
                <div className={`p-3 rounded-xl bg-slate-900 w-fit border border-slate-800 ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-100">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto border-t border-slate-900 text-left">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-100 mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about IntelliDoc AI processing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-100">{faq.q}</h4>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Footer */}
      <footer className="py-12 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 IntelliDoc AI Inc. All rights reserved. Powered by Google Gemini 2.5 Pro & Vision AI.</p>
      </footer>
    </div>
  );
};
