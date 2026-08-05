import React from 'react';
import { ShieldAlert, Users, Server, Activity, Lock, AlertCircle } from 'lucide-react';

export const AdminPage: React.FC = () => {
  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100">Enterprise Security & Admin Control</h1>
        <p className="text-xs text-slate-400">System health monitoring, RBAC user permissions, rate-limit logs, and SOC2 audit trails.</p>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left">
          <div className="flex items-center space-x-2 text-emerald-400 mb-2">
            <Server className="w-4 h-4" />
            <span className="text-xs font-bold">API Gateway Status</span>
          </div>
          <p className="text-xl font-extrabold text-slate-100">Healthy (99.99%)</p>
          <p className="text-[10px] text-slate-500 mt-1">Latency: 12ms • Node v20.14</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left">
          <div className="flex items-center space-x-2 text-cyan-400 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold">Active Workspace Users</span>
          </div>
          <p className="text-xl font-extrabold text-slate-100">148 Active Seats</p>
          <p className="text-[10px] text-slate-500 mt-1">RBAC Enforced via JWT</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left">
          <div className="flex items-center space-x-2 text-purple-400 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-bold">Security Audit Logs</span>
          </div>
          <p className="text-xl font-extrabold text-slate-100">0 Violations</p>
          <p className="text-[10px] text-slate-500 mt-1">Helmet & Rate Limiter Active</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-100">Real-Time Security Event Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Action Event</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { time: '2026-08-05 20:34:12', user: 'alex.architect@intellidoc.ai', event: 'Document Upload (Invoice_Acme_Cloud.pdf)', ip: '192.168.1.104', status: 'SUCCESS' },
                { time: '2026-08-05 20:30:45', user: 'system.agent@intellidoc.ai', event: 'OCR Batch Pipeline Execution', ip: '10.0.4.12', status: 'SUCCESS' },
                { time: '2026-08-05 20:15:02', user: 'alex.architect@intellidoc.ai', event: 'API Secret Rotation', ip: '192.168.1.104', status: 'SUCCESS' },
              ].map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">{log.time}</td>
                  <td className="p-3.5 font-semibold text-slate-200">{log.user}</td>
                  <td className="p-3.5 text-slate-300">{log.event}</td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">{log.ip}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
