import { Request, Response } from 'express';
import { aiService } from '../services/ai/ai.service.js';
import { dbStore } from '../services/db.service.js';

export const compareDocuments = async (req: Request, res: Response) => {
  const { doc1Id, doc2Id } = req.body;

  const doc1 = dbStore.getById(doc1Id) || dbStore.getAll()[0];
  const doc2 = dbStore.getById(doc2Id) || dbStore.getAll()[1] || dbStore.getAll()[0];

  const comparison = aiService.generateComparison(doc1.originalName, doc2.originalName);

  return res.json({
    success: true,
    data: {
      id: `cmp-${Date.now()}`,
      doc1: { id: doc1.id, name: doc1.title, category: doc1.category },
      doc2: { id: doc2.id, name: doc2.title, category: doc2.category },
      report: comparison,
    },
  });
};
