import { Request, Response } from 'express';
import { ragService } from '../services/rag/vector.service.js';
import { dbStore } from '../services/db.service.js';

export const processChatMessage = async (req: Request, res: Response) => {
  // Accept both 'message' and 'query' field names
  const message = req.body.message || req.body.query;
  const documentIds = req.body.documentIds || req.body.documentId;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message text is required' });
  }

  // Pass actual document context to RAG if a specific document is requested
  let documentContext: string | undefined;
  if (documentIds) {
    const docId = Array.isArray(documentIds) ? documentIds[0] : documentIds;
    const doc = dbStore.getById(docId);
    if (doc) {
      documentContext = `Document: ${doc.title}\nSummary: ${doc.summary}\nExtracted Fields: ${doc.extractedFields.map(f => `${f.key}: ${f.value}`).join(', ')}`;
    }
  }

  const result = await ragService.queryDocuments(message, documentContext);

  return res.json({
    success: true,
    data: {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: result.answer,
      citations: result.citations,
      confidenceScore: result.confidence,
      createdAt: new Date().toISOString(),
    },
  });
};
