import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { ApiClient } from '../services/api';
import { DocumentItem } from '../types';

interface SearchPageProps {
  onNavigate: (tab: string, docId?: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onNavigate }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    async function load() {
      const docs = await ApiClient.getDocuments();
      setDocuments(docs);
    }
    load();
  }, []);

  const filtered = documents.filter((d) => {
    const matchesCategory = categoryFilter === 'ALL' || d.category === categoryFilter;
    const matchesQuery =
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.summary.toLowerCase().includes(query.toLowerCase()) ||
      d.extractedFields.some((f) => f.key.toLowerCase().includes(query.toLowerCase()) || f.value.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100">Hybrid Semantic Document Search</h1>
        <p className="text-xs text-slate-400">Search by text, extracted metadata key-values, or high-dimensional semantic intent.</p>
      </div>

      {/* Search Input Bar & Category Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 shadow-inner">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search invoice total, candidate skills, MSA liability, vendor names..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold flex items-center space-x-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {['ALL', 'INVOICE', 'CONTRACT', 'RESUME', 'MEDICAL_REPORT', 'TAX_DOCUMENT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">No documents matching search criteria</div>
        ) : (
          filtered.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onNavigate('documents', doc.id)}
              className="glass-panel p-5 rounded-2xl glass-panel-hover flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">{doc.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-cyan-300 border border-cyan-500/30">
                    {doc.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{doc.summary}</p>
                <div className="flex items-center space-x-4 text-[10px] text-slate-500 pt-1">
                  <span>Confidence: {(doc.confidenceScore * 100).toFixed(1)}%</span>
                  <span>•</span>
                  <span>Extracted Fields: {doc.extractedFields.length}</span>
                </div>
              </div>

              <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs text-slate-200 transition-colors shrink-0 flex items-center space-x-1">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
