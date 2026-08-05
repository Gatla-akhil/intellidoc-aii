# IntelliDoc AI — Next Generation Intelligent Document Processing Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.0-cyan.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Gemini 2.5](https://img.shields.io/badge/AI_Model-Gemini_2.5_Pro-emerald.svg)](https://deepmind.google/technologies/gemini/)

**IntelliDoc AI** is an enterprise-grade Intelligent Document Processing (IDP) SaaS platform engineered to read, understand, classify, validate, extract, detect fraud, summarize, and answer RAG questions from any document class in milliseconds.

---

## 🌟 Key Capabilities

- 📄 **Universal Document Ingestion**: Ingest PDF, PNG, JPG, DOCX, XLSX, TIFF, scanned mobile photos, and multi-file ZIP archives.
- ⚡ **Multi-Agent AI Pipeline**: Auto-classify 24+ document categories (Invoices, Resumes, MSA Contracts, Medical Reports, Passports, Bank Statements, Tax W-2s, etc.).
- 🔍 **Interactive Document Canvas Viewer**: Visual bounding box overlay synchronization, field editing, confidence score indicators, and OCR text highlights.
- 💬 **RAG Conversational Knowledge Base**: Ask complex questions across documents with exact page numbers, line numbers, and snippet citations.
- ⚖️ **AI Contract & Document Comparison**: Side-by-side legal clause diffs, price variance detection, and automated risk scoring.
- 🛡️ **Fraud & Anomaly Detection**: Verify mathematical subtotal integrity, stamp/signature verification, fake document layout detection, and automated PII masking.
- 📊 **Executive Analytics & Cost Dashboard**: Monitor token expenditure across Gemini 2.5 Pro, GPT-5.5, and Claude 4 with real-time throughput metrics.
- ⌨️ **Command Palette (Ctrl+K)**: Raycast / Linear-style global keyboard search across documents, actions, and AI tools.

---

## 🏗️ Enterprise Architecture

```
 ┌───────────────────────────────────────────────────────────────────────────────────┐
 │                                   FRONTEND                                        │
 │  React 19 + Vite + TypeScript + Tailwind CSS v4 + Motion + Lucide + Recharts    │
 │  - Aurora Backgrounds & Glassmorphism UI (Notion / Linear / Stripe Aesthetics)    │
 │  - Interactive Document Canvas Viewer, Diff Compare, Ctrl+K Palette, Floating Dock│
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │ REST / WebSockets / SSE
 ┌─────────────────────────────────────────▼─────────────────────────────────────────┐
 │                                   BACKEND                                         │
 │  Node.js + Express + TypeScript + JWT/Auth + Zod Validation + Pino + Helmet       │
 │  - Document Pipeline Engine (Multer, OCR Pre-processor, Batch Worker Engine)     │
 │  - Validation Rules Engine (Invoice, GST, Fraud, PII Anonymization, Risk Checks)  │
 └─────────────────────────────────────────┬─────────────────────────────────────────┘
                                           │ Prisma ORM
 ┌─────────────────────────────────────────▼─────────────────────────────────────────┐
 │                                  AI & DATA                                        │
 │  - Database: PostgreSQL (Users, Documents, Entities, Comparisons, Chat, Logs)     │
 │  - AI Layer: Multi-Model AI Router (Gemini 2.5 Pro, GPT-5.5, Claude 4)           │
 │  - RAG & Vector Engine: Semantic Chunking, Vector Embeddings, Hybrid Search        │
 └───────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Git

### 1. Clone & Install Dependencies
```bash
# Clone repository
cd intelligentdocument

# Install monorepo dependencies
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Environment Configuration
Copy the example environment template:
```bash
cp .env.example .env
```

### 3. Run Development Servers
Start both the Frontend (Vite on `http://localhost:5173`) and Backend (Express on `http://localhost:5000`) concurrently with a single command:
```bash
npm run dev
```

---

## 🐳 Docker Deployment

Run the complete platform stack including PostgreSQL database and Redis cache:
```bash
docker-compose up --build
```

---

## 🧪 Automated Testing

Execute vitest test suites:
```bash
npm test
```

---

## 📜 License
Built under MIT License. Open source for enterprise innovation.
