import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.string().default('development'),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().default('intellidoc-secret-key-2026'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  GEMINI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  OCR_ENGINE: z.string().default('vision'),
});

export const env = envSchema.parse(process.env);
