import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    if (!this.client) {
      this.client = new OpenAI({ apiKey: key });
    }
    return this.client;
  }

  /**
   * Chat completion - ready for future use.
   */
  async chatCompletion(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options?: { model?: string; maxTokens?: number }
  ) {
    const client = this.getClient();
    return client.chat.completions.create({
      model: options?.model ?? 'gpt-4o-mini',
      messages,
      max_tokens: options?.maxTokens ?? 1024,
    });
  }

  /**
   * Create embeddings for vector search.
   */
  async createEmbedding(text: string): Promise<number[]> {
    const client = this.getClient();
    const res = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return res.data[0]?.embedding ?? [];
  }
}
