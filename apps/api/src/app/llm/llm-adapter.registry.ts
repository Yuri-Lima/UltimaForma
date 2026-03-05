import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  LLM_PROVIDER_IDS,
  type LlmProviderId,
} from '@ultima-forma/shared';
import type { ILlmAdapter } from './interfaces/llm-adapter.interface';
import { OpenAILlmAdapter } from './adapters/openai-llm.adapter';
import { AnthropicLlmAdapter } from './adapters/anthropic-llm.adapter';
import { OllamaLlmAdapter } from './adapters/ollama-llm.adapter';

const ADAPTER_FACTORIES: Partial<
  Record<LlmProviderId, (config: ConfigService) => ILlmAdapter | null>
> = {
  openai: (config) => new OpenAILlmAdapter(config),
  anthropic: (config) => new AnthropicLlmAdapter(config),
  ollama: (config) => new OllamaLlmAdapter(config),
};

@Injectable()
export class LlmAdapterRegistry {
  private readonly adapters = new Map<LlmProviderId, ILlmAdapter>();

  constructor(private configService: ConfigService) {
    this.registerAvailableAdapters();
  }

  private registerAvailableAdapters(): void {
    for (const id of LLM_PROVIDER_IDS) {
      try {
        const factory = ADAPTER_FACTORIES[id];
        if (factory) {
          const adapter = factory(this.configService);
          if (adapter) {
            this.adapters.set(id, adapter);
          }
        }
      } catch {
        // Skip adapters that fail to initialize
      }
    }
  }

  get(providerId: string): ILlmAdapter | undefined {
    return this.adapters.get(providerId as LlmProviderId);
  }

  getAvailableIds(): LlmProviderId[] {
    return Array.from(this.adapters.keys());
  }

  getDefaultProviderId(): LlmProviderId {
    const env = this.configService.get<string>(
      'DEFAULT_LLM_PROVIDER',
      'openai'
    );
    if (
      LLM_PROVIDER_IDS.includes(env as LlmProviderId) &&
      this.adapters.has(env as LlmProviderId)
    ) {
      return env as LlmProviderId;
    }
    const first = this.adapters.keys().next().value;
    if (first) return first;
    throw new Error(
      'No LLM adapter registered. Configure OPENAI_API_KEY, ANTHROPIC_API_KEY, or OLLAMA_BASE_URL.'
    );
  }
}
