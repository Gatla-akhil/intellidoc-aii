import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import apiRouter from './routes/api.routes.js';
import { errorHandler } from './middleware/error.js';

const clientDistPath = path.resolve(process.cwd(), '../client/dist');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Security & Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { success: false, error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'IntelliDoc AI Unified Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1', apiRouter);

// Serve Production Static Frontend Assets
app.use(express.static(clientDistPath));

// Catch-All SPA Client Route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/health') {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Global Error Handler
app.use(errorHandler);

// WebSocket real-time events
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('join_document', (docId) => {
    socket.join(`doc_${docId}`);
    logger.info(`Socket ${socket.id} joined channel doc_${docId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

const PORT = Number(env.PORT) || 5000;

httpServer.listen(PORT, '0.0.0.0', () => {
  logger.info(`=======================================================`);
  logger.info(`🚀 IntelliDoc AI Unified Server Active on port ${PORT}`);
  logger.info(`🌐 Full Application URL: http://localhost:${PORT}`);
  logger.info(`⚡ API Base URL: http://localhost:${PORT}/api/v1`);
  logger.info(`📱 Mobile / Wi-Fi Access: http://10.60.9.24:${PORT}`);
  logger.info(`=======================================================`);
});
