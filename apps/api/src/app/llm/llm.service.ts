import { Injectable, Logger } from '@nestjs/common';
import type {
  LlmProviderId,
  ChatMessage,
  ChatCompletionResult,
  LlmChatOptions,
  LlmEmbeddingOptions,
} from '@ultima-forma/shared';
import { LlmAdapterRegistry } from './llm-adapter.registry';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);

  constructor(private readonly registry: LlmAdapterRegistry) {}

  async chatCompletion(
    messages: ChatMessage[],
    options?: LlmChatOptions & { providerId?: LlmProviderId }
  ): Promise<ChatCompletionResult> {
    const providerId = options?.providerId ?? this.registry.getDefaultProviderId();
    const adapter = this.registry.get(providerId);
    if (!adapter) {
      throw new Error(`LLM adapter '${providerId}' not available.`);
    }

    const result = await adapter.chatCompletion(messages, {
      model: options?.model,
      maxTokens: options?.maxTokens,
      temperature: options?.temperature,
      signal: options?.signal,
    });
    this.logger.debug(
      `Chat completion done (provider=${providerId}, model=${result.model})`
    );
    return result;
  }

  async createEmbedding(
    text: string,
    options?: LlmEmbeddingOptions & { providerId?: LlmProviderId }
  ): Promise<number[]> {
    const providerId = options?.providerId ?? this.registry.getDefaultProviderId();
    const adapter = this.registry.get(providerId);
    if (!adapter) {
      throw new Error(`LLM adapter '${providerId}' not available.`);
    }
    if (!adapter.createEmbedding) {
      throw new Error(
        `LLM adapter '${providerId}' does not support embeddings.`
      );
    }

    const result = await adapter.createEmbedding(text, {
      model: options?.model,
      signal: options?.signal,
    });
    this.logger.debug(
      `Embedding created (provider=${providerId}, dims=${result.length})`
    );
    return result;
  }

  getAvailableProviderIds(): LlmProviderId[] {
    return this.registry.getAvailableIds();
  }

  getDefaultProviderId(): LlmProviderId {
    return this.registry.getDefaultProviderId();
  }
}
