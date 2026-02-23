import { Injectable } from '@nestjs/common';

/**
 * Stub service for vector similarity search using PGVector.
 * Ready for embeddings and similarity search integration.
 */
@Injectable()
export class VectorSearchService {
  /**
   * Stub: Embed content and store in embeddings table.
   * TODO: Integrate OpenAI embeddings.
   */
  async embedAndStore(
    _content: string,
    _metadata?: Record<string, unknown>
  ): Promise<string> {
    throw new Error('VectorSearchService.embedAndStore not implemented');
  }

  /**
   * Stub: Search for similar embeddings by vector.
   * TODO: Use pgvector cosine similarity or inner product.
   */
  async searchSimilar(
    _embedding: number[],
    _limit?: number
  ): Promise<Array<{ id: string; content: string; metadata: unknown }>> {
    throw new Error('VectorSearchService.searchSimilar not implemented');
  }

  /**
   * Stub: Search by text (embed + search).
   * TODO: Use OpenAI to embed query, then similarity search.
   */
  async searchByText(
    _query: string,
    _limit?: number
  ): Promise<Array<{ id: string; content: string; metadata: unknown }>> {
    throw new Error('VectorSearchService.searchByText not implemented');
  }
}
