import React, { useState } from 'react';
import { ShieldCheck, Lock, Fingerprint, Eye, EyeOff, Key, Sparkles, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const SecurityHubPage: React.FC = () => {
  const [redacted, setRedacted] = useState(true);
  const [passkeyActive, setPasskeyActive] = useState(true);

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-100">Confidential AI & Passkeys Security Hub</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            SOC2 & HIPAA Compliant
          </span>
        </div>
        <p className="text-xs text-slate-400">Automated PII Redaction for Aadhaar, SSN, PAN, and Passports with Passwordless Passkey authentication.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Module 1: Confidential AI PII Redactor */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Confidential AI PII Auto-Shield</h3>
                <p className="text-[11px] text-slate-400">Auto-redact SSN, Aadhaar, PAN, and Passports</p>
              </div>
            </div>

            <button
              onClick={() => setRedacted(!redacted)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300"
              title="Toggle PII Masking View"
            >
              {redacted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 block">Candidate Passport Number:</span>
              <span className="text-cyan-300 font-bold">{redacted ? '████-████-9921' : 'P994821034-US'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Social Security / National Tax ID:</span>
              <span className="text-cyan-300 font-bold">{redacted ? 'XXX-XX-8849' : '121-00-8849'}</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Module 2: Passkeys Passwordless Login */}
        <SpotlightCard className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Passwordless Passkey Authentication</h3>
              <p className="text-[11px] text-slate-400">Windows Hello, Touch ID, and Face ID support</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold">Registered Device Passkey:</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Hardware biometric passkey registered on current device. Zero password vulnerability.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};
