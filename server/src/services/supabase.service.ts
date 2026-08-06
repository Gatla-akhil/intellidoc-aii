import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { DocumentModel } from './db.service.js';

export class SupabaseService {
  private client: SupabaseClient | null = null;

  constructor() {
    if (env.SUPABASE_URL && env.SUPABASE_KEY) {
      try {
        this.client = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
        logger.info('⚡ Supabase Client initialized successfully');
      } catch (err) {
        logger.warn('Failed to initialize Supabase client, using local store fallback');
        this.client = null;
      }
    } else {
      logger.info('ℹ️ Supabase environment variables not set. Using local database store fallback.');
    }
  }

  public isConnected(): boolean {
    return this.client !== null;
  }

  public async getDocuments(): Promise<DocumentModel[] | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client.from('documents').select('*');
      if (error) {
        logger.warn(`Supabase documents query note (${error.message}). Using local store.`);
        return null;
      }
      return data as DocumentModel[];
    } catch (err: any) {
      logger.warn(`Supabase fetch query notice: ${err?.message || err}. Defaulting to local store.`);
      return null;
    }
  }

  public async insertDocument(doc: DocumentModel): Promise<DocumentModel | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client.from('documents').insert([doc]).select();
      if (error) {
        logger.warn(`Supabase document insert note (${error.message}). Stored in local store.`);
        return null;
      }
      return (data && data[0]) as DocumentModel;
    } catch (err: any) {
      logger.warn(`Supabase insert notice: ${err?.message || err}. Saved in local store.`);
      return null;
    }
  }

  public async uploadFile(bucket: string, path: string, fileBuffer: Buffer, contentType: string): Promise<string | null> {
    if (!this.client) return null;
    try {
      // Auto-create bucket if missing
      await this.client.storage.createBucket(bucket, { public: true }).catch(() => {});

      const { data, error } = await this.client.storage.from(bucket).upload(path, fileBuffer, {
        contentType,
        upsert: true,
      });
      if (error) throw error;
      const { data: publicUrlData } = this.client.storage.from(bucket).getPublicUrl(data.path);
      return publicUrlData.publicUrl;
    } catch (err: any) {
      logger.warn(`Supabase storage upload notice: ${err?.message || err}. Using local static storage URL.`);
      return null;
    }
  }
}

export const supabaseService = new SupabaseService();
