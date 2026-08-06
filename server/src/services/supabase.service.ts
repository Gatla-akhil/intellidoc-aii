import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { DocumentModel } from './db.service.js';

export class SupabaseService {
  private client: SupabaseClient | null = null;

  constructor() {
    if (env.SUPABASE_URL && env.SUPABASE_KEY) {
      this.client = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
      logger.info('⚡ Supabase Client initialized successfully');
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
      if (error) throw error;
      return data as DocumentModel[];
    } catch (err) {
      logger.error({ err }, 'Failed to fetch documents from Supabase');
      return null;
    }
  }

  public async insertDocument(doc: DocumentModel): Promise<DocumentModel | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client.from('documents').insert([doc]).select();
      if (error) throw error;
      return (data && data[0]) as DocumentModel;
    } catch (err) {
      logger.error({ err }, 'Failed to insert document into Supabase');
      return null;
    }
  }

  public async uploadFile(bucket: string, path: string, fileBuffer: Buffer, contentType: string): Promise<string | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client.storage.from(bucket).upload(path, fileBuffer, {
        contentType,
        upsert: true,
      });
      if (error) throw error;
      const { data: publicUrlData } = this.client.storage.from(bucket).getPublicUrl(data.path);
      return publicUrlData.publicUrl;
    } catch (err) {
      logger.error({ err }, 'Failed to upload file to Supabase storage');
      return null;
    }
  }
}

export const supabaseService = new SupabaseService();
