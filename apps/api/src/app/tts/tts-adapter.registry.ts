import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TTS_PROVIDER_IDS, type TtsProviderId } from '@ultima-forma/shared';
import type { ITtsAdapter } from './interfaces/tts-adapter.interface';
import { OpenAITtsAdapter } from './adapters/openai-tts.adapter';
import { HuggingFaceTtsAdapter } from './adapters/huggingface-tts.adapter';
import { ElevenLabsTtsAdapter } from './adapters/elevenlabs-tts.adapter';

const FALLBACK_ORDER: TtsProviderId[] = [
  'huggingface',
  'openai',
  'elevenlabs',
];

const ADAPTER_FACTORIES: Partial<
  Record<TtsProviderId, (config: ConfigService) => ITtsAdapter | null>
> = {
  openai: (config) => new OpenAITtsAdapter(config),
  huggingface: (config) => new HuggingFaceTtsAdapter(config),
  elevenlabs: (config) => new ElevenLabsTtsAdapter(config),
};

@Injectable()
export class TtsAdapterRegistry {
  private readonly adapters = new Map<TtsProviderId, ITtsAdapter>();

  constructor(private configService: ConfigService) {
    this.registerAvailableAdapters();
  }

  private registerAvailableAdapters(): void {
    for (const id of TTS_PROVIDER_IDS) {
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

  get(providerId: string): ITtsAdapter | undefined {
    return this.adapters.get(providerId as TtsProviderId);
  }

  getAvailableIds(): TtsProviderId[] {
    return Array.from(this.adapters.keys());
  }

  getDefaultProviderId(): TtsProviderId {
    const env = this.configService.get<string>(
      'DEFAULT_TTS_PROVIDER',
      'elevenlabs'
    );
    if (
      TTS_PROVIDER_IDS.includes(env as TtsProviderId) &&
      this.adapters.has(env as TtsProviderId)
    ) {
      return env as TtsProviderId;
    }
    const first = this.adapters.keys().next().value;
    if (first) return first;
    throw new Error(
      'No TTS adapter registered. Configure API keys (OPENAI_API_KEY, HF_TTS_API_KEY, or ELEVENLABS_API_KEY).'
    );
  }

  getFallbackOrder(): TtsProviderId[] {
    return FALLBACK_ORDER.filter((id) => this.adapters.has(id));
  }
}
