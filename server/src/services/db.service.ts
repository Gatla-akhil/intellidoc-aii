export interface DocumentModel {
  id: string;
  title: string;
  originalName: string;
  fileType: string;
  category: string;
  fileUrl: string;
  fileSize: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REVIEW_REQUIRED';
  confidenceScore: number;
  isFraud: boolean;
  fraudReason?: string;
  hasSignature: boolean;
  hasStamp: boolean;
  piiCount: number;
  summary: string;
  rawText?: string;
  uploaderId: string;
  createdAt: string;
  updatedAt: string;
  extractedFields: Array<{
    id: string;
    key: string;
    value: string;
    category: string;
    confidence: number;
    isAnomalous: boolean;
    pageNumber: number;
    boundingBox?: { x: number; y: number; w: number; h: number };
  }>;
  riskFlags: string[];
  keyInsights: string[];
}

export class InMemoryDB {
  private documents: DocumentModel[] = [
    {
      id: 'doc-inv-001',
      title: 'Invoice - Acme Cloud Infrastructure (Q3)',
      originalName: 'Invoice_Acme_Cloud_Q3_2026.pdf',
      fileType: 'application/pdf',
      category: 'INVOICE',
      fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      fileSize: 2450000,
      status: 'COMPLETED',
      confidenceScore: 0.98,
      isFraud: false,
      hasSignature: true,
      hasStamp: true,
      piiCount: 2,
      summary: 'Enterprise SaaS Subscription & Cloud Server Infrastructure Invoice for Q3 2026. Total billable amount $14,850.00 with NET 30 terms.',
      rawText: 'INVOICE #INV-2026-8849 Subtotal $13,500 Tax $1,350 Total $14,850',
      uploaderId: 'demo-user-101',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      updatedAt: new Date().toISOString(),
      extractedFields: [
        { id: 'f-1', key: 'Invoice Number', value: 'INV-2026-8849', category: 'Metadata', confidence: 0.99, isAnomalous: false, pageNumber: 1, boundingBox: { x: 120, y: 150, w: 200, h: 30 } },
        { id: 'f-2', key: 'Vendor Name', value: 'Acme Cloud Dynamics Inc.', category: 'Vendor', confidence: 0.98, isAnomalous: false, pageNumber: 1, boundingBox: { x: 120, y: 190, w: 310, h: 30 } },
        { id: 'f-3', key: 'Invoice Date', value: '2026-08-01', category: 'Dates', confidence: 0.97, isAnomalous: false, pageNumber: 1, boundingBox: { x: 450, y: 150, w: 180, h: 30 } },
        { id: 'f-4', key: 'Grand Total', value: '$14,850.00', category: 'Financial', confidence: 0.99, isAnomalous: false, pageNumber: 1, boundingBox: { x: 450, y: 430, w: 180, h: 35 } },
      ],
      riskFlags: [],
      keyInsights: ['Verified subtotal + tax calculation', 'No price variance detected against PO #99381'],
    },
    {
      id: 'doc-msa-002',
      title: 'Master Services Agreement - Apex Tech',
      originalName: 'Master_Services_Agreement_Apex_2026.pdf',
      fileType: 'application/pdf',
      category: 'CONTRACT',
      fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
      fileSize: 4800000,
      status: 'COMPLETED',
      confidenceScore: 0.96,
      isFraud: false,
      hasSignature: true,
      hasStamp: true,
      piiCount: 4,
      summary: 'Master Services Agreement (MSA) between IntelliDoc Corp and Apex Technologies. Includes SLA metrics, non-disclosure confidentiality clauses, and liability caps.',
      rawText: 'MSA Contract Effective 2026-09-01 Liability Cap $1,000,000 Delaware Jurisdiction',
      uploaderId: 'demo-user-101',
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      updatedAt: new Date().toISOString(),
      extractedFields: [
        { id: 'f-10', key: 'Effective Date', value: '2026-09-01', category: 'Dates', confidence: 0.96, isAnomalous: false, pageNumber: 1 },
        { id: 'f-11', key: 'Liability Cap', value: '$1,000,000 USD', category: 'Risk', confidence: 0.92, isAnomalous: false, pageNumber: 3 },
      ],
      riskFlags: ['Automatic renewal notice required 60 days before expiration'],
      keyInsights: ['99.9% uptime SLA guarantee committed'],
    },
    {
      id: 'doc-cv-003',
      title: 'Senior AI Engineer Resume - Dr. Evelyn Vance',
      originalName: 'Resume_Evelyn_Vance_2026.pdf',
      fileType: 'application/pdf',
      category: 'RESUME',
      fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop',
      fileSize: 1200000,
      status: 'COMPLETED',
      confidenceScore: 0.99,
      isFraud: false,
      hasSignature: false,
      hasStamp: false,
      piiCount: 3,
      summary: 'Senior AI Engineer Candidate Profile with 7+ years experience in LLM Agents, PyTorch, React, Vector Databases, and Distributed AI Pipelines.',
      rawText: 'Dr. Evelyn Vance Stanford PhD PyTorch Gemini 2.5 RAG Vector DBs',
      uploaderId: 'demo-user-101',
      createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      updatedAt: new Date().toISOString(),
      extractedFields: [
        { id: 'f-20', key: 'Candidate Name', value: 'Dr. Evelyn Vance', category: 'Personal', confidence: 0.99, isAnomalous: false, pageNumber: 1 },
        { id: 'f-21', key: 'Top Skills', value: 'PyTorch, Gemini 2.5 Pro, RAG, React 19, Vector DBs', category: 'Skills', confidence: 0.97, isAnomalous: false, pageNumber: 1 },
      ],
      riskFlags: [],
      keyInsights: ['Stanford CS PhD with 7.5 years AI engineering track record'],
    },
  ];

  public getAll() {
    return this.documents;
  }

  public getById(id: string) {
    return this.documents.find((d) => d.id === id);
  }

  public add(doc: DocumentModel) {
    this.documents.unshift(doc);
    return doc;
  }

  public update(id: string, updates: Partial<DocumentModel>) {
    const idx = this.documents.findIndex((d) => d.id === id);
    if (idx !== -1) {
      this.documents[idx] = { ...this.documents[idx], ...updates, updatedAt: new Date().toISOString() };
      return this.documents[idx];
    }
    return null;
  }

  public delete(id: string) {
    this.documents = this.documents.filter((d) => d.id !== id);
    return true;
  }
}

export const dbStore = new InMemoryDB();
