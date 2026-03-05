import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import {
  LLM_PROVIDER_IDS,
  type LlmProviderId,
  type ChatMessage,
  type ChatCompletionResult,
  type LlmChatOptions,
  LLM_DEFAULT_MODELS,
} from '@ultima-forma/shared';
import type { ILlmAdapter } from '../interfaces/llm-adapter.interface';

export class AnthropicLlmAdapter implements ILlmAdapter {
  readonly id: LlmProviderId = LLM_PROVIDER_IDS[1]; // 'anthropic'

  constructor(private configService: ConfigService) {}

  private resolveApiKey(apiKey?: string): string {
    const key = apiKey?.trim();
    if (key) return key;
    const envKey = this.configService.get<string>('ANTHROPIC_API_KEY');
    if (envKey?.trim()) return envKey;
    throw new Error('Anthropic requires ANTHROPIC_API_KEY in env.');
  }

  private getClient(apiKey?: string): Anthropic {
    return new Anthropic({ apiKey: this.resolveApiKey(apiKey) });
  }

  async chatCompletion(
    messages: ChatMessage[],
    options?: LlmChatOptions
  ): Promise<ChatCompletionResult> {
    const model =
      options?.model ??
      this.configService.get<string>('ANTHROPIC_MODEL') ??
      LLM_DEFAULT_MODELS.anthropic;
    const client = this.getClient();

    // Anthropic uses system + alternating user/assistant; system must be first
    const systemMsg = messages.find((m) => m.role === 'system');
    const otherMsgs = messages.filter((m) => m.role !== 'system');
    const anthropicMessages = otherMsgs.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    const response = await client.messages.create(
      {
        model,
        max_tokens: options?.maxTokens ?? 1024,
        system: systemMsg?.content,
        messages: anthropicMessages,
      },
      options?.signal ? { signal: options.signal } : undefined
    );

    const textBlock = response.content.find(
      (b): b is Anthropic.TextBlock => b.type === 'text'
    );
    return {
      content: textBlock?.text?.trim() ?? '',
      model: response.model,
      usage: response.usage
        ? {
            promptTokens: response.usage.input_tokens,
            completionTokens: response.usage.output_tokens,
          }
        : undefined,
    };
  }

  // Anthropic does not support embeddings; omit createEmbedding
}
