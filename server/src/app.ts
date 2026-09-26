import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { config } from './config/env';
import apiRouter from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import { prisma } from './db';

export const app = express();
const storagePath = config.STORAGE_PATH;

// Security & Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN.split(','),
    credentials: true,
  })
);

app.use(express.json({ limit: `${config.MAX_FILE_SIZE_MB}mb` }));
app.use(express.urlencoded({ extended: true, limit: `${config.MAX_FILE_SIZE_MB}mb` }));

if (config.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Ensure storage directories exist
const uploadDir = path.resolve(storagePath, 'documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded documents statically
app.use('/storage/documents', express.static(uploadDir));

// Health check endpoint (Simple Liveness)
const healthHandler = (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    product: 'SAHAAY',
    tagline: 'Your Land. Your Case. Your Information.',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// Readiness check (Validates Database connection)
app.get('/api/health/ready', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ready',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: config.NODE_ENV === 'production' ? 'Database unavailable' : error.message,
    });
  }
});

// API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
