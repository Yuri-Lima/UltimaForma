import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  LLM_PROVIDER_IDS,
  type LlmProviderId,
  type ChatMessage,
  type ChatCompletionResult,
  type LlmChatOptions,
  type LlmEmbeddingOptions,
  LLM_DEFAULT_MODELS,
} from '@ultima-forma/shared';
import type { ILlmAdapter } from '../interfaces/llm-adapter.interface';

export class OpenAILlmAdapter implements ILlmAdapter {
  readonly id: LlmProviderId = LLM_PROVIDER_IDS[0]; // 'openai'

  constructor(private configService: ConfigService) {}

  private resolveApiKey(apiKey?: string): string {
    const key = apiKey?.trim();
    if (key) return key;
    const envKey = this.configService.get<string>('OPENAI_API_KEY');
    if (envKey?.trim()) return envKey;
    throw new Error('OpenAI requires OPENAI_API_KEY in env.');
  }

  private getClient(apiKey?: string): OpenAI {
    return new OpenAI({ apiKey: this.resolveApiKey(apiKey) });
  }

  async chatCompletion(
    messages: ChatMessage[],
    options?: LlmChatOptions
  ): Promise<ChatCompletionResult> {
    const model =
      options?.model ??
      this.configService.get<string>('OPENAI_CHAT_MODEL') ??
      LLM_DEFAULT_MODELS.openai;
    const client = this.getClient();
    const response = await client.chat.completions.create(
      {
        model,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        max_tokens: options?.maxTokens ?? 1024,
        temperature: options?.temperature ?? 0.3,
      },
      options?.signal ? { signal: options.signal } : undefined
    );
    const choice = response.choices[0];
    return {
      content: choice?.message?.content?.trim() ?? '',
      model: response.model,
      usage: response.usage
        ? {
            promptTokens: response.usage.prompt_tokens,
            completionTokens: response.usage.completion_tokens,
          }
        : undefined,
    };
  }

  async createEmbedding(
    text: string,
    options?: LlmEmbeddingOptions
  ): Promise<number[]> {
    const client = this.getClient();
    const model =
      options?.model ??
      this.configService.get<string>('OPENAI_EMBEDDING_MODEL') ??
      'text-embedding-3-small';
    const res = await client.embeddings.create(
      {
        model,
        input: text,
      },
      options?.signal ? { signal: options.signal } : undefined
    );
    return res.data[0]?.embedding ?? [];
  }
}
