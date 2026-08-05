export type DocumentCategory =
  | 'INVOICE'
  | 'BILL'
  | 'MEDICAL_REPORT'
  | 'RESEARCH_PAPER'
  | 'CONTRACT'
  | 'BANK_STATEMENT'
  | 'TAX_DOCUMENT'
  | 'CERTIFICATE'
  | 'PASSPORT'
  | 'IDENTITY_CARD'
  | 'DRIVING_LICENSE'
  | 'RESUME'
  | 'OFFER_LETTER'
  | 'LEGAL_DOCUMENT'
  | 'INSURANCE_PAPER'
  | 'PURCHASE_ORDER'
  | 'RECEIPT'
  | 'UTILITY_BILL'
  | 'BUSINESS_REPORT'
  | 'OTHER';

export type DocumentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REVIEW_REQUIRED';

export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ExtractedField {
  id: string;
  key: string;
  value: string;
  category: string;
  confidence: number;
  isAnomalous: boolean;
  pageNumber: number;
  boundingBox?: BoundingBox;
}

export interface DocumentItem {
  id: string;
  title: string;
  originalName: string;
  fileType: string;
  category: DocumentCategory;
  fileUrl: string;
  fileSize: number;
  status: DocumentStatus;
  confidenceScore: number;
  isFraud: boolean;
  fraudReason?: string;
  hasSignature: boolean;
  hasStamp: boolean;
  piiCount: number;
  summary: string;
  rawText?: string;
  createdAt: string;
  updatedAt: string;
  extractedFields: ExtractedField[];
  riskFlags: string[];
  keyInsights: string[];
}

export interface ChatCitation {
  documentTitle: string;
  pageNumber: number;
  snippet: string;
}

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: ChatCitation[];
  confidenceScore?: number;
  createdAt: string;
}

export interface VarianceItem {
  field: string;
  valueDoc1: string;
  valueDoc2: string;
  status: 'CHANGED' | 'FAVORABLE' | 'ATTENTION_REQUIRED' | 'IMPROVED';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ComparisonReportItem {
  id: string;
  doc1: { id: string; name: string; category: string };
  doc2: { id: string; name: string; category: string };
  report: {
    title: string;
    diffSummary: string;
    riskScore: number;
    fieldVariances: VarianceItem[];
  };
}

export interface AnalyticsData {
  metrics: {
    totalDocumentsProcessed: number;
    totalFieldsExtracted: number;
    averageAccuracy: number;
    avgProcessingTimeMs: number;
    fraudDetectedCount: number;
    aiTokenCostUSD: number;
    storageUsedMB: number;
    totalStorageMB: number;
  };
  categoryDistribution: Array<{ category: string; count: number }>;
  processingTrend: Array<{ day: string; count: number; errorCount: number }>;
  aiModelUsage: Array<{ model: string; tokens: string; latency: string; share: string }>;
}
