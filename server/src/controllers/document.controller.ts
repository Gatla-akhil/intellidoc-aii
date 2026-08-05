import { Request, Response } from 'express';
import { dbStore, DocumentModel } from '../services/db.service.js';
import { aiService } from '../services/ai/ai.service.js';
import { ocrService } from '../services/ocr/ocr.service.js';
import { validatorService } from '../services/validation/validator.service.js';

export const getDocuments = (req: Request, res: Response) => {
  const docs = dbStore.getAll();
  return res.json({ success: true, count: docs.length, data: docs });
};

export const getDocumentById = (req: Request, res: Response) => {
  const doc = dbStore.getById(req.params.id);
  if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });
  return res.json({ success: true, data: doc });
};

export const uploadDocument = async (req: Request, res: Response) => {
  const file = req.file;
  const fileName = file ? file.originalname : req.body.fileName || 'Uploaded_Document_2026.pdf';
  const fileType = file ? file.mimetype : 'application/pdf';
  const fileSize = file ? file.size : 2100000;

  // Run OCR
  const ocrRes = await ocrService.extractText(fileName, fileType);

  // Run AI Pipeline
  const aiRes = await aiService.analyzeDocument(fileName, fileType, ocrRes.rawText);

  // Validation
  const valRes = validatorService.validateInvoiceData(13500, 1350, 14850);

  const newDoc: DocumentModel = {
    id: `doc-${Date.now()}`,
    title: fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
    originalName: fileName,
    fileType,
    category: aiRes.category,
    fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    fileSize,
    status: 'COMPLETED',
    confidenceScore: aiRes.confidenceScore,
    isFraud: !valRes.isValid,
    fraudReason: valRes.isValid ? undefined : 'Invoice calculation anomaly detected',
    hasSignature: aiRes.hasSignature,
    hasStamp: aiRes.hasStamp,
    piiCount: aiRes.piiCount,
    summary: aiRes.summary,
    rawText: ocrRes.rawText,
    uploaderId: 'usr-994821',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    extractedFields: aiRes.extractedFields.map((f, idx) => ({ ...f, id: `field-${idx}` })),
    riskFlags: aiRes.riskFlags,
    keyInsights: aiRes.keyInsights,
  };

  dbStore.add(newDoc);

  return res.status(201).json({
    success: true,
    data: newDoc,
    validation: valRes,
  });
};

export const updateField = (req: Request, res: Response) => {
  const { docId, fieldId, value } = req.body;
  const doc = dbStore.getById(docId);
  if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });

  const updatedFields = doc.extractedFields.map((f) => (f.id === fieldId ? { ...f, value } : f));
  const updatedDoc = dbStore.update(docId, { extractedFields: updatedFields });

  return res.json({ success: true, data: updatedDoc });
};

export const deleteDocument = (req: Request, res: Response) => {
  const { id } = req.params;
  dbStore.delete(id);
  return res.json({ success: true, message: 'Document deleted successfully' });
};
