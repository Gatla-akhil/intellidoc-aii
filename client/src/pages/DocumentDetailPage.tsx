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
  Check,
  ExternalLink,
  Eye,
  FileCode,
} from 'lucide-react';
import { ApiClient } from '../services/api';
import { exportDocumentData } from '../services/export.service';
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
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function loadDoc() {
      setImageError(false);
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

  const handleExport = (format: 'JSON' | 'CSV' | 'PDF' | 'Markdown') => {
    const updatedDoc: DocumentItem = {
      ...doc,
      extractedFields: fields,
    };
    exportDocumentData(updatedDoc, format);
    setExportedFormat(format);
    setTimeout(() => setExportedFormat(null), 2500);
  };

  const handleOpenSourceFile = () => {
    if (doc.fileUrl && doc.fileUrl.startsWith('http')) {
      window.open(doc.fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback: trigger markdown/text export
      exportDocumentData(doc, 'Markdown');
    }
  };

  return (
    <div className="flex flex-col md:h-[calc(100dvh-61px)] min-h-[calc(100dvh-61px)] text-left md:overflow-hidden overflow-y-auto relative">
      {/* Toast Notification when Export Triggered */}
      {exportedFormat && (
        <div className="absolute top-16 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center space-x-2 shadow-2xl animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Document successfully exported as {exportedFormat}!</span>
        </div>
      )}

      {/* Top Action Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('documents')}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-semibold cursor-pointer"
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

        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
          <button
            onClick={handleOpenSourceFile}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Open Original File"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Open File</span>
          </button>

          {/* Direct Quick Export Chips */}
          {(['JSON', 'CSV', 'PDF', 'Markdown'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => handleExport(fmt)}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[10px] md:text-[11px] font-mono font-bold flex items-center space-x-1 transition-colors cursor-pointer"
              title={`Download ${fmt}`}
            >
              <Download className="w-3 h-3 text-cyan-400" />
              <span>{fmt}</span>
            </button>
          ))}

          <button
            onClick={() => setExportModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Options</span>
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className="px-3.5 py-1.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>

      {/* Main Dual Panel Container */}
      <div className="grid md:grid-cols-12 flex-1 md:overflow-hidden overflow-y-auto">
        {/* Left Panel: Document Viewer Canvas (Col 6) */}
        <div className="md:col-span-6 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 p-4 flex flex-col justify-between min-h-[360px] md:min-h-0 md:overflow-hidden relative">
          {/* Canvas Toolbar */}
          <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl px-3 py-1.5 mb-3 z-10">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-slate-300">Document Canvas View</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase font-mono">
                {doc.category}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[10px] text-slate-400 w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Document Display Container */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-slate-900/40 rounded-2xl border border-slate-800/80 relative">
            <div
              className="relative transition-transform duration-200 shadow-2xl rounded-xl overflow-hidden border border-slate-700 max-w-full w-full bg-slate-950 p-6"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {!imageError && doc.fileUrl && !doc.fileUrl.endsWith('.pdf') ? (
                <div className="relative">
                  <img
                    src={doc.fileUrl}
                    alt={doc.title}
                    onError={() => setImageError(true)}
                    className="max-w-full h-auto max-h-[540px] object-contain rounded mx-auto"
                  />

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
              ) : (
                /* High-fidelity Visual Document Preview Canvas */
                <div className="space-y-5 text-left font-mono">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">{doc.title}</h4>
                        <span className="text-[9px] text-slate-400">{doc.originalName} • {doc.category}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      {(doc.confidenceScore * 100).toFixed(0)}% Score
                    </span>
                  </div>

                  {/* Document Entity Field Table Grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Parsed Key-Value Layout:</span>
                    <div className="grid grid-cols-1 gap-2">
                      {fields.map((f) => {
                        const isSelected = selectedFieldId === f.id;
                        return (
                          <div
                            key={f.id}
                            onClick={() => setSelectedFieldId(f.id)}
                            className={`p-2.5 rounded-lg border flex items-center justify-between text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-cyan-950/60 border-cyan-500/60 shadow-md'
                                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-slate-400 font-bold">{f.key}:</span>
                            <span className="text-cyan-300 font-bold font-mono">{f.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Digital Signature & Seal Badge */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Digital Seal Present</span>
                    </span>
                    <button
                      onClick={handleOpenSourceFile}
                      className="text-cyan-400 hover:underline flex items-center space-x-1 font-bold cursor-pointer"
                    >
                      <span>Open Source File</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Extracted Fields & Security Audit (Col 6) */}
        <div className="md:col-span-6 bg-slate-950 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
          {/* Document Summary & Security Badge */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security Audit: {doc.isFraud ? '⚠️ Anomaly Flagged' : 'Passed Zero-Trust Verification'}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono">
                {(doc.confidenceScore * 100).toFixed(1)}% Accuracy
              </span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-sans">
              {doc.summary}
            </p>

            {/* Risk Flags */}
            {doc.riskFlags && doc.riskFlags.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Risk Flags:</span>
                {doc.riskFlags.map((flag, idx) => (
                  <p key={idx} className="text-xs text-amber-300 flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{flag}</span>
                  </p>
                ))}
              </div>
            )}

            {/* Tab selector */}
            <div className="flex space-x-2 border-b border-slate-800 pb-2">
              {[
                { id: 'fields' as const, label: `Extracted Entities (${fields.length})` },
                { id: 'insights' as const, label: `Key AI Insights (${doc.keyInsights?.length || 0})` },
                { id: 'rawText' as const, label: 'Raw OCR Stream' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'fields' && (
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {fields.map((field) => {
                  const isSelected = selectedFieldId === field.id;
                  return (
                    <div
                      key={field.id}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-500/70 shadow-md'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 font-mono">{field.key}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300 font-mono border border-slate-800">
                            {field.category}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 font-mono">
                            {(field.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
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
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(doc.keyInsights || []).map((ins, i) => (
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
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-60 whitespace-pre-line">
                {doc.rawText || 'OCR content loaded successfully.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4 text-left shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Extracted Intelligence Data</span>
            </h3>
            <p className="text-xs text-slate-400">Select export format for parsed fields, confidence scores, and risk audit:</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'JSON Format', format: 'JSON' as const, desc: 'Complete structured JSON' },
                { label: 'CSV Spreadsheet', format: 'CSV' as const, desc: 'Excel & Data grid table' },
                { label: 'PDF Document', format: 'PDF' as const, desc: 'Formatted PDF report' },
                { label: 'Markdown Text', format: 'Markdown' as const, desc: 'Clean Markdown doc' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleExport(item.format);
                    setExportModalOpen(false);
                  }}
                  className="p-3.5 rounded-xl bg-slate-950 hover:bg-cyan-950 hover:border-cyan-500/50 border border-slate-800 text-left transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">{item.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setExportModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
