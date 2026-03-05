import { ConfigService } from '@nestjs/config';
import {
  LLM_PROVIDER_IDS,
  type LlmProviderId,
  type ChatMessage,
  type ChatCompletionResult,
  type LlmChatOptions,
  LLM_DEFAULT_MODELS,
} from '@ultima-forma/shared';
import type { ILlmAdapter } from '../interfaces/llm-adapter.interface';

export class OllamaLlmAdapter implements ILlmAdapter {
  readonly id: LlmProviderId = LLM_PROVIDER_IDS[2]; // 'ollama'

  constructor(private configService: ConfigService) {}

  private getBaseUrl(): string {
    return (
      this.configService.get<string>('OLLAMA_BASE_URL') ?? 'http://localhost:11434'
    );
  }

  async chatCompletion(
    messages: ChatMessage[],
    options?: LlmChatOptions
  ): Promise<ChatCompletionResult> {
    const model =
      options?.model ??
      this.configService.get<string>('OLLAMA_MODEL') ??
      LLM_DEFAULT_MODELS.ollama;
    const baseUrl = this.getBaseUrl();

    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: false,
        options: {
          num_predict: options?.maxTokens ?? 1024,
          temperature: options?.temperature ?? 0.3,
        },
      }),
      signal: options?.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Ollama chat failed: ${response.status}. ${errText}`);
    }

    const data = (await response.json()) as {
      message?: { content?: string };
      model?: string;
    };
    return {
      content: data.message?.content?.trim() ?? '',
      model: data.model,
    };
  }

  async createEmbedding(
    text: string,
    options?: { model?: string; signal?: AbortSignal }
  ): Promise<number[]> {
    const model =
      options?.model ??
      this.configService.get<string>('OLLAMA_EMBEDDING_MODEL') ??
      'nomic-embed-text';
    const baseUrl = this.getBaseUrl();

    const response = await fetch(`${baseUrl}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: text }),
      signal: options?.signal,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Ollama embeddings failed: ${response.status}. ${errText}`);
    }

    const data = (await response.json()) as { embedding?: number[] };
    return data.embedding ?? [];
  }
}
