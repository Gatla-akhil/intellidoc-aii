import { Request, Response } from 'express';
import { ragService } from '../services/rag/vector.service.js';

export const processChatMessage = async (req: Request, res: Response) => {
  const { message, documentIds } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: 'Message text is required' });
  }

  const result = await ragService.queryDocuments(message, documentIds);

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
