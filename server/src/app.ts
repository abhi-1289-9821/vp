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

// CORS configuration
const rawCorsOrigin = config.CORS_ORIGIN.trim();
const allowedOrigins =
  rawCorsOrigin === '*'
    ? []
    : rawCorsOrigin.split(',').map((o) => o.trim().replace(/\/$/, ''));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, mobile, curl)
      if (!origin) return callback(null, true);

      // In non-production, if explicitly set to '*', allow
      if (rawCorsOrigin === '*') {
        if (config.NODE_ENV === 'production') {
          return callback(new Error('CORS wildcard origin (*) is not allowed in production with credentials.'));
        }
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, '');
      if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not permitted by CORS policy`));
    },
    credentials: rawCorsOrigin !== '*',
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

// Serve uploaded documents statically with security headers (prevents Stored XSS / MIME confusion)
app.use(
  '/storage/documents',
  (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'");
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(uploadDir)
);

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

// Serve Frontend Static Assets in Production
const possibleClientDistPaths = [
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(process.cwd(), '../client/dist'),
];

const clientDistPath = possibleClientDistPaths.find((p) => fs.existsSync(p));
if (clientDistPath) {
  app.use(express.static(clientDistPath));
  app.get('*', (req: Request, res: Response, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/storage')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global Error Handler
app.use(errorHandler);

export default app;
