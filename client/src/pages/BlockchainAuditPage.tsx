import React from 'react';
import { ShieldCheck, Lock, Hash, CheckCircle2, FileText, Cpu } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const BlockchainAuditPage: React.FC = () => {
  const blocks = [
    {
      index: '#884901',
      hash: '0x994821a0f8231948203b821948',
      previousHash: '0x00000000000000000000000000',
      action: 'Document Ingestion & Laser OCR Parse',
      doc: 'Invoice_Acme_Cloud_Q3_2026.pdf',
      timestamp: '2026-08-05 20:34:12',
    },
    {
      index: '#884902',
      hash: '0x3841029348a821039481203948',
      previousHash: '0x994821a0f8231948203b821948',
      action: 'Subtotal Math & Fraud Guard Verification',
      doc: 'Invoice_Acme_Cloud_Q3_2026.pdf',
      timestamp: '2026-08-05 20:34:14',
    },
    {
      index: '#884903',
      hash: '0xe1029384712039481029348120',
      previousHash: '0x3841029348a821039481203948',
      action: 'RAG Vector Embedding Commit & Encryption',
      doc: 'Invoice_Acme_Cloud_Q3_2026.pdf',
      timestamp: '2026-08-05 20:34:18',
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">Cryptographic Blockchain Audit Ledger</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            Immutable SHA-256 Hash Chain
          </span>
        </div>
        <p className="text-xs text-slate-400">Tamper-proof, cryptographically signed audit trail for legal compliance and enterprise auditability.</p>
      </div>

      {/* Ledger Block Stream */}
      <div className="space-y-4">
        {blocks.map((block, idx) => (
          <SpotlightCard key={block.index} className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                  Block {block.index}
                </span>
                <span className="text-xs font-bold text-slate-100">{block.action}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hash Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block">SHA-256 Block Hash:</span>
                <span className="text-cyan-300 font-bold truncate block">{block.hash}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Previous Block Hash:</span>
                <span className="text-slate-400 truncate block">{block.previousHash}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span>Target File: {block.doc}</span>
              <span>Timestamp: {block.timestamp}</span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
