import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().default('sahaay_default_dev_jwt_secret_2026'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('*'),
  AI_PROVIDER: z.enum(['mock', 'openai']).default('mock'),
  OPENAI_API_KEY: z.string().optional(),
  STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
  STORAGE_PATH: z.string().default(path.resolve(process.cwd(), '../storage')),
  MAX_FILE_SIZE_MB: z.coerce.number().default(15),
});

export type Config = z.infer<typeof envSchema>;

const parseEnv = (): Config => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variable configuration:');
    console.error(result.error.format());

    // In production, throw error; in development, warn
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment configuration');
    }

    // Return parsed with defaults where possible
    return envSchema.parse({
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL || 'file:../prisma/dev.db',
    });
  }

  return result.data;
};

export const config = parseEnv();
