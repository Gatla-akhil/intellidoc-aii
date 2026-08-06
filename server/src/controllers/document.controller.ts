import { Request, Response } from 'express';
import { dbStore, DocumentModel } from '../services/db.service.js';
import { supabaseService } from '../services/supabase.service.js';
import { aiService } from '../services/ai/ai.service.js';
import { ocrService } from '../services/ocr/ocr.service.js';
import { validatorService } from '../services/validation/validator.service.js';

export const getDocuments = async (req: Request, res: Response) => {
  // Try Supabase first - fall through to local if empty or unavailable
  if (supabaseService.isConnected()) {
    const supabaseDocs = await supabaseService.getDocuments();
    if (supabaseDocs && supabaseDocs.length > 0) {
      return res.json({ success: true, count: supabaseDocs.length, data: supabaseDocs });
    }
  }
  const docs = dbStore.getAll();
  return res.json({ success: true, count: docs.length, data: docs });
};

export const getDocumentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Check local store first (always has seeded data)
  const localDoc = dbStore.getById(id);
  if (localDoc) return res.json({ success: true, data: localDoc });

  // Fall back to Supabase
  if (supabaseService.isConnected()) {
    const supabaseDocs = await supabaseService.getDocuments();
    if (supabaseDocs) {
      const doc = supabaseDocs.find((d) => d.id === id);
      if (doc) return res.json({ success: true, data: doc });
    }
  }

  return res.status(404).json({ success: false, error: 'Document not found' });
};

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const file = req.file || (files && files.length > 0 ? files[0] : undefined);
    const fileName = file ? file.originalname : req.body.fileName || 'Uploaded_Document_2026.pdf';
    const fileType = file ? file.mimetype : 'application/pdf';
    const fileSize = file ? file.size : 2100000;

    // Run OCR
    const ocrRes = await ocrService.extractText(fileName, fileType);

    // Run AI Pipeline with actual file text
    const aiRes = await aiService.analyzeDocument(fileName, fileType, ocrRes.rawText);

    // Validation
    const valRes = validatorService.validateInvoiceData(13500, 1350, 14850);

    let uploadedUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop`;
    if (file && supabaseService.isConnected()) {
      const storagePath = `uploads/${Date.now()}_${fileName}`;
      const supabaseUrl = await supabaseService.uploadFile('documents', storagePath, file.buffer, fileType);
      if (supabaseUrl) uploadedUrl = supabaseUrl;
    }

    const newDoc: DocumentModel = {
      id: `doc-${Date.now()}`,
      title: fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      originalName: fileName,
      fileType,
      category: aiRes.category,
      fileUrl: uploadedUrl,
      fileSize,
      status: 'COMPLETED',
      confidenceScore: aiRes.confidenceScore,
      isFraud: aiRes.isFraud,
      fraudReason: aiRes.fraudReason,
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

    // Save to local store first (always works)
    dbStore.add(newDoc);

    // Also persist to Supabase if connected
    if (supabaseService.isConnected()) {
      await supabaseService.insertDocument(newDoc);
    }

    return res.status(201).json({
      success: true,
      data: newDoc,
      validation: valRes,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Upload processing failed' });
  }
};

export const updateField = (req: Request, res: Response) => {
  const { docId, fieldId, value } = req.body;
  if (!docId || !fieldId) {
    return res.status(400).json({ success: false, error: 'docId and fieldId are required' });
  }

  const doc = dbStore.getById(docId);
  if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });

  const updatedFields = doc.extractedFields.map((f) => (f.id === fieldId ? { ...f, value } : f));
  const updatedDoc = dbStore.update(docId, { extractedFields: updatedFields });

  return res.json({ success: true, data: updatedDoc });
};

export const deleteDocument = (req: Request, res: Response) => {
  const { id } = req.params;
  const doc = dbStore.getById(id);
  if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });

  dbStore.delete(id);
  return res.json({ success: true, message: 'Document deleted successfully' });
};
