import { Router } from 'express';
import multer from 'multer';
import { loginUser, registerUser, getCurrentUser } from '../controllers/auth.controller.js';
import {
  getDocuments,
  getDocumentById,
  uploadDocument,
  updateField,
  deleteDocument,
} from '../controllers/document.controller.js';
import { processChatMessage } from '../controllers/chat.controller.js';
import { compareDocuments } from '../controllers/compare.controller.js';
import { getDashboardAnalytics } from '../controllers/analytics.controller.js';
import { authenticateJwt } from '../middleware/auth.js';

// 50MB file size limit - supports PDF, DOCX, PNG, JPG, CSV, XLSX, PPTX, TXT, ZIP
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });
const router = Router();

// Auth Routes
router.post('/auth/login', loginUser);
router.post('/auth/register', registerUser);
router.get('/auth/me', authenticateJwt, getCurrentUser);

// Document Routes
router.get('/documents', getDocuments);
router.get('/documents/:id', getDocumentById);
router.post('/documents/upload', upload.any(), uploadDocument);
router.patch('/documents/field', updateField);
router.delete('/documents/:id', deleteDocument);

// AI Agent & RAG Routes
router.post('/chat', processChatMessage);
router.post('/compare', compareDocuments);

// Analytics Routes - expose both /dashboard and /overview to fix client mismatch
router.get('/analytics/dashboard', getDashboardAnalytics);
router.get('/analytics/overview', getDashboardAnalytics);

export default router;
