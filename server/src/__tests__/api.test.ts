import { describe, it, expect, beforeAll } from 'vitest';
import { AIService } from '../services/ai/ai.service.js';
import { RAGService } from '../services/rag/vector.service.js';
import { OCRService } from '../services/ocr/ocr.service.js';
import { ValidatorService } from '../services/validation/validator.service.js';
import { InMemoryDB } from '../services/db.service.js';

const aiService = new AIService();
const ragService = new RAGService();
const ocrService = new OCRService();
const validatorService = new ValidatorService();
const db = new InMemoryDB();

// ============================================================
// PHASE 1: AI Service Tests
// ============================================================
describe('IntelliDoc AI Core Pipeline Tests', () => {
  it('should extract structured fields and detect fraud indicators via AI Service', async () => {
    const result = await aiService.analyzeDocument('Invoice_Acme_Q3_2026.pdf', 'application/pdf', 'Sample invoice text');
    expect(result.category).toBe('INVOICE');
    expect(result.confidenceScore).toBeGreaterThan(0.9);
    expect(result.extractedFields.length).toBeGreaterThan(0);
    expect(result.keyInsights.length).toBeGreaterThan(0);
    expect(typeof result.hasSignature).toBe('boolean');
    expect(typeof result.hasStamp).toBe('boolean');
    expect(typeof result.isFraud).toBe('boolean');
  }, 10000);

  it('should correctly classify RESUME documents', async () => {
    const result = await aiService.analyzeDocument('Resume_John_Doe.pdf', 'application/pdf', '');
    expect(result.category).toBe('RESUME');
    expect(result.extractedFields.some(f => f.key === 'Candidate Name')).toBe(true);
  });

  it('should correctly classify CONTRACT documents', async () => {
    const result = await aiService.analyzeDocument('Master_Services_Agreement_2026.pdf', 'application/pdf', '');
    expect(result.category).toBe('CONTRACT');
    expect(result.extractedFields.some(f => f.key === 'Governing Law')).toBe(true);
  });

  it('should correctly classify PURCHASE_ORDER documents', async () => {
    const result = await aiService.analyzeDocument('Purchase_Order_99381.pdf', 'application/pdf', '');
    expect(result.category).toBe('PURCHASE_ORDER');
  });

  it('should generate a valid document comparison report', () => {
    const comparison = aiService.generateComparison('Invoice_v1.pdf', 'Invoice_v2.pdf');
    expect(comparison.fieldVariances.length).toBeGreaterThan(0);
    expect(comparison.riskScore).toBeLessThanOrEqual(1);
    expect(comparison.title).toContain('Invoice_v1.pdf');
  });
});

// ============================================================
// PHASE 2: OCR Service Tests
// ============================================================
describe('OCR Service Tests', () => {
  it('should extract raw text from a PDF document', async () => {
    const result = await ocrService.extractText('Invoice_Acme_Q3_2026.pdf', 'application/pdf');
    expect(result.rawText.length).toBeGreaterThan(50);
    expect(result.wordCount).toBeGreaterThan(0);
    expect(result.detectedLanguage).toBe('en (English)');
    expect(result.tables.length).toBeGreaterThan(0);
    expect(result.barcodes.length).toBeGreaterThan(0);
  });
});

// ============================================================
// PHASE 3: Validation Service Tests
// ============================================================
describe('Validator Service Tests', () => {
  it('should pass valid invoice math (subtotal + tax = total)', () => {
    const result = validatorService.validateInvoiceData(13500, 1350, 14850);
    expect(result.isValid).toBe(true);
    expect(result.score).toBeGreaterThan(0.9);
    expect(result.checks.every(c => c.passed)).toBe(true);
  });

  it('should flag invalid invoice math as fraud risk', () => {
    const result = validatorService.validateInvoiceData(13500, 1000, 14850); // intentional mismatch
    expect(result.isValid).toBe(false);
    expect(result.score).toBeLessThan(0.9);
    const mathCheck = result.checks.find(c => c.rule.includes('Mathematical'));
    expect(mathCheck?.passed).toBe(false);
    expect(mathCheck?.severity).toBe('CRITICAL');
  });
});

// ============================================================
// PHASE 4: Database Service Tests
// ============================================================
describe('In-Memory Database Tests', () => {
  it('should return pre-seeded documents', () => {
    const docs = db.getAll();
    expect(docs.length).toBeGreaterThanOrEqual(3);
  });

  it('should retrieve a document by ID', () => {
    const doc = db.getById('doc-inv-001');
    expect(doc).toBeDefined();
    expect(doc?.category).toBe('INVOICE');
    expect(doc?.extractedFields.length).toBeGreaterThan(0);
  });

  it('should add a new document and retrieve it', () => {
    const newDoc = {
      id: 'doc-test-999',
      title: 'Test Document',
      originalName: 'Test_Doc.pdf',
      fileType: 'application/pdf',
      category: 'INVOICE',
      fileUrl: 'https://example.com/test.pdf',
      fileSize: 1000,
      status: 'COMPLETED' as const,
      confidenceScore: 0.95,
      isFraud: false,
      hasSignature: true,
      hasStamp: false,
      piiCount: 0,
      summary: 'Test document summary',
      uploaderId: 'test-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      extractedFields: [],
      riskFlags: [],
      keyInsights: [],
    };
    db.add(newDoc);
    const retrieved = db.getById('doc-test-999');
    expect(retrieved?.title).toBe('Test Document');
  });

  it('should update a document field', () => {
    const updated = db.update('doc-inv-001', { summary: 'Updated test summary' });
    expect(updated?.summary).toBe('Updated test summary');
  });

  it('should delete a document', () => {
    db.delete('doc-test-999');
    const gone = db.getById('doc-test-999');
    expect(gone).toBeUndefined();
  });
});

// ============================================================
// PHASE 5: RAG Service Tests
// ============================================================
describe('RAG Vector Service Tests', () => {
  it('should answer invoice total questions', async () => {
    const result = await ragService.queryDocuments('What is the total billable amount?');
    expect(result.answer).toContain('14,850');
    expect(result.confidence).toBeGreaterThan(0.95);
    expect(result.citations.length).toBeGreaterThan(0);
  });

  it('should answer contract liability questions', async () => {
    const result = await ragService.queryDocuments('What is the liability cap in the MSA contract?');
    expect(result.answer).toContain('1,000,000');
    expect(result.citations[0].documentTitle).toContain('Master_Services');
  });

  it('should answer resume/candidate skill questions', async () => {
    const result = await ragService.queryDocuments('What are Evelyn Vance candidate skills?');
    expect(result.answer.toLowerCase()).toContain('evelyn');
    expect(result.citations[0].documentTitle).toContain('Resume');
  });

  it('should handle document context grounding', async () => {
    const context = 'Document: Test Invoice\nSummary: Test summary\nExtracted Fields: Invoice Number: TEST-001';
    const result = await ragService.queryDocuments('What is the invoice number?', context);
    expect(result.answer).toContain('TEST-001');
  });
});
