import { describe, it, expect } from 'vitest';
import { dbStore } from '../services/db.service.js';
import { validatorService } from '../services/validation/validator.service.js';
import { aiService } from '../services/ai/ai.service.js';

describe('IntelliDoc AI Core Pipeline Tests', () => {
  it('should initialize with default sample documents', () => {
    const docs = dbStore.getAll();
    expect(docs.length).toBeGreaterThan(0);
    expect(docs[0].title).toContain('Invoice');
  });

  it('should mathematically validate invoice subtotal and tax calculation', () => {
    const validRes = validatorService.validateInvoiceData(13500, 1350, 14850);
    expect(validRes.isValid).toBe(true);
    expect(validRes.score).toBeGreaterThan(0.9);

    const invalidRes = validatorService.validateInvoiceData(100, 50, 999);
    expect(invalidRes.isValid).toBe(false);
  });

  it('should extract structured fields and detect fraud indicators via AI Service', async () => {
    const analysis = await aiService.analyzeDocument('Invoice_Sample.pdf', 'application/pdf');
    expect(analysis.category).toBe('INVOICE');
    expect(analysis.extractedFields.length).toBeGreaterThan(0);
    expect(analysis.confidenceScore).toBeGreaterThan(0.9);
  });
});
