import React, { useState } from 'react';
import { Bell, Sparkles, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);

  const notifications = [
    { title: 'AI Fraud Check Passed', desc: 'Invoice #INV-2026-8849 subtotal verified mathematically.', time: '2m ago', icon: CheckCircle2, color: 'text-emerald-400' },
    { title: 'New Document Uploaded', desc: 'Resume_Evelyn_Vance_2026.pdf processed by OCR Agent.', time: '10m ago', icon: Sparkles, color: 'text-cyan-400' },
    { title: 'Compliance Audit Flag', desc: 'Contract auto-renewal term requires 60-day notice.', time: '1h ago', icon: ShieldAlert, color: 'text-amber-400' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setUnread(false);
        }}
        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors relative cursor-pointer"
        title="Smart Notification Center"
      >
        <Bell className="w-4 h-4 text-cyan-400" />
        {unread && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3 text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-slate-100 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Smart AI Notifications</span>
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {notifications.map((n, i) => {
              const Icon = n.icon;
              return (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold flex items-center space-x-1 ${n.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{n.title}</span>
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">{n.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
