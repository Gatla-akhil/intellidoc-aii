import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, FileText, CheckCircle2, Copy } from 'lucide-react';
import { ApiClient } from '../services/api';
import { ChatMessageItem } from '../types';

export const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content:
        'Hello Alex! I am your IntelliDoc AI RAG Assistant. I have indexed your invoices, contracts, resumes, and medical reports. How can I help you extract or analyze intelligence today?',
      citations: [],
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const promptChips = [
    'What is the total billable amount on Invoice #INV-2026-8849?',
    'What is the liability cap in the Master Services Agreement?',
    'Summarize Dr. Evelyn Vance candidate qualifications',
    'List all payment due dates across invoices',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessageItem = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    const botResponse = await ApiClient.sendChatMessage(query);
    setIsTyping(false);
    setMessages((prev) => [...prev, botResponse]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-61px)] max-w-5xl mx-auto p-4 lg:p-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <span>Multi-Document RAG Intelligence Assistant</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                Gemini 2.5 Pro
              </span>
            </h1>
            <p className="text-xs text-slate-400">Grounding responses across 3 active indexed documents</p>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {messages.map((msg) => {
          const isBot = msg.role === 'assistant';
          return (
            <div key={msg.id} className={`flex items-start space-x-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
              {isBot && (
                <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                  isBot
                    ? 'bg-slate-900 border border-slate-800 text-slate-200'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-semibold'
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>

                {/* Citations block */}
                {isBot && msg.citations && msg.citations.length > 0 && (
                  <div className="pt-3 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Source Citations:</span>
                    {msg.citations.map((c, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                        <span className="font-bold text-slate-300">{c.documentTitle}</span> (Page {c.pageNumber})
                        <p className="italic text-[10px] text-slate-500 mt-0.5">"{c.snippet}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {!isBot && (
                <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Retrieving vector chunks & generating answer...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-2 flex flex-wrap gap-2">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="text-[11px] px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-2xl p-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your uploaded invoices, contracts, medical reports..."
          className="flex-1 bg-transparent px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors font-bold shadow-md shadow-cyan-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
