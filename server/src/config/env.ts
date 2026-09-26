import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load .env file
dotenv.config();

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(5000),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required and cannot be empty'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    CORS_ORIGIN: z.string().min(1, 'CORS_ORIGIN is required and cannot be empty'),
    AI_PROVIDER: z.enum(['mock', 'openai']).default('mock'),
    OPENAI_API_KEY: z.string().optional(),
    STORAGE_PROVIDER: z.enum(['local', 's3']).default('local'),
    STORAGE_PATH: z.string().default(path.resolve(process.cwd(), '../storage')),
    MAX_FILE_SIZE_MB: z.coerce.number().default(15),
  })
  .refine(
    (data) => {
      if (data.NODE_ENV === 'production') {
        const insecureDefaults = [
          'sahaay_default_dev_jwt_secret_2026',
          'sahaay_default_dev_jwt_secret_2026_dev_only',
          'sahaay_jwt_secret_key_super_secure_demo_2026_xyz',
          'sahaay_production_secret_key_change_me_2026',
          'secret',
          'changeme',
        ];
        if (insecureDefaults.includes(data.JWT_SECRET) || data.JWT_SECRET.length < 32) {
          return false;
        }
      }
      return true;
    },
    {
      message:
        'In production, JWT_SECRET must be at least 32 characters long and cannot be a default demo secret.',
      path: ['JWT_SECRET'],
    }
  )
  .refine(
    (data) => {
      if (data.NODE_ENV === 'production') {
        if (!data.CORS_ORIGIN || data.CORS_ORIGIN.trim() === '*' || data.CORS_ORIGIN.trim() === '') {
          return false;
        }
      }
      return true;
    },
    {
      message:
        'In production, CORS_ORIGIN is required, cannot be empty, and cannot be wildcard (*). Set it to your frontend domain (e.g., https://your-app.vercel.app).',
      path: ['CORS_ORIGIN'],
    }
  );

export type Config = z.infer<typeof envSchema>;

const parseEnv = (): Config => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `  • [${issue.path.join('.')}] ${issue.message}`)
      .join('\n');

    console.error('❌ Invalid environment variable configuration:');
    console.error(errorDetails);

    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Production startup aborted due to invalid environment variables:\n${errorDetails}`);
    }

    // In development or test, warn and use fallback if missing
    console.warn('⚠️ Running in non-production mode with dev fallbacks for missing configuration.');
    return envSchema.parse({
      ...process.env,
      JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret_key_for_local_testing_only_32_chars_min',
      CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000',
      DATABASE_URL: process.env.DATABASE_URL || 'postgresql://sahaay_user:sahaay_password@localhost:5432/sahaay_db?schema=public',
    });
  }

  return result.data;
};

export const config = parseEnv();
