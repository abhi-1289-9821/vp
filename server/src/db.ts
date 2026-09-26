import { PrismaClient } from '@prisma/client';
import path from 'path';

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl || dbUrl.startsWith('file:')) {
  const absoluteDbPath = path.resolve(__dirname, '../../prisma/dev.db');
  dbUrl = `file:${absoluteDbPath}`;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

