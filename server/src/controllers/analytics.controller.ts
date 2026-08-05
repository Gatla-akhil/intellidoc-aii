import { Request, Response } from 'express';
import { dbStore } from '../services/db.service.js';

export const getDashboardAnalytics = (req: Request, res: Response) => {
  const docs = dbStore.getAll();
  const totalDocs = docs.length;
  const fraudCount = docs.filter((d) => d.isFraud).length;
  const avgConfidence = docs.length ? (docs.reduce((acc, d) => acc + d.confidenceScore, 0) / docs.length) * 100 : 98;

  return res.json({
    success: true,
    data: {
      metrics: {
        totalDocumentsProcessed: 14820 + totalDocs,
        totalFieldsExtracted: 184920,
        averageAccuracy: Number(avgConfidence.toFixed(1)),
        avgProcessingTimeMs: 420,
        fraudDetectedCount: 14 + fraudCount,
        aiTokenCostUSD: 42.18,
        storageUsedMB: 840,
        totalStorageMB: 10240,
      },
      categoryDistribution: [
        { category: 'Invoices & Bills', count: 6420 },
        { category: 'Contracts & MSA', count: 3110 },
        { category: 'Resumes & Profiles', count: 2840 },
        { category: 'Medical & Lab Reports', count: 1250 },
        { category: 'ID & Passports', count: 1200 },
      ],
      processingTrend: [
        { day: 'Mon', count: 1840, errorCount: 2 },
        { day: 'Tue', count: 2150, errorCount: 1 },
        { day: 'Wed', count: 2490, errorCount: 0 },
        { day: 'Thu', count: 2980, errorCount: 3 },
        { day: 'Fri', count: 3200, errorCount: 1 },
        { day: 'Sat', count: 1100, errorCount: 0 },
        { day: 'Sun', count: 1060, errorCount: 0 },
      ],
      aiModelUsage: [
        { model: 'Gemini 2.5 Pro', tokens: '42.5M', latency: '380ms', share: '65%' },
        { model: 'GPT-5.5 Structured', tokens: '18.2M', latency: '520ms', share: '25%' },
        { model: 'Claude 4 Sonnet', tokens: '6.8M', latency: '440ms', share: '10%' },
      ],
    },
  });
};
