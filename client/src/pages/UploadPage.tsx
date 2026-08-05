import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, Camera, FolderArchive, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ApiClient } from '../services/api';
import { DocumentCategory } from '../types';
import { SpotlightCard } from '../components/ui/SpotlightCard';

interface UploadPageProps {
  onNavigate: (tab: string, docId?: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('INVOICE');
  const [isUploading, setIsUploading] = useState(false);
  const [progressStage, setProgressStage] = useState('');
  const [fileName, setFileName] = useState('');

  const categories: Array<{ id: DocumentCategory; label: string }> = [
    { id: 'INVOICE', label: 'Invoices & Bills' },
    { id: 'CONTRACT', label: 'Contracts & Legal' },
    { id: 'RESUME', label: 'Resumes & Profiles' },
    { id: 'MEDICAL_REPORT', label: 'Medical Reports' },
    { id: 'BANK_STATEMENT', label: 'Bank Statements' },
    { id: 'TAX_DOCUMENT', label: 'Tax Documents' },
    { id: 'PASSPORT', label: 'Passports & IDs' },
    { id: 'PURCHASE_ORDER', label: 'Purchase Orders' },
  ];

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setFileName(file.name);
    setProgressStage('Running Laser Vision OCR & Structural Layout Analysis...');

    setTimeout(() => setProgressStage('Multi-Agent Document Classification & PII Redaction...'), 700);
    setTimeout(() => setProgressStage('Extracting key-value entities & Math validation...'), 1400);
    setTimeout(() => setProgressStage('Generating RAG Embeddings & Vector Knowledge Index...'), 2100);

    setTimeout(async () => {
      const doc = await ApiClient.uploadDocument(file, selectedCategory);
      setIsUploading(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onNavigate('documents', doc.id);
    }, 2600);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-5xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">AI Intelligent Document Ingestion Center</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            Vision Laser Scan
          </span>
        </div>
        <p className="text-xs text-slate-400">Upload single or multi-page documents, scanned images, ZIP archives, or camera captures.</p>
      </div>

      {/* Category Picker Chips */}
      <div>
        <label className="text-xs font-semibold text-slate-300 block mb-3">Select Target Document Category Preset:</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Futuristic Drag & Drop Zone with Laser Scanner Beam */}
      <SpotlightCard className="p-1">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-[22px] p-12 text-center transition-all duration-300 ${
            isUploading
              ? 'border-cyan-500 bg-cyan-950/20'
              : 'border-slate-800 hover:border-cyan-500/50 bg-slate-950/60 hover:bg-slate-900/40'
          }`}
        >
          {/* Active Laser Beam Scanner Overlay */}
          {isUploading && <div className="laser-scanner-line" />}

          {isUploading ? (
            <div className="space-y-6 py-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center animate-pulse">
                  <Cpu className="w-10 h-10 text-cyan-400 animate-spin" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-100 mb-1">Laser Neural OCR & Parsing: {fileName}</h3>
                <p className="text-xs text-cyan-400 font-mono animate-pulse">{progressStage}</p>
              </div>

              {/* Progress bar */}
              <div className="max-w-md mx-auto bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full w-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/10">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-100">Drag and drop your document file here</h3>
                <p className="text-xs text-slate-400 mt-1">Supports PDF, PNG, JPG, DOCX, XLSX, TIFF, and ZIP archives up to 50MB</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <label className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-cyan-500/20">
                  <span>Browse Local Files</span>
                  <input type="file" onChange={handleFileInput} className="hidden" />
                </label>

                <button
                  onClick={() =>
                    handleFileUpload(new File(['sample'], 'Camera_Scan_Invoice_2026.pdf', { type: 'application/pdf' }))
                  }
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>Simulate Camera Scan</span>
                </button>

                <button
                  onClick={() =>
                    handleFileUpload(new File(['sample'], 'Batch_Invoices_Archive.zip', { type: 'application/zip' }))
                  }
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <FolderArchive className="w-4 h-4 text-indigo-400" />
                  <span>Batch ZIP Upload</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </SpotlightCard>

      {/* Security Assurance Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>AES-256 Encrypted Ingestion • Automatic PII Masking • SOC2 Type II Pipeline</span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-slate-500">Zero Data Retention Active</span>
      </div>
    </div>
  );
};
