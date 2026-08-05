import React, { useEffect, useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Edit2,
  ShieldCheck,
  Zap,
  ZoomIn,
  ZoomOut,
  Copy,
  Sparkles,
  Share2,
} from 'lucide-react';
import { ApiClient } from '../services/api';
import { DocumentItem, ExtractedField } from '../types';

interface DocumentDetailPageProps {
  documentId?: string;
  onNavigate: (tab: string, docId?: string) => void;
}

export const DocumentDetailPage: React.FC<DocumentDetailPageProps> = ({ documentId, onNavigate }) => {
  const [doc, setDoc] = useState<DocumentItem | null>(null);
  const [activeTab, setActiveTab] = useState<'fields' | 'insights' | 'rawText'>('fields');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [fields, setFields] = useState<ExtractedField[]>([]);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    async function loadDoc() {
      const d = await ApiClient.getDocumentById(documentId || 'doc-inv-001');
      if (d) {
        setDoc(d);
        setFields(d.extractedFields || []);
      }
    }
    loadDoc();
  }, [documentId]);

  if (!doc) {
    return <div className="p-8 text-center text-slate-500 text-xs animate-pulse">Loading Document Analysis...</div>;
  }

  const handleFieldChange = (fieldId: string, newValue: string) => {
    setFields((prev) => prev.map((f) => (f.id === fieldId ? { ...f, value: newValue } : f)));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-61px)] text-left overflow-hidden">
      {/* Top Action Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('documents')}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-semibold"
          >
            ← Back to Library
          </button>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100">{doc.title}</h2>
              <p className="text-[10px] text-slate-400">ID: {doc.id} • Processed via Gemini 2.5 Pro</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setExportModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Data</span>
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center space-x-2 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI About Doc</span>
          </button>
        </div>
      </div>

      {/* Main Dual Panel Container */}
      <div className="grid md:grid-cols-12 flex-1 overflow-hidden">
        {/* Left Panel: Document Viewer Canvas (Col 6) */}
        <div className="md:col-span-6 bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between overflow-hidden relative">
          {/* Canvas Toolbar */}
          <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl px-3 py-1.5 mb-3 z-10">
            <span className="text-[11px] font-semibold text-slate-300">Document Canvas (Page 1 of 1)</span>
            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[10px] text-slate-400 w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Document Image Container */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-slate-900/40 rounded-2xl border border-slate-800/80 relative">
            <div
              className="relative transition-transform duration-200 shadow-2xl rounded-lg overflow-hidden border border-slate-700"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              <img src={doc.fileUrl} alt={doc.title} className="max-w-full h-auto max-h-[580px] object-contain rounded" />

              {/* Bounding box highlight overlays */}
              {fields.map((f) => {
                if (!f.boundingBox) return null;
                const isSelected = selectedFieldId === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFieldId(f.id)}
                    className={`absolute rounded border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/25 shadow-lg shadow-cyan-500/40 z-20'
                        : 'border-indigo-500/60 bg-indigo-500/10 hover:border-cyan-400 hover:bg-cyan-500/15'
                    }`}
                    style={{
                      left: `${f.boundingBox.x}px`,
                      top: `${f.boundingBox.y}px`,
                      width: `${f.boundingBox.w}px`,
                      height: `${f.boundingBox.h}px`,
                    }}
                    title={`${f.key}: ${f.value}`}
                  >
                    <span className="absolute -top-4 left-0 text-[9px] font-bold font-mono bg-slate-900 text-cyan-300 px-1 rounded border border-cyan-500/30 whitespace-nowrap">
                      {f.key}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Extracted Fields & Security Audit (Col 6) */}
        <div className="md:col-span-6 bg-slate-950 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
          {/* Document Summary & Security Badge */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Category: {doc.category}
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confidence: {(doc.confidenceScore * 100).toFixed(1)}%</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-100 block mb-1">AI Executive Summary:</span>
              <p className="text-slate-400">{doc.summary}</p>
            </div>

            {/* Security Indicators Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 font-semibold block">Fraud Status</span>
                <span className={`text-xs font-bold ${doc.isFraud ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {doc.isFraud ? 'Flagged' : 'Clean & Verified'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 font-semibold block">Signature / Seal</span>
                <span className="text-xs font-bold text-cyan-400">
                  {doc.hasSignature ? 'Signature Verified' : 'None Detected'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 font-semibold block">PII Redactions</span>
                <span className="text-xs font-bold text-purple-400">{doc.piiCount} Shielded</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 space-x-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('fields')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'fields' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Extracted Entities ({fields.length})
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'insights' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Key Insights & Risks
            </button>
            <button
              onClick={() => setActiveTab('rawText')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'rawText' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              OCR Raw Text
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 space-y-3">
            {activeTab === 'fields' && (
              <div className="space-y-2">
                {fields.map((field) => {
                  const isSelected = selectedFieldId === field.id;
                  return (
                    <div
                      key={field.id}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={`p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-slate-400">{field.key}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{(field.confidence * 100).toFixed(0)}% Match</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none w-full border-b border-transparent focus:border-cyan-400"
                        />
                        <Edit2 className="w-3 h-3 text-slate-500 ml-2 shrink-0" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400">Automated Insights:</h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {doc.keyInsights.map((ins, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-cyan-400">•</span>
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'rawText' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-60">
                {doc.rawText || 'OCR content loaded successfully.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 text-left">
            <h3 className="text-sm font-bold text-slate-100">Export Extracted Intelligence</h3>
            <p className="text-xs text-slate-400">Select export format for parsed fields and confidence data:</p>
            <div className="grid grid-cols-2 gap-3">
              {['JSON Format', 'CSV Spreadsheet', 'PDF Document', 'Markdown Text'].map((fmt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    alert(`Exporting document data as ${fmt}...`);
                    setExportModalOpen(false);
                  }}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-cyan-950 hover:border-cyan-500/50 border border-slate-800 text-xs font-bold text-slate-200 transition-all text-center"
                >
                  {fmt}
                </button>
              ))}
            </div>
            <button
              onClick={() => setExportModalOpen(false)}
              className="w-full py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
